const express = require('express');
const path = require('path');
const express_session = require('express-session');
const cors = require('cors');
require('dotenv').config();

const app = express()

// AJUSTES DEL SERVER
app.set('port', process.env.PUERTO) // Puerto donde corre el back-end.

// Middlewares
app.use(cors()); // Se aceptan headers desde cualquier origen.
app.use(express.static(path.join(__dirname, 'public'))) // Carpeta de archivos estaticos.
app.use(express.json()) // Server entiende JSON.

// Ajustes de la sesion de Express.
const express_session_settings = {
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000, // 10 minutes
        secure: false, // Only works on HTTPS
        httpOnly: true // Only readable via HTTP/S protocol. No client's JavaScript
    }
}
app.use(express_session(express_session_settings)) // Asigna los ajustes de la sesion de Express.

// Rutas
app.get('/', (req, res) => res.json({ Proyecto: 'Final Servicios Web 2' }))