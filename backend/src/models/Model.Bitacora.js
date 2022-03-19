const { Schema, model } = require("mongoose");

const bitacora = new Schema({
    Documento: String,
});

module.exports = model("bitacora", bitacora);
