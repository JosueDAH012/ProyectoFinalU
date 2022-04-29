const { Router } = require('express');
const router = Router();

const { getBebiGases, createBebiGase, getBebiGase, deleteBebiGase, updateBebiGase } = require('../controllers/bebidagaseosa.controller');

router.route('/gaseosa')
    .get(getBebiGases)
    .post(createBebiGase);

router.route('/gaseosa/:id')
    .get(getBebiGase)
    .delete(deleteBebiGase)
    .put(updateBebiGase);

module.exports = router;

