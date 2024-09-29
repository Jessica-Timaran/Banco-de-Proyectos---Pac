import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Input.jsx';
import BotonSegundo from '../../Components/BotonSegundo.jsx';
import Img2 from '../../../public/Img/usuario.png';

const UpdatePassword = () => {
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');
    const [showPassword, setShowPassword] = useState({ new: false, confirm: false });
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');

    // Extraer el token y el email de la URL
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenParam = urlParams.get('token');
        const emailParam = urlParams.get('email');

        if (tokenParam && emailParam) {
            setToken(tokenParam);
            setEmail(emailParam);
        } else {
            // Manejar el caso en que no se proporcionen token o email
            setMessage('Enlace inválido. Por favor, solicite un nuevo enlace de recuperación.');
            setMessageColor('text-red-500');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones de la contraseña
        if (newPassword.length < 8) {
            setMessage('La contraseña debe tener al menos 8 caracteres.');
            setMessageColor('text-red-500');
            return;
        }
        if (!/[A-Z]/.test(newPassword)) {
            setMessage('La contraseña debe contener al menos una letra mayúscula.');
            setMessageColor('text-red-500');
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage('Las contraseñas no coinciden.');
            setMessageColor('text-red-500');
            return;
        }

        // Solicitud de actualización de contraseña
        try {
            const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/aprendiz/update-password', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token, email, newPassword }),
            });
      
            const result = await response.json();
      
            if (response.ok) {
              setMessage('Contraseña actualizada exitosamente.');
              setMessageColor('text-green-500');
              setTimeout(() => navigate('/Principal/Inicio'), 2000);
            } else {
              setMessage(result.error || 'Error al actualizar la contraseña.');
              setMessageColor('text-red-500');
              console.error('Error details:', result);
            }
          } catch (error) {
            setMessage('Error de red al actualizar la contraseña.');
            setMessageColor('text-red-500');
            console.error('Network error:', error);
          }
        };

    const togglePasswordVisibility = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    return (
        <div className="flex justify-center">
            <div className="w-[100em] flex column items-center">
                <div className="bg-white rounded-lg w-[40%] flex flex-col items-center">
                    <div className="logo-sena flex m-auto items-center justify-center w-56 h-20 sm:w-72 sm:h-24 lg:w-80 lg:h-28 2xl:w-96 2xl:h-32 bg-[#A3E784] rounded-bl-[40px] rounded-br-[40px]">
                        <img
                            className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                            src="/public/Img/logo.png"
                            alt="Logo Sena"
                        />
                    </div>
                    <h2 className="text-[33px] font-bold text-gray-800 text-center mt-[10%]">
                        Actualizar Contraseña
                    </h2>
                    <form onSubmit={handleSubmit} className="mt-6" id="update-password-form">
                        <div className="mb-4 relative w-[20em] mt-[10px]">
                            <label htmlFor="new-password" className="block text-gray-700 font-semibold">
                                Nueva Contraseña
                            </label>
                            <Input
                                type={showPassword.new ? 'text' : 'password'}
                                id="new-password"
                                placeholder="Nueva Contraseña"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <i
                                className={`bx ${showPassword.new ? 'bx-show' : 'bx-hide'} absolute right-2 top-[55px] transform -translate-y-1/2 cursor-pointer`}
                                onClick={() => togglePasswordVisibility('new')}
                            ></i>
                        </div>

                        <div className="mb-4 relative w-[20em] mt-[5px]">
                            <label htmlFor="confirm-password" className="block text-gray-700 font-semibold">
                                Confirmar Contraseña
                            </label>
                            <Input
                                type={showPassword.confirm ? 'text' : 'password'}
                                id="confirm-password"
                                placeholder="Confirmar Contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <i
                                className={`bx ${showPassword.confirm ? 'bx-show' : 'bx-hide'} absolute right-2 top-[55px] transform -translate-y-1/2 cursor-pointer`}
                                onClick={() => togglePasswordVisibility('confirm')}
                            ></i>
                        </div>

                        <div className="flex items-center justify-center mt-[10px]">
                            <BotonSegundo
                                Text="Actualizar Contraseña"
                                type="submit"
                            />
                        </div>
                        <p id="message" className={`mt-4 text-center ${messageColor}`}>
                            {message}
                        </p>
                    </form>
                </div>
                <div className="bg-white p-8 rounded-lg w-[60%]">
                    <img src={Img2} className="w-[80em] h-[50%]" alt="Imagen de usuario" />
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword;