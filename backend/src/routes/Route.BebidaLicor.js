const { Router } = require('express');
const router = Router();

const { getBebiLicors, createBebiLicor, getBebiLicor, deleteBebiLicor, updateBebiLicor } = require('../controllers/bebidalicor.controller');

router.route('/licor')
    .get(getBebiLicors)
    .post(createBebiLicor);

router.route('/licor/:id')
    .get(getBebiLicor)
    .delete(deleteBebiLicor)
    .put(updateBebiLicor);

module.exports = router;