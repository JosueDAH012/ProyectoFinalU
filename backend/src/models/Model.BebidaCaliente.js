const { Schema, model } = require("mongoose");

const bebidacalienteSchema = new Schema(
  {
    consecutivo: {
      type: String,
      required: true,
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
      required: true,
    }
  },
  { timestamps: true, versionKey: false }
);



module.exports = model("bebidacaliente", bebidacalienteSchema);
