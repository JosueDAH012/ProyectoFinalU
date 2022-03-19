// Este archivo guarda en la base de datos aquellos documentos que deben
// estar por defecto en la base de datos.

const AES = require('../libs/lib.aes256');

module.exports = async () => {

    // Creacion del documento unico de Consecutivos si no existe.
    const Consecutivo = require('../classes/Class.Consecutivo');
    const consecutivo = new Consecutivo();

    const ModeloConsecutivo = require('../models/Model.Consecutivo');

    const ConsecutivoDocument = await ModeloConsecutivo.findOne({});
    if (ConsecutivoDocument == null) { // El documento no existe.
        console.log("Creando documento Consecutivo por defecto...");

        consecutivo.AsignarValoresPredeterminados();
        await ModeloConsecutivo
            .create({ Documento: AES.Encriptar(JSON.stringify(consecutivo.Valores)) });

        console.log("Documento Consecutivo por defecto creado");
    }

    // Creacion del documento unico de Usuarios si no existe.
    const Usuario = require('../classes/Class.Usuario');
    const usuario = new Usuario();

    const ModeloUsuario = require('../models/Model.Usuario');

    const UsuarioDocument = await ModeloUsuario.findOne({});
    if (UsuarioDocument == null) { // El documento no existe.
        console.log("Creando documento Usuario por defecto...");

        usuario.CrearUsuarioMaster();
        await ModeloUsuario
            .create({ Documento: AES.Encriptar(JSON.stringify([usuario])) });

        console.log("Documento Usuario por defecto creado");
    }

    // Creacion del documento unico de Bitacora si no existe.
    const ModeloBitacora = require('../models/Model.Bitacora');

    const BitacoraDocument = await ModeloBitacora.findOne({});
    if (BitacoraDocument == null) { // El documento no existe.
        console.log("Creando documento Bitacora por defecto...");

        await ModeloBitacora
            .create({ Documento: AES.Encriptar(JSON.stringify([])) });

        console.log("Documento Usuario por defecto creado");
    }
}
