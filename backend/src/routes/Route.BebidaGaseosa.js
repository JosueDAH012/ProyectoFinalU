const { Router } = require('express');
const router = Router();

const { createBebiGaseCtrl, deleteBebiGaseCtrl } = require('../controllers/bebidagaseosa.controller');

router.route('/bebida')
    //.get(getUsers)
    .post(createBebiGaseCtrl);

router.route('/:id')
    .delete(deleteBebiGaseCtrl);

module.exports = router;

