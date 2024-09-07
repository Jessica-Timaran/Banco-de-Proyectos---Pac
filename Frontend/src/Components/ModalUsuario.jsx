import React, { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import Input from './Input';  // Asegúrate de que la ruta de importación sea correcta
import BotonSegundo from './BotonSegundo';
import RadioButton from '../Components/RadioButton';
import SelectBoxTI from './SelectBoxTI';
import SelectBoxRol from './SelectBoxRol';


export default function ModalUsuario() {
    const [isOpen, setIsOpen] = useState(false);
    const [tipoDocumento, setTipoDocumento] = useState('');
    const [nombreUsu, setNombreUsu] = useState('');
    const [numeroDoc, setNumeroDoc] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [celular, setCelular] = useState('');
    const [tipoRol, setTipoRol] = useState('');
    const [estado, setEstado] = useState('');
  
    const [errors, setErrors] = useState({});

    const handleTipoDocumentoChange = (event) => {
        setTipoDocumento(event.target.value);
    };

    const handleNumericInputChange = (setter) => (event) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) { // Verifica si solo contiene números
            setter(value);
        }
    };

    const handleTipoRolChange = (event) => {
        setTipoRol(event.target.value);
        if (event.target.value) {
            setErrors((prevErrors) => ({ ...prevErrors, tipoRol: undefined }));
        }
    };

    const handleEstadoChange = (nuevoEstado) => {
        setEstado(nuevoEstado);
        if (nuevoEstado) {
            setErrors((prevErrors) => ({ ...prevErrors, estado: undefined }));
        }
    };

    const validateFields = () => {
        const newErrors = {};

        if (!nombreUsu.trim()) {
            newErrors.nombreUsu = 'El nombre es obligatorio.';
        }

        if (!tipoDocumento) {
            newErrors.tipoDocumento = 'Seleccione un tipo de documento.';
        }

        if (!numeroDoc.trim()) {
            newErrors.numeroDoc = 'El número de documento es obligatorio.';
        } else if (numeroDoc.length < 7 || numeroDoc.length > 10) {
            newErrors.numeroDoc = 'El número de documento no es valido.';
        }

        if (!correo.trim()) {
            newErrors.correo = 'El correo electrónico es obligatorio.';
        } else if (!/\S+@\S+\.\S+/.test(correo)) {
            newErrors.correo = 'El correo electrónico no es válido.';
        }

        if (!contrasena.trim()) {
            newErrors.contrasena = 'La contraseña es obligatoria.';
        } else if (contrasena.length < 6) {
            newErrors.contrasena = 'La contraseña debe tener al menos 6 caracteres.';
        }

        if (!tipoRol) {
            newErrors.tipoRol = 'Seleccione un rol.';
        }

        if (!celular.trim()) {
            newErrors.celular = 'El número de celular es obligatorio.';
        } else if (celular.length < 10 || celular.length > 12) {
            newErrors.celular = 'El número de celular no es válido.';
        }

        if (!estado) {
            newErrors.estado = 'Seleccione un estado.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateFields()) {
            console.log('Datos válidos. Enviando formulario...');
            setIsOpen(false);
        } else {
            console.log('Errores en el formulario:', errors);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center py-36">
                <button
                    type="button"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => setIsOpen(true)}
                >
                    Show Dialog
                </button>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-white w-full max-w-2xl mx-auto rounded-lg shadow-lg p-6">
                        <div className="absolute right-4 top-4">
                            <button
                                type="button"
                                className="text-gray-600 hover:text-gray-800"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close"
                            >
                                <RiCloseLine className="w-6 h-6" aria-hidden={true} />
                            </button>
                        </div>
                        <h4 className="text-xl font-semibold text-center mb-4">Modal Title</h4>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <h4 className="font-semibold text-gray-800">Añade nuevo usuario</h4>
                            <p className="mt-2 text-gray-600 leading-6">
                                Por favor llene todos los datos del usuario
                            </p>
                            <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                                <div className="col-span-full sm:col-span-3 space-y-4">
                                    <div>
                                        <Input
                                            id="nombreUsu"
                                            type="text"
                                            placeholder="Nombre del usuario"
                                            Text="Nombre del usuario:"
                                            value={nombreUsu}
                                            onChange={(e) => setNombreUsu(e.target.value)}
                                            error={errors.nombreUsu}
                                        />
                                        {errors.nombreUsu && (
                                            <p className="text-red-500 text-sm">{errors.nombreUsu}</p>
                                        )}
                                    </div>

                                    <div>
                                        <SelectBoxTI
                                            id="tipoDocumento"
                                            Text="Tipo de Documento:"
                                            value={tipoDocumento}
                                            onChange={handleTipoDocumentoChange}
                                        />
                                        {errors.tipoDocumento && (
                                            <p className="text-red-500 text-sm">{errors.tipoDocumento}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Input
                                            id="numeroDoc"
                                            type="text"
                                            placeholder="Número de documento"
                                            Text="Número de documento:"
                                            value={numeroDoc}
                                            onChange={handleNumericInputChange(setNumeroDoc)}
                                            error={errors.numeroDoc}
                                        />
                                        {errors.numeroDoc && (
                                            <p className="text-red-500 text-sm">{errors.numeroDoc}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Input
                                            id="correo"
                                            type="email"
                                            placeholder="Correo"
                                            Text="Correo Electrónico:"
                                            value={correo}
                                            onChange={(e) => setCorreo(e.target.value)}
                                            error={errors.correo}
                                        />
                                        {errors.correo && (
                                            <p className="text-red-500 text-sm">{errors.correo}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="col-span-full sm:col-span-3 space-y-4">
                                    <div>
                                        <Input
                                            id="contrasena"
                                            type="password"
                                            placeholder="Contraseña"
                                            Text="Contraseña:"
                                            value={contrasena}
                                            onChange={(e) => setContrasena(e.target.value)}
                                            error={errors.contrasena}
                                        />
                                        {errors.contrasena && (
                                            <p className="text-red-500 text-sm">{errors.contrasena}</p>
                                        )}
                                    </div>

                                    <SelectBoxRol
                                        id="tipoRol"
                                        text="Seleccione un rol:"
                                        value={tipoRol}
                                        onChange={handleTipoRolChange}
                                    />
                                    {errors.tipoRol && (
                                        <p className="text-red-500 text-sm">{errors.tipoRol}</p>
                                    )}

                                    <div>
                                        <Input
                                            id="celular"
                                            type="text"
                                            placeholder="Celular"
                                            Text="Celular:"
                                            value={celular}
                                            onChange={handleNumericInputChange(setCelular)}
                                            error={errors.celular}
                                        />
                                        {errors.celular && (
                                            <p className="text-red-500 text-sm">{errors.celular}</p>
                                        )}
                                    </div>

                                    <div>
                                        <div className="space-y-5">
                                            <span className="text-gray-800 font-medium">Selecciona una opción:</span>
                                            <div className="flex mt-2 space-x-4">
                                                <RadioButton
                                                    Text="Activo"
                                                    id="estadoActivo"
                                                    checked={estado === 'Activo'}
                                                    onChange={() => handleEstadoChange('Activo')}
                                                />
                                                <RadioButton
                                                    Text="Inactivo"
                                                    id="estadoInactivo"
                                                    checked={estado === 'Inactivo'}
                                                    onChange={() => handleEstadoChange('Inactivo')}
                                                />
                                            </div>
                                            {errors.estado && (
                                                <p className="text-red-500 text-sm">{errors.estado}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <BotonSegundo Text="Agregar" id="guardarBtn" />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}