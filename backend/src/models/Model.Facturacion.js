const { Schema, model } = require("mongoose");

const facturacionSchema = new Schema(
  {
    Consecutivo: {
      type: String,
      required: true,
    },
    Numeracion: {
      type: Number,
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

module.exports = model("facturacion", facturacionSchema);
