const { Router } = require('express');
const router = Router();

const { getUniMeS, createUniMe, getUniMe, deleteUniMe, updateUniMe } = require('../controllers/unidadmedida.controller');

router.route('/umedida')
    .get(getUniMeS)
    .post(createUniMe);

router.route('/umedida/:id')
    .get(getUniMe)
    .delete(deleteUniMe)
    .put(updateUniMe);

module.exports = router;