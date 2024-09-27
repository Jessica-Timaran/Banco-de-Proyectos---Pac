import { RiCloseLine } from '@remixicon/react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import BotonSegundo from '../BotonSegundoModal';
import PropTypes from 'prop-types';
import SelectBoxArea from '../SelectBoxAlcance';
import useAlcanceForm from '../../../hooks/SuperAdmin/useAlcanceForm';

const Alcance = ({ onClose, actionType }) => {
  const { formState, categories, errors, handleInputChange, handleSubmit } = useAlcanceForm();
  const { alcanceName, selectedCategory } = formState;

  const handleSelectChange = (e) => {
      handleInputChange({ target: { name: 'selectedCategory', value: e.target.value } });
  };

  const handleSubmitWrapper = async (e) => {
      const isValid = await handleSubmit(e); // Espera la validación
      if (isValid) {
          onClose(); // Solo cierra el modal si la validación es correcta
      }
  };

  return (
      <Dialog open={true} onClose={onClose} static={true} className="z-[100]">
          <DialogPanel className="sm:max-w-md">
              <button
                  type="button"
                  className="absolute right-4 top-4 p-2 bg-transparent border-none text-tremor-content-subtle hover:text-tremor-content hover:bg-tremor-background-subtle"
                  onClick={onClose}
                  aria-label="Close"
              >
                  <RiCloseLine className="size-5" aria-hidden={true} />
              </button>
              <form className="space-y-4" onSubmit={handleSubmitWrapper}> {/* Aquí usas handleSubmitWrapper */}
                  <h4 className="font-semibold text-tremor-content-strong">
                      {actionType === 'add' ? 'Añade un nuevo Alcance' : 'Editar alcance'}
                  </h4>

                  <Input2
                      id="nombrealcance"
                      name="alcanceName"
                      type="text"
                      placeholder="Descripción del alcance"
                      value={alcanceName}
                      onChange={handleInputChange}
                      Text="Descripción:"
                  />
                  {errors.alcanceName && <p className="text-red-500">{errors.alcanceName}</p>} {/* Mensaje de error para el input */}

                  <SelectBoxArea
                      id="categoria"
                      Text="Selecciona una categoría:"
                      options={categories.map(category => ({
                          idcategoriasalcance: category.idcategoriasalcance,
                          categoria: category.nombre,
                      }))}
                      value={selectedCategory}
                      onChange={handleSelectChange}
                   // Asegúrate de que el componente maneje el prop error
                  />
                  {errors.selectedCategory && <p className="text-red-500">{errors.selectedCategory}</p>} {/* Mensaje de error para el select */}

  

                  <BotonSegundo text={actionType === 'add' ? 'Agregar' : 'Guardar'} />
              </form>
          </DialogPanel>
      </Dialog>
  );
};
Alcance.propTypes = {
  onClose: PropTypes.func.isRequired,
  actionType: PropTypes.string.isRequired,
};

export default Alcance;
