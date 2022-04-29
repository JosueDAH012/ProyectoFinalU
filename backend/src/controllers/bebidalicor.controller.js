require("dotenv").config();
const aes256 = require("aes256");
const bebiLicorCtrl = {};

const BebiLicor = require('../models/Model.BebidaLicor');

const key = process.env.KEY;
const cipher = aes256.createCipher(key);

bebiLicorCtrl.getBebiLicors = (req, res) => {
    const bebilicors = [];
    BebiLicor.find((err, bebilicor) => {
      if (err || !bebilicor) {
        return res.status(500).send({ message: "error en la base de datos" });
      }
      console.log(bebilicor);
      bebilicor.forEach((data) => {
        const bebilicor = new BebiLicor();
        bebilicor._id = data._id;
        bebilicor.consecutivo = data.consecutivo;
        bebilicor.nombre = cipher.decrypt(data.nombre);
        bebilicor.restaurante = cipher.decrypt(data.restaurante);
        bebilicor.descripcion = cipher.decrypt(data.descripcion);
        bebilicor.foto = data.foto;
        bebilicor.cantidad = cipher.decrypt(data.cantidad);
        bebilicor.nacionalidad = cipher.decrypt(data.nacionalidad);
        bebilicor.preciounitario = cipher.decrypt(data.preciounitario);
        bebilicor.preciobotella = cipher.decrypt(data.preciobotella);
        bebilicor.marca = cipher.decrypt(data.marca);
        bebilicors.push(bebilicor);
      });
      return res.status(200).send({ bebilicor: bebilicors });
    });
  };

bebiLicorCtrl.createBebiLicor = (req, res) => {
  //const para encriptar
  const nombreencript = cipher.encrypt(req.body.nombre);
  const restauranteencript = cipher.encrypt(req.body.restaurante);
  const descripcionencript = cipher.encrypt(req.body.descripcion);
  const cantidadencript = cipher.encrypt(req.body.cantidad);
  const nacionalidadencript = cipher.encrypt(req.body.nacionalidad);
  const preciounitarioencript = cipher.encrypt(req.body.preciounitario);
  const preciobotellaencript = cipher.encrypt(req.body.preciobotella);
  const marcaencript = cipher.encrypt(req.body.marca);
  //console.log(parametros unidad de medida);
  const bebilicor = new BebiLicor({
    consecutivo: consecutivo,
    nombre: nombreencript,
    restaurante: restauranteencript,
    descripcion: descripcionencript,
    foto: foto,
    cantidad: cantidadencript, 
    nacionalidad: nacionalidadencript,
    preciounitario: preciounitarioencript, 
    preciobotella: preciobotellaencript,
    marca: marcaencript
  });
  bebilicor.save(function (error, bebilicor) {
    if (error) {
      return res.status(500).json({
        message: error,
      });
    }
    return res.json(bebilicor);
    //res.json({message: 'Unidad de medida creado'})
  });
};

bebiLicorCtrl.getBebiLicor = (req, res) => {
    const { id } = req.params;
    BebiLicor
    .findOne({_id: id})
    .then((data) => {
      // console.log(data)
      const bebilicor = new BebiLicor()
      bebilicor._id = data._id;
      bebilicor.consecutivo = data.consecutivo;
      bebilicor.unidadmedida = cipher.decrypt(data.unidadmedida);
      bebilicor.escala = cipher.decrypt(data.escala);
      bebilicor.detalle = cipher.decrypt(data.detalle);
      bebilicor.simbologia = cipher.decrypt(data.simbologia);
      return res.status(200).send({bebilicor: bebilicor})
    })
    .catch((error) => res.json({ message: error }));
}

//eliminar una unidad de medida
bebiLicorCtrl.deleteBebiLicor = (req, res) => {
    const { id } = req.params;
    BebiLicor
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

  //update una unidad de medida
  bebiLicorCtrl.updateBebiLicor = (req, res) => {
    const { id } = req.params;
    const {unidadmedida, escala, detalle, simbologia} = req.body;
    const unidadmedidacrypt = cipher.encrypt(unidadmedida);
    const escalacrypt = cipher.encrypt(escala);
    const detallecrypt = cipher.encrypt(detalle);
    const simbologiacrypt = cipher.encrypt(simbologia);
    //Validar si el email ya esta registrado
    BebiLicor.findOne({_id: id}, (err, data) => {
      const unidaddemedidacrypt = cipher.decrypt(data.unidadmedida)
      const bebilicor = {
        unidadmedida: unidadmedidacrypt,
        escala: escalacrypt,
        detalle: detallecrypt,
        simbologia: simbologiacrypt
      };                                                                                             
      if(err){
          return res.status(500).send({
              message: 'Error al buscar coincidencia de email'
          });
      };
      if(data && unidaddemedidacrypt.includes(unidadmedida)){
          return res.status(200).send({
              message: 'La unidad de medida ya esta registrado'
          });
      }
      // Buscar y actualizar unidad de medida
     BebiLicor.findOneAndUpdate({_id: id}, bebilicor, {new:true}, (err, bebilicorUpdated) => {
        if(err || !bebilicorUpdated){
            return res.status(500).send({
                message: 'Error al actualizar documento'
            })
        };
        return res.status(200).send({
            status: 'success',
            user: bebilicorUpdated
        }); 
      }); 
  
  })
  };

module.exports = bebiLicorCtrl;