const ExportModule = {};
require("dotenv").config();

const aes256 = require('aes256'); // Libreria para encriptar datos.

const constants = require('../config/constants');
const DBPassword = process.env.CONTRASENIA_ENCRIPTACION_DB;

ExportModule.Encriptar = PlainText => aes256.encrypt(DBPassword, PlainText);

ExportModule.Desencriptar = EncryptedText => {
    try {
        return JSON.parse(aes256.decrypt(DBPassword, EncryptedText));
    } catch (error) {
        return { warning: "Error al desencriptar", error: error }
    }
}

module.exports = ExportModule;
