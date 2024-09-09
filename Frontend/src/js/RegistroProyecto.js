document.addEventListener("DOMContentLoaded", function () {
    const nextPageLink = document.getElementById("nextPageLink");

    nextPageLink.addEventListener("click", async function (event) {
        event.preventDefault();

        const nombreProyecto = document.getElementById("NombreDelProyecto").value.trim();
        const impactoDelProyecto = document.getElementById("ImpactoDelProyecto").value.trim();
        const responsable = document.getElementById("Responsable").value.trim();

        // Obtener valores de los campos adicionales
        const idrespuestaalcance = document.getElementById("idrespuestaalcance") ? document.getElementById("idrespuestaalcance").value.trim() : "";
        const idrespuestaobjetivos = document.getElementById("idrespuestaobjetivos") ? document.getElementById("idrespuestaobjetivos").value.trim() : "";
        const idarea = document.getElementById("idarea") ? document.getElementById("idarea").value.trim() : "";
        const idficha = document.getElementById("idficha") ? document.getElementById("idficha").value.trim() : "";
        const idpersona = document.getElementById("idpersona") ? document.getElementById("idpersona").value.trim() : "";
        const iditems = document.getElementById("iditems") ? document.getElementById("iditems").value.trim() : "";
        const idtiposdearea = document.getElementById("idtiposdearea") ? document.getElementById("idtiposdearea").value.trim() : "";

        document.getElementById("errorNombreDelProyecto").textContent = "";
        document.getElementById("errorImpactoDelProyecto").textContent = "";
        document.getElementById("errorResponsable").textContent = "";
        document.getElementById("errorDiasReunion").textContent = ""; 
        document.getElementById("errorFrecuenciaReunion").textContent = ""; 

        let hasError = false;

        if (nombreProyecto === "") {
            document.getElementById("errorNombreDelProyecto").textContent = "Este campo es obligatorio.";
            hasError = true;
        }
        if (impactoDelProyecto === "") {
            document.getElementById("errorImpactoDelProyecto").textContent = "Este campo es obligatorio.";
            hasError = true;
        }
        if (responsable === "") {
            document.getElementById("errorResponsable").textContent = "Este campo es obligatorio.";
            hasError = true;
        }

        const dias = [
            document.getElementById("checkboxLunes").checked,
            document.getElementById("checkboxMartes").checked,
            document.getElementById("checkboxMiercoles").checked,
            document.getElementById("checkboxJueves").checked,
            document.getElementById("checkboxViernes").checked,
            document.getElementById("checkboxSabado").checked
        ];

        const diasSeleccionados = dias.some(day => day);
        if (!diasSeleccionados) {
            document.getElementById("errorDiasReunion").textContent = "Seleccione un día para las reuniones.";
            hasError = true;
        }

        const btnSemanal = document.getElementById("btnSemanal");
        const btnQuincenal = document.getElementById("btnQuincenal");
        const btnMensual = document.getElementById("btnMensual");

        let frecuencia = null;
        if (btnSemanal.classList.contains("selected")) {
            frecuencia = "Semanal";
        } else if (btnQuincenal.classList.contains("selected")) {
            frecuencia = "Quincenal";
        } else if (btnMensual.classList.contains("selected")) {
            frecuencia = "Mensual";
        }

        if (!frecuencia) {
            document.getElementById("errorFrecuenciaReunion").textContent = "Seleccione una frecuencia para las reuniones.";
            hasError = true;
        }

        if (!hasError) {
            const diasSeleccionadosStr = dias.map((checked, index) => checked ? ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"][index] : "").filter(day => day).join(", ");
            
            try {
                const response = await fetch('http://localhost:4000/api/proyectos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nombre: nombreProyecto,
                        impacto: impactoDelProyecto,
                        responsable: responsable,
                        disponibilidad: frecuencia,
                        idrespuestaalcance: idrespuestaalcance.trim() === "" ? null : idrespuestaalcance, 
                        idrespuestaobjetivos: idrespuestaobjetivos.trim() === "" ? null : idrespuestaobjetivos,
                        idarea: idarea.trim() === "" ? null : idarea,
                        idficha: idficha.trim() === "" ? null : idficha,
                        idpersona: idpersona.trim() === "" ? null : idpersona,
                        iditems: iditems.trim() === "" ? null : iditems,
                        idtiposdearea: idtiposdearea.trim() === "" ? null : idtiposdearea,
                        dia: diasSeleccionadosStr, 
                    })
                });
            
                if (response.ok) {
                    const data = await response.json();
                    window.location.href = `/VistaAreas1?projectId=${data.idproyecto}`; // Redirige con el ID del proyecto
                } else {
                    const errorText = await response.text();
                    console.error('Error al registrar proyecto:', errorText);
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        }
    });

    const buttons = document.querySelectorAll('.btn-frecuencia');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            buttons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
});

setTimeout(() => {
    document.querySelector('.loading-container')?.classList.add('hidden');
    document.querySelector('.content-container')?.classList.remove('hidden');
}, 2000);