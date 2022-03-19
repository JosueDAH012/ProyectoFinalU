const { Schema, model } = require("mongoose");

const usuario = new Schema({
    Documento: String,
});

module.exports = model("usuario", usuario);
