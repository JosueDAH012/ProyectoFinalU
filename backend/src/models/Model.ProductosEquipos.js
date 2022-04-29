const { Schema, model } = require("mongoose");

const productosequiposSchema = new Schema(
  {
    consecutivo: {
      type: String,
      required: true,
      default: 'EU'
    },
    nombre: {
      type: String,
      required: [true, "Por favor ingresar un nombre!"],
      trim: true
    },
    restaurante: {
      type: String,
      required: [true, "Por favor ingresar un restaurante!"]
    },
    marca: {
      type: String,
      required: [true, "Por favor ingresar una marca!"]
    },
    cantidad: {
      type: String,
      required: [true, "Por favor ingresar una cantidad!"]
    },
    descripcion: {
      type: String,
      required: [true, "Por favor ingresar una descripcion!"],
      trim: true
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("productosdeequipos", productosequiposSchema);

