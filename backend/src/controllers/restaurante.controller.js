const AES = require('../libs/lib.aes256');
const restauranteCtrl = {};

const Restaurante = require('../models/Model.Restaurante');

// Trae el registro unico de la base de datos.
restauranteCtrl.getResta = async (req, res) => {
    const DBDocumento = await Restaurante.findOne({});
    DBDocumento != null
        ? res.json(AES.Desencriptar(DBDocumento.Documento))
        : res.json({ warning: 'No hay registros guardados' })
};


// Modifica el registro unico de la base de datos.
restauranteCtrl.updateRest = async (req, res) => {
    const db = await Restaurante.updateOne({},
        { $set: { 'Documento': AES.Encriptar(JSON.stringify(req.body)) } },
        { upsert: true, new: true, setDefaultsOnInsert: true });
    res.json(db)
};

module.exports = restauranteCtrl;