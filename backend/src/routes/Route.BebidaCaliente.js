const { Router } = require("express");
const router = Router();

const { createBebiCaleCtrl } = require('../controllers/bebidacaliente.controller');

router.route('/bebida')
    //.get(getUsers)
    .post(createBebiCaleCtrl);

/*router.route('/:id')
    .delete(deleteUser);*/

module.exports = router;

