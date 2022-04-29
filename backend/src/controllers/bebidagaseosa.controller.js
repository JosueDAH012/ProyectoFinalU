require("dotenv").config();
const aes256 = require("aes256");
const bebiGaseCtrl = {};

const BebiGase = require('../models/Model.BebidaGaseosa');

const key = process.env.KEY;
const cipher = aes256.createCipher(key);

bebiGaseCtrl.getBebiGases = (req, res) => {
    const bebigases = [];
    BebiGase.find((err, bebigase) => {
      if (err || !bebigase) {
        return res.status(500).send({ message: "error en la base de datos" });
      }
      console.log(bebigase);
      bebigase.forEach((data) => {
        const bebigase = new BebiGase();
        bebigase._id = data._id;
        bebigase.consecutivo = data.consecutivo;
        bebigase.nombre = cipher.decrypt(data.nombre);
        bebigase.precio = cipher.decrypt(data.precio);
        bebigase.restaurante = cipher.decrypt(data.restaurante);
        bebigase.descripcion = cipher.decrypt(data.descripcion);
        bebigase.foto = data.foto;
        bebigase.cantidad = cipher.decrypt(data.cantidad);
        bebigase.nacionalidad = cipher.decrypt(data.nacionalidad);
        bebigase.marca = cipher.decrypt(data.marca);
        bebigases.push(bebigase);
      });
  
      return res.status(200).send({ bebigase: bebigases });
    });
  };

bebiGaseCtrl.createBebiGase = (req, res) => {
  //const para encriptar
  const nombreencript = cipher.encrypt(req.body.nombre);
  const precioencript = cipher.encrypt(req.body.precio);
  const restauranteencript = cipher.encrypt(req.body.restaurante);
  const descripcionencript = cipher.encrypt(req.body.descripcion);
  const cantidadencript = cipher.encrypt(req.body.cantidad);
  const nacionalidadencript = cipher.encrypt(req.body.nacionalidad);
  const marcaencript = cipher.encrypt(req.body.marca);

  //console.log(parametros unidad de medida);
  const bebigase = new BebiGase({
    consecutivo: consecutivo,
    nombre: nombreencript,
    precio: precioencript,
    restaurante: restauranteencript,
    descripcion: descripcionencript,
    foto: foto,
    cantidad: cantidadencript, 
    nacionalidad: nacionalidadencript,
    marca: marcaencript
  });
  bebigase.save(function (error, bebigase) {
    if (error) {
      return res.status(500).json({
        message: error,
      });
    }
    return res.json(bebigase);
    //res.json({message: 'Unidad de medida creado'})
  });
};

bebiGaseCtrl.getBebiGase = (req, res) => {
    const { id } = req.params;
    BebiGase
    .findOne({_id: id})
    .then((data) => {
      // console.log(data)
      const bebigase = new BebiGase()
      bebigase._id = data._id;
      bebigase.consecutivo = data.consecutivo;
      bebigase.unidadmedida = cipher.decrypt(data.unidadmedida);
      bebigase.escala = cipher.decrypt(data.escala);
      bebigase.detalle = cipher.decrypt(data.detalle);
      bebigase.simbologia = cipher.decrypt(data.simbologia);
      return res.status(200).send({bebigase: bebigase})
    })
    .catch((error) => res.json({ message: error }));
}

//eliminar una unidad de medida
bebiGaseCtrl.deleteBebiGase = (req, res) => {
    const { id } = req.params;
    BebiGase
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

  //update una unidad de medida
  bebiGaseCtrl.updateBebiGase = (req, res) => {
    const { id } = req.params;
    const {nombre, precio, restaurante, descripcion, cantidad, nacionalidad, marca} = req.body;
    const nombrecrypt = cipher.encrypt(nombre);
    const preciocrypt = cipher.encrypt(precio);
    const restaurantecrypt = cipher.encrypt(restaurante);
    const descripcioncrypt = cipher.encrypt(descripcion);
    const cantidadcrypt = cipher.encrypt(cantidad);
    const nacionalidadcrypt = cipher.encrypt(nacionalidad);
    const marcacrypt = cipher.encrypt(marca);
    //Validar si el email ya esta registrado
    BebiGase.findOne({_id: id}, (err, data) => {
      const nombreecrypt = cipher.decrypt(data.nombre)
      const bebigase = {
        nombre: nombrecrypt,
        precio: preciocrypt,
        restaurante: restaurantecrypt,
        descripcion: descripcioncrypt,
        cantidad: cantidadcrypt,
        nacionalidad: nacionalidadcrypt,
        marca: marcacrypt
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
     BebiGase.findOneAndUpdate({_id: id}, bebigase, {new:true}, (err, bebigaseUpdated) => {
        if(err || !bebigaseUpdated){
            return res.status(500).send({
                message: 'Error al actualizar documento'
            })
        };
        return res.status(200).send({
            status: 'success',
            user: bebigaseUpdated
        }); 
      }); 
  
  })
  };

module.exports = bebiGaseCtrl;