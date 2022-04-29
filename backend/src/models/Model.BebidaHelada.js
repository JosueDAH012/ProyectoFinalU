const { Schema, model } = require("mongoose");

const bebidaheladaSchema = new Schema(
  {
    consecutivo: {
      type: String,
      required: true,
      default: 'BH'
    },
    nombre: {
      type: String,
      required: [true, "Por favor ingresar un nombre!"],
      trim: true,
    },
    ingredientes: {
      type: String,
      required: [true, "Por favor ingresar los ingredientes!"],
      trim: true,
    },
    precio: {
      type: String,
      required: [true, "Por favor ingresar un precio!"]
    },
    restaurante: {
      type: String,
      required: [true, "Por favor ingresar un restaurante!"]
    },
    descripcion: {
      type: String,
      required: [true, "Por favor ingresar una descripcion!"],
      trim: true,
    },
    foto: {
      type: String,
      default: "https://res.cloudinary.com/mowglirealg/image/upload/v1651183222/bebidahelada/9911538611599230692-128_q7f78d.png"
    }
  },
  { timestamps: true, versionKey: false }
);


module.exports = model("bebidahelada", bebidaheladaSchema);
