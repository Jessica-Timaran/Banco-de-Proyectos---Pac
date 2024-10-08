import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Input.jsx';
import BotonSegundo from '../../Components/BotonSegundo.jsx';
import Img2 from '../../../public/Img/usuario.png';
import LayoutFormulario from "../../Layouts/LayoutFormulario";

const UpdatePassword = () => {
    const navigate = useNavigate(); // Para manejar la navegación

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState(''); // Estado para el color del mensaje
    const [showPassword, setShowPassword] = useState({ new: false, confirm: false });
    const [token, setToken] = useState(''); // Estado para el token
    const [email, setEmail] = useState(''); // Estado para el email

    // Extraer el token y el email de la URL
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const email = urlParams.get('email');

        if (token && email) {
            setToken(token);
            setEmail(email);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones de la contraseña
        if (newPassword.length < 8) {
            setMessage('La contraseña debe tener al menos 8 caracteres.');
            setMessageColor('text-red-500'); // Cambia el color a rojo
            return;
        }
        if (!/[A-Z]/.test(newPassword)) {
            setMessage('La contraseña debe contener al menos una letra mayúscula.');
            setMessageColor('text-red-500'); // Cambia el color a rojo
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage('Las contraseñas no coinciden.');
            setMessageColor('text-red-500'); // Cambia el color a rojo
            return;
        }

        // Solicitud de actualización de contraseña
        try {
            const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/aprendiz/update-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, email, newPassword }), // Incluye el token y el email
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('Contraseña actualizada exitosamente.');
                setMessageColor('text-green-500'); // Cambia el color a verde
                // Redirige a la interfaz de inicio después de un breve retraso
                setTimeout(() => navigate('/Principal/Inicio'), 2000); // Espera 2 segundos
            } else {
                setMessage(result.error || 'Error al actualizar la contraseña.');
                setMessageColor('text-red-500'); // Cambia el color a rojo
            }
        } catch (error) {
            setMessage('Error al actualizar la contraseña.');
            setMessageColor('text-red-500'); // Cambia el color a rojo
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    return (
        <LayoutFormulario>
        <div className="flex justify-center items-center">
   
        <div className="bg-white rounded-lg w-[40%] flex flex-col items-center max-[768px]:w-[70%]   ">
                    <div className="logo-sena flex items-center justify-center w-56 h-20 sm:w-72 sm:h-24 lg:w-80 lg:h-28 2xl:w-96 2xl:h-32 bg-[#2eb694] rounded-bl-[40px] rounded-br-[40px] mb-[15%] ">
                    <img
                className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                src="/Img/Logo.png"
                width="10"
                height="10"
                alt="Logo Sena"
              />
            </div>

                    <h2 className="text-[33px] font-bold text-gray-800 text-center ">
                        Actualizar Contraseña
                    </h2>
                    <form onSubmit={handleSubmit} className="mt-6" id="update-password-form">
                    <div className="mb-4 relative w-[20em] mt-[10px]">
                            <label htmlFor="new-password" className="block text-gray-700 font-semibold">
                                Nueva Contraseña
                            </label>
                    <Input
                        type={showPassword.new ? "text" : "password"}
                        Text=""
                        placeholder="Nueva Contraseña:"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <i
                        className={`bx ${showPassword.new ? "bx-hide" : "bx-show"} cursor-pointer absolute right-3 top-3/4 transform -translate-y-2/4`}
                        onClick={() => togglePasswordVisibility('new')}
                    ></i>
                </div>

                <div className="mb-4 relative w-[20em] mt-[5px]">
                            <label htmlFor="confirm-password" className="block text-gray-700 font-semibold">
                                Confirmar Contraseña
                            </label>
                    <Input
                        type={showPassword.confirm ? "text" : "password"}
                        Text=""
                        placeholder="Confirmar Contraseña:"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <i
                        className={`bx ${showPassword.confirm ? "bx-hide" : "bx-show"} cursor-pointer absolute right-3 top-3/4 transform -translate-y-2/4`}
                        onClick={() => togglePasswordVisibility('confirm')}
                    ></i>
                </div>

                        <div className="flex items-center justify-center mt-[10px]">
                            <BotonSegundo
                                Text="Recuperar"
                                type="submit"
                            />
                        </div>
                        <p id="message" className={`mt-4 text-center ${messageColor}`}>
                            {message}
                        </p>
                    </form>
                </div>
                <div className="bg-white p-8 rounded-lg w-[60%] flex max-[768px]:hidden">
                    <img src={Img2} className=" " />
                </div>
            </div>
 
          </LayoutFormulario>
    );
};

export default UpdatePassword;
