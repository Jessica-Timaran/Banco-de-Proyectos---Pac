// Generador de contraseñas seguras
import crypto from 'crypto';

const generateSecret = () => {
    return crypto.randomBytes(32).toString('hex'); // Genera una cadena hexadecimal de 64 caracteres
};

console.log(generateSecret());