// /backend/middleware/cookieMiddleware.js
import cookieParser from 'cookie-parser';
import session from 'express-session';

export const cookieMiddleware = (app) => {
    app.use(cookieParser());
    app.use(session({
        secret: 'mi_secreto',
        resave: false,
        saveUninitialized: true,
        cookie: { 
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días en milisegundos
        }
    }));
};