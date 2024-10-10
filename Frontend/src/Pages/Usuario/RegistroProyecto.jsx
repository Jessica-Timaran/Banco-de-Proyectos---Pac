import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LayoutPrincipal2 from '../../Layouts/LayoutPrincipal2';
import Layoutcontenido2 from '../../Layouts/Layoutcontenido2';
import Input from '../../Components/Input';
import BotonPrincipal from '../../Components/BotonPrincipal';
import BotonRegistro from '../../Components/BotonRegistro';
import BotonSegundo from '../../Components/BotonSegundo';
import RadioButton2 from '../../Components/RadioButton2';
import Loader from '../../Components/Loader';

const RegistroProyecto = () => {
  const { idproyecto } = useParams();
  const navigate = useNavigate(); 
  const [idProyecto, setIdProyecto] = useState(idproyecto || null);
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [impactoDelProyecto, setImpactoDelProyecto] = useState('');
  const [responsable, setResponsable] = useState('');
  const [frecuencia, setFrecuencia] = useState(null);
  const [diasSeleccionados, setDiasSeleccionados] = useState('');
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
      fetch(`https://banco-de-proyectos-pac.onrender.com/api/user/proyectos/${idProyecto}`)
        .then(response => {
          if (!response.ok) throw new Error('Error al obtener el proyecto');
          return response.json();
        })
        .then(data => {
          setNombreProyecto(data.nombre);
          setImpactoDelProyecto(data.impacto);
          setResponsable(data.responsable);
          setFrecuencia(data.disponibilidad);
          setDiasSeleccionados(data.dia);
        })
        .catch(error => console.error('Error al cargar el proyecto:', error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [idProyecto]);

  const handleFrecuenciaClick = (value) => setFrecuencia(value);

  const handleDiaChange = (e) => setDiasSeleccionados(e.target.value);

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
    if (!diasSeleccionados) {
      setErrors(prev => ({ ...prev, dias: 'Seleccione un día para las reuniones.' }));
      hasError = true;
    }
    if (!frecuencia) {
      setErrors(prev => ({ ...prev, frecuencia: 'Seleccione una frecuencia para las reuniones.' }));
      hasError = true;
    }
    
    if (!hasError) {
      const userString = localStorage.getItem('user');
      
      if (!userString) {
        console.error('Error: Usuario no encontrado en localStorage');
        return;
      }
  
      let userId;
      try {
        const userObj = JSON.parse(userString);  // Convertir la cadena JSON a objeto
        userId = userObj.id;  // Acceder al campo 'id'
      } catch (error) {
        console.error('Error al parsear el usuario de localStorage:', error);
        return;
      }
      
      const url = idProyecto
      ? `https://banco-de-proyectos-pac.onrender.com/api/user/proyectos/${idProyecto}`
      : 'https://banco-de-proyectos-pac.onrender.com/api/user/proyectos';
      const method = idProyecto ? 'PUT' : 'POST';
  
      const payload = {
        nombre: nombreProyecto,
        impacto: impactoDelProyecto,
        responsable: responsable,
        disponibilidad: frecuencia,
        dia: diasSeleccionados,
        idpersona: userId,  // Aquí el ID correcto de la persona
        estado: 'En proceso',
      };
      
      console.log('Enviando datos al servidor:', payload);
  
      try {
        const response = await fetch(url, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
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
  

  const handleVolver = () => {
    navigate('/Usuario/VistaUsuario');
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

                  <div className="w-full flex justify-center items-center flex-row flex-wrap gap-x-1 ">
                    <div className="w-auto">
                      <BotonRegistro
                        Text="Semanal"
                        isSelected={frecuencia === 'Semanal'}
                        onClick={() => handleFrecuenciaClick('Semanal')}
                      />
                    </div>
                    <div className="w-auto">
                      <BotonRegistro
                        Text="Quincenal"
                        isSelected={frecuencia === 'Quincenal'}
                        onClick={() => handleFrecuenciaClick('Quincenal')}
                      />
                    </div>
                    <div className="w-auto">
                      <BotonRegistro
                        Text="Mensual"
                        isSelected={frecuencia === 'Mensual'}
                        onClick={() => handleFrecuenciaClick('Mensual')}
                      />
                    </div>
                    <span className="text-red-500 text-sm lg:col-span-3 md:col-span-1">
                      {errors.frecuencia}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-x-8 sm:gap-y-4 mt-4">
                    <RadioButton2
                      id="checkboxLunes"
                      name="dias"
                      value="Lunes"
                      checked={diasSeleccionados === 'Lunes'}
                      label="Lunes"
                      onChange={handleDiaChange}
                    />
                    <RadioButton2
                      id="checkboxMartes"
                      name="dias"
                      value="Martes"
                      checked={diasSeleccionados === 'Martes'}
                      label="Martes"
                      onChange={handleDiaChange}
                    />
                    <RadioButton2
                      id="checkboxMiercoles"
                      name="dias"
                      value="Miércoles"
                      checked={diasSeleccionados === 'Miércoles'}
                      label="Miércoles"
                      onChange={handleDiaChange}
                    />
                    <RadioButton2
                      id="checkboxJueves"
                      name="dias"
                      value="Jueves"
                      checked={diasSeleccionados === 'Jueves'}
                      label="Jueves"
                      onChange={handleDiaChange}
                    />
                    <RadioButton2
                      id="checkboxViernes"
                      name="dias"
                      value="Viernes"
                      checked={diasSeleccionados === 'Viernes'}
                      label="Viernes"
                      onChange={handleDiaChange}
                    />
                    <RadioButton2
                      id="checkboxSabado"
                      name="dias"
                      value="Sábado"
                      checked={diasSeleccionados === 'Sábado'}
                      label="Sábado"
                      onChange={handleDiaChange}
                    />
                    <span className="text-red-500 text-sm sm:col-span-3">
                      {errors.dias}
                    </span>
                  </div>
                  
                  <div className="w-full h-full flex flex-row items-center flex-wrap">
                   

                   <div className="w-full flex md:justify-end justify-center p-5 items-center flex-wrap gap-x-4 ">
                
                   <BotonSegundo Text="Siguiente" type="submit" />
                   </div>
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