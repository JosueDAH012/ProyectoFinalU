require("dotenv").config();
const aes256 = require("aes256");
const bebiHelaCtrl = {};

const BebiHela = require("../models/Model.BebidaHelada");

const key = process.env.KEY;
const cipher = aes256.createCipher(key);

bebiHelaCtrl.getBebiHelas = (req, res) => {
  const bebihelas = [];
  BebiHela.find((err, bebihela) => {
    if (err || !bebihela) {
      return res.status(500).send({ message: "error en la base de datos" });
    }
    console.log(bebihela);
    bebihela.forEach((data) => {
      const bebihela = new BebiHela();
      bebihela._id = data._id;
      bebihela.consecutivo = data.consecutivo;
      bebihela.nombre = cipher.decrypt(data.nombre);
      bebihela.ingredientes = cipher.decrypt(data.ingredientes);
      bebihela.precio = cipher.decrypt(data.precio);
      bebihela.restaurante = cipher.decrypt(data.restaurante);
      bebihela.descripcion = cipher.decrypt(data.descripcion);
      bebihela.foto = data.foto;
      bebihelas.push(bebihela);
    });

    return res.status(200).send({ bebihela: bebihelas });
  });
};

bebiHelaCtrl.createBebiHela = (req, res) => {
  //const para encriptar
  const nombreencript = cipher.encrypt(req.body.nombre);
  const ingredientesencript = cipher.encrypt(req.body.ingredientes);
  const precioencript = cipher.encrypt(req.body.precio);
  const restauranteencript = cipher.encrypt(req.body.restaurante);
  const descripcionencript = cipher.encrypt(req.body.descripcion);
  //console.log(parametros unidad de medida);
  const bebihela = new BebiHela({
    consecutivo: consecutivo,
    nombre: nombreencript,
    ingredientes: ingredientesencript,
    precio: precioencript,
    restaurante: restauranteencript,
    descripcion: descripcionencript,
    foto: foto,
  });
  bebihela.save(function (error, bebihela) {
    if (error) {
      return res.status(500).json({
        message: error,
      });
    }
    return res.json(bebihela);
    //res.json({message: 'Unidad de medida creado'})
  });
};

bebiHelaCtrl.getBebiHela = (req, res) => {
  const { id } = req.params;
  BebiHela.findOne({ id: id })
    .then((data) => {
      // console.log(data)
      const bebihela = new BebiHela();
      bebihela._id = data._id;
      bebihela.consecutivo = data.consecutivo;
      bebihela.unidadmedida = cipher.decrypt(data.unidadmedida);
      bebihela.escala = cipher.decrypt(data.escala);
      bebihela.detalle = cipher.decrypt(data.detalle);
      bebihela.simbologia = cipher.decrypt(data.simbologia);
      return res.status(200).send({ bebihela: bebihela });
    })
    .catch((error) => res.json({ message: error }));
};

//eliminar una unidad de medida
bebiHelaCtrl.deleteBebiHela = (req, res) => {
  const { id } = req.params;
  BebiHela.remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

//update una unidad de medida
bebiHelaCtrl.updateBebiHela = (req, res) => {
  const { id } = req.params;
  const { nombre, ingredientes, precio, restaurante, descripcion } = req.body;
  const nombrecrypt = cipher.encrypt(nombre);
  const ingredientescrypt = cipher.encrypt(ingredientes);
  const preciocrypt = cipher.encrypt(precio);
  const restaurantecrypt = cipher.encrypt(restaurante);
  const descripcioncript = cipher.encrypt(req.body.descripcion);
  //Validar si el email ya esta registrado
  BebiHela.findOne({ _id: id }, (err, data) => {
    const nombreecrypt = cipher.decrypt(data.nombre);
    const bebihela = {
      nombre: nombrecrypt,
      ingredientes: ingredientescrypt,
      precio: preciocrypt,
      restaurante: restaurantecrypt,
      descripcion: descripcioncrypt
    };
    if (err) {
      return res.status(500).send({
        message: "Error al buscar coincidencia de email",
      });
    }
    if (data && nombreecrypt.includes(nombre)) {
      return res.status(200).send({
        message: "La unidad de medida ya esta registrado",
      });
    }
    // Buscar y actualizar unidad de medida
    BebiHela.findOneAndUpdate(
      { _id: id },
      bebihela,
      { new: true },
      (err, bebihelaUpdated) => {
        if (err || !bebihelaUpdated) {
          return res.status(500).send({
            message: "Error al actualizar documento",
          });
        }
        return res.status(200).send({
          status: "success",
          user: bebihelaUpdated,
        });
      }
    );
  });
};

module.exports = bebiHelaCtrl;
