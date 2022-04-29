const { Schema, model, mongoose } = require("mongoose");

const pdSchema = new Schema(
  {
    consecutivo: {
      type: String,
      required: true,
      default: 'DE'
    },
    nombre: {
      type: String,
      required: [true, "Por favor ingresar un nombre!"],
      trim: true
    },
    descripcion: {
      type: String,
      required: [true, "Por favor ingresar una descripcion!"],
      trim: true
    },
    cantidad: {
      type: String,
      required: [true, "Por favor ingresar una cantidad!"]
    },
    restaurante: {
      type: String,
      required: [true, "Por favor ingresar un restaurante!"]
    },
    marca: {
      type: String,
      required: [true, "Por favor ingresar una marca!"]
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("productosdesechables", pdSchema);
