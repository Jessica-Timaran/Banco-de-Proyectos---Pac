// import { useState, useEffect } from 'react';

// const useFetchProyecto = (idProyecto) => {
//   const [loading, setLoading] = useState(true);
//   const [proyectoData, setProyectoData] = useState({
//     nombre: '',
//     impacto: '',
//     responsable: '',
//     frecuencia: null,
//     dias: '',
//   });

//   useEffect(() => {
//     if (idProyecto) {
//       fetch(`http://localhost:4000/api/user/proyectos/${idProyecto}`)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Error al obtener el proyecto');
//           }
//           return response.json();
//         })
//         .then((data) => {
//           setProyectoData({
//             nombre: data.nombre,
//             impacto: data.impacto,
//             responsable: data.responsable,
//             frecuencia: data.disponibilidad,
//             dias: data.dia,
//           });
//         })
//         .catch((error) => console.error('Error al cargar el proyecto:', error))
//         .finally(() => setLoading(false));
//     } else {
//       setLoading(false);
//     }
//   }, [idProyecto]);

//   return { loading, proyectoData, setProyectoData };
// };

// export default useFetchProyecto;
