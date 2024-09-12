import { useState, useEffect } from 'react';
import { RiCloseLine } from '@remixicon/react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import BotonSegundo from '../BotonSegundoModal';
import SelectBoxArea from '../SelectBoxArea';
import PropTypes from 'prop-types';

// Función para obtener áreas
const fetchArea = async () => {
    try {
        const response = await fetch("http://localhost:4000/api/areas");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.map((area) => ({ value: area.id, label: area.area }));
    } catch (error) {
        console.error("Error al obtener áreas:", error);
        return [];
    }
};

export default function TipoArea({ onClose }) {
    const [area, setAreaOptions] = useState([]);

    // Obtener áreas al montar el componente
    useEffect(() => {
        const loadAreas = async () => {
            const areas = await fetchArea();
            setAreaOptions(areas);
        };
        loadAreas();
    }, []);

    return (
        <Dialog
            open={true}
            onClose={onClose}
            static={true}
            className="z-[100]"
        >
            <DialogPanel className="sm:max-w-md">
                <button
                    type="button"
                    className="absolute right-4 top-4 p-2 bg-transparent border-none text-tremor-content-subtle hover:text-tremor-content hover:bg-tremor-background-subtle dark:text-dark-tremor-content-subtle dark:hover:bg-dark-tremor-background-subtle dark:hover:text-tremor-content"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <RiCloseLine className="size-5" aria-hidden={true} />
                </button>
                <form action="#" method="POST" className="space-y-4">
                    <div className="flex flex-col p-[5%] space-y-6">
                        <div className="col-span-full sm:col-span-3 space-y-2">
                            <div>
                                <SelectBoxArea
                                    id="area-select"
                                    Text="Seleccione un Area"
                                    options={area}
                                />
                            </div>
                            <div>
                                <Input2
                                    id="nombreArea"
                                    type="text"
                                    placeholder="Area"
                                    Text="Area:"
                                />
                            </div>
                        </div>
                    </div>
                    <BotonSegundo text="Agregar" id="guardarBtn" />
                </form>
            </DialogPanel>
        </Dialog>
    );
}

TipoArea.propTypes = {
    onClose: PropTypes.func.isRequired,
  };
