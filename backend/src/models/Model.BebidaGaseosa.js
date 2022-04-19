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
      required: true,
      trim: true,
    },
    Precio: {
      type: String,
      required: true,
    },
    Restaurante: {
      type: String,
      required: true,
    },
    Descripcion: {
      type: String,
      required: true,
      trim: true,
    },
    Foto: {
      type: String,
      required: true,
    },
    Cantidad: {
      type: String,
      required: true,
    },
    Nacionalidad: {
      type: String,
      required: true,
      trim: true,
    },
    Marca: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);


module.exports = model("bebidagaseosa", bebidagaseosaSchema);
