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
      default: new Date()
    },
    Descripcion: {
      type: String,
      required: [true, "Por favor ingresar una descripcion!"],
      trim: true,
    },
    EntradaDinero: {
      type: String,
      required: [true, "Por favor ingresar la entrada de dinero!"]
    },
    AperturaCaja: {
      type: String,
      required: [true, "Por favor ingresar la apertura de caja!"]
    },
    CierreCaja: {
      type: String,
      required: [true, "Por favor ingresar el cierre de caja!"]
    },
    Restaurante: {
        type: String,
        required: [true, "Por favor ingresar un restaurante!"]
    }
  },
  { timestamps: true, versionKey: false }
);

// Descripcion de la accion realizada.

module.exports = model("caja", cajaSchema);
