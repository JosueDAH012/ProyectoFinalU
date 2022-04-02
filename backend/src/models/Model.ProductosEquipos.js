const { Schema, model } = require("mongoose");

const productosequiposSchema = new Schema(
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
    Restaurante: {
      type: String,
      required: true
    },
    Marca: {
      type: String,
      required: true
    },
    Cantidad: {
      type: Number,
      required: true
    },
    Descripcion: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("productosequipos", productosequiposSchema);
