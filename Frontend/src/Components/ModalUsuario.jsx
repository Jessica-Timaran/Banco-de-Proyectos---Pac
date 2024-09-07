import React, { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import Input from './Input'; 
import BotonSegundo from './BotonSegundo';
import RadioButton from '../Components/RadioButton';
import SelectBoxTI from './SelectBoxTI';
import SelectBoxRol from './SelectBoxRol';

export default function ModalUsuario() {
    const [isOpen, setIsOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        tipoDocumento: '',
        nombreUsu: '',
        numeroDoc: '',
        correo: '',
        contrasena: '',
        celular: '',
        tipoRol: '',
        estado: '' // Se inicializa como cadena vacía
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleRadioChange = (value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            estado: value // Actualiza el estado con el valor del radio button seleccionado
        }));
    };

    const validateFields = async () => {
        const newErrors = {};
        let valid = true;

        // Validación del nombre
        if (!formValues.nombreUsu.trim()) {
            newErrors.nombreUsu = 'El nombre es obligatorio.';
            valid = false;
        }

        // Validación del tipo de documento
        if (!formValues.tipoDocumento) {
            newErrors.tipoDocumento = 'Seleccione un tipo de documento.';
            valid = false;
        }

        // Validación del número de documento
        if (!formValues.numeroDoc.trim()) {
            newErrors.numeroDoc = 'El número de documento es obligatorio.';
            valid = false;
        } else if (formValues.numeroDoc.length < 7 || formValues.numeroDoc.length > 10) {
            newErrors.numeroDoc = 'El número de documento no es válido.';
            valid = false;
        }

        // Validación del correo
        if (!formValues.correo.trim()) {
            newErrors.correo = 'El correo electrónico es obligatorio.';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formValues.correo)) {
            newErrors.correo = 'El correo electrónico no es válido.';
            valid = false;
        }

        // Validación de la contraseña
        if (!formValues.contrasena.trim()) {
            newErrors.contrasena = 'La contraseña es obligatoria.';
            valid = false;
        } else if (formValues.contrasena.length < 6) {
            newErrors.contrasena = 'La contraseña debe tener al menos 6 caracteres.';
            valid = false;
        }

        // Validación del rol
        if (!formValues.tipoRol) {
            newErrors.tipoRol = 'Seleccione un rol.';
            valid = false;
        }

        // Validación del celular
        if (!formValues.celular.trim()) {
            newErrors.celular = 'El número de celular es obligatorio.';
            valid = false;
        } else if (formValues.celular.length < 10 || formValues.celular.length > 12) {
            newErrors.celular = 'El número de celular no es válido.';
            valid = false;
        }

        // Validación del estado
        if (formValues.estado === '') {
            newErrors.estado = 'Seleccione un estado.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = await validateFields();

        if (isValid) {
            try {
                const response = await fetch('http://localhost:4000/api/agregarpersona', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nombre: formValues.nombreUsu,
                        tipodocumento: formValues.tipoDocumento,
                        numerodocumento: formValues.numeroDoc,
                        telefono: formValues.celular,
                        correo: formValues.correo,
                        contraseña: formValues.contrasena,
                        idrol: formValues.tipoRol,
                        estado: formValues.estado === 'Activo',
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setSuccessMessage('Registro exitoso');
                    console.log('Persona registrada con éxito:', data);
                    setIsOpen(false);

                    // Restablecer valores del formulario
                    setFormValues({
                        tipoDocumento: '',
                        nombreUsu: '',
                        numeroDoc: '',
                        correo: '',
                        contrasena: '',
                        celular: '',
                        tipoRol: '',
                        estado: ''
                    });
                } else {
                    console.error('Error al registrar persona:', response.statusText);
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
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
                        <h4 className="text-xl font-semibold text-center mb-4">Añade nuevo usuario</h4>
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
                                            value={formValues.nombreUsu}
                                            onChange={handleChange}
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
                                            value={formValues.tipoDocumento}
                                            onChange={handleChange}
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
                                            value={formValues.numeroDoc}
                                            onChange={handleChange}
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
                                            value={formValues.correo}
                                            onChange={handleChange}
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
                                            value={formValues.contrasena}
                                            onChange={handleChange}
                                            error={errors.contrasena}
                                        />
                                        {errors.contrasena && (
                                            <p className="text-red-500 text-sm">{errors.contrasena}</p>
                                        )}
                                    </div>

                                    <SelectBoxRol
                                        id="tipoRol"
                                        text="Seleccione un rol:"
                                        value={formValues.tipoRol}
                                        onChange={(value) => setFormValues({ ...formValues, tipoRol: value })}
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
                                            value={formValues.celular}
                                            onChange={handleChange}
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
                                                    id="Activo"
                                                    name="estado"
                                                    checked={formValues.estado === 'Activo'}
                                                    onChange={handleRadioChange}
                                                />
                                                <RadioButton
                                                    Text="Inactivo"
                                                    id="Inactivo"
                                                    name="estado"
                                                    checked={formValues.estado === 'Inactivo'}
                                                    onChange={handleRadioChange}
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
