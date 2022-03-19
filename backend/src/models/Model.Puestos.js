const { Schema, model } = require("mongoose");

const puestos = new Schema({
    Documento: String,
});

module.exports = model("puestos", puestos);
