const { Router } = require('express');
const router = Router();

const { getPuestos, createPuesto, getPuesto, deletePuesto, updatePuesto } = require('../controllers/puesto.controller');

router.route('/puesto')
    .get(getPuestos)
    .post(createPuesto);

router.route('/puesto/:id')
    .get(getPuesto)
    .delete(deletePuesto)
    .put(updatePuesto);

module.exports = router;