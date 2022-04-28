const { Router } = require('express');
const router = Router();

const { getProLimps, createProLimp, getProLimp, deleteProLimp, updateProLimp } = require('../controllers/productoslimpieza.controller');

router.route('/prolimp')
    .get(getProLimps)
    .post(createProLimp);

router.route('/prolimp/:id')
    .get(getProLimp)
    .delete(deleteProLimp)
    .put(updateProLimp);

module.exports = router;