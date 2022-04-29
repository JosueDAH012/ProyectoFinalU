require("dotenv").config();
const aes256 = require("aes256");
const proDesechCtrl = {};

const ProDesch = require('../models/Model.ProductosDesechable');

const key = process.env.KEY;
const cipher = aes256.createCipher(key);

proDesechCtrl.getProDeschs = (req, res) => {
    const prodeschs = [];
    ProDesch.find((err, prodesch) => {
      if (err || !prodesch) {
        return res.status(500).send({ message: "error en la base de datos" });
      }
      console.log(prodesch);
      prodesch.forEach((data) => {
        const prodesch = new ProDesch();
        prodesch._id = data._id;
        prodesch.consecutivo = data.consecutivo;
        prodesch.numeracion = data.numeracion;
        prodesch.nombre = cipher.decrypt(data.nombre);
        prodesch.descripcion = cipher.decrypt(data.descripcion);
        prodesch.cantidad = cipher.decrypt(data.cantidad);
        prodesch.restaurante = cipher.decrypt(data.restaurante);
        prodesch.marca = cipher.decrypt(data.marca);
        prodeschs.push(prodesch);
      });
  
      return res.status(200).send({ prodesch: prodeschs });
    });
  };

proDesechCtrl.createProDesch = (req, res) => {
  //const para encriptar
  const nombreencript = cipher.encrypt(req.body.nombre);
  const descripcionencript = cipher.encrypt(req.body.descripcion);
  const cantidadencript = cipher.encrypt(req.body.cantidad);
  const restauranteencript = cipher.encrypt(req.body.restaurante);
  const marcaencript = cipher.encrypt(req.body.marca)
  //console.log(parametros unidad de medida);
  const prodesch = new ProDesch({
    consecutivo: consecutivo,
    numeracion: numeracion,
    nombre: nombreencript,
    descripcion: descripcionencript,
    cantidad: cantidadencript,
    restaurante: restauranteencript,
    marca: marcaencript
  });
  prodesch.save(function (error, prodesch) {
    if (error) {
      return res.status(500).json({
        message: error,
      });
    }
    return res.json(prodesch);
    //res.json({message: 'Unidad de medida creado'})
  });
};

proDesechCtrl.getProDesch = (req, res) => {
    const { id } = req.params;
    ProDesch
    .findOne({_id: id})
    .then((data) => {
      // console.log(data)
      const prodesch = new ProDesch()
      prodesch._id = data._id;
      prodesch.consecutivo = data.consecutivo;
      prodesch.numeracion = data.numeracion;
      prodesch.nombre = cipher.decrypt(data.nombre);
      prodesch.descripcion = cipher.decrypt(data.descripcion);
      prodesch.cantidad = cipher.decrypt(data.cantidad);
      prodesch.restaurante = cipher.decrypt(data.restaurante);
      prodesch.marca = cipher.decrypt(data.marca);
      return res.status(200).send({prodesch: prodesch})
    })
    .catch((error) => res.json({ message: error }));
}

//eliminar una unidad de medida
proDesechCtrl.deleteProDesch = (req, res) => {
    const { id } = req.params;
    ProDesch
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

  //update una unidad de medida
  proDesechCtrl.updateProDesch = (req, res) => {
    const { id } = req.params;
    const {nombre, descripcion, cantidad, restaurante} = req.body;
    const nombrecrypt = cipher.encrypt(nombre);
    const descripcioncrypt = cipher.encrypt(descripcion);
    const cantidadcrypt = cipher.encrypt(cantidad);
    const restaurantecrypt = cipher.encrypt(restaurante);
    const marcacrypt = cipher.encrypt(marca)
    //Validar si el email ya esta registrado
    ProDesch.findOne({_id: id}, (err, data) => {
      const nombreecrypt = cipher.decrypt(data.nombre)
      const prodesch = {
        nombre: nombrecrypt,
        descripcion: descripcioncrypt,
        cantidad: cantidadcrypt,
        restaurante: restaurantecrypt,
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
     ProDesch.findOneAndUpdate({_id: id}, prodesch, {new:true}, (err, prodeschUpdated) => {
        if(err || !prodeschUpdated){
            return res.status(500).send({
                message: 'Error al actualizar documento'
            })
        };
        return res.status(200).send({
            status: 'success',
            user: prodeschUpdated
        }); 
      }); 
  
  })
  };


module.exports = proDesechCtrl;