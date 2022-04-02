const { Schema, model } = require("mongoose");

const mesaSchema = new Schema(
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
    },
    Numero: {
      type: Number,
      required: true
    },
    CantidadSillas: {
      type: Number,
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
