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
      type: Date,
      required: true,
      default: new Date()
    },
    Descripcion: {
      type: String,
      required: [true, "Por favor ingresar una descripcion!"],
      trim: true
    },
    Monto: {
      type: String,
      required: [true, "Por favor ingresar un monto!"]
    },
    Restaurante: {
      type: String,
      required: [true, "Por favor ingresar un restaurante!"]
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("facturacion", facturacionSchema);
