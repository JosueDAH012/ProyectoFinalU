const { Schema, model } = require("mongoose");

const paisesSchema = new Schema(
  {
    consecutivo: {
      type: String,
      required: true,
      default: 'P'
    },
    nombre: {
      type: String,
      required: [true, "Por favor ingresar un nombre!"]
    },
    fotobandera: {
      type: String,
      default: "https://res.cloudinary.com/mowglirealg/image/upload/v1651184134/paises/68863564516354197474526-128_chhxeb.png"
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("paises", paisesSchema);
