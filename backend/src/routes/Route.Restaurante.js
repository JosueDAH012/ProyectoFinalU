const { Router } = require('express');
const router = Router();

const { getResta } = require('../controllers/restaurante.controller');


router.route('/')
    .get(getResta)// Trae el registro unico de la base de datos.
    //.put(updateRes);// Modifica el registro unico de la base de datos.




module.exports = router;