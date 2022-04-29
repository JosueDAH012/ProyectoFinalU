const { Schema, model } = require("mongoose");

const buffetSchema = new Schema(
  {
    consecutivo: {
      type: String,
      required: true,
      default: 'BUF'
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
      default: "https://res.cloudinary.com/mowglirealg/image/upload/v1651183764/buffet/18910750351620395704-128_f5nu6a.png"
    },
  },
  { timestamps: true, versionKey: false }
);

/*
Tipo:
    Marina, Vegetal, Fruta, Mediterraneo.
*/

module.exports = model("buffet", buffetSchema);
