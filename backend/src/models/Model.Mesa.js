const { Schema, model } = require("mongoose");

const mesaSchema = new Schema(
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
    },
    Numero: {
      type: String,
      required: true
    },
    CantidadSillas: {
      type: String,
      required: true
    },
    Restaurante: {
      type: String,
      required: true
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("mesa", mesaSchema);
