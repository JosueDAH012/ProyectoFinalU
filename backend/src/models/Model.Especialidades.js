const { Schema, model } = require("mongoose");

const especialidadesSchema = new Schema(
  {
    consecutivo: {
      type: String,
      required: true,
      default: 'ESP'
    },
    nombre: {
      type: String,
      required: [true, "Por favor ingrese el nombre!"],
      trim: true,
    },
    ingredientes: {
      type: String,
      required: [true, "Por favor ingrese los ingredientes!"],
      trim: true,
    },
    precio: {
      type: String,
      required: true,
    },
    detalle: {
      type: String,
      required: true,
      trim: true,
    },
    foto: {
      type: String,
      default: "https://res.cloudinary.com/mowglirealg/image/upload/v1651183948/especialidad/1178911411621881304-128_waotrv.png"
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("especialidades", especialidadesSchema);
