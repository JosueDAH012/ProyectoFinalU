const { Schema, model } = require("mongoose");

const facturacionSchema = new Schema(
  {
    Consecutivo: {
      type: String,
      required: true,
    },
    Numeracion: {
      type: String,
      required: true,
    },
    TipoFecha: { 
      type: String,
      required: true
    },
    Descripcion: {
      type: String,
      required: true,
      trim: true
    },
    Monto: {
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

module.exports = model("facturacion", facturacionSchema);
