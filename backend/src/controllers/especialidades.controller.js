require("dotenv").config();
const aes256 = require("aes256");
const especialidadesCtrl = {};

const Especialidades = require('../models/Model.Especialidades');

const key = process.env.KEY;
const cipher = aes256.createCipher(key);

especialidadesCtrl.getEspecialidadess = (req, res) => {
    const especialidadess = [];
    Especialidades.find((err, especialidades) => {
      if (err || !especialidades) {
        return res.status(500).send({ message: "error en la base de datos" });
      }
      console.log(especialidades);
      especialidades.forEach((data) => {
        const especialidades = new Especialidades();
        especialidades._id = data._id;
        especialidades.consecutivo = data.consecutivo;
        especialidades.nombre = cipher.decrypt(data.nombre);
        especialidades.ingredientes = cipher.decrypt(data.ingredientes);
        especialidades.precio = cipher.decrypt(data.precio);
        especialidades.detalle = cipher.decrypt(data.detalle);
        especialidades.foto = data.foto;
        especialidadess.push(especialidades);
      });
  
      return res.status(200).send({ especialidades: especialidadess });
    });
  };

especialidadesCtrl.createEspecialidades = (req, res) => {
  //const para encriptar
  const nombreencript = cipher.encrypt(req.body.nombre);
  const ingredientesencript = cipher.encrypt(req.body.ingredientes);
  const precioencript = cipher.encrypt(req.body.precio);
  const detalleencript = cipher.encrypt(req.body.detalle);
  //console.log(parametros unidad de medida);
  const especialidades = new Especialidades({
    consecutivo: consecutivo,
    nombre: nombreencript,
    ingredientes: ingredientesencript, 
    precio: precioencript,
    detalle: detalleencript,
    foto: foto,
  });
  especialidades.save(function (error, especialidades) {
    if (error) {
      return res.status(500).json({
        message: error,
      });
    }
    return res.json(especialidades);
    //res.json({message: 'Unidad de medida creado'})
  });
};

especialidadesCtrl.getEspecialidades = (req, res) => {
    const { id } = req.params;
    Especialidades
    .findOne({_id: id})
    .then((data) => {
      // console.log(data)
      const especialidades = new Especialidades()
      especialidades._id = data._id;
      especialidades.consecutivo = data.consecutivo;
      especialidades.nombre = cipher.decrypt(data.nombre);
      especialidades.ingredientes = cipher.decrypt(data.ingredientes);
      especialidades.precio = cipher.decrypt(data.precio);
      especialidades.detalle = cipher.decrypt(data.detalle);
      return res.status(200).send({especialidades: especialidades})
    })
    .catch((error) => res.json({ message: error }));
}

//eliminar una unidad de medida
especialidadesCtrl.deleteEspecialidades = (req, res) => {
    const { id } = req.params;
    Especialidades
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

  //update una unidad de medida
  especialidadesCtrl.updateEspecialidades = (req, res) => {
    const { id } = req.params;
    const {nombre, ingredientes, precio, simbologia} = req.body;
    const nombrecrypt = cipher.encrypt(nombre);
    const ingredientescrypt = cipher.encrypt(ingredientes);
    const preciocrypt = cipher.encrypt(precio);
    const detallecrypt = cipher.encrypt(detalle);
    //Validar si el email ya esta registrado
    Especialidades.findOne({_id: id}, (err, data) => {
      const nombreecrypt = cipher.decrypt(data.nombre)
      const especialidades = {
        nombre: nombrecrypt,
        ingredientes: ingredientescrypt,
        precio: preciocrypt,
        detalle: detallecrypt
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
     Especialidades.findOneAndUpdate({_id: id}, especialidades, {new:true}, (err, especialidadesUpdated) => {
        if(err || !especialidadesUpdated){
            return res.status(500).send({
                message: 'Error al actualizar documento'
            })
        };
        return res.status(200).send({
            status: 'success',
            user: especialidadesUpdated
        }); 
      }); 
  
  })
  };


module.exports = especialidadesCtrl;