const { Router } = require('express');
const router = Router();

const { getProDeschs, createProDesch, getProDesch, deleteProDesch, updateProDesch } = require('../controllers/productosdesechables.controller');

router.route('/desechables')
    .get(getProDeschs)
    .post(createProDesch);

router.route('/desechables/:id')
    .get(getProDesch)
    .delete(deleteProDesch)
    .put(updateProDesch);


module.exports = router;