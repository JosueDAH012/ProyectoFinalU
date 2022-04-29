const { Schema, model } = require("mongoose");

const cajaSchema = new Schema(
  {
    fecha: {
      type: Date,
      required: true,
      default: new Date()
    },
    descripcion: {
      type: String,
      required: [true, "Por favor ingresar una descripcion!"],
      trim: true,
    },
    entradadinero: {
      type: String,
      required: [true, "Por favor ingresar la entrada de dinero!"]
    },
    aperturacaja: {
      type: String,
      required: [true, "Por favor ingresar la apertura de caja!"]
    },
    cierrecaja: {
      type: String,
      required: [true, "Por favor ingresar el cierre de caja!"]
    },
    restaurante: {
        type: String,
        required: [true, "Por favor ingresar un restaurante!"]
    }
  },
  { timestamps: true, versionKey: false }
);

// Descripcion de la accion realizada.

module.exports = model("caja", cajaSchema);
