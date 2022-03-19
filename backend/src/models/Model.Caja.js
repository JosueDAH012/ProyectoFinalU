const { Schema, model } = require("mongoose");

const caja = new Schema({
    Documento: String,
});

module.exports = model("caja", caja);
