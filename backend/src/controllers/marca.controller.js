require("dotenv").config();
const aes256 = require("aes256");
const marcaCtrl = {};

const Marca = require('../models/Model.Marca');

const key = process.env.KEY;
const cipher = aes256.createCipher(key);

bebiCaleCtrl.getBebiCales = (req, res) => {
    const umedidas = [];
    BebiCale.find((err, umedida) => {
      if (err || !umedida) {
        return res.status(500).send({ message: "error en la base de datos" });
      }
      console.log(umedida);
      umedida.forEach((data) => {
        const umedida = new BebiCale();
        umedida._id = data._id;
        umedida.consecutivo = data.consecutivo;
        umedida.nombre = cipher.decrypt(data.nombre);
        umedida.ingredientes = cipher.decrypt(data.ingredientes);
        umedida.precio = cipher.decrypt(data.precio);
        umedida.restaurante = cipher.decrypt(data.restaurante);
        umedida.descripcion = cipher.decrypt(data.descripcion);
        umedida.foto = data.foto;
        umedidas.push(umedida);
      });
  
      return res.status(200).send({ umedida: umedidas });
    });
  };

bebiCaleCtrl.createBebiCale = (req, res) => {
  //const para encriptar
  const nombreencript = cipher.encrypt(req.body.nombre);
  const ingredientesencript = cipher.encrypt(req.body.ingredientes);
  const precioencript = cipher.encrypt(req.body.precio);
  const restauranteencript = cipher.encrypt(req.body.restaurante);
  const descripcionencript = cipher.encrypt(req.body.descripcion);
  //console.log(parametros unidad de medida);
  const umedida = new BebiCale({
    consecutivo: consecutivo,
    nombre: nombreencript,
    ingredientes: ingredientesencript, 
    precio: precioencript,
    restaurante: restauranteencript,
    descripcion: descripcionencript,
    foto: foto,
  });
  umedida.save(function (error, umedida) {
    if (error) {
      return res.status(500).json({
        message: error,
      });
    }
    return res.json(umedida);
    //res.json({message: 'Unidad de medida creado'})
  });
};

bebiCaleCtrl.getBebiCale = (req, res) => {
    const { id } = req.params;
    BebiCale
    .findOne({id: id})
    .then((data) => {
      // console.log(data)
      const umedida = new BebiCale()
      umedida._id = data._id;
      umedida.consecutivo = data.consecutivo;
      umedida.unidadmedida = cipher.decrypt(data.unidadmedida);
      umedida.escala = cipher.decrypt(data.escala);
      umedida.detalle = cipher.decrypt(data.detalle);
      umedida.simbologia = cipher.decrypt(data.simbologia);
      return res.status(200).send({umedida: umedida})
    })
    .catch((error) => res.json({ message: error }));
}

//eliminar una unidad de medida
bebiCaleCtrl.deleteBebiCale = (req, res) => {
    const { id } = req.params;
    BebiCale
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

  //update una unidad de medida
  bebiCaleCtrl.updateBebiCale = (req, res) => {
    const { id } = req.params;
    const {unidadmedida, escala, detalle, simbologia} = req.body;
    const unidadmedidacrypt = cipher.encrypt(unidadmedida);
    const escalacrypt = cipher.encrypt(escala);
    const detallecrypt = cipher.encrypt(detalle);
    const simbologiacrypt = cipher.encrypt(simbologia);
    //Validar si el email ya esta registrado
    BebiCale.findOne({_id: id}, (err, data) => {
      const unidaddemedidacrypt = cipher.decrypt(data.unidadmedida)
      const umedida = {
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
     BebiCale.findOneAndUpdate({_id: id}, umedida, {new:true}, (err, umedidaUpdated) => {
        if(err || !umedidaUpdated){
            return res.status(500).send({
                message: 'Error al actualizar documento'
            })
        };
        return res.status(200).send({
            status: 'success',
            user: umedidaUpdated
        }); 
      }); 
  
  })
  };

module.exports = marcaCtrl;