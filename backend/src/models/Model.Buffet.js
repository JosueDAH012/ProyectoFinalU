const { Schema, model } = require("mongoose");

const buffetSchema = new Schema(
  {
    consecutivo: {
      type: String,
      required: true
    },
    nombre: {
      type: String,
      required: [true, "Por favor ingresar el nombre!"],
      trim: true,
    },
    precio: {
      type: String,
      required: [true, "Por favor ingresar el precio!"],
    },
    tipo: {
      type: String,
      required: [true, "Por favor ingresar el tipo de buffet!"],
      trim: true,
    },
    unidaddemedida: {
      type: String,
      required: [true, "Por favor ingresar la unidad de medida!"],
    },
    foto: {
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
