const { Router } = require('express');
const router = Router();

const { getProveedors, createProveedor, getProveedor, deleteProveedor, updateProveedor } = require('../controllers/unidadmedida.controller');

router.route('/proveedores')
    .get(getProveedors)
    .post(createProveedor);

router.route('/proveedores/:id')
    .get(getProveedor)
    .delete(deleteProveedor)
    .put(updateProveedor);


module.exports = router;