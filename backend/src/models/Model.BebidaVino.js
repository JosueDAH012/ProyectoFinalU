const { Schema, model } = require("mongoose");

const bebidavinoSchema = new Schema(
  {
    consecutivo: {
      type: String,
      required: true,
      default: 'V'
    },
    nombre: {
      type: String,
      required: [true, "Por favor ingresar un nombre!"],
      trim: true,
    },
    restaurante: {
      type: String,
      required: [true, "Por favor ingresar un restaurante!"],
    },
    descripcion: {
      type: String,
      required: [true, "Por favor ingresar una descripcion!"],
      trim: true,
    },
    foto: {
      type: String,
      default: "https://res.cloudinary.com/mowglirealg/image/upload/v1651183623/bebidavino/778559671580359500-128_dhmlil.png"
    },
    cantidad: {
      type: String,
      required: [true, "Por favor ingresar la cantidad!"],
    },
    nacionalidad: {
      type: String,
      required: [true, "Por favor ingresar la nacionalidad!"],
      trim: true,
    },
    preciounitario: {
      type: String,
      required: [true, "Por favor ingresar el precio unitario!"],
    },
    preciobotella: {
      type: String,
      required: [true, "Por favor ingresar el precio de la botella!"],
    },
    yearcosecha: {
      type: Date,
      required: true,
    },
    marca: {
      type: String,
      required: [true, "Por favor ingresar la marca!"],
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);


module.exports = model("bebidavino", bebidavinoSchema);
