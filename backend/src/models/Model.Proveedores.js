const { Schema, model } = require("mongoose");

const proveedores = new Schema({
    Documento: String,
});

module.exports = model("proveedores", proveedores);
