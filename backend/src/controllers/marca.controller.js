require("dotenv").config();
const aes256 = require("aes256");
const marcaCtrl = {};

const Marca = require('../models/Model.Marca');

const key = process.env.KEY;
const cipher = aes256.createCipher(key);

marcaCtrl.getMarcas = (req, res) => {
    const marcas = [];
    Marca.find((err, marca) => {
      if (err || !marca) {
        return res.status(500).send({ message: "error en la base de datos" });
      }
      console.log(marca);
      marca.forEach((data) => {
        const marca = new Marca();
        marca._id = data._id;
        marca.consecutivo = data.consecutivo;
        marca.nombre = cipher.decrypt(data.nombre);
        marca.nacionalidad = cipher.decrypt(data.nacionalidad);
        marca.descripcion = cipher.decrypt(data.descripcion);
        marca.cedulajuridica = cipher.decrypt(data.cedulajuridica);
        marca.empresa = cipher.decrypt(data.empresa);
        marca.detalleempresa = cipher.decrypt(data.detalleempresa);
        marca.numerotelefono = cipher.decrypt(data.numerotelefono);
        marca.fotomarca = data.fotomarca;
        marcas.push(marca);
      });
  
      return res.status(200).send({ marca: marcas });
    });
  };

marcaCtrl.createMarca = (req, res) => {
  //const para encriptar
  const nombreencript = cipher.encrypt(req.body.nombre);
  const nacionalidadencript = cipher.encrypt(req.body.nacionalidad);
  const descripcionencript = cipher.encrypt(req.body.descripcion);
  const cedulajuridicaencript = cipher.encrypt(req.body.cedulajuridica);
  const empresaencript = cipher.encrypt(req.body.empresa);
  const detalleempresaencript = cipher.encrypt(req.body.detalleempresa);
  const numerotelefonoencript = cipher.encrypt(req.body.numerotelefono);
  //console.log(parametros unidad de medida);
  const marca = new Marca({
    consecutivo: consecutivo,
    nombre: nombreencript,
    nacionalidad: nacionalidadencript, 
    descripcion: descripcionencript,
    cedulajuridica: cedulajuridicaencript,
    empresa: empresaencript,
    detalleempresa: detalleempresaencript,
    numerotelefono: numerotelefonoencript,
    fotomarca: fotomarca,
  });
  marca.save(function (error, marca) {
    if (error) {
      return res.status(500).json({
        message: error,
      });
    }
    return res.json(marca);
    //res.json({message: 'Unidad de medida creado'})
  });
};

marcaCtrl.getMarca = (req, res) => {
    const { id } = req.params;
    Marca
    .findOne({_id: id})
    .then((data) => {
      // console.log(data)
      const marca = new Marca()
      marca._id = data._id;
      marca.consecutivo = data.consecutivo;
      marca.nombre = cipher.decrypt(data.nombre);
      marca.nacionalidad = cipher.decrypt(data.nacionalidad);
      marca.descripcion = cipher.decrypt(data.descripcion);
      marca.cedulajuridica = cipher.decrypt(data.cedulajuridica);
      marca.empresa = cipher.decrypt(data.empresa);
      marca.detalleempresa = cipher.decrypt(data.detalleempresa);
      marca.numerotelefono = cipher.decrypt(data.numerotelefono);
      marca.fotomarca = data.fotomarca;
      
      return res.status(200).send({marca: marca})
    })
    .catch((error) => res.json({ message: error }));
}

//eliminar una unidad de medida
marcaCtrl.deleteMarca = (req, res) => {
    const { id } = req.params;
    Marca
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

  //update una unidad de medida
  marcaCtrl.updateMarca = (req, res) => {
    const { id } = req.params;
    const {nombre, nacionalidad, descripcion, cedulajuridica,
      empresa, detalleempresa, numerotelefono} = req.body;
    const nombrecrypt = cipher.encrypt(nombre);
    const nacionalidadcrypt = cipher.encrypt(nacionalidad);
    const descripcioncrypt = cipher.encrypt(descripcion);
    const cedulajuridicacrypt = cipher.encrypt(cedulajuridica);
    const empresacrypt = cipher.encrypt(empresa);
    const detalleempresacrypt = cipher.encrypt(detalleempresa);
    const numerotelefonocrypt = cipher.encrypt(numerotelefono);
    //Validar si el email ya esta registrado
    Marca.findOne({_id: id}, (err, data) => {
      const nombreecrypt = cipher.decrypt(data.nombre)
      const marca = {
        nombre: nombrecrypt,
        nacionalidad: nacionalidadcrypt,
        descripcion: descripcioncrypt,
        cedulajuridica: cedulajuridicacrypt,
        empresa: empresacrypt,
        detalleempresa: detalleempresacrypt,
        numerotelefono: numerotelefonocrypt
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
     Marca.findOneAndUpdate({_id: id}, marca, {new:true}, (err, marcaUpdated) => {
        if(err || !marcaUpdated){
            return res.status(500).send({
                message: 'Error al actualizar documento'
            })
        };
        return res.status(200).send({
            status: 'success',
            user: marcaUpdated
        }); 
      }); 
  
  })
  };

module.exports = marcaCtrl;