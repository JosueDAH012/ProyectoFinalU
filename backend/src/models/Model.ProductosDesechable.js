const { Schema, model } = require("mongoose");

const productosdesechablesSchema = new Schema(
  {
    Consecutivo: {
      type: String,
      required: true,
    },
    Numeracion: {
      type: Number,
      required: true,
    },
    Nombre: {
      type: String,
      required: true,
      trim: true
    },
    Descripcion: {
      type: String,
      required: true,
      trim: true
    },
    Cantidad: {
      type: Number,
      required: true
    },
    Restaurante: {
      type: String,
      required: true
    },
    Marca: {
      type: String,
      required: true,
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("productosdesechables", productosdesechablesSchema);
