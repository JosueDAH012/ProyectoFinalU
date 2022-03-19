const { Schema, model } = require("mongoose");

const especialidades = new Schema({
    Documento: String,
});

module.exports = model("especialidades", especialidades);
