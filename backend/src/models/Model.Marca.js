const { Schema, model } = require("mongoose");

const marca = new Schema({
    Documento: String,
});

module.exports = model("marca", marca);
