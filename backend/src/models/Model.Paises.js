const { Schema, model } = require("mongoose");

const paises = new Schema(
  {
    Consecutivo: {
      type: String,
      required: true,
    },
    Numeracion: {
      type: Number,
      required: true,
    },
    Nombre: {
      type: String,
      required: true,
    },
    FotoBandera: {
      type: String,
      required: true,
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("paises", paises);
