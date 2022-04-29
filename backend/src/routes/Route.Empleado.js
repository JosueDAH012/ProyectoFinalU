const { Router } = require('express');
const router = Router();

const { getEmpleados, createEmpleado, getEmpleado, deleteEmpleado, updateEmpleado } = require('../controllers/empleado.controller');

router.route('/empleado')
    .get(getEmpleados)
    .post(createEmpleado);

router.route('/empleado/:id')
    .get(getEmpleado)
    .delete(deleteEmpleado)
    .put(updateEmpleado);

module.exports = router;