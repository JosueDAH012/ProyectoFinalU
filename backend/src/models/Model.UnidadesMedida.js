const { Schema, model } = require("mongoose");

const unidadesmedidaSchema = new Schema(
  {
    Consecutivo: {
      type: String,
      required: true,
    },
    Numeracion: {
      type: String,
      required: true,
    },
    UnidadMedida: {
      type: String,
      required: true,
      trim: true
    },
    Escala: {
      type: String,
      required: true,
      trim: true
    },
    Detalle: {
      type: String,
      required: true,
      trim: true
    },
    Simbologia: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("unidadesmedida", unidadesmedidaSchema);
