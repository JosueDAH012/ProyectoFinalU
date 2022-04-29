require("dotenv").config();
const aes256 = require("aes256");
const empleadoCtrl = {};

const Empleado = require('../models/Model.Empleado');

const key = process.env.KEY;
const cipher = aes256.createCipher(key);

empleadoCtrl.getEmpleados = (req, res) => {
    const empleados = [];
    Empleado.find((err, empleado) => {
      if (err || !empleado) {
        return res.status(500).send({ message: "error en la base de datos" });
      }
      console.log(empleado);
      empleado.forEach((data) => {
        const empleado = new Empleado();
        empleado._id = data._id;
        empleado.consecutivo = data.consecutivo;
        empleado.cedula = cipher.decrypt(data.cedula);
        empleado.nombre = cipher.decrypt(data.nombre);
        empleado.primerapellido = cipher.decrypt(data.primerapellido);
        empleado.segundoapellido = cipher.decrypt(data.segundoapellido);
        empleado.numerotelefono = cipher.decrypt(data.numerotelefono);
        empleado.celular = cipher.decrypt(data.celular);
        empleado.puesto = cipher.decrypt(data.puesto);
        empleado.nacionalidad = cipher.decrypt(data.nacionalidad);
        empleado.restaurante = cipher.decrypt(data.restaurante);
        empleado.foto = data.foto;
        empleados.push(empleado);
      });
  
      return res.status(200).send({ empleado: empleados });
    });
  };

empleadoCtrl.createEmpleado = (req, res) => {
  //const para encriptar
  const cedulaencript = cipher.encrypt(req.body.cedula)
  const nombreencript = cipher.encrypt(req.body.nombre);
  const primerapellidoencript = cipher.encrypt(req.body.primerapellido);
  const segundoapellidoencript = cipher.encrypt(req.body.segundoapellido);
  const numerotelefonoencript = cipher.encrypt(req.body.numerotelefono);
  const celularencript = cipher.encrypt(req.body.celular);
  const puestoencript = cipher.encrypt(req.body.puesto);
  const nacionalidadencript = cipher.encrypt(req.body.nacionalidad);
  const restauranteencript = cipher.encrypt(req.body.restaurante);
  //console.log(parametros unidad de medida);
  const empleado = new Empleado({
    consecutivo: consecutivo,
    cedula: cedulaencript,
    nombre: nombreencript,
    primerapellido: primerapellidoencript, 
    segundoapellido: segundoapellidoencript,
    numerotelefono: numerotelefonoencript,
    celular: celularencript,
    puesto: puestoencript,
    nacionalidad: nacionalidadencript,
    restaurante: restauranteencript,
    foto: foto,
  });
  empleado.save(function (error, empleado) {
    if (error) {
      return res.status(500).json({
        message: error,
      });
    }
    return res.json(empleado);
    //res.json({message: 'Unidad de medida creado'})
  });
};

empleadoCtrl.getEmpleado = (req, res) => {
    const { id } = req.params;
    Empleado
    .findOne({_id: id})
    .then((data) => {
      // console.log(data)
      const empleado = new Empleado()
      empleado._id = data._id;
      empleado.consecutivo = data.consecutivo;
      empleado.cedula = cipher.decrypt(data.cedula);
      empleado.nombre = cipher.decrypt(data.nombre);
      empleado.primerapellido = cipher.decrypt(data.primerapellido);
      empleado.segundoapellido = cipher.decrypt(data.segundoapellido);
      empleado.numerotelefono = cipher.decrypt(data.numerotelefono);
      empleado.celular = cipher.decrypt(data.celular);
      empleado.puesto = cipher.decrypt(data.detalpuestole);
      empleado.nacionalidad = cipher.decrypt(data.nacionalidad);
      empleado.restaurante = cipher.decrypt(data.restaurante);
      empleado.foto = data.foto;
      return res.status(200).send({empleado: empleado})
    })
    .catch((error) => res.json({ message: error }));
}

//eliminar una unidad de medida
empleadoCtrl.deleteEmpleado = (req, res) => {
    const { id } = req.params;
    Empleado
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

  //update una unidad de medida
  empleadoCtrl.updateEmpleado = (req, res) => {
    const { id } = req.params;
    const {cedula, nombre, primerapellido, segundoapellido, 
      numerotelefono, celular, puesto, nacionalidad, 
      restaurante, foto} = req.body;
    const cedulacrypt = cipher.encrypt(cedula);
    const nombrecrypt = cipher.encrypt(nombre);
    const primerapellidocrypt = cipher.encrypt(primerapellido);
    const segundoapellidocrypt = cipher.encrypt(segundoapellido);
    const numerotelefonocrypt = cipher.encrypt(numerotelefono);
    const celularcrypt = cipher.encrypt(celular);
    const puestocrypt = cipher.encrypt(puesto);
    const restaurantecrypt = cipher.encrypt(restaurante);
    const nacionalidadcrypt = cipher.encrypt(nacionalidad);
    //Validar si el email ya esta registrado
    Empleado.findOne({_id: id}, (err, data) => {
      const cedulaacrypt = cipher.decrypt(data.cedula)
      const empleado = {
        cedula: cedulacrypt,
        nombre: nombrecrypt,
        primerapellido: primerapellidocrypt,
        segundoapellido: segundoapellidocrypt,
        numerotelefono: numerotelefonocrypt,
        celular: celularcrypt,
        puesto: puestocrypt,
        nacionalidad: nacionalidadcrypt,
        restaurante: restaurantecrypt,
        foto: foto
      };                                                                                             
      if(err){
          return res.status(500).send({
              message: 'Error al buscar coincidencia de email'
          });
      };
      if(data && cedulaacrypt.includes(cedula)){
          return res.status(200).send({
              message: 'La unidad de medida ya esta registrado'
          });
      }
      // Buscar y actualizar unidad de medida
     Empleado.findOneAndUpdate({_id: id}, empleado, {new:true}, (err, empleadoUpdated) => {
        if(err || !empleadoUpdated){
            return res.status(500).send({
                message: 'Error al actualizar documento'
            })
        };
        return res.status(200).send({
            status: 'success',
            user: empleadoUpdated
        }); 
      }); 
  
  })
  };

module.exports = empleadoCtrl;