const { Schema, model } = require("mongoose");

const bebidavinoSchema = new Schema(
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
      type: Number,
      required: true,
    },
    Nacionalidad: {
      type: String,
      required: true,
      trim: true,
    },
    PrecioUnitario: {
      type: Number,
      required: true,
    },
    PrecioBotella: {
      type: Number,
      required: true,
    },
    YearCosecha: {
      type: Date,
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
