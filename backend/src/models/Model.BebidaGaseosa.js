const { Schema, model } = require("mongoose");

const bebidagaseosaSchema = new Schema(
  {
    Consecutivo: {
      type: String,
      required: true,
    },
    Numeracion: {
      type: String,
      required: true,
    },
    Nombre: {
      type: String,
      required: [true, "Por favor ingresar un nombre!"],
      trim: true,
    },
    Precio: {
      type: String,
      required: [true, "Por favor ingresar un precio!"]
    },
    Restaurante: {
      type: String,
      required: [true, "Por favor ingresar un restaurante!"],
    },
    Descripcion: {
      type: String,
      required: [true, "Por favor ingresar una descripcion!"],
      trim: true,
    },
    Foto: {
      type: String,
      required: true,
    },
    Cantidad: {
      type: String,
      required: [true, "Por favor ingresar la cantidad!"],
    },
    Nacionalidad: {
      type: String,
      required: [true, "Por favor ingresar la nacionalidad!"],
      trim: true,
    },
    Marca: {
      type: String,
      required: [true, "Por favor ingresar una marca!"],
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);


module.exports = model("bebidagaseosa", bebidagaseosaSchema);
