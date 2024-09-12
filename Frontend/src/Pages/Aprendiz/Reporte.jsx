import React, { useState, useRef } from 'react';
import TextArea from '../../Components/TextArea.jsx';
import LayoutPrincipal from '../../layouts/LayoutPrincipal.jsx';
import Layoutcontenido3 from '../../Layouts/Layoutcontenido3.jsx';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import Input from '../../Components/Input.jsx';
import Modal from '../../Components/Modal.jsx';
import ButtonComponent from '../../Components/Botonpdf.jsx';

const EmailForm = () => {
    const [fromEmail, setFromEmail] = useState('');
    const [toEmail, setToEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
  
    // Estados de error
    const [errors, setErrors] = useState({
        toEmail: '',
        subject: '',
        message: '',
    });

    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!toEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(toEmail)) {
            newErrors.toEmail = 'Por favor, ingrese un correo electrónico válido.';
            isValid = false;
        }
        if (!subject) {
            newErrors.subject = 'El asunto es requerido.';
            isValid = false;
        }
        if (!message) {
            newErrors.message = 'El mensaje es requerido.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return; // Si la validación falla, no continuar

        const formData = new FormData();
        formData.append('fromEmail', fromEmail);
        formData.append('toEmail', toEmail);
        formData.append('subject', subject);
        formData.append('message', message);
        if (file) {
            formData.append('file', file);
        }

        try {
            const response = await fetch('http://localhost:4000/api/send-email', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                setModalMessage('Correo enviado con éxito');
                setModalOpen(true);
                setTimeout(() => {
                    navigate('/Aprendiz/VistaProyectos');
                }, 2000); // Espera 2 segundos antes de redirigir
            } else {
                setModalMessage('Error al enviar el correo: ' + data.error);
                setModalOpen(true);
            }
        } catch (error) {
            console.error('Error:', error);
    
            setModalOpen(true);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
        } else {
            alert('Por favor, selecciona un archivo PDF');
            e.target.value = null;
        }
    };

    return (
        <LayoutPrincipal title="Enviar Correo Electronico">
            <Layoutcontenido3 title="Enviar Correo Electronico">
                <form onSubmit={handleSubmit} className="w-[50%]">
                    <div className="mb-4">
                        <label htmlFor="toEmail" className="block mb-2">Correo del destinatario:</label>
                        <Input
                            type="email"
                            id="toEmail"
                            value={toEmail}
                            onChange={(e) => setToEmail(e.target.value)}
                            className="w-full border rounded"
                        />
                        {errors.toEmail && <p className="text-red-500 text-sm">{errors.toEmail}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="subject" className="block mb-2">Asunto:</label>
                        <Input
                            type="text"
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block mb-2">Mensaje:</label>
                        <TextArea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            rows="4"
                        ></TextArea>
                        {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                    </div>
                    <div className="mb-4">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            className="w-full px-3 py-2 border rounded bg-gray-200 hover:bg-gray-300"
                        >
                            {file ? `Archivo adjunto: ${file.name}` : 'Seleccionar PDF'}
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>
                    <ButtonComponent type="submit" Text="Enviar Correo" className="w-full text-white py-2 rounded hover:bg-[#7EBA5D]" />
                    <ButtonComponent
                        type="button"
                        Text="Volver"
                        onClick={() => navigate('/Aprendiz/Formulario')}
                        className="w-full text-white py-2 rounded hover:bg-[#7EBA5D]"
                    />
                </form>
                
                <Modal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    message={modalMessage}
                />
            </Layoutcontenido3>
        </LayoutPrincipal>
    );
};

export default EmailForm;
