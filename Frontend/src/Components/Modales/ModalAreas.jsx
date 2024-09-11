import { useState } from 'react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import BotonSegundo from '../BotonSegundoModal';
import PropTypes from 'prop-types';


const Areas = ({ onClose, onAddMember, onEditMember, onDeleteMember, user, actionType }) => {
  const [areaName, setAreaName] = useState(user?.name || '');
  const [estado,] = useState(user?.estado || 'Activo');

  const handleSubmit = (e) => {
    e.preventDefault();
    const area = { name: areaName, estado };

    if (actionType === 'add') {
      onAddMember(area);
    } else if (actionType === 'edit') {
      onEditMember(area);
    } else if (actionType === 'delete') {
      onDeleteMember(area);
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
            {actionType === 'add' ? 'Añade una nueva Area' : actionType === 'edit' ? 'Editar Area' : 'Borrar Area'}
          </h4>

          {actionType !== 'delete' && (
            <div className="flex flex-col p-[5%] Flex-box space-y-6">
              <Input2
                id="nombreArea"
                type="text"
                placeholder="Area"
                value={areaName}
                onChange={(e) => setAreaName(e.target.value)}
                Text="Area:"
              />
            </div>
          )}

          <BotonSegundo text="Agregar" id="guardarBtn" />
        </form>
      </DialogPanel>
    </Dialog>
  );
};

Areas.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddMember: PropTypes.func.isRequired,
  onEditMember: PropTypes.func.isRequired,
  onDeleteMember: PropTypes.func.isRequired,
  user: PropTypes.func.isRequired,
  actionType: PropTypes.func.isRequired,
}

export default Areas;