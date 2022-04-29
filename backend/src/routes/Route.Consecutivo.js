const { Router } = require('express');
const router = Router();

const { getConsecutivos, createConsecutivo, getConsecutivo, deleteConsecutivo, updateConsecutivo } = require('../controllers/consecutivo.controller');

router.route('/')
    .get(getConsecutivos)
    .post(createConsecutivo);

router.route('/:id')
    .get(getConsecutivo)
    .delete(deleteConsecutivo)
    .put(updateConsecutivo);

module.exports = router;