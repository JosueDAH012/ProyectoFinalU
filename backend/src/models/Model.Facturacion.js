const { Schema, model } = require("mongoose");

const facturacion = new Schema({
    Documento: String,
});

module.exports = model("facturacion", facturacion);
