const { Schema, model } = require("mongoose");

const buffetSchema = new Schema(
  {
    Consecutivo: {
      type: String,
      required: true
    },
    Numeracion: {
      type: Number,
      required: true
    },
    Nombre: {
      type: String,
      required: true,
      trim: true,
    },
    Precio: {
      type: Number,
      required: true,
    },
    Tipo: {
      type: String,
      required: true,
      trim: true,
    },
    UnidadDeMedida: {
      type: Number,
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
