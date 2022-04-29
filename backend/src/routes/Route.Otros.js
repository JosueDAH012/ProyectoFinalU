const { Router } = require('express');
const router = Router();

const { getOtross, createOtros, getOtros, deleteOtros } = require('../controllers/otros.controller');

router.route('/otros')
    .get(getOtross)
    .post(createOtros);

router.route('/otros/:id')
    .get(getOtros)
    .delete(deleteOtros)

module.exports = router;