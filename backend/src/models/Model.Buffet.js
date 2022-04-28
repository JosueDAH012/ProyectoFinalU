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
      required: [true, "Por favor ingresar el nombre!"],
      trim: true,
    },
    Precio: {
      type: String,
      required: [true, "Por favor ingresar el precio!"],
    },
    Tipo: {
      type: String,
      required: [true, "Por favor ingresar el tipo de buffet!"],
      trim: true,
    },
    UnidadDeMedida: {
      type: String,
      required: [true, "Por favor ingresar la unidad de medida!"],
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
