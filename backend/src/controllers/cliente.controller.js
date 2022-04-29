require("dotenv").config();
const aes256 = require("aes256");
const clienteCtrl = {};

const Cliente = require('../models/Model.Cliente');

const key = process.env.KEY;
const cipher = aes256.createCipher(key);

clienteCtrl.getClientes = (req, res) => {
    const clientes = [];
    Cliente.find((err, cliente) => {
      if (err || !cliente) {
        return res.status(500).send({ message: "error en la base de datos" });
      }
      console.log(cliente);
      cliente.forEach((data) => {
        const cliente = new Cliente();
        cliente._id = data._id;
        cliente.consecutivo = data.consecutivo;
        cliente.nombrecompleto = cipher.decrypt(data.nombrecompleto);
        cliente.montopagado = cipher.decrypt(data.montopagado);
        cliente.detalle = cipher.decrypt(data.detalle);
        cliente.fechaventa = cipher.decrypt(data.fechaventa);
        cliente.reservacion = cipher.decrypt(data.reservacion);
        cliente.restaurante = cipher.decrypt(data.restaurante);
        clientes.push(cliente);
      });
  
      return res.status(200).send({ cliente: clientes });
    });
  };

clienteCtrl.createCliente = (req, res) => {
  //const para encriptar
  const nombrecompletoencript = cipher.encrypt(req.body.nombrecompleto);
  const montopagadoencript = cipher.encrypt(req.body.montopagado);
  const detalleencript = cipher.encrypt(req.body.detalle);
  const fechaventaencript = cipher.encrypt(req.body.fechaventa);
  const reservacionencript = cipher.encrypt(req.body.reservacion);
  const restauranteencript = cipher.encrypt(req.body.restaurante);
  //console.log(parametros unidad de medida);
  const cliente = new Cliente({
    consecutivo: consecutivo,
    nombrecompleto: nombrecompletoencript,
    montopagado: montopagadoencript, 
    detalle: detalleencript,
    fechaventa: fechaventaencript,
    reservacion: reservacionencript,
    restaurante: restauranteencript,
    foto: foto,
  });
  cliente.save(function (error, cliente) {
    if (error) {
      return res.status(500).json({
        message: error,
      });
    }
    return res.json(cliente);
    //res.json({message: 'Unidad de medida creado'})
  });
};

clienteCtrl.getCliente = (req, res) => {
    const { id } = req.params;
    Cliente
    .findOne({_id: id})
    .then((data) => {
      // console.log(data)
      const cliente = new Cliente()
      cliente._id = data._id;
      cliente.consecutivo = data.consecutivo;
      cliente.nombrecompleto = cipher.decrypt(data.nombrecompleto);
      cliente.montopagado = cipher.decrypt(data.montopagado);
      cliente.detalle = cipher.decrypt(data.detalle);
      cliente.fechaventa = cipher.decrypt(data.fechaventa);
      cliente.reservacion = cipher.decrypt(data.reservacion);
      cliente.restaurante = cipher.decrypt(data.restaurante);
      return res.status(200).send({cliente: cliente})
    })
    .catch((error) => res.json({ message: error }));
}

//eliminar una unidad de medida
clienteCtrl.deleteCliente = (req, res) => {
    const { id } = req.params;
    Cliente
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

  //update una unidad de medida
  clienteCtrl.updateCliente = (req, res) => {
    const { id } = req.params;
    const {nombrecompleto, montopagado, detalle, fechaventa, reservacion, restaurante } = req.body;
    const nombrecompletocrypt = cipher.encrypt(nombrecompleto);
    const montopagadocrypt = cipher.encrypt(montopagado);
    const detallecrypt = cipher.encrypt(detalle);
    const fechaventacrypt = cipher.encrypt(fechaventa);
    const reservacioncrypt = cipher.encrypt(reservacion);
    const restaurantecrypt = cipher.encrypt(restaurante);
    //Validar si el email ya esta registrado
    Cliente.findOne({_id: id}, (err, data) => {
      const nombrecompletoocrypt = cipher.decrypt(data.nombrecompleto)
      const cliente = {
        nombrecompleto: nombrecompletocrypt,
        montopagado: montopagadocrypt,
        detalle: detallecrypt,
        fechaventa: fechaventacrypt,
        reservacion: reservacioncrypt,
        restaurante: restaurantecrypt
      };                                                                                             
      if(err){
          return res.status(500).send({
              message: 'Error al buscar coincidencia de email'
          });
      };
      if(data && nombrecompletoocrypt.includes(nombrecompleto)){
          return res.status(200).send({
              message: 'La unidad de medida ya esta registrado'
          });
      }
      // Buscar y actualizar unidad de medida
     Cliente.findOneAndUpdate({_id: id}, cliente, {new:true}, (err, clienteUpdated) => {
        if(err || !clienteUpdated){
            return res.status(500).send({
                message: 'Error al actualizar documento'
            })
        };
        return res.status(200).send({
            status: 'success',
            user: clienteUpdated
        }); 
      }); 
  
  })
  };

module.exports = clienteCtrl;