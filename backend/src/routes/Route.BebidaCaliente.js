const { Router } = require("express");
const router = Router();

const { getBebiCales, createBebiCale, getBebiCale, deleteBebiCale, updateBebiCale } = require('../controllers/bebidacaliente.controller');

router.route('/bebidacaliente')
    .get(getBebiCales)
    .post(createBebiCale);

router.route('/bebidacaliente/:id')
    .get(getBebiCale)
    .delete(deleteBebiCale)
    .put(updateBebiCale);


module.exports = router;

