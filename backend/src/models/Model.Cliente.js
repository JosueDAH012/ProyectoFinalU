const { Schema, model } = require("mongoose");

const cliente = new Schema({
    Documento: String,
});

module.exports = model("cliente", cliente);
