const { Router } = require('express');
const router = Router();

const { getFacturacions, createFacturacion, getFacturacion, deleteFacturacion, updateFacturacion } = require('../controllers/facturacion.controller');

router.route('/facturacion')
    .get(getFacturacions)
    .post(createFacturacion);

router.route('/facturacion/:id')
    .get(getFacturacion)
    .delete(deleteFacturacion)
    .put(updateFacturacion);

module.exports = router;