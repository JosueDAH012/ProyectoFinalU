const { Router } = require('express');
const router = Router();

const { getProtecns, createProtecn, getProtecn, deleteProtecn, updateProtecn } = require('../controllers/productostecnologia.controller');

router.route('/ProTecn')
    .get(getProtecns)
    .post(createProtecn);

router.route('/ProTecn/:id')
    .get(getProtecn)
    .delete(deleteProtecn)
    .put(updateProtecn);

module.exports = router;