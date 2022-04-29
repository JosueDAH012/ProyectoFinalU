require("dotenv").config();
const aes256 = require("aes256");
const proComesCtrl = {};

const ProComes = require('../models/Model.ProductosComestible');

const key = process.env.KEY;
const cipher = aes256.createCipher(key);

proComesCtrl.getProComes = (req, res) => {
    const procomess = [];
    ProComes.find((err, procomes) => {
      if (err || !procomes) {
        return res.status(500).send({ message: "error en la base de datos" });
      }
      console.log(procomes);
      procomes.forEach((data) => {
        const procomes = new ProComes();
        procomes._id = data._id;
        procomes.consecutivo = data.consecutivo;        
        procomes.nombre = cipher.decrypt(data.nombre);
        procomes.cantidad = cipher.decrypt(data.cantidad);
        procomes.tipocomestible = cipher.decrypt(data.tipocomestible);
        procomes.restaurante = cipher.decrypt(data.restaurante);
        procomes.marcas = cipher.decrypt(data.marcas);
        procomes.clasecomestible = cipher.decrypt(data.clasecomestible);
        procomes.lineacomestible = cipher.decrypt(data.lineacomestible);
        procomes.unidadmedida = cipher.decrypt(data.unidadmedida);
        procomess.push(procomes);
      });
  
      return res.status(200).send({ procomes: procomess });
    });
  };

proComesCtrl.createProCome = (req, res) => {
  //const para encriptar
  const nombreencript = cipher.encrypt(req.body.nombre);
  const cantidadencript = cipher.encrypt(req.body.cantidad);
  const tipocomestibleencript = cipher.encrypt(req.body.tipocomestible);
  const restauranteencript = cipher.encrypt(req.body.restaurante);
  const marcasencript = cipher.encrypt(req.body.marcas);
  const clasecomestibleencript = cipher.encrypt(req.body.clasecomestible);
  const lineacomestibleencript = cipher.encrypt(req.body.lineacomestible);
  const unidadmencript = cipher.encrypt(req.body.unidadmedida);
  //console.log(parametros unidad de medida);
  const procomes = new ProComes({
    consecutivo: consecutivo,
    nombre: nombreencript,
    cantidad: cantidadencript,
    tipocomestible: tipocomestibleencript,
    restaurante: restauranteencript,
    marcas: marcasencript,
    clasecomestible: clasecomestibleencript,
    lineacomestible: lineacomestibleencript,
    unidadmedida: unidadmencript
  });
  procomes.save(function (error, procomes) {
    if (error) {
      return res.status(500).json({
        message: error,
      });
    }
    return res.json(procomes);
    //res.json({message: 'Unidad de medida creado'})
  });
};

proComesCtrl.getProCome = (req, res) => {
    const { id } = req.params;
    ProComes
    .findOne({_id: id})
    .then((data) => {
      // console.log(data)
      const procomes = new ProComes()
      procomes._id = data._id;
      procomes.consecutivo = data.consecutivo;
      procomes.nombre = cipher.decrypt(data.nombre);
      procomes.cantidad = cipher.decrypt(data.cantidad);
      procomes.tipocomestible = cipher.decrypt(data.tipocomestible);
      procomes.restaurante = cipher.decrypt(data.restaurante);
      procomes.marcas = cipher.decrypt(data.marcas);
      procomes.clasecomestible = cipher.decrypt(data.clasecomestible);
      procomes.lineacomestible = cipher.decrypt(data.lineacomestible);
      procomes.unidadmedida = cipher.decrypt(data.unidadmedida);
      return res.status(200).send({procomes: procomes})
    })
    .catch((error) => res.json({ message: error }));
}

//eliminar una unidad de medida
proComesCtrl.deleteProCome = (req, res) => {
    const { id } = req.params;
    ProComes
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

  //update una unidad de medida
  proComesCtrl.updateProCome = (req, res) => {
    const { id } = req.params;
    const {nombre, cantidad, tipocomestible, restaurante,
        marcas, clasecomestible, lineacomestible ,unidadmedida} = req.body;
    const nombrecrypt = cipher.encrypt(nombre);
    const cantidadcrypt = cipher.encrypt(cantidad);
    const tipocomestiblecrypt = cipher.encrypt(tipocomestible);
    const restaurantecrypt = cipher.encrypt(restaurante);
    const marcascrypt = cipher.encrypt(marcas);
    const clasecomestiblecrypt = cipher.encrypt(clasecomestible);
    const lineacomestiblecrypt = cipher.encrypt(lineacomestible);
    const unidadmedidacrypt = cipher.encrypt(unidadmedida);
    //Validar si el email ya esta registrado
    ProComes.findOne({_id: id}, (err, data) => {
      const nombreecrypt = cipher.decrypt(data.nombre)
      const procomes = {
        nombre: nombrecrypt,
        cantidad: cantidadcrypt,
        tipocomestible: tipocomestiblecrypt,
        restaurante: restaurantecrypt,
        marcas: marcascrypt,
        clasecomestible: clasecomestiblecrypt,
        lineacomestible: lineacomestiblecrypt,
        unidadmedida: unidadmedidacrypt
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
      ProComes.findOneAndUpdate({_id: id}, procomes, {new:true}, (err, procomesUpdated) => {
        if(err || !procomesUpdated){
            return res.status(500).send({
                message: 'Error al actualizar documento'
            })
        };
        return res.status(200).send({
            status: 'success',
            user: procomesUpdated
        }); 
      }); 
  
  })
  };


module.exports = proComesCtrl;