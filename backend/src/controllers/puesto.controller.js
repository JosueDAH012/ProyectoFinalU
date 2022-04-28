require("dotenv").config();
const aes256 = require("aes256");
const puestoCtrl = {};

const Puesto = require("../models/Model.Puestos");

const key = process.env.KEY;
const cipher = aes256.createCipher(key);

puestoCtrl.getPuestos = (req, res) => {
  const puestos = [];
  Puesto.find((err, puesto) => {
    if (err || !puesto) {
      return res.status(500).send({ message: "error en la base de datos" });
    }
    console.log(puesto);
    puesto.forEach((data) => {
      const puesto = new Puesto();
      puesto._id = data._id;
      puesto.consecutivo = data.consecutivo;
      puesto.numeracion = data.numeracion;
      puesto.nombre = cipher.decrypt(data.nombre);
      puesto.posicionrestaurante = cipher.decrypt(data.posicionrestaurante);
      puesto.rol = cipher.decrypt(data.rol);
      puestos.push(puesto);
    });

    return res.status(200).send({ puesto: puestos });
  });
};

puestoCtrl.createPuesto = (req, res) => {
  //const para encriptar
  const nombreencript = cipher.encrypt(req.body.nombre);
  const posicionrestauranteencript = cipher.encrypt(
    req.body.posicionrestaurante
  );
  const rolencript = cipher.encrypt(req.body.rol);
  //console.log(parametros puesto);
  const puesto = new Puesto({
    consecutivo: consecutivo,
    numeracion: numeracion,
    nombre: nombreencript,
    posicionrestaurante: posicionrestauranteencript,
    rol: rolencript,
  });
  puesto.save(function (error, puesto) {
    if (error) {
      return res.status(500).json({
        message: error,
      });
    }
    return res.json(puesto);
    //res.json({message: 'Puesto creado'})
  });
};

puestoCtrl.getPuesto = (req, res) => {
  const { id } = req.params;
  Puesto.findOne({ id: id })
    .then((data) => {
      // console.log(data)
      const puesto = new Puesto();
      puesto._id = data._id;
      puesto.consecutivo = data.consecutivo;
      puesto.numeracion = data.numeracion;
      puesto.nombre = cipher.decrypt(data.nombre);
      puesto.posicionrestaurante = cipher.decrypt(data.posicionrestaurante);
      puesto.rol = cipher.decrypt(data.rol);
      return res.status(200).send({ puesto: puesto });
    })
    .catch((error) => res.json({ message: error }));
};

//eliminar una unidad de medida
puestoCtrl.deletePuesto = (req, res) => {
  const { id } = req.params;
  Puesto.remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

//update una unidad de medida
puestoCtrl.updatePuesto = (req, res) => {
  const { id } = req.params;
  const { nombre, posicionrestaurante, rol } = req.body;
  const nombrecrypt = cipher.encrypt(nombre);
  const posicionrestaurantecrypt = cipher.encrypt(posicionrestaurante);
  const rolcrypt = cipher.encrypt(rol);
  //Validar si el email ya esta registrado
  Puesto.findOne({ _id: id }, (err, data) => {
    const nombreeecrypt = cipher.decrypt(data.nombre);
    const puesto = {
      nombre: nombrecrypt,
      posicionrestaurante: posicionrestaurantecrypt,
      rol: rolcrypt,
    };
    if (err) {
      return res.status(500).send({
        message: "Error al buscar coincidencia de email",
      });
    }
    if (data && nombreeecrypt.includes(nombre)) {
      return res.status(200).send({
        message: "Puesto ya esta registrado",
      });
    }
    // Buscar y actualizar unidad de medida
    Puesto.findOneAndUpdate(
      { _id: id },
      puesto,
      { new: true },
      (err, puestoUpdated) => {
        if (err || !puestoUpdated) {
          return res.status(500).send({
            message: "Error al actualizar documento",
          });
        }
        return res.status(200).send({
          status: "success",
          user: puestoUpdated,
        });
      }
    );
  });
};

module.exports = puestoCtrl;
