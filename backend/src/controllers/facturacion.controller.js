require("dotenv").config();
const aes256 = require("aes256");
const facturacionCtrl = {};

const Facturacion = require('../models/Model.Facturacion');

const key = process.env.KEY;
const cipher = aes256.createCipher(key);

facturacionCtrl.getFacturacions = (req, res) => {
    const facturacions = [];
    Facturacion.find((err, facturacion) => {
      if (err || !facturacion) {
        return res.status(500).send({ message: "error en la base de datos" });
      }
      console.log(facturacion);
      facturacion.forEach((data) => {
        const facturacion = new Facturacion();
        facturacion._id = data._id;
        facturacion.consecutivo = data.consecutivo;
        facturacion.tipofecha = data.tipofecha;
        facturacion.descripcion = cipher.decrypt(data.descripcion);
        facturacion.monto = cipher.decrypt(data.monto);
        facturacion.restaurante = cipher.decrypt(data.restaurante);
        facturacions.push(facturacion);
      });
  
      return res.status(200).send({ facturacion: facturacions });
    });
  };

facturacionCtrl.createFacturacion = (req, res) => {
  //const para encriptar
  const descripcionencript = cipher.encrypt(req.body.descripcion);
  const montoencript = cipher.encrypt(req.body.monto);
  const restauranteencript = cipher.encrypt(req.body.restaurante);

  //console.log(parametros unidad de medida);
  const facturacion = new Facturacion({
    consecutivo: consecutivo,
    tipofecha: tipofecha,
    descripcion: descripcionencript, 
    monto: montoencript,
    restaurante: restauranteencript,
  });
  facturacion.save(function (error, facturacion) {
    if (error) {
      return res.status(500).json({
        message: error,
      });
    }
    return res.json(facturacion);
    //res.json({message: 'Unidad de medida creado'})
  });
};

facturacionCtrl.getFacturacion = (req, res) => {
    const { id } = req.params;
    Facturacion
    .findOne({_id: id})
    .then((data) => {
      // console.log(data)
      const facturacion = new Facturacion()
      facturacion._id = data._id;
      facturacion.consecutivo = data.consecutivo;
      facturacion.tipofecha = data.tipofecha;
      facturacion.descripcion = cipher.decrypt(data.descripcion);
      facturacion.monto = cipher.decrypt(data.monto);
      facturacion.restaurante = cipher.decrypt(data.restaurante);
      return res.status(200).send({facturacion: facturacion})
    })
    .catch((error) => res.json({ message: error }));
}

//eliminar una unidad de medida
facturacionCtrl.deleteFacturacion = (req, res) => {
    const { id } = req.params;
    Facturacion
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

  //update una unidad de medida
  facturacionCtrl.updateFacturacion = (req, res) => {
    const { id } = req.params;
    const {descripcion, monto, restaurante} = req.body;
    const descripcioncrypt = cipher.encrypt(descripcion);
    const montocrypt = cipher.encrypt(monto);
    const restaurantecrypt = cipher.encrypt(restaurante);
    //Validar si el email ya esta registrado
    Facturacion.findOne({_id: id}, (err, data) => {
      const descripcionncrypt = cipher.decrypt(data.descripcion)
      const facturacion = {
        descripcion: descripcioncrypt,
        monto: montocrypt,
        restaurante: restaurantecrypt,

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
     Facturacion.findOneAndUpdate({_id: id}, facturacion, {new:true}, (err, facturacionUpdated) => {
        if(err || !facturacionUpdated){
            return res.status(500).send({
                message: 'Error al actualizar documento'
            })
        };
        return res.status(200).send({
            status: 'success',
            user: facturacionUpdated
        }); 
      }); 
  
  })
  };

module.exports = facturacionCtrl;