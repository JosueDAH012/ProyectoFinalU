require("dotenv").config();
const aes256 = require("aes256");
const buffetCtrl = {};

const Buffet = require('../models/Model.Buffet');

const key = process.env.KEY;
const cipher = aes256.createCipher(key);

buffetCtrl.getBuffets = (req, res) => {
    const buffets = [];
    Buffet.find((err, buffet) => {
      if (err || !buffet) {
        return res.status(500).send({ message: "error en la base de datos" });
      }
      console.log(buffet);
      buffet.forEach((data) => {
        const buffet = new Buffet();
        buffet._id = data._id;
        buffet.consecutivo = data.consecutivo;
        buffet.nombre = cipher.decrypt(data.nombre);
        buffet.precio = cipher.decrypt(data.precio);
        buffet.tipo = cipher.decrypt(data.tipo);
        buffet.unidaddemedida = cipher.decrypt(data.unidaddemedida);
        buffet.foto = data.foto;
        buffets.push(buffet);
      });
  
      return res.status(200).send({ buffet: buffets });
    });
  };

buffetCtrl.createBuffet = (req, res) => {
  //const para encriptar
  const nombreencript = cipher.encrypt(req.body.nombre);
  const precioencript = cipher.encrypt(req.body.precio);
  const tipoencript = cipher.encrypt(req.body.tipo);
  const unidaddemedidaencript = cipher.encrypt(req.body.unidaddemedida);
  //console.log(parametros unidad de medida);
  const buffet = new Buffet({
    consecutivo: consecutivo,
    nombre: nombreencript,
    precio: precioencript,
    tipo: tipoencript, 
    unidaddemedida: unidaddemedidaencript,
    foto: foto,
  });
  buffet.save(function (error, buffet) {
    if (error) {
      return res.status(500).json({
        message: error,
      });
    }
    return res.json(buffet);
    //res.json({message: 'Unidad de medida creado'})
  });
};

buffetCtrl.getBuffet = (req, res) => {
    const { id } = req.params;
    Buffet
    .findOne({_id: id})
    .then((data) => {
      // console.log(data)
      const buffet = new Buffet()
      buffet._id = data._id;
      buffet.consecutivo = data.consecutivo;
      buffet.nombre = cipher.decrypt(data.nombre);
      buffet.precio = cipher.decrypt(data.precio);
      buffet.tipo = cipher.decrypt(data.tipo);
      buffet.unidaddemedida = cipher.decrypt(data.unidaddemedida);
      buffet.foto = data.foto;
      return res.status(200).send({buffet: buffet})
    })
    .catch((error) => res.json({ message: error }));
}

//eliminar una unidad de medida
buffetCtrl.deleteBuffet = (req, res) => {
    const { id } = req.params;
    Buffet
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

  //update una unidad de medida
  buffetCtrl.updateBuffet = (req, res) => {
    const { id } = req.params;
    const {nombre, precio, tipo, unidaddemedida} = req.body;
    const nombrecrypt = cipher.encrypt(nombre);
    const preciocrypt = cipher.encrypt(precio);
    const tipocrypt = cipher.encrypt(tipo);
    const unidaddemedidacrypt = cipher.encrypt(unidaddemedida);
    //Validar si el email ya esta registrado
    Buffet.findOne({_id: id}, (err, data) => {
      const nombreecrypt = cipher.decrypt(data.nombre)
      const buffet = {
        nombre: nombrecrypt,
        precio: preciocrypt,
        tipo: tipocrypt,
        unidaddemedida: unidaddemedidacrypt
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
     Buffet.findOneAndUpdate({_id: id}, buffet, {new:true}, (err, buffetUpdated) => {
        if(err || !buffetUpdated){
            return res.status(500).send({
                message: 'Error al actualizar documento'
            })
        };
        return res.status(200).send({
            status: 'success',
            user: buffetUpdated
        }); 
      }); 
  
  })
  };

  module.exports = buffetCtrl;