const { Schema, model } = require("mongoose");

const mesa = new Schema({
    Documento: String,
});

module.exports = model("mesa", mesa);
