'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layoutprincipal from '../../layouts/LayoutPrincipal';
import Layoutcontenido5 from '../../Layouts/Layoutcontenido5';
import Input2 from '../../Components/Input'; 
import { CalloutA } from '../../Components/Callout';
import BotonSegundo from '../../Components/BotonSegundo';
import Loader from '../../Components/Loader'; 
import axios from 'axios'; 

export default function Example() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    area: '',
    categoryObjectives: '',
    categoryScopes: '',
  });

  const navigate = useNavigate();

  const [areas, setAreas] = useState(['']);
  const [items, setItems] = useState(['']);
  const [objectives, setObjectives] = useState(['']);
  const [scopes, setScopes] = useState(['']);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleDynamicChange = (setter) => (index) => (e) => {
    const { value } = e.target;
    setter((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const addInput = (setter, currentArray) => () => {
    if (currentArray.length < 5) {
      setter((prev) => [...prev, '']);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe y recargue la página

    try {
      // Guardar área
      if (formData.area) {
        await axios.post('http://localhost:4000/api/registerArea', { area: formData.area });
      }

      // Guardar categorías de objetivos
      if (formData.categoryObjectives) {
        await axios.post('http://localhost:4000/api/categoriasobjetivos', { nombre: formData.categoryObjectives });
      }

      // Guardar categorías de alcance
      if (formData.categoryScopes) {
        await axios.post('http://localhost:4000/api/categoriasalcance', { nombre: formData.categoryScopes });
      }

      // Guardar objetivos
      for (const objective of objectives) {
        if (objective) {
          await axios.post('http://localhost:4000/api/tipos-de-area', { descripcion: objective });
        }
      }

      // Guardar alcances
      for (const scope of scopes) {
        if (scope) {
          await axios.post('http://localhost:4000/api/alcance', { descripcion: scope });
        }
      }

      // Guardar items
      for (const item of items) {
        if (item) {
          await axios.post('http://localhost:4000/api/insertItem', { tipoArea: formData.area, itemName: item });
        }
      }

      alert('Datos guardados correctamente');
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      alert('Error al guardar los datos');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleGoBack = () => {
    navigate('/SuperAdmin/dashboard'); // Redirigir al dashboard
  };


  return (
    <Layoutprincipal title="Registro proyecto">
      <div className="flex justify-center items-center my-4">
        <CalloutA variant="warning" title="Noticia Importante">
          POR FAVOR LLENE TODOS LOS DATOS PARA REALIZAR UN REGISTRO COMPLETO
        </CalloutA>
      </div>
      {loading ? (
        <div id="loader" className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <>
        <div className='px-96'>
        <button
                onClick={handleGoBack}
                className="flex items-center text-black hover:text-Verde"
              >
                <i className="fas fa-arrow-left w-5 h-5 mr-2"></i>
                Volver
              </button>
              </div>
          <Layoutcontenido5 title="Registro completo">
            <div className="sm:mx-auto sm:max-w-x5">
              <form className="mt-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2">
                  <div className="col-span-1">
                    <Input2
                      placeholder="Área"
                      type="text"
                      Text="Área"
                      id="area"
                      value={formData.area}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Tipo de área</label>
                    {areas.map((area, index) => (
                      <div key={index} className="mb-2">
                        <Input2
                          placeholder={`Tipo de área ${index + 1}`}
                          type="text"
                          value={area}
                          onChange={handleDynamicChange(setAreas)(index)}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className={`text-tremor-brand hover:underline text-sm ${areas.length >= 5 ? 'text-gray-400 cursor-not-allowed' : ''}`}
                      onClick={addInput(setAreas, areas)}
                      disabled={areas.length >= 5}
                    >
                      + Agregar otro tipo de area
                    </button>
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Items</label>
                    {items.map((item, index) => (
                      <div key={index} className="mb-2">
                        <Input2
                          placeholder={`Item ${index + 1}`}
                          type="text"
                          value={item}
                          onChange={handleDynamicChange(setItems)(index)}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className={`text-tremor-brand hover:underline text-sm ${items.length >= 5 ? 'text-gray-400 cursor-not-allowed' : ''}`}
                      onClick={addInput(setItems, items)}
                      disabled={items.length >= 5}
                    >
                      + Agregar otro item
                    </button>
                  </div>
                </div>

                <div className="my-8 border-t border-gray-300"></div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2">
                  <div className="col-span-1">
                    <Input2
                      placeholder="Categoría Objetivos"
                      type="text"
                      Text="Categoría Objetivos"
                      id="categoryObjectives"
                      value={formData.categoryObjectives}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Objetivos</label>
                    {objectives.map((objective, index) => (
                      <div key={index} className="mb-2">
                        <Input2
                          placeholder={`Objetivo ${index + 1}`}
                          type="text"
                          value={objective}
                          onChange={handleDynamicChange(setObjectives)(index)}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className={`text-tremor-brand hover:underline text-sm ${objectives.length >= 5 ? 'text-gray-400 cursor-not-allowed' : ''}`}
                      onClick={addInput(setObjectives, objectives)}
                      disabled={objectives.length >= 5}
                    >
                      + Agregar otro objetivo
                    </button>
                  </div>

                  <div className="col-span-1">
                    <Input2
                      placeholder="Categoría Alcance"
                      type="text"
                      Text="Categoría Alcance"
                      id="categoryScopes"
                      value={formData.categoryScopes}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Alcances</label>
                    {scopes.map((scope, index) => (
                      <div key={index} className="mb-2">
                        <Input2
                          placeholder={`Alcance ${index + 1}`}
                          type="text"
                          value={scope}
                          onChange={handleDynamicChange(setScopes)(index)}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className={`text-tremor-brand hover:underline text-sm ${scopes.length >= 5 ? 'text-gray-400 cursor-not-allowed' : ''}`}
                      onClick={addInput(setScopes, scopes)}
                      disabled={scopes.length >= 5}
                    >
                      + Agregar otro alcance
                    </button>
                  </div>
                </div>

                <div className="flex justify-center items-center mt-12">
                  <BotonSegundo type="submit" Text="Crear" />
                </div>
              </form>
            </div>
          </Layoutcontenido5>
        </>
      )}
    </Layoutprincipal>
  );
}