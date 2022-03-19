const { Schema, model } = require("mongoose");

const buffet = new Schema({
    Documento: String,
});

module.exports = model("buffet", buffet);
