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
      required: [true, "Por favor ingresar un nombre!"],
      trim: true,
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
    PrecioUnitario: {
      type: String,
      required: [true, "Por favor ingresar el precio unitario!"],
    },
    PrecioBotella: {
      type: String,
      required: [true, "Por favor ingresar el precio de la botella!"],
    },
    YearCosecha: {
      type: Date,
      required: true,
    },
    Marca: {
      type: String,
      required: [true, "Por favor ingresar la marca!"],
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);


module.exports = model("bebidavino", bebidavinoSchema);
