require("dotenv").config();
const aes256 = require("aes256");
const restauranteCtrl = {};

const Restaurante = require("../models/Model.Restaurante");

const key = process.env.KEY;
const cipher = aes256.createCipher(key);

restauranteCtrl.getRestaurantes = (req, res) => {
  const restuarantes = [];
  Restaurante.find((err, restuarante) => {
    if (err || !restuarante) {
      return res.status(500).send({ message: "error en la base de datos" });
    }
    console.log(restuarante);
    restuarante.forEach((data) => {
      const restuarante = new Restaurante();
      restuarante._id = data._id;
      restuarante.consecutivo = data.consecutivo;
      restuarante.numeracion = data.numeracion;
      restuarante.nombre = cipher.decrypt(data.nombre);
      restuarante.especialidad = cipher.decrypt(data.especialidad);
      restuarante.direccion = cipher.decrypt(data.direccion);
      restuarante.telefono = cipher.decrypt(data.telefono);
      restuarante.activo = cipher.decrypt(data.activo);
      restuarantes.push(restuarante);
    });

    return res.status(200).send({ restuarante: restuarantes });
  });
};

restauranteCtrl.createRestaurante = (req, res) => {
  //const para encriptar
  const nombreencript = cipher.encrypt(req.body.nombre);
  const especialidadencript = cipher.encrypt(req.body.especialidad);
  const direccionencript = cipher.encrypt(req.body.direccion);
  const telefonoencript = cipher.encrypt(req.body.telefono);
  const activoencript = cipher.encrypt(req.body.activo);
  //console.log(parametros restuarante);
  const restuarante = new Restaurante({
    consecutivo: consecutivo,
    numeracion: numeracion,
    nombre: nombreencript,
    especialidad: especialidadencript,
    direccion: direccionencript,
    telefono: telefonoencript,
    activo: activoencript,
  });
  restuarante.save(function (error, restuarante) {
    if (error) {
      return res.status(500).json({
        message: error,
      });
    }
    return res.json(restuarante);
    //res.json({message: 'Restaurante creado'})
  });
};

restauranteCtrl.getRestaurante = (req, res) => {
  const { id } = req.params;
  Restaurante.findOne({ id: id })
    .then((data) => {
      // console.log(data)
      const restuarante = new Restaurante();
      umedida._id = data._id;
      umedida.consecutivo = data.consecutivo;
      umedida.numeracion = data.numeracion;
      umedida.nombre = cipher.decrypt(data.nombre);
      umedida.especialidad = cipher.decrypt(data.especialidad);
      umedida.direccion = cipher.decrypt(data.direccion);
      umedida.telefono = cipher.decrypt(data.telefono);
      umedida.activo = cipher.decrypt(data.activo);
      return res.status(200).send({ restuarante: restuarante });
    })
    .catch((error) => res.json({ message: error }));
};

//eliminar un restaurante
restauranteCtrl.deleteRestaurante = (req, res) => {
  const { id } = req.params;
  Restaurante.remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

//update un restaurante
restauranteCtrl.updateRestaurante = (req, res) => {
  const { id } = req.params;
  const { nombre, especialidad, direccion, telefono, activo } = req.body;
  const nombrecrypt = cipher.encrypt(nombre);
  const especialidadcrypt = cipher.encrypt(especialidad);
  const direccioncrypt = cipher.encrypt(direccion);
  const telefonocrypt = cipher.encrypt(telefono);
  const activocrypt = cipher.encrypt(activo);
  //Validar si el nombre ya esta registrado
  Restaurante.findOne({ _id: id }, (err, data) => {
    const nombreeecrypt = cipher.decrypt(data.nombre);
    const restuarante = {
      unidadmedida: nombrecrypt,
      especialidad: especialidadcrypt,
      detalle: direccioncrypt,
      telefono: telefonocrypt,
      activo: activocrypt,
    };
    if (err) {
      return res.status(500).send({
        message: "Error al buscar coincidencia de restaurante",
      });
    }
    if (data && nombreeecrypt.includes(nombre)) {
      return res.status(200).send({
        message: "El nombre ya esta registrado",
      });
    }
    // Buscar y actualizar restaurante
    Restaurante.findOneAndUpdate(
      { _id: id },
      restuarante,
      { new: true },
      (err, restauranteUpdated) => {
        if (err || !restauranteUpdated) {
          return res.status(500).send({
            message: "Error al actualizar documento",
          });
        }
        return res.status(200).send({
          status: "success",
          user: restauranteUpdated,
        });
      }
    );
  });
};

module.exports = restauranteCtrl;
