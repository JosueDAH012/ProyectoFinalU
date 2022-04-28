const { Router } = require("express");
const router = Router();

const { getBebiCales, createBebiCale, getBebiCale, deleteBebiCale, updateBebiCale } = require('../controllers/bebidacaliente.controller');

router.route('/umedida')
    .get(getBebiCales)
    .post(createBebiCale);

router.route('/umedida/:id')
    .get(getBebiCale)
    .delete(deleteBebiCale)
    .put(updateBebiCale);

module.exports = router;

