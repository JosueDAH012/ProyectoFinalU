const { Router } = require('express');
const router = Router();

const { createBebiHelaCtrl } = require('../controllers/bebidahelada.controller');

router.route('/bebida')
    //.get(getUsers)
    .post(createBebiHelaCtrl);

/*router.route('/:id')
    .delete(deleteUser);*/

module.exports = router;