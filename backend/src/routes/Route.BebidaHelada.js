const { Router } = require('express');
const router = Router();

const { getBebiHelas, createBebiHela, getBebiHela, deleteBebiHela, updateBebiHela } = require('../controllers/bebidahelada.controller');

router.route('/bebidahelada')
    .get(getBebiHelas)
    .post(createBebiHela);

router.route('/bebidahelada/:id')
    .get(getBebiHela)
    .delete(deleteBebiHela)
    .put(updateBebiHela);

module.exports = router;