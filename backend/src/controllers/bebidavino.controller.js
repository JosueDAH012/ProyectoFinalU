require("dotenv").config();
const aes256 = require("aes256");
const bebiVinoCtrl = {};

const BebiVino = require('../models/Model.BebidaVino');

const key = process.env.KEY;
const cipher = aes256.createCipher(key);

bebiVinoCtrl.getBebiVinos = (req, res) => {
    const bebivinos = [];
    BebiVino.find((err, bebivino) => {
      if (err || !bebivino) {
        return res.status(500).send({ message: "error en la base de datos" });
      }
      console.log(bebivino);
      bebivino.forEach((data) => {
        const bebivino = new BebiVino();
        bebivino._id = data._id;
        bebivino.consecutivo = data.consecutivo;
        bebivino.nombre = cipher.decrypt(data.nombre);
        bebivino.restaurante = cipher.decrypt(data.restaurante);
        bebivino.descripcion = cipher.decrypt(data.descripcion);
        bebivino.foto = data.foto;
        bebivino.cantidad = cipher.decrypt(data.cantidad);
        bebivino.nacionalidad = cipher.decrypt(data.nacionalidad);
        bebivino.preciounitario = cipher.decrypt(data.preciounitario);
        bebivino.preciobotella = cipher.decrypt(data.preciobotella);
        bebivino.yearcosecha = cipher.decrypt(data.yearcosecha);
        bebivino.marca = cipher.decrypt(data.marca);
        bebivinos.push(bebivino);
      });
  
      return res.status(200).send({ bebivino: bebivinos });
    });
  };

bebiVinoCtrl.createBebiVino = (req, res) => {
  //const para encriptar
  const nombreencript = cipher.encrypt(req.body.nombre);
  const restauranteencript = cipher.encrypt(req.body.restaurante);
  const descripcionencript = cipher.encrypt(req.body.descripcion);
  const cantidadencript = cipher.encrypt(req.body.cantidad);
  const nacionalidadencript = cipher.encrypt(req.body.nacionalidad);
  const preciounitarioencript = cipher.encrypt(req.body.preciounitario);
  const preciobotellaencript = cipher.encrypt(req.body.preciobotella);
  const yearcosechaencript = cipher.encrypt(req.body.yearcosecha);
  const marcaencript = cipher.encrypt(req.body.marca);
  //console.log(parametros unidad de medida);
  const bebivino = new BebiVino({
    consecutivo: consecutivo,
    nombre: nombreencript,
    restaurante: restauranteencript,
    descripcion: descripcionencript,
    foto: foto,
    cantidad: cantidadencript, 
    nacionalidad: nacionalidadencript,
    preciounitario: preciounitarioencript,
    preciobotella: preciobotellaencript,
    yearcosecha: yearcosechaencript,
    marca: marcaencript
  });
  bebivino.save(function (error, bebivino) {
    if (error) {
      return res.status(500).json({
        message: error,
      });
    }
    return res.json(bebivino);
    //res.json({message: 'Unidad de medida creado'})
  });
};

bebiVinoCtrl.getBebiVino = (req, res) => {
    const { id } = req.params;
    BebiVino
    .findOne({_id: id})
    .then((data) => {
      // console.log(data)
      const bebivino = new BebiVino()
      bebivino._id = data._id;
      bebivino.consecutivo = data.consecutivo;
      bebivino.nombre = cipher.decrypt(data.nombre);
      bebivino.restaurante = cipher.decrypt(data.restaurante);
      bebivino.descripcion = cipher.decrypt(data.descripcion);
      bebivino.cantidad = cipher.decrypt(data.cantidad);
      bebivino.nacionalidad = cipher.decrypt(data.nacionalidad);
      bebivino.preciounitario = cipher.decrypt(data.preciounitario);
      bebivino.preciobotella = cipher.decrypt(data.preciobotella);
      bebivino.yearcosecha = cipher.decrypt(data.yearcosecha);
      bebivino.marca = cipher.decrypt(data.marca);
      return res.status(200).send({bebivino: bebivino})
    })
    .catch((error) => res.json({ message: error }));
}

//eliminar una unidad de medida
bebiVinoCtrl.deleteBebiVino = (req, res) => {
    const { id } = req.params;
    BebiVino
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

  //update una unidad de medida
  bebiVinoCtrl.updateBebiVino = (req, res) => {
    const { id } = req.params;
    const {nombre, restaurante, cantidad, nacionalidad, 
      preciounitario, preciobotella, yearcosecha, marca} = req.body;
    const nombrecrypt = cipher.encrypt(nombre);
    const restaurantecrypt = cipher.encrypt(restaurante);
    const cantidadcrypt = cipher.encrypt(cantidad);
    const nacionalidadcrypt = cipher.encrypt(nacionalidad);
    const preciounitariocrypt = cipher.encrypt(preciounitario);
    const preciobotellacrypt = cipher.encrypt(preciobotella);
    const yearcosechacrypt = cipher.encrypt(yearcosecha);
    const marcacrypt = cipher.encrypt(marca);
    //Validar si el email ya esta registrado
    BebiVino.findOne({_id: id}, (err, data) => {
      const nombreecrypt = cipher.decrypt(data.nombre)
      const bebivino = {
        nombre: nombrecrypt,
        restaurante: restaurantecrypt,
        descripcion: descripcioncrypt,
        foto: foto,
        cantidad: cantidadcrypt,
        nacionalidad: nacionalidadcrypt,
        preciounitario: preciounitariocrypt,
        preciobotella: preciobotellacrypt,
        yearcosecha: yearcosechacrypt,
        marca: marca
      };                                                                                             
      if(err){
          return res.status(500).send({
              message: 'Error al buscar coincidencia de email'
          });
      };
      if(data && nombreecrypt.includes(nombre)){
          return res.status(200).send({
              message: 'La unidad de medida ya esta registrado'
          });
      }
      // Buscar y actualizar unidad de medida
     BebiVino.findOneAndUpdate({_id: id}, bebivino, {new:true}, (err, bebivinoUpdated) => {
        if(err || !bebivinoUpdated){
            return res.status(500).send({
                message: 'Error al actualizar documento'
            })
        };
        return res.status(200).send({
            status: 'success',
            user: bebivinoUpdated
        }); 
      }); 
  
  })
  };
  
  module.exports = bebiVinoCtrl;