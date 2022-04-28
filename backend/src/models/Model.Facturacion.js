const { Schema, model } = require("mongoose");

const facturacionSchema = new Schema(
  {
    consecutivo: {
      type: String,
      required: true,
    },
    tipofecha: { 
      type: Date,
      required: true,
      default: new Date()
    },
    descripcion: {
      type: String,
      required: [true, "Por favor ingresar una descripcion!"],
      trim: true
    },
    monto: {
      type: String,
      required: [true, "Por favor ingresar un monto!"]
    },
    restaurante: {
      type: String,
      required: [true, "Por favor ingresar un restaurante!"]
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("facturacion", facturacionSchema);
