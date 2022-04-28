require("dotenv").config();
const aes256 = require("aes256");
const proTecnCtrl = {};

const ProTecn = require('../models/Model.ProductosTecnologia');

const key = process.env.KEY;
const cipher = aes256.createCipher(key);

proTecnCtrl.getProtecns = (req, res) => {
    const protecns = [];
    ProTecn.find((err, protecn) => {
      if (err || !protecn) {
        return res.status(500).send({ message: "error en la base de datos" });
      }
      console.log(protecn);
      protecn.forEach((data) => {
        const protecn = new ProTecn();
        protecn._id = data._id;
        protecn.consecutivo = data.consecutivo;
        protecn.numeracion = data.numeracion;
        protecn.nombre = cipher.decrypt(data.nombre);
        protecn.restaurante = cipher.decrypt(data.restaurante);
        protecn.marca = cipher.decrypt(data.marca);
        protecn.cantidad = cipher.decrypt(data.cantidad);
        protecn.descripcion = cipher.decrypt(data.descripcion);
        protecns.push(protecn);
      });
  
      return res.status(200).send({ protecn: protecns });
    });
  };

proTecnCtrl.createProtecn = (req, res) => {
  //const para encriptar
  const nombreencript = cipher.encrypt(req.body.nombre);
  const restauranteencript = cipher.encrypt(req.body.restaurante);
  const marcaencript = cipher.encrypt(req.body.marca);
  const cantidadencript = cipher.encrypt(req.body.cantidad);
  const descripcionencript = cipher.encrypt(req.body.descripcion);
  //console.log(parametros unidad de medida);
  const protecn = new ProTecn({
    consecutivo: consecutivo,
    numeracion: numeracion,
    nombre: nombreencript,
    restaurante: restauranteencript,
    marca: marcaencript,
    cantidad: cantidadencript,
    descripcion: descripcionencript
  });
  protecn.save(function (error, protecn) {
    if (error) {
      return res.status(500).json({
        message: error,
      });
    }
    return res.json(protecn);
    //res.json({message: 'Unidad de medida creado'})
  });
};

proTecnCtrl.getProtecn = (req, res) => {
    const { id } = req.params;
    ProTecn
    .findOne({id: id})
    .then((data) => {
      // console.log(data)
      const protecn = new ProTecn()
      protecn._id = data._id;
      protecn.consecutivo = data.consecutivo;
      protecn.numeracion = data.numeracion;
      protecn.nombre = cipher.decrypt(data.nombre);
      protecn.restaurante = cipher.decrypt(data.restaurante);
      protecn.marca = cipher.decrypt(data.marca);
      protecn.cantidad = cipher.decrypt(data.cantidad);
      protecn.descripcion = cipher.decrypt(data.descripcion);
      return res.status(200).send({protecn: protecn})
    })
    .catch((error) => res.json({ message: error }));
}

//eliminar una unidad de medida
proTecnCtrl.deleteProtecn = (req, res) => {
    const { id } = req.params;
    ProTecn
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

  //update una unidad de medida
  proTecnCtrl.updateProtecn = (req, res) => {
    const { id } = req.params;
    const {nombre, restaurante, marca, cantidad, descripcion} = req.body;
    const nombrecrypt = cipher.encrypt(nombre);
    const restaurantecrypt = cipher.encrypt(restaurante);
    const marcacrypt = cipher.encrypt(marca);
    const cantidadcrypt = cipher.encrypt(cantidad);
    const descripcioncrypt = cipher.encrypt(descripcion);
    //Validar si el email ya esta registrado
    ProTecn.findOne({_id: id}, (err, data) => {
      const nombreecrypt = cipher.decrypt(data.nombre)
      const protecn = {
        nombre: nombrecrypt,
        restaurante: restaurantecrypt,
        marca: marcacrypt,
        cantidad: cantidadcrypt,
        descripcion: descripcioncrypt
      };                                                                                             
      if(err){
          return res.status(500).send({
              message: 'Error al buscar coincidencia de nombre'
          });
      };
      if(data && nombreecrypt.includes(nombre)){
          return res.status(200).send({
              message: 'El producto tecnologico ya esta registrado'
          });
      }
      // Buscar y actualizar unidad de medida
     ProTecn.findOneAndUpdate({_id: id}, protecn, {new:true}, (err, protecnUpdated) => {
        if(err || !protecnUpdated){
            return res.status(500).send({
                message: 'Error al actualizar documento'
            })
        };
        return res.status(200).send({
            status: 'success',
            user: protecnUpdated
        }); 
      }); 
  
  })
  };

module.exports = proTecnCtrl;