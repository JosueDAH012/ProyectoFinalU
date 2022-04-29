const { Router } = require('express');
const router = Router();

const { getEspecialidadess, createEspecialidades, getEspecialidades, deleteEspecialidades, updateEspecialidades } = require('../controllers/especialidades.controller');

router.route('/especialidades')
    .get(getEspecialidadess)
    .post(createEspecialidades);

router.route('/especialidades/:id')
    .get(getEspecialidades)
    .delete(deleteEspecialidades)
    .put(updateEspecialidades);

module.exports = router;