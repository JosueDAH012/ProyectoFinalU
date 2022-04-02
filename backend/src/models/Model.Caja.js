const { Schema, model } = require("mongoose");

const cajaSchema = new Schema(
  {
    Consecutivo: {
      type: String,
      required: true
    },
    Numeracion: {
      type: Number,
      required: true
    },
    Fecha: {
      type: Date,
      required: true,
    },
    Descripcion: {
      type: String,
      required: true,
      trim: true,
    },
    EntradaDinero: {
      type: Number,
      required: true,
    },
    AperturaCaja: {
      type: Date,
      required: true,
    },
    CierreCaja: {
      type: Date,
      required: true,
    },
    Restaurante: {
        type: String,
        required: true
    }
  },
  { timestamps: true, versionKey: false }
);

// Descripcion de la accion realizada.

module.exports = model("caja", cajaSchema);
