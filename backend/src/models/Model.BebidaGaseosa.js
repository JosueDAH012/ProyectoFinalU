const { Schema, model } = require("mongoose");

const bebidagaseosaSchema = new Schema(
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
    precio: {
      type: String,
      required: [true, "Por favor ingresar un precio!"]
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
      required: true,
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
    marca: {
      type: String,
      required: [true, "Por favor ingresar una marca!"],
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);


module.exports = model("bebidagaseosa", bebidagaseosaSchema);
