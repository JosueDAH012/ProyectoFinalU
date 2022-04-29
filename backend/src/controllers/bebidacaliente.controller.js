require("dotenv").config();
const aes256 = require("aes256");
const bebiCaleCtrl = {};

const BebiCale = require('../models/Model.BebidaCaliente');

const key = process.env.KEY;
const cipher = aes256.createCipher(key);

bebiCaleCtrl.getBebiCales = (req, res) => {
    const bebicales = [];
    BebiCale.find((err, bebicale) => {
      if (err || !bebicale) {
        return res.status(500).send({ message: "error en la base de datos" });
      }
      console.log(bebicale);
      bebicale.forEach((data) => {
        const bebicale = new BebiCale();
        bebicale._id = data._id;
        bebicale.consecutivo = data.consecutivo;
        bebicale.nombre = cipher.decrypt(data.nombre);
        bebicale.ingredientes = cipher.decrypt(data.ingredientes);
        bebicale.precio = cipher.decrypt(data.precio);
        bebicale.restaurante = cipher.decrypt(data.restaurante);
        bebicale.descripcion = cipher.decrypt(data.descripcion);
        bebicale.foto = data.foto;
        bebicales.push(bebicale);
      });
  
      return res.status(200).send({ bebicale: bebicales });
    });
  };

bebiCaleCtrl.createBebiCale = (req, res) => {
  //const para encriptar
  const nombreencript = cipher.encrypt(req.body.nombre);
  const ingredientesencript = cipher.encrypt(req.body.ingredientes);
  const precioencript = cipher.encrypt(req.body.precio);
  const restauranteencript = cipher.encrypt(req.body.restaurante);
  const descripcionencript = cipher.encrypt(req.body.descripcion);
  //console.log(parametros unidad de medida);
  const bebicale = new BebiCale({
    consecutivo: consecutivo,
    nombre: nombreencript,
    ingredientes: ingredientesencript, 
    precio: precioencript,
    restaurante: restauranteencript,
    descripcion: descripcionencript,
    foto: foto,
  });
  bebicale.save(function (error, bebicale) {
    if (error) {
      return res.status(500).json({
        message: error,
      });
    }
    return res.json(bebicale);
    //res.json({message: 'Unidad de medida creado'})
  });
};

bebiCaleCtrl.getBebiCale = (req, res) => {
    const { id } = req.params;
    BebiCale
    .findOne({_id: id})
    .then((data) => {
      // console.log(data)
      const bebicale = new BebiCale()
      bebicale._id = data._id;
      bebicale.consecutivo = data.consecutivo;
      bebicale.nombre = cipher.decrypt(data.unidadmedida);
      bebicale.ingredientes = cipher.decrypt(data.ingredientes);
      bebicale.precio = cipher.decrypt(data.precio);
      bebicale.restaurante = cipher.decrypt(data.restaurante);
      bebicale.detaldescripcionle = cipher.decrypt(data.descripcion);
      bebicale.foto = data.foto;
      return res.status(200).send({bebicale: bebicale})
    })
    .catch((error) => res.json({ message: error }));
}

//eliminar una unidad de medida
bebiCaleCtrl.deleteBebiCale = (req, res) => {
    const { id } = req.params;
    BebiCale
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

  //update una unidad de medida
  bebiCaleCtrl.updateBebiCale = (req, res) => {
    const { id } = req.params;
    const {nombre, ingredientes, precio, restaurante, descripcion } = req.body;
    const nombrecrypt = cipher.encrypt(nombre);
    const ingredientescrypt = cipher.encrypt(ingredientes);
    const preciocrypt = cipher.encrypt(precio);
    const restaurantecrypt = cipher.encrypt(restaurante);
    const descripcioncrypt = cipher.encrypt(descripcion);
    //Validar si el email ya esta registrado
    BebiCale.findOne({_id: id}, (err, data) => {
      const nombreecrypt = cipher.decrypt(data.nombre)
      const bebicale = {
        nombre: nombrecrypt,
        ingredientes: ingredientescrypt,
        precio: preciocrypt,
        restaurante: restaurantecrypt,
        descripcion: descripcioncrypt,
        
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
     BebiCale.findOneAndUpdate({_id: id}, bebicale, {new:true}, (err, bebicaleUpdated) => {
        if(err || !bebicaleUpdated){
            return res.status(500).send({
                message: 'Error al actualizar documento'
            })
        };
        return res.status(200).send({
            status: 'success',
            user: bebicaleUpdated
        }); 
      }); 
  
  })
  };


module.exports = bebiCaleCtrl;