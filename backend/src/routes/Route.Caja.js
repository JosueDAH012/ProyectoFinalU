const { Router } = require('express');
const router = Router();

const { getCajas, createCaja, getCaja, deleteCaja, updateCaja } = require('../controllers/caja.controller');

router.route('/caja')
    .get(getCajas)
    .post(createCaja);

router.route('/caja/:id')
    .get(getCaja)
    .delete(deleteCaja)
    .put(updateCaja);

module.exports = router;