const { Schema, model } = require("mongoose");

const restauranteSchema = new Schema(
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
    Especialidad: {
      type: String,
      required: true
    },
    Direccion: {
      type: String,
      required: true,
      trim: true
    },
    Telefono: {
      type: String,
      required: true
    },
    Activo: {
      type: String,
      required: true
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("restaurante", restauranteSchema);
