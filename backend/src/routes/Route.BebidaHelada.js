const { Router } = require('express');
const router = Router();

const { getBebiHelas, } = require('../controllers/bebidahelada.controller');

router.route('/bebida')
    .get(getBebiHelas)
    .post(createBebiHelaCtrl);

/*router.route('/:id')
    .delete(deleteUser);*/

module.exports = router;