require("dotenv").config();
const aes256 = require("aes256");
const uMedidaCtrl = {};

const UMedida = require("../models/Model.UnidadesMedida");

const key = process.env.KEY;
const cipher = aes256.createCipher(key);

uMedidaCtrl.getUniMeS = (req, res) => {
    const umedidas = [];
    UMedida.find((err, umedida) => {
      if (err || !umedida) {
        return res.status(500).send({ message: "error en la base de datos" });
      }
      console.log(umedida);
      umedida.forEach((data) => {
        const umedida = new UMedida();
        umedida._id = data._id;
        umedida.consecutivo = data.consecutivo;
        umedida.numeracion = data.numeracion;
        umedida.unidadmedida = cipher.decrypt(data.unidadmedida);
        umedida.escala = cipher.decrypt(data.escala);
        umedida.detalle = cipher.decrypt(data.detalle);
        umedida.simbologia = cipher.decrypt(data.simbologia);
        umedidas.push(umedida);
      });
  
      return res.status(200).send({ umedida: umedidas });
    });
  };

uMedidaCtrl.createUniMe = (req, res) => {
  //const para encriptar
  const unidadmencript = cipher.encrypt(req.body.unidadmedida);
  const escalaencript = cipher.encrypt(req.body.escala);
  const detalleencript = cipher.encrypt(req.body.detalle);
  const simbologiaencript = cipher.encrypt(req.body.simbologia);
  //console.log(parametros unidad de medida);
  const umedida = new UMedida({
    consecutivo: consecutivo,
    numeracion: numeracion,
    unidadmedida: unidadmencript,
    escala: escalaencript,
    detalle: detalleencript,
    simbologia: simbologiaencript
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

uMedidaCtrl.getUniMe = (req, res) => {
    const { id } = req.params;
    UMedida
    .findOne({id: id})
    .then((data) => {
      // console.log(data)
      const umedida = new UMedida()
      umedida._id = data._id;
      umedida.consecutivo = data.consecutivo;
      umedida.numeracion = data.numeracion;
      umedida.unidadmedida = cipher.decrypt(data.unidadmedida);
      umedida.escala = cipher.decrypt(data.escala);
      umedida.detalle = cipher.decrypt(data.detalle);
      umedida.simbologia = cipher.decrypt(data.simbologia);
      return res.status(200).send({umedida: umedida})
    })
    .catch((error) => res.json({ message: error }));
}

//eliminar una unidad de medida
uMedidaCtrl.deleteUniMe = (req, res) => {
    const { id } = req.params;
    UMedida
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

  //update una unidad de medida
  uMedidaCtrl.updateUniMe = (req, res) => {
    const { id } = req.params;
    const {unidadmedida, escala, detalle, simbologia} = req.body;
    const unidadmedidacrypt = cipher.encrypt(unidadmedida);
    const escalacrypt = cipher.encrypt(escala);
    const detallecrypt = cipher.encrypt(detalle);
    const simbologiacrypt = cipher.encrypt(simbologia);
    //Validar si el email ya esta registrado
    UMedida.findOne({_id: id}, (err, data) => {
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
     UMedida.findOneAndUpdate({_id: id}, umedida, {new:true}, (err, umedidaUpdated) => {
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

module.exports = uMedidaCtrl;
