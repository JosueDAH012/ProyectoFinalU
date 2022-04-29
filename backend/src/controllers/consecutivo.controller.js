require("dotenv").config();
const aes256 = require("aes256");
const consecutivoCtrl = {};

const Consecutivo = require('../models/Model.Consecutivo');

const key = process.env.KEY;
const cipher = aes256.createCipher(key);

consecutivoCtrl.getConsecutivos = (req, res) => {
    const consecutivos = [];
    Consecutivo.find((err, consecutivo) => {
      if (err || !consecutivo) {
        return res.status(500).send({ message: "error en la base de datos" });
      }
      //console.log(consecutivo);
      consecutivo.forEach((data) => {
        const consecutivo = new Consecutivo();
        consecutivo._id = data._id;
        consecutivo.codigo = cipher.decrypt(data.codigo);
        consecutivo.descripcion = cipher.decrypt(data.descripcion);
        consecutivos.push(consecutivo);
      });
  
      return res.status(200).send({ consecutivo: consecutivos });
    });
  };

consecutivoCtrl.createConsecutivo = (req, res) => {
  //const para encriptar
  const codigoencript = cipher.encrypt(req.body.codigo);
  const descripcionencript = cipher.encrypt(req.body.descripcion);
  //console.log(parametros unidad de medida);
  const consecutivo = new Consecutivo({
    codigo: codigoencript,
    descripcion: descripcionencript,
  });
  consecutivo.save(function (error, consecutivo) {
    if (error) {
      return res.status(500).json({
        message: error,
      });
    }
    return res.json(consecutivo);
    //res.json({message: 'Unidad de medida creado'})
  });
};

consecutivoCtrl.getConsecutivo = (req, res) => {
    const { id } = req.params;
    Consecutivo
    .findOne({_id: id})
    .then((data) => {
      // console.log(data)
      const consecutivo = new Consecutivo()
      consecutivo._id = data._id;
      consecutivo.codigo =cipher.decrypt(data.codigo);
      consecutivo.descripcion = cipher.decrypt(data.descripcion);
      return res.status(200).send({consecutivo: consecutivo})
    })
    .catch((error) => res.json({ message: error }));
}

//eliminar una unidad de medida
consecutivoCtrl.deleteConsecutivo = (req, res) => {
    const { id } = req.params;
    Consecutivo
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

  //update una unidad de medida
  consecutivoCtrl.updateConsecutivo = (req, res) => {
    const { id } = req.params;
    const {codigo, descripcion} = req.body;
    const codigocrypt = cipher.encrypt(codigo);
    const descripcioncrypt = cipher.encrypt(descripcion);
    //Validar si el email ya esta registrado
    Consecutivo.findOne({_id: id}, (err, data) => {
      const codigoocrypt = cipher.decrypt(data.codigo)
      const consecutivo = {
        codigo: codigocrypt,
        descripcion: descripcioncrypt,
      };                                                                                             
      if(err){
          return res.status(500).send({
              message: 'Error al buscar coincidencia de email'
          });
      };
      if(data && codigoocrypt.includes(codigo)){
          return res.status(200).send({
              message: 'La unidad de medida ya esta registrado'
          });
      }
      // Buscar y actualizar unidad de medida
     Consecutivo.findOneAndUpdate({_id: id}, consecutivo, {new:true}, (err, consecutivoUpdated) => {
        if(err || !consecutivoUpdated){
            return res.status(500).send({
                message: 'Error al actualizar documento'
            })
        };
        return res.status(200).send({
            status: 'success',
            user: consecutivoUpdated
        }); 
      }); 
  
  })
  };

module.exports = consecutivoCtrl;