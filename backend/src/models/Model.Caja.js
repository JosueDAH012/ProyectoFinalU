const { Schema, model } = require("mongoose");

const cajaSchema = new Schema(
  {
    Consecutivo: {
      type: String,
      required: true
    },
    Numeracion: {
      type: String,
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
      type: String,
      required: true,
    },
    AperturaCaja: {
      type: String,
      required: true,
    },
    CierreCaja: {
      type: String,
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
