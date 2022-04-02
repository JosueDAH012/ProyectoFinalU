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

// routes
app.use('/api/bebidacaliente', require('./routes/Route.BebidaCaliente'));
app.use('/api/bebidagaseosa', require('./routes/Route.BebidaGaseosa'));
app.use('/api/bebidahelada', require('./routes/Route.BebidaHelada'));
app.use('/api/bebidalicor', require('./routes/Route.BebidaLicor'));
app.use('/api/bebidavino', require('./routes/Route.BebidaVino'));
app.use('/api/bitacora', require('./routes/Route.Bitacora'));
app.use('/api/buffet', require('./routes/Route.Buffet'));
app.use('/api/caja', require('./routes/Route.Caja'));
app.use('/api/cliente', require('./routes/Route.Cliente'));
app.use('/api/consecutivo', require('./routes/Route.Consecutivo'));
app.use('/api/empleado', require('./routes/Route.Empleado'));
app.use('/api/especialidad', require('./routes/Route.Especialidades'));
app.use('/api/facturacion', require('./routes/Route.Facturacion'));
app.use('/api/marca', require('./routes/Route.Marca'));
app.use('/api/mesa', require('./routes/Route.Mesa'));
app.use('/api/otros', require('./routes/Route.Otros'));
app.use('/api/pais', require('./routes/Route.Paises'));
app.use('/api/productoscomestibles', require('./routes/Route.ProductosComestible'));
app.use('/api/productosdesechable', require('./routes/Route.ProductosDesechable'));
app.use('/api/productosequipos', require('./routes/Route.ProductosEquipos'));
app.use('/api/productoslimpieza', require('./routes/Route.ProductosLimpieza'));
app.use('/api/productostecnologia', require('./routes/Route.ProductosTecnologia'));
app.use('/api/proveedores', require('./routes/Route.Proveedores'));
app.use('/api/puestos', require('./routes/Route.Puestos'));
app.use('/api/restaurante', require('./routes/Route.Restaurante'));
app.use('/api/unidadmedida', require('./routes/Route.UnidadesMedida'));
app.use('/api/usuario', require('./routes/Route.Usuario'));

module.exports = app;
