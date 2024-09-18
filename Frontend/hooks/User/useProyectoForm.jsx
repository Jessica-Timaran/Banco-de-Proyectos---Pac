// import { useState } from 'react';

// const useProyectoForm = (proyectoData, idProyecto, setErrors, navigate) => {
//   const [nombreProyecto, setNombreProyecto] = useState(proyectoData.nombre);
//   const [impactoDelProyecto, setImpactoDelProyecto] = useState(proyectoData.impacto);
//   const [responsable, setResponsable] = useState(proyectoData.responsable);
//   const [frecuencia, setFrecuencia] = useState(proyectoData.frecuencia);
//   const [diasSeleccionados, setDiasSeleccionados] = useState(proyectoData.dias);

//   const handleFrecuenciaClick = (value) => {
//     setFrecuencia(value);
//   };

//   const handleDiaChange = (e) => {
//     setDiasSeleccionados(e.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setErrors({});

//     let hasError = false;
    
//     if (!nombreProyecto) {
//       setErrors(prev => ({ ...prev, nombre: 'Este campo es obligatorio.' }));
//       hasError = true;
//     }
//     if (!impactoDelProyecto) {
//       setErrors(prev => ({ ...prev, impacto: 'Este campo es obligatorio.' }));
//       hasError = true;
//     }
//     if (!responsable) {
//       setErrors(prev => ({ ...prev, responsable: 'Este campo es obligatorio.' }));
//       hasError = true;
//     }
//     if (!frecuencia) {
//       setErrors(prev => ({ ...prev, frecuencia: 'Seleccione una frecuencia para las reuniones.' }));
//       hasError = true;
//     }
//     if (!diasSeleccionados) {
//       setErrors(prev => ({ ...prev, dias: 'Seleccione un día para las reuniones.' }));
//       hasError = true;
//     }

//     if (!hasError) {
//       const userId = localStorage.getItem('userId');
//       const url = idProyecto
//         ? `http://localhost:4000/api/user/proyectos/${idProyecto}`
//         : 'http://localhost:4000/api/user/proyectos';
//       const method = idProyecto ? 'PUT' : 'POST';
//       const payload = {
//         nombre: nombreProyecto,
//         impacto: impactoDelProyecto,
//         responsable: responsable,
//         disponibilidad: frecuencia,
//         dia: diasSeleccionados,
//         idpersona: userId,
//         estado: 'En proceso',
//       };

//       try {
//         const response = await fetch(url, {
//           method: method,
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(payload),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           window.location.href = `/Usuario/VistaAreas1?projectId=${data.idproyecto}`;
//         } else {
//           const errorText = await response.text();
//           console.error('Error al registrar proyecto:', errorText);
//         }
//       } catch (error) {
//         console.error('Error en la solicitud:', error);
//       }
//     }
//   };

//   return {
//     nombreProyecto,
//     setNombreProyecto,
//     impactoDelProyecto,
//     setImpactoDelProyecto,
//     responsable,
//     setResponsable,
//     frecuencia,
//     handleFrecuenciaClick,
//     diasSeleccionados,
//     handleDiaChange,
//     handleSubmit,
//   };
// };

// export default useProyectoForm;
