require("dotenv").config();
const aes256 = require("aes256");
const proEquiCtrl = {};

const ProEqui = require('../models/Model.ProductosEquipos');

const key = process.env.KEY;
const cipher = aes256.createCipher(key);

proEquiCtrl.getProEquis = (req, res) => {
    const proequis = [];
    ProEqui.find((err, proequi) => {
      if (err || !proequi) {
        return res.status(500).send({ message: "error en la base de datos" });
      }
      console.log(proequi);
      proequi.forEach((data) => {
        const proequi = new ProEqui();
        proequi._id = data._id;
        proequi.consecutivo = data.consecutivo;
        proequi.numeracion = data.numeracion;
        proequi.nombre = cipher.decrypt(data.nombre);
        proequi.restaurante = cipher.decrypt(data.restaurante);
        proequi.marca = cipher.decrypt(data.marca);
        proequi.cantidad = cipher.decrypt(data.cantidad);
        proequi.descripcion = cipher.decrypt(data.descripcion);
        proequis.push(proequi);
      });
  
      return res.status(200).send({ proequi: proequis });
    });
  };

proEquiCtrl.createProEqui = (req, res) => {
  //const para encriptar
  const nombreencript = cipher.encrypt(req.body.nombre);
  const restauranteencript = cipher.encrypt(req.body.restaurante);
  const marcaencript = cipher.encrypt(req.body.marca);
  const cantidadencript = cipher.encrypt(req.body.cantidad);
  const descripcionencript = cipher.encrypt(req.body.descripcion);
  //console.log(parametros unidad de medida);
  const proequi = new ProEqui({
    consecutivo: consecutivo,
    numeracion: numeracion,
    nombre: nombreencript,
    restaurante: restauranteencript,
    marca: marcaencript,
    cantidad: cantidadencript,
    descripcion: descripcionencript
  });
  proequi.save(function (error, proequi) {
    if (error) {
      return res.status(500).json({
        message: error,
      });
    }
    return res.json(proequi);
    //res.json({message: 'Unidad de medida creado'})
  });
};

proEquiCtrl.getProEqui = (req, res) => {
    const { id } = req.params;
    ProEqui
    .findOne({id: id})
    .then((data) => {
      // console.log(data)
      const proequi = new ProEqui()
      proequi._id = data._id;
      proequi.consecutivo = data.consecutivo;
      proequi.numeracion = data.numeracion;
      proequi.nombre = cipher.decrypt(data.nombre);
      proequi.restaurante = cipher.decrypt(data.restaurante);
      proequi.marca = cipher.decrypt(data.marca);
      proequi.cantidad = cipher.decrypt(data.cantidad);
      proequi.descripcion = cipher.decrypt(data.descripcion);
      return res.status(200).send({proequi: proequi})
    })
    .catch((error) => res.json({ message: error }));
}

//eliminar una unidad de medida
proEquiCtrl.deleteProEqui = (req, res) => {
    const { id } = req.params;
    ProEqui
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

  //update una unidad de medida
  proEquiCtrl.updateProEqui = (req, res) => {
    const { id } = req.params;
    const {nombre, restaurante, marca, cantidad, descripcion} = req.body;
    const nombrecrypt = cipher.encrypt(nombre);
    const restaurantecrypt = cipher.encrypt(restaurante);
    const marcacrypt = cipher.encrypt(marca);
    const cantidadcrypt = cipher.encrypt(cantidad);
    const descripcioncrypt = cipher.encrypt(descripcion);
    //Validar si el email ya esta registrado
    ProEqui.findOne({_id: id}, (err, data) => {
      const nombreecrypt = cipher.decrypt(data.nombre)
      const proequi = {
        nombre: nombrecrypt,
        restaurante: restaurantecrypt,
        marca: marcacrypt,
        cantidad: cantidadcrypt,
        descripcion: descripcioncrypt
      };                                                                                             
      if(err){
          return res.status(500).send({
              message: 'Error al buscar coincidencia de email'
          });
      };
      if(data && nombreecrypt.includes(nombre)){
          return res.status(200).send({
              message: 'El producto de equipos y utensilios ya esta registrado'
          });
      }
      // Buscar y actualizar unidad de medida
     ProEqui.findOneAndUpdate({_id: id}, proequi, {new:true}, (err, proequiUpdated) => {
        if(err || !proequiUpdated){
            return res.status(500).send({
                message: 'Error al actualizar documento'
            })
        };
        return res.status(200).send({
            status: 'success',
            user: proequiUpdated
        }); 
      }); 
  
  })
  };

module.exports = proEquiCtrl;