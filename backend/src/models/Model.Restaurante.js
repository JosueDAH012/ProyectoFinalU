const { Schema, model } = require("mongoose");

const restaurante = new Schema({
    Documento: String,
});

module.exports = model("restaurante", restaurante);
