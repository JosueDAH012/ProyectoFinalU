const { Schema, model } = require("mongoose");

const paises = new Schema({
    Documento: String,
});

module.exports = model("paises", paises);
