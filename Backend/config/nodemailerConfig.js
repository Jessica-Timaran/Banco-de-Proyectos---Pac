import nodemailer from 'nodemailer';

// Configura el transporter con tus credenciales de correo electrónico
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pac.bancodeproyectos@gmail.com',
        pass: 'pxikzyjednmxlsud', // Usa la nueva contraseña de aplicación aquí
    },
});

export default transporter;