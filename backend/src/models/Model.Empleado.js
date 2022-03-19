const { Schema, model } = require("mongoose");

const empleado = new Schema({
    Documento: String,
});

module.exports = model("empleado", empleado);
