const { Schema, model } = require("mongoose");

const bebida = new Schema({
    Documento: String,
});

module.exports = model("bebida", bebida);
