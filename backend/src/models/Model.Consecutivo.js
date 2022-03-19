const { Schema, model } = require("mongoose");

const consecutivo = new Schema({
    Documento: String,
});

module.exports = model("consecutivo", consecutivo);
