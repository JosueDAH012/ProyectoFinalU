const { Router } = require('express');
const router = Router();

const { getRestaurantes, createRestaurante, getRestaurante, deleteRestaurante, updateRestaurante } = require('../controllers/restaurante.controller');

router.route('/restaurante')
    .get(getRestaurantes)
    .post(createRestaurante);

router.route('/restaurante/:id')
    .get(getRestaurante)
    .delete(deleteRestaurante)
    .put(updateRestaurante);

module.exports = router;