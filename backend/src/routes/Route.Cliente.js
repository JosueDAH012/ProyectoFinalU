const { Router } = require('express');
const router = Router();

const { getClientes, createCliente, getCliente, deleteCliente, updateCliente } = require('../controllers/cliente.controller');

router.route('/cliente')
    .get(getClientes)
    .post(createCliente);

router.route('/cliente/:id')
    .get(getCliente)
    .delete(deleteCliente)
    .put(updateCliente);

module.exports = router;