require("dotenv").config();
const aes256 = require("aes256");
const mesaCtrl = {};

const Mesa = require('../models/Model.Mesa');

const key = process.env.KEY;
const cipher = aes256.createCipher(key);

mesaCtrl.getMesas = (req, res) => {
    const mesas = [];
    Mesa.find((err, mesa) => {
      if (err || !mesa) {
        return res.status(500).send({ message: "error en la base de datos" });
      }
      console.log(mesa);
      mesa.forEach((data) => {
        const mesa = new Mesa();
        mesa._id = data._id;
        mesa.consecutivo = data.consecutivo;
        mesa.nombre = cipher.decrypt(data.nombre);
        mesa.numero = cipher.decrypt(data.numero);
        mesa.cantidadsillas = cipher.decrypt(data.cantidadsillas);
        mesa.restaurante = cipher.decrypt(data.restaurante);
        mesas.push(mesa);
      });
  
      return res.status(200).send({ mesa: mesas });
    });
  };

mesaCtrl.createMesa = (req, res) => {
  //const para encriptar
  const nombreencript = cipher.encrypt(req.body.nombre);
  const numeroencript = cipher.encrypt(req.body.numero);
  const cantidadsillasencript = cipher.encrypt(req.body.cantidadsillas);
  const restauranteencript = cipher.encrypt(req.body.restaurante);
  //console.log(parametros unidad de medida);
  const mesa = new Mesa({
    consecutivo: consecutivo,
    nombre: nombreencript,
    numero: numeroencript, 
    cantidadsillas: cantidadsillasencript,
    restaurante: restauranteencript,
  });
  mesa.save(function (error, mesa) {
    if (error) {
      return res.status(500).json({
        message: error,
      });
    }
    return res.json(mesa);
    //res.json({message: 'Unidad de medida creado'})
  });
};

mesaCtrl.getMesa = (req, res) => {
    const { id } = req.params;
    Mesa
    .findOne({_id: id})
    .then((data) => {
      // console.log(data)
      const mesa = new Mesa()
      mesa._id = data._id;
      mesa.consecutivo = data.consecutivo;
      mesa.nombre = cipher.decrypt(data.nombre);
      mesa.numero = cipher.decrypt(data.numero);
      mesa.cantidadsillas = cipher.decrypt(data.cantidadsillas);
      mesa.restaurante = cipher.decrypt(data.restaurante);
      return res.status(200).send({mesa: mesa})
    })
    .catch((error) => res.json({ message: error }));
}

//eliminar una unidad de medida
mesaCtrl.deleteMesa = (req, res) => {
    const { id } = req.params;
    Mesa
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

  //update una unidad de medida
  mesaCtrl.updateMesa = (req, res) => {
    const { id } = req.params;
    const {nombre, numero, cantidadsillas, restaurante} = req.body;
    const nombrecrypt = cipher.encrypt(nombre);
    const numerocrypt = cipher.encrypt(numero);
    const cantidadsillascrypt = cipher.encrypt(cantidadsillas);
    const restaurantecrypt = cipher.encrypt(restaurante);
    //Validar si el email ya esta registrado
    Mesa.findOne({_id: id}, (err, data) => {
      const nombreecrypt = cipher.decrypt(data.nombre)
      const mesa = {
        nombre: nombrecrypt,
        numero: numerocrypt,
        cantidadsillas: cantidadsillascrypt,
        restaurante: restaurantecrypt
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
     Mesa.findOneAndUpdate({_id: id}, mesa, {new:true}, (err, mesaUpdated) => {
        if(err || !mesaUpdated){
            return res.status(500).send({
                message: 'Error al actualizar documento'
            })
        };
        return res.status(200).send({
            status: 'success',
            user: mesaUpdated
        }); 
      }); 
  
  })
  };

module.exports = mesaCtrl;