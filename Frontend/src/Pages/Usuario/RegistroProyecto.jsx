import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // <--- Importa useParams
import LayoutPrincipal2 from '../../layouts/LayoutPrincipal2';
import Layoutcontenido2 from '../../Layouts/Layoutcontenido2';
import Input from '../../Components/Input';
import BotonPrincipal from '../../Components/BotonPrincipal';
import BotonSegundo from '../../Components/BotonSegundo';
import RadioButton2 from '../../Components/RadioButton2';
import Loader from '../../Components/Loader';

const RegistroProyecto = () => {
  const { idproyecto } = useParams();
  const [idProyecto, setIdProyecto] = useState(idproyecto || null); // Se inicializa con el idproyecto de los params
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [impactoDelProyecto, setImpactoDelProyecto] = useState('');
  const [responsable, setResponsable] = useState('');
  const [frecuencia, setFrecuencia] = useState(null);
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);
  const [errors, setErrors] = useState({
    nombre: '',
    impacto: '',
    responsable: '',
    frecuencia: '',
    dias: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (idProyecto) {
      fetch(`http://localhost:4000/api/user/proyectos/${idProyecto}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener el proyecto');
          }
          return response.json();
        })
        .then(data => {
          setNombreProyecto(data.nombre);
          setImpactoDelProyecto(data.impacto);
          setResponsable(data.responsable);
          setFrecuencia(data.disponibilidad);
          setDiasSeleccionados(data.dia.split(', '));
        })
        .catch(error => console.error('Error al cargar el proyecto:', error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [idProyecto]);

  const handleFrecuenciaClick = (value) => {
    setFrecuencia(value);
  };

  const handleDiaChange = (e) => {
    const { value, checked } = e.target;
    setDiasSeleccionados(prev =>
      checked ? [...prev, value] : prev.filter(day => day !== value)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let hasError = false;
    setErrors({
      nombre: '',
      impacto: '',
      responsable: '',
      frecuencia: '',
      dias: '',
    });

    if (!nombreProyecto) {
      setErrors(prev => ({ ...prev, nombre: 'Este campo es obligatorio.' }));
      hasError = true;
    }
    if (!impactoDelProyecto) {
      setErrors(prev => ({ ...prev, impacto: 'Este campo es obligatorio.' }));
      hasError = true;
    }
    if (!responsable) {
      setErrors(prev => ({ ...prev, responsable: 'Este campo es obligatorio.' }));
      hasError = true;
    }
    if (diasSeleccionados.length === 0) {
      setErrors(prev => ({ ...prev, dias: 'Seleccione un día para las reuniones.' }));
      hasError = true;
    }
    if (!frecuencia) {
      setErrors(prev => ({ ...prev, frecuencia: 'Seleccione una frecuencia para las reuniones.' }));
      hasError = true;
    }

    if (!hasError) {
      const diasSeleccionadosStr = diasSeleccionados.join(', ');
      const userId = localStorage.getItem('userId');

      if (!userId) {
        console.error('Error: idpersona no encontrado en localStorage');
        return;
      }

      const url = idProyecto
        ? `http://localhost:4000/api/user/proyectos/${idProyecto}`
        : 'http://localhost:4000/api/user/proyectos';
      const method = idProyecto ? 'PUT' : 'POST';

      try {
        const response = await fetch(url, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: nombreProyecto,
            impacto: impactoDelProyecto,
            responsable: responsable,
            disponibilidad: frecuencia,
            dia: diasSeleccionadosStr,
            idpersona: userId,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          window.location.href = `/Usuario/VistaAreas1?projectId=${data.idproyecto}`;
        } else {
          const errorText = await response.text();
          console.error('Error al registrar proyecto:', errorText);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    }
  };

  return (
    <LayoutPrincipal2 title="">
      {loading ? (
        <div className="loading-container">
          <Loader />
        </div>
      ) : (
        <div className="content-container">
          <Layoutcontenido2 title="" text1={idProyecto ? "Actualizar Proyecto" : "Registrar Proyecto"}>
            <div className="w-1/2 mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="flex font-josefin-slab flex-col space-y-8">
                  <div>
                    <Input
                      type="text"
                      Text="Nombre Del Proyecto"
                      placeholder="Ejemplo: Pac"
                      id="NombreDelProyecto"
                      value={nombreProyecto}
                      onChange={(e) => setNombreProyecto(e.target.value)}
                    />
                    <span className="text-red-500 text-sm">
                      {errors.nombre}
                    </span>
                  </div>
                  <div>
                    <label
                      htmlFor="ImpactoDelProyecto"
                      className="block font-josefin-slab font-semibold text-black"
                    >
                      Sector Impactado
                    </label>
                    <textarea
                      id="ImpactoDelProyecto"
                      placeholder="Impacto Del Proyecto:"
                      maxLength="250"
                      className="w-full p-2 border border-gray-300 rounded bg-[#F5F6FA]"
                      value={impactoDelProyecto}
                      onChange={(e) => setImpactoDelProyecto(e.target.value)}
                    ></textarea>
                    <span className="text-red-500 text-sm">
                      {errors.impacto}
                    </span>
                  </div>
                  <div>
                    <Input
                      type="text"
                      Text="Responsable"
                      placeholder="Responsable Del Proyecto"
                      id="Responsable"
                      value={responsable}
                      onChange={(e) => setResponsable(e.target.value)}
                    />
                    <span className="text-red-500 text-sm">
                      {errors.responsable}
                    </span>
                  </div>
                  <div className="space-y-8">
                    <label className="font-josefin-slab font-semibold text-black">
                      Disponibilidad Para Reuniones Con El Equipo Desarrollador
                    </label>
                  </div>

                  <div className="grid sm:grid-cols-3 grid-cols-1 sm:gap-y-4 gap-4">
                    <div className="flex justify-center">
                      <BotonPrincipal
                        Text="Semanal"
                        isSelected={frecuencia === 'Semanal'}
                        onClick={() => handleFrecuenciaClick('Semanal')}
                      />
                    </div>
                    <div className="flex justify-center">
                      <BotonPrincipal
                        Text="Quincenal"
                        isSelected={frecuencia === 'Quincenal'}
                        onClick={() => handleFrecuenciaClick('Quincenal')}
                      />
                    </div>
                    <div className="flex justify-center">
                      <BotonPrincipal
                        Text="Mensual"
                        isSelected={frecuencia === 'Mensual'}
                        onClick={() => handleFrecuenciaClick('Mensual')}
                      />
                    </div>
                    <span className="text-red-500 text-sm sm:col-span-3">
                      {errors.frecuencia}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-x-8 sm:gap-y-4 mt-4">
                    <RadioButton2
                      id="checkboxLunes"
                      name="dias"
                      value="Lunes"
                      checked={diasSeleccionados.includes('Lunes')}
                      label="Lunes" 
                      onChange={handleDiaChange}
                    />
                    <RadioButton2
                      id="checkboxMartes"
                      name="dias"
                      value="Martes"
                      checked={diasSeleccionados.includes('Martes')}
                      label="Martes" 
                      onChange={handleDiaChange}
                    />
                    <RadioButton2
                      id="checkboxMiercoles"
                      name="dias"
                      value="Miércoles"
                      checked={diasSeleccionados.includes('Miércoles')}
                      label="Miércoles"
                      onChange={handleDiaChange}
                    />
                    <RadioButton2
                      id="checkboxJueves"
                      name="dias"
                      value="Jueves"
                      checked={diasSeleccionados.includes('Jueves')}
                      label="Jueves"
                      onChange={handleDiaChange}
                    />
                    <RadioButton2
                      id="checkboxViernes"
                      name="dias"
                      value="Viernes"
                      checked={diasSeleccionados.includes('Viernes')}
                      label="Viernes"
                      onChange={handleDiaChange}
                    />
                    <RadioButton2
                      id="checkboxSabado"
                      name="dias"
                      value="Sábado"
                      checked={diasSeleccionados.includes('Sábado')}
                      label="Sábado"
                      onChange={handleDiaChange}
                    />
                    <span className="text-red-500 text-sm sm:col-span-3">
                      {errors.dias}
                    </span>
                  </div>

                  <div className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                    <BotonSegundo Text="Guardar" type="submit" />
                  </div>
                </div>
              </form>
            </div>
          </Layoutcontenido2>
        </div>
      )}
    </LayoutPrincipal2>
  );
};

export default RegistroProyecto;