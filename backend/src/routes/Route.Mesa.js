const { Router } = require('express');
const router = Router();

const { getMesas, createMesa, getMesa, deleteMesa, updateMesa } = require('../controllers/mesa.controller');

router.route('/mesa')
    .get(getMesas)
    .post(createMesa);

router.route('/mesa/:id')
    .get(getMesa)
    .delete(deleteMesa)
    .put(updateMesa);

module.exports = router;