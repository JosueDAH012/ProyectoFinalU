const { Schema, model } = require("mongoose");

const productoslimpiezaSchema = new Schema(
  {
    consecutivo: {
      type: String,
      required: true,
      default: 'LH'
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
    },
    cantidadmedida: {
      type: String,
      required: [true, "Por favor ingresar una cantidad de medida!"]
    },
    unidadmedida: {
      type: String,
      required: [true, "Por favor ingresar un restaurante!"]
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("productosdelimpieza", productoslimpiezaSchema);
