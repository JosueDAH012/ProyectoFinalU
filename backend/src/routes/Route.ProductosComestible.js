const { Router } = require('express');
const router = Router();

const { getProComes, createProCome, getProCome, deleteProCome, updateProCome } = require('../controllers/productocomestible.controller');

router.route('/comestibles')
    .get(getProComes)
    .post(createProCome);

router.route('/comestibles/:id')
    .get(getProCome)
    .delete(deleteProCome)
    .put(updateProCome);

module.exports = router;