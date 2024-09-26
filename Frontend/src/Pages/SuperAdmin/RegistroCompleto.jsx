import { useState, useEffect } from 'react';
import Layoutprincipal from '../../layouts/LayoutPrincipal';
import Layoutcontenido5 from '../../Layouts/Layoutcontenido5';
import Input2 from '../../Components/Input';
import { CalloutA } from '../../Components/Callout';
import BotonSegundo from '../../Components/BotonSegundo';
import Loader from '../../Components/Loader';
import axios from 'axios';
import { ModalR } from '../../Components/ModalR';

// Componente principal para la tabla de áreas
export default function RegistroCompleto() {
  // Estados para manejar la carga, reinicio, modal y datos del formulario
  const [loading, setLoading] = useState(true);
  const [resetting, setResetting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    area: '',
    tiposDeArea: [''],
    items: [''],
    categoriaObjetivos: '',
    objetivos: [''],
    categoriaAlcance: '',
    alcances: ['']
  });
  const [errors, setErrors] = useState({});

  // Función para validar campos
  const validateField = (name, value) => {
    if (value.length < 2) {
      return 'Debe contener al menos 2 caracteres';
    }
    if (name.startsWith('tiposDeArea') && !/\d/.test(value)) {
      return 'Debe contener al menos un número';
    }
    if (name.startsWith('alcances') && value.length > 100) {
      return 'No puede exceder 100 caracteres';
    }
    return '';
  };

  // Manejador de cambios en los campos del formulario
  const handleChange = (e, field, index = null) => {
    const { value } = e.target;
    setFormData(prevData => {
      let newData;
      if (index !== null) {
        const newArray = [...prevData[field]];
        newArray[index] = value;
        newData = { ...prevData, [field]: newArray };
      } else {
        newData = { ...prevData, [field]: value };
      }
      
      const fieldName = index !== null ? `${field}[${index}]` : field;
      const error = validateField(fieldName, value);
      setErrors(prevErrors => ({
        ...prevErrors,
        [fieldName]: error
      }));

      return newData;
    });
  };

  // Función para agregar un nuevo campo a un array en el formulario
  const addField = (field) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: [...prevData[field], '']
    }));
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    Object.entries(formData).forEach(([field, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          const error = validateField(`${field}[${index}]`, item);
          if (error) newErrors[`${field}[${index}]`] = error;
        });
      } else {
        const error = validateField(field, value);
        if (error) newErrors[field] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert('Por favor, corrija los errores antes de enviar el formulario.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/registerComplete', formData);
      console.log('Respuesta del servidor:', response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error al registrar:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      alert('Error al registrar. Por favor, intente de nuevo.');
    }
  };

  // Función para reiniciar el formulario
  const resetForm = () => {
    setResetting(true);
    setTimeout(() => {
      setFormData({
        area: '',
        tiposDeArea: [''],
        items: [''],
        categoriaObjetivos: '',
        objetivos: [''],
        categoriaAlcance: '',
        alcances: ['']
      });
      setErrors({});
      setResetting(false);
    }, 1000); // Muestra el loader por 1 segundo
  };

  // Función para cerrar el modal
  const closeModal = (shouldReset = false) => {
    setIsModalOpen(false);
    if (shouldReset) {
      resetForm();
    }
  };

  // Efecto para simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Renderizado condicional para mostrar el loader
  if (loading || resetting) {
    return (
      <div id="loader" className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  // Renderizado principal del componente
  return (
    <Layoutprincipal title="Registro proyecto">
      <div className="flex justify-center items-center my-4 px-4 sm:px-6 lg:px-8">
        <CalloutA variant="warning" title="Important Notice">
          POR FAVOR LLENE TODOS LOS DATOS PARA REALIZAR UN REGISTRO COMPLETO
        </CalloutA>
      </div>
      <Layoutcontenido5 title="Registro completo">
        <div className="sm:mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="col-span-1">
                <Input2
                  placeholder="Área"
                  type="text"
                  Text="Área"
                  value={formData.area}
                  onChange={(e) => handleChange(e, 'area')}
                  error={errors.area}
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Tipo de área</label>
                {formData.tiposDeArea.map((tipo, index) => (
                  <div key={index} className="mb-2">
                    <Input2
                      placeholder={`Tipo de área ${index + 1}`}
                      type="text"
                      value={tipo}
                      onChange={(e) => handleChange(e, 'tiposDeArea', index)}
                      error={errors[`tiposDeArea[${index}]`]}
                    />
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={() => addField('tiposDeArea')} 
                  className="text-tremor-brand hover:underline text-sm text-gray-500"
                >
                  Agregar tipo de área
                </button>
              </div>

              <div className="col-span-1 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 ">Items</label>
                {formData.items.map((item, index) => (
                  <div key={index} className="mb-2">
                    <Input2
                      placeholder={`Item ${index + 1}`}
                      type="text"
                      value={item}
                      onChange={(e) => handleChange(e, 'items', index)}
                      error={errors[`items[${index}]`]}
                    />
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={() => addField('items')} 
                  className="text-tremor-brand hover:underline text-sm text-gray-500"
                >
                  Agregar item
                </button>
              </div>
            </div>

            <div className="border-t border-gray-300 my-6"></div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="col-span-1">
                <Input2
                  placeholder="Categoría Objetivos"
                  type="text"
                  Text="Categoría Objetivos"
                  value={formData.categoriaObjetivos}
                  onChange={(e) => handleChange(e, 'categoriaObjetivos')}
                  error={errors.categoriaObjetivos}
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 ">Objetivos</label>
                {formData.objetivos.map((objetivo, index) => (
                  <div key={index} className="mb-2">
                    <Input2
                      placeholder={`Objetivo ${index + 1}`}
                      type="text"
                      value={objetivo}
                      onChange={(e) => handleChange(e, 'objetivos', index)}
                      error={errors[`objetivos[${index}]`]}
                    />
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={() => addField('objetivos')} 
                  className="text-tremor-brand hover:underline text-sm text-gray-500"
                >
                  Agregar objetivo
                </button>
              </div>

              <div className="col-span-1">
                <Input2
                  placeholder="Categoría Alcance"
                  type="text"
                  Text="Categoría Alcance"
                  value={formData.categoriaAlcance}
                  onChange={(e) => handleChange(e, 'categoriaAlcance')}
                  error={errors.categoriaAlcance}
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Alcance</label>
                {formData.alcances.map((alcance, index) => (
                  <div key={index} className="mb-2">
                    <Input2
                      placeholder={`Alcance ${index + 1}`}
                      type="text"
                      value={alcance}
                      onChange={(e) => handleChange(e, 'alcances', index)}
                      error={errors[`alcances[${index}]`]}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addField('alcances')}
                  className="text-tremor-brand hover:underline text-sm text-gray-500"
                >
                  Agregar alcance
                </button>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <BotonSegundo type="submit" Text="Añadir" />
            </div>
          </form>
        </div>
      </Layoutcontenido5>
      <ModalR 
        isOpen={isModalOpen} 
        closeDialog={() => closeModal(false)}
        onOkClick={() => closeModal(true)}
      />
    </Layoutprincipal>
  );
}