const { Router } = require('express');
const router = Router();

const { getBebiVinos, createBebiVino, getBebiVino, deleteBebiVino, updateBebiVino } = require('../controllers/bebidavino.controller');

router.route('/licor')
    .get(getBebiVinos)
    .post(createBebiVino);

router.route('/licor/:id')
    .get(getBebiVino)
    .delete(deleteBebiVino)
    .put(updateBebiVino);

module.exports = router;