require("dotenv").config();
const aes256 = require("aes256");
const otrosCtrl = {};

const Otros = require('../models/Model.Otros');

const key = process.env.KEY;
const cipher = aes256.createCipher(key);

otrosCtrl.getOtross = (req, res) => {
    const otross = [];
    Otros.find((err, otros) => {
      if (err || !otros) {
        return res.status(500).send({ message: "error en la base de datos" });
      }
      console.log(otros);
      otros.forEach((data) => {
        const otros = new Otros();
        otros._id = data._id;
        otros.tipobuffet = cipher.decrypt(data.tipobuffet);
        otros.tipofacturacion = cipher.decrypt(data.tipofacturacion);
        otros.clasecomestible = cipher.decrypt(data.clasecomestible);
        otros.lineacomestible = cipher.decrypt(data.lineacomestible);
        otros.tipocomestible = cipher.decrypt(data.tipocomestible);
        otross.push(otros);
      });
  
      return res.status(200).send({ otros: otross });
    });
  };

otrosCtrl.createOtros = (req, res) => {
  //const para encriptar
  const tipobuffetencript = cipher.encrypt(req.body.tipobuffet);
  const tipofacturacionencript = cipher.encrypt(req.body.tipofacturacion);
  const clasecomestibleencript = cipher.encrypt(req.body.clasecomestible);
  const lineacomestibleencript = cipher.encrypt(req.body.lineacomestible);
  const tipocomestibleencript = cipher.encrypt(req.body.tipocomestible);
  //console.log(parametros unidad de medida);
  const otros = new Otros({
    tipobuffet: tipobuffetencript,
    tipofacturacion: tipofacturacionencript,
    clasecomestible: clasecomestibleencript, 
    lineacomestible: lineacomestibleencript,
    tipocomestible: tipocomestibleencript,
  });
  otros.save(function (error, otros) {
    if (error) {
      return res.status(500).json({
        message: error,
      });
    }
    return res.json(otros);
    //res.json({message: 'Unidad de medida creado'})
  });
};

otrosCtrl.getOtros = (req, res) => {
    const { id } = req.params;
    Otros
    .findOne({_id: id})
    .then((data) => {
      // console.log(data)
      const otros = new Otros()
      otros._id = data._id;
      otros.consecutivo = data.consecutivo;
      otros.unidadmedida = cipher.decrypt(data.unidadmedida);
      otros.escala = cipher.decrypt(data.escala);
      otros.detalle = cipher.decrypt(data.detalle);
      otros.simbologia = cipher.decrypt(data.simbologia);
      return res.status(200).send({otros: otros})
    })
    .catch((error) => res.json({ message: error }));
}

//eliminar una unidad de medida
otrosCtrl.deleteOtros = (req, res) => {
    const { id } = req.params;
    Otros
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };


module.exports = otrosCtrl;