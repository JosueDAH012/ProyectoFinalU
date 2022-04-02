const { Schema, model } = require("mongoose");

const puestosSchema = new Schema(
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
      trim: true
    },
    PosicionRestaurante: {
      type: String,
      required: true,
    },
    Rol: {
      type: String,
      required: true,
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("puestos", puestosSchema);
