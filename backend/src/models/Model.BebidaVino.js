const { Schema, model } = require("mongoose");

const bebidavinoSchema = new Schema(
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
    PrecioUnitario: {
      type: String,
      required: true,
    },
    PrecioBotella: {
      type: String,
      required: true,
    },
    YearCosecha: {
      type: String,
      required: true,
    },
    Marca: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);


module.exports = model("bebidavino", bebidavinoSchema);
