const express = require("express");
const router = express.Router();
const AES = require('../libs/lib.aes256');

// Modelo Mongoose/MongoDB.
const modelo = require('../models/Model.Bitacora');

// Trae el registro unico de la base de datos.
router.get("/api/bitacora", async (req, res) => {
    const DBDocumento = await modelo.findOne({});
    DBDocumento != null
        ? res.json(AES.Desencriptar(DBDocumento.Documento))
        : res.json({ warning: 'No hay registros guardados' })
});

// Modifica el registro unico de la base de datos.
router.put("/api/bitacora", async (req, res) => {
    const db = await modelo.updateOne({},
        { $set: { 'Documento': AES.Encriptar(JSON.stringify(req.body)) } },
        { upsert: true, new: true, setDefaultsOnInsert: true });
    res.json(db)
});

module.exports = router;
