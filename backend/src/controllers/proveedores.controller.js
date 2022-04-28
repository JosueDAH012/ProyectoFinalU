require("dotenv").config();
const aes256 = require("aes256");
const proveedorCtrl = {};

const Proveedor = require('../models/Model.Proveedores');

const key = process.env.KEY;
const cipher = aes256.createCipher(key);

proveedorCtrl.getProveedors = (req, res) => {
    const proveedors = [];
    Proveedor.find((err, proveedor) => {
      if (err || !proveedor) {
        return res.status(500).send({ message: "error en la base de datos" });
      }
      console.log(proveedor);
      proveedor.forEach((data) => {
        const proveedor = new Proveedor();
        proveedor._id = data._id;
        proveedor.consecutivo = data.consecutivo;
        proveedor.numeracion = data.numeracion;
        proveedor.nombre = cipher.decrypt(data.nombre);
        proveedor.primerapellido = cipher.decrypt(data.primerapellido);
        proveedor.segundoapellido = cipher.decrypt(data.segundoapellido);
        proveedor.correoelectronico = cipher.decrypt(data.correoelectronico);
        proveedor.telefonooficina = cipher.decrypt(data.telefonooficina);
        proveedor.fax = cipher.decrypt(data.fax);
        proveedor.celular = cipher.decrypt(data.celular);
        proveedor.cedula = cipher.decrypt(data.cedula);
        proveedor.fechaingreso = data.fechaingreso;
        proveedor.direccion = cipher.decrypt(data.direccion);
        proveedor.productosmanejados = cipher.decrypt(data.productosmanejados);
        proveedor.nombrecontacto = cipher.decrypt(data.nombrecontacto);
        proveedor.telefonocontacto = cipher.decrypt(data.fatelefonocontactox);
        proveedor.direccioncontacto = cipher.decrypt(data.direccioncontacto);
        proveedor.foto = data.foto;
        proveedors.push(proveedor);
      });
  
      return res.status(200).send({ proveedor: proveedors });
    });
  };

proveedorCtrl.createProveedor = (req, res) => {
  //const para encriptar
  const nombreencript = cipher.encrypt(req.body.nombre);
  const primerapellidoencript = cipher.encrypt(req.body.primerapellido);
  const segundoapellidoencript = cipher.encrypt(req.body.segundoapellido);
  const correoelectronicoencript = cipher.encrypt(req.body.correoelectronico);
  const telefonooficinaencript = cipher.encrypt(req.body.telefonooficina);
  const faxencript = cipher.encrypt(req.body.fax);
  const celularencript = cipher.encrypt(req.body.celular);
  const cedulaencript = cipher.encrypt(req.body.cedula);
  const direccionencript = cipher.encrypt(req.body.direccion);
  const productosmanejadosencript = cipher.encrypt(req.body.productosmanejados);
  const nombrecontactoencript = cipher.encrypt(req.body.nombrecontacto);
  const telefonocontactoencript = cipher.encrypt(req.body.telefonocontacto);
  const direccioncontactoencript = cipher.encrypt(req.body.direccioncontacto);

  //console.log(parametros proveedor);
  const proveedor = new Proveedor({
    consecutivo: consecutivo,
    numeracion: numeracion,
    nombre: nombreencript,
    primerapellido: primerapellidoencript,
    segundoapellido: segundoapellidoencript,
    correoelectronico: correoelectronicoencript,
    telefonooficina: telefonooficinaencript,
    fax: faxencript,
    celular: celularencript,
    cedula: cedulaencript,
    fechaingreso: fechaingreso,
    direccion: direccionencript,
    productosmanejados: productosmanejadosencript,
    nombrecontacto: nombrecontactoencript,
    telefonocontacto: telefonocontactoencript,
    direccioncontacto: direccioncontactoencript,
    foto: foto
  });
  proveedor.save(function (error, proveedor) {
    if (error) {
      return res.status(500).json({
        message: error,
      });
    }
    return res.json(proveedor);
    //res.json({message: 'Proveedor creado'})
  });
};

proveedorCtrl.getProveedor = (req, res) => {
    const { id } = req.params;
    Proveedor
    .findOne({id: id})
    .then((data) => {
      // console.log(data)
      const proveedor = new Proveedor()
      proveedor._id = data._id;
      proveedor.consecutivo = data.consecutivo;
      proveedor.numeracion = data.numeracion;
      proveedor.nombre = cipher.decrypt(data.nombre);
      proveedor.primerapellido = cipher.decrypt(data.primerapellido);
      proveedor.segundoapellido = cipher.decrypt(data.segundoapellido);
      proveedor.correoelectronico = cipher.decrypt(data.correoelectronico);
      proveedor.telefonooficina = cipher.decrypt(data.telefonooficina);
      proveedor.fax = cipher.decrypt(data.fax);
      proveedor.celular = cipher.decrypt(data.celular);
      proveedor.cedula = cipher.decrypt(data.cedula);
      proveedor.fechaingreso = data.fechaingreso;
      proveedor.direccion = cipher.decrypt(data.direccion);
      proveedor.productosmanejados = cipher.decrypt(data.productosmanejados);
      proveedor.nombrecontacto = cipher.decrypt(data.nombrecontacto);
      proveedor.telefonocontacto = cipher.decrypt(data.telefonocontacto);
      proveedor.direccioncontacto = cipher.decrypt(data.direccioncontacto);
      proveedor.foto = data.foto;
      return res.status(200).send({proveedor: proveedor})
    })
    .catch((error) => res.json({ message: error }));
}

//eliminar una proveedor
proveedorCtrl.deleteProveedor = (req, res) => {
    const { id } = req.params;
    Proveedor
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

  //update una proveedor
  proveedorCtrl.updateProveedor = (req, res) => {
    const { id } = req.params;
    const {nombre, primerapellido, segundoapellido, 
        correoelectronico, telefonooficina, fax , celular,
        cedula, direccion, productosmanejados, nombrecontacto,
        telefonocontacto, direccioncontacto, foto} = req.body;
    const nombrecrypt = cipher.encrypt(nombre);
    const primerapellidocrypt = cipher.encrypt(primerapellido);
    const segundoapellidocrypt = cipher.encrypt(segundoapellido);
    const correoelectronicocrypt = cipher.encrypt(correoelectronico);
    const telefonooficinacrypt = cipher.encrypt(telefonooficina);
    const faxcrypt = cipher.encrypt(fax);
    const celularcrypt = cipher.encrypt(celular);
    const cedulacrypt = cipher.encrypt(cedula);
    const direccioncrypt = cipher.encrypt(direccion);
    const productosmanejadoscrypt = cipher.encrypt(productosmanejados);
    const nombrecontactocrypt = cipher.encrypt(nombrecontacto);
    const telefonocontactocrypt = cipher.encrypt(telefonocontacto);
    const direccioncontactocrypt = cipher.encrypt(direccioncontacto);
    //Validar si el email ya esta registrado
    Proveedor.findOne({_id: id}, (err, data) => {
      const emaillcrypt = cipher.decrypt(data.email)
      const proveedor = {
        nombre: nombrecrypt,
        primerapellido: primerapellidocrypt,
        segundoapellido: segundoapellidocrypt,
        correoelectronico: correoelectronicocrypt,
        telefonooficina: telefonooficinacrypt,
        fax: faxcrypt,
        celular: celularcrypt,
        cedula: cedulacrypt,
        direccion: direccioncrypt,
        productosmanejados: productosmanejadoscrypt,
        nombrecontacto: nombrecontactocrypt,
        telefonocontacto: telefonocontactocrypt,
        direccioncontacto: direccioncontactocrypt,
        escala: escalacrypt,
        detalle: detallecrypt,
        foto: foto
      };                                                                                             
      if(err){
          return res.status(500).send({
              message: 'Error al buscar coincidencia de email'
          });
      };
      if(data && emaillcrypt.includes(email)){
          return res.status(200).send({
              message: 'El proveedor ya esta registrado'
          });
      }
      // Buscar y actualizar proveedor
     Proveedor.findOneAndUpdate({_id: id}, proveedor, {new:true}, (err, proveedorUpdated) => {
        if(err || !proveedorUpdated){
            return res.status(500).send({
                message: 'Error al actualizar documento'
            })
        };
        return res.status(200).send({
            status: 'success',
            user: proveedorUpdated
        }); 
      }); 
  
  })
  };

module.exports = proveedorCtrl;