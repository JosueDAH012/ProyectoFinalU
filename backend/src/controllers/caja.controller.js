require("dotenv").config();
const aes256 = require("aes256");
const cajaCtrl = {};

const Caja = require('../models/Model.Caja');

const key = process.env.KEY;
const cipher = aes256.createCipher(key);

cajaCtrl.getCajas = (req, res) => {
    const cajas = [];
    Caja.find((err, caja) => {
      if (err || !caja) {
        return res.status(500).send({ message: "error en la base de datos" });
      }
      console.log(caja);
      caja.forEach((data) => {
        const caja = new Caja();
        caja._id = data._id;
        caja.consecutivo = data.consecutivo;
        caja.descripcion = cipher.decrypt(data.descripcion);
        caja.entradadinero = cipher.decrypt(data.entradadinero);
        caja.aperturacaja = cipher.decrypt(data.aperturacaja);
        caja.cierrecaja = cipher.decrypt(data.cierrecaja);
        caja.restaurante = cipher.decrypt(data.restaurante);
        cajas.push(caja);
      });
  
      return res.status(200).send({ caja: cajas });
    });
  };

cajaCtrl.createCaja = (req, res) => {
  //const para encriptar
  const descripcionencript = cipher.encrypt(req.body.descripcion);
  const entradadineroencript = cipher.encrypt(req.body.entradadinero);
  const aperturacajaencript = cipher.encrypt(req.body.aperturacaja);
  const cierrecajaencript = cipher.encrypt(req.body.cierrecaja);
  const restauranteencript = cipher.encrypt(req.body.restaurante);
  //console.log(parametros unidad de medida);
  const caja = new Caja({
    consecutivo: consecutivo,
    descripcion: descripcionencript,
    entradadinero: entradadineroencript, 
    aperturacaja: aperturacajaencript,
    cierrecaja: cierrecajaencript,
    restaurante: restauranteencript,
  });
  caja.save(function (error, caja) {
    if (error) {
      return res.status(500).json({
        message: error,
      });
    }
    return res.json(caja);
    //res.json({message: 'Unidad de medida creado'})
  });
};

cajaCtrl.getCaja = (req, res) => {
    const { id } = req.params;
    Caja
    .findOne({_id: id})
    .then((data) => {
      // console.log(data)
      const caja = new Caja()
      caja._id = data._id;
      caja.consecutivo = data.consecutivo;
      caja.descripcion = cipher.decrypt(data.descripcion);
      caja.entradadinero = cipher.decrypt(data.entradadinero);
      caja.aperturacaja = cipher.decrypt(data.aperturacaja);
      caja.cierrecaja = cipher.decrypt(data.cierrecaja);
      caja.restaurante = cipher.decrypt(data.restaurante);
      return res.status(200).send({caja: caja})
    })
    .catch((error) => res.json({ message: error }));
}

//eliminar una unidad de medida
cajaCtrl.deleteCaja = (req, res) => {
    const { id } = req.params;
    Caja
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

  //update una unidad de medida
  cajaCtrl.updateCaja = (req, res) => {
    const { id } = req.params;
    const {descripcion, entradadinero, aperturacaja, cierrecaja, restaurante } = req.body;
    const descripcioncrypt = cipher.encrypt(descripcion);
    const entradadinerocrypt = cipher.encrypt(entradadinero);
    const aperturacajacrypt = cipher.encrypt(aperturacaja);
    const cierrecajacrypt = cipher.encrypt(cierrecaja);
    const restaurantecrypt = cipher.encrypt(restaurante);
    //Validar si el email ya esta registrado
    Caja.findOne({_id: id}, (err, data) => {
      const descripcionncrypt = cipher.decrypt(data.descripcion)
      const caja = {
        descripcion: descripcioncrypt,
        entradadinero: entradadinerocrypt,
        aperturacaja: aperturacajacrypt,
        cierrecaja: cierrecajacrypt,
        restaurante: restaurantecrypt
      };                                                                                             
      if(err){
          return res.status(500).send({
              message: 'Error al buscar coincidencia de email'
          });
      };
      if(data && descripcionncrypt.includes(descripcion)){
          return res.status(200).send({
              message: 'La unidad de medida ya esta registrado'
          });
      }
      // Buscar y actualizar unidad de medida
     Caja.findOneAndUpdate({_id: id}, caja, {new:true}, (err, cajaUpdated) => {
        if(err || !cajaUpdated){
            return res.status(500).send({
                message: 'Error al actualizar documento'
            })
        };
        return res.status(200).send({
            status: 'success',
            user: cajaUpdated
        }); 
      }); 
  
  })
  };

  module.exports = cajaCtrl;