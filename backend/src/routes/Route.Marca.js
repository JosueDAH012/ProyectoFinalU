const { Router } = require('express');
const router = Router();

const { getMarcas, createMarca, getMarca, deleteMarca, updateMarca } = require('../controllers/marca.controller');

router.route('/marca')
    .get(getMarcas)
    .post(createMarca);

router.route('/marca/:id')
    .get(getMarca)
    .delete(deleteMarca)
    .put(updateMarca);

module.exports = router;