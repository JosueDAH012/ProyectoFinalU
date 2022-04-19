const { Schema, model } = require("mongoose");

const buffetSchema = new Schema(
  {
    Consecutivo: {
      type: String,
      required: true
    },
    Numeracion: {
      type: String,
      required: true
    },
    Nombre: {
      type: String,
      required: true,
      trim: true,
    },
    Precio: {
      type: String,
      required: true,
    },
    Tipo: {
      type: String,
      required: true,
      trim: true,
    },
    UnidadDeMedida: {
      type: String,
      required: true,
    },
    Foto: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

/*
Tipo:
    Marina, Vegetal, Fruta, Mediterraneo.
*/

module.exports = model("buffet", buffetSchema);
