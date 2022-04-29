const { Router } = require('express');
const router = Router();

const { getBuffets, createBuffet, getBuffet, deleteBuffet, updateBuffet } = require('../controllers/buffet.controller');

router.route('/buffet')
    .get(getBuffets)
    .post(createBuffet);

router.route('/buffet/:id')
    .get(getBuffet)
    .delete(deleteBuffet)
    .put(updateBuffet);

module.exports = router;