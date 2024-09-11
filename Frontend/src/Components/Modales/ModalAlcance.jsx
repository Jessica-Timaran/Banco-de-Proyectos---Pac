import { useState } from 'react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import BotonSegundo from '../BotonSegundoModal';
import PropTypes from 'prop-types';

const Alcance = ({ onClose, onAddalcance, onEditalcance, alcance, actionType }) => {
  const [alcanceName, setAlcanceName] = useState(alcance?.name || '');
  const [estado] = useState(alcance?.estado || 'Activo');

  const handleSubmit = (e) => {
    e.preventDefault();
    const alcanceData = { name: alcanceName, estado };

    if (actionType === 'add') {
      onAddalcance(alcanceData);
    } else if (actionType === 'edit') {
      onEditalcance(alcanceData);
    }

    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} static={true} className="z-[100]">
      <DialogPanel className="sm:max-w-md">
      <button
          type="button"
          className="absolute right-4 top-4 p-2 bg-transparent border-none"
          onClick={onClose}
          aria-label="Close"
        >
          <i className="fas fa-times size-5" aria-hidden={true}></i>
        </button>
        <form action="#" method="POST" className="space-y-4" onSubmit={handleSubmit}>
          <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            {actionType === 'add' ? 'Añade un nuevo Alcance' : actionType === 'edit' ? 'Editar alcance' : 'Borrar alcance'}
          </h4>

          {actionType !== 'Delete' && (
            <div className="flex flex-col p-[5%] space-y-6">
              <Input2
                id="nombrealcance"
                type="text"
                placeholder="Alcance"
                value={alcanceName}
                onChange={(e) => setAlcanceName(e.target.value)}
                Text="Alcance:"
              />
            </div>
          )}

          <BotonSegundo text={actionType === 'add' ? 'Agregar' : 'Guardar'} id="guardarBtn" />
        </form>
      </DialogPanel>
    </Dialog>
  );
};

Alcance.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddalcance: PropTypes.func.isRequired,
  onEditalcance: PropTypes.func.isRequired,
  alcance: PropTypes.shape({
    name: PropTypes.string,
    estado: PropTypes.string,
  }),
  actionType: PropTypes.string.isRequired,
};

export default Alcance;