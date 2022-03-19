const { Schema, model } = require("mongoose");

const unidadesmedida = new Schema({
    Documento: String,
});

module.exports = model("unidadesmedida", unidadesmedida);
