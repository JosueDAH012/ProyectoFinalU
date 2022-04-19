const { Schema, model } = require("mongoose");

const productoslimpiezaSchema = new Schema(
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
      trim: true
    },
    Restaurante: {
      type: String,
      required: true
    },
    Marca: {
      type: String,
      required: true
    },
    Cantidad: {
      type: String,
      required: true
    },
    Descripcion: {
      type: String,
      required: true,
      trim: true
    },
    CantidadMedida: {
      type: String,
      required: true
    },
    UnidadMedida: {
      type: String,
      required: true
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("productoslimpieza", productoslimpiezaSchema);
