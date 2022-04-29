require("dotenv").config();
const aes256 = require("aes256");
const proLimpCtrl = {};

const ProLimp = require('../models/Model.ProductosLimpieza');

const key = process.env.KEY;
const cipher = aes256.createCipher(key);

proLimpCtrl.getProLimps = (req, res) => {
    const prolimps = [];
    ProLimp.find((err, prolimp) => {
      if (err || !prolimp) {
        return res.status(500).send({ message: "error en la base de datos" });
      }
      console.log(prolimp);
      prolimp.forEach((data) => {
        const prolimp = new ProLimp();
        prolimp._id = data._id;
        prolimp.consecutivo = data.consecutivo;
        prolimp.numeracion = data.numeracion;
        prolimp.nombre = cipher.decrypt(data.nombre);
        prolimp.restaurante = cipher.decrypt(data.restaurante);
        prolimp.marca = cipher.decrypt(data.marca);
        prolimp.cantidad = cipher.decrypt(data.cantidad);
        prolimp.descripcion = cipher.decrypt(data.descripcion);
        prolimp.cantidadmedida = cipher.decrypt(data.cantidadmedida);
        prolimp.unidadmedida = cipher.decrypt(data.unidadmedida);
        prolimps.push(prolimp);
      });
  
      return res.status(200).send({ prolimp: prolimps });
    });
  };

proLimpCtrl.createProLimp = (req, res) => {
  //const para encriptar
  const nombreencript = cipher.encrypt(req.body.nombre);
  const restauranteencript = cipher.encrypt(req.body.restaurante);
  const marcaencript = cipher.encrypt(req.body.marca);
  const cantidadencript = cipher.encrypt(req.body.cantidad);
  const descripcionencript = cipher.encrypt(req.body.descripcion);
  const cantidadmedidaencript = cipher.encrypt(req.body.cantidadmedida);
  const unidadmedidaencript = cipher.encrypt(req.body.unidadmedida);
  //console.log(parametros unidad de medida);
  const prolimp = new ProLimp({
    consecutivo: consecutivo,
    numeracion: numeracion,
    nombre: nombreencript,
    restaurante: restauranteencript,
    marca: marcaencript,
    cantidad: cantidadencript,
    descripcion: descripcionencript,
    cantidadmedida: cantidadmedidaencript,
    unidadmedida: unidadmedidaencript
  });
  prolimp.save(function (error, prolimp) {
    if (error) {
      return res.status(500).json({
        message: error,
      });
    }
    return res.json(prolimp);
    //res.json({message: 'Unidad de medida creado'})
  });
};

proLimpCtrl.getProLimp = (req, res) => {
    const { id } = req.params;
    ProLimp
    .findOne({_id: id})
    .then((data) => {
      // console.log(data)
      const prolimp = new ProLimp()
      prolimp._id = data._id;
      prolimp.consecutivo = data.consecutivo;
      prolimp.numeracion = data.numeracion;
      prolimp.nombre = cipher.decrypt(data.nombre);
      prolimp.restaurante = cipher.decrypt(data.restaurante);
      prolimp.marca = cipher.decrypt(data.marca);
      prolimp.cantidad = cipher.decrypt(data.cantidad);
      prolimp.descripcion = cipher.decrypt(data.descripcion);
      prolimp.cantidadmedida = cipher.decrypt(data.cantidadmedida);
      prolimp.unidadmedida = cipher.decrypt(data.unidadmedida);
      return res.status(200).send({prolimp: prolimp})
    })
    .catch((error) => res.json({ message: error }));
}

//eliminar una unidad de medida
proLimpCtrl.deleteProLimp = (req, res) => {
    const { id } = req.params;
    ProLimp
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

  //update una unidad de medida
  proLimpCtrl.updateProLimp = (req, res) => {
    const { id } = req.params;
    const {nombre, restaurante, marca, cantidad, 
        descripcion, cantidadmedida, unidadmedida} = req.body;
    const nombrecrypt = cipher.encrypt(nombre);
    const restaurantecrypt = cipher.encrypt(restaurante);
    const marcacrypt = cipher.encrypt(marca);
    const cantidadcrypt = cipher.encrypt(cantidad);
    const descripcioncrypt = cipher.encrypt(descripcion);
    const cantidadmedidacrypt = cipher.encrypt(cantidadmedida);
    const unidadmedidacrypt = cipher.encrypt(unidadmedida);
    //Validar si el email ya esta registrado
    ProLimp.findOne({_id: id}, (err, data) => {
      const nombreecrypt = cipher.decrypt(data.unidadmedida)
      const prolimp = {
        nombre: nombrecrypt,
        restaurante: restaurantecrypt,
        marca: marcacrypt,
        cantidad: cantidadcrypt,
        descripcion: descripcioncrypt,
        cantidadmedida: cantidadmedidacrypt,
        unidadmedida: unidadmedidacrypt
      };                                                                                             
      if(err){
          return res.status(500).send({
              message: 'Error al buscar coincidencia de nombre'
          });
      };
      if(data && nombreecrypt.includes(nombre)){
          return res.status(200).send({
              message: 'El producto de limpieza ya esta registrado'
          });
      }
      // Buscar y actualizar unidad de medida
     ProLimp.findOneAndUpdate({_id: id}, prolimp, {new:true}, (err, prolimpUpdated) => {
        if(err || !prolimpUpdated){
            return res.status(500).send({
                message: 'Error al actualizar documento'
            })
        };
        return res.status(200).send({
            status: 'success',
            user: prolimpUpdated
        }); 
      }); 
  
  })
  };

module.exports = proLimpCtrl;