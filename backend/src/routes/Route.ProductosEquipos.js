const { Router } = require('express');
const router = Router();

const { getProEquis, createProEqui, getProEqui, deleteProEqui, updateProEqui} = require('../controllers/productosequipo.controller');

router.route('/equiposyutensilios')
    .get(getProEqui)
    .post(createProEqui);

router.route('/equiposyutensilios/:id')
    .get(getProEqui)
    .delete(deleteProEqui)
    .put(updateProEqui);

module.exports = router;