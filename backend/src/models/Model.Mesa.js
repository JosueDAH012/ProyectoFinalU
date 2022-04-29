const { Schema, model } = require("mongoose");

const mesaSchema = new Schema(
  {
    consecutivo: {
      type: String,
      required: true,
      default: 'ME'
    },
    nombre: {
      type: String,
      required: [true, "Por favor ingresar un nombre!"]
    },
    numero: {
      type: String,
      required: [true, "Por favor ingresar el numero de mesa!"]
    },
    cantidadsillas: {
      type: String,
      required: [true, "Por favor ingresar la cantidad de sillas!"]
    },
    restaurante: {
      type: String,
      required: [true, "Por favor ingresar un restaurante!"]
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("mesa", mesaSchema);
