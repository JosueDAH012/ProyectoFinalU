const { Schema, model } = require("mongoose");

const mesaSchema = new Schema(
  {
    Consecutivo: {
      type: String,
      required: true,
    },
    Numeracion: {
      type: String,
      required: true,
    },
    Nombre: {
      type: String,
      required: [true, "Por favor ingresar un nombre!"]
    },
    Numero: {
      type: String,
      required: [true, "Por favor ingresar el numero de mesa!"]
    },
    CantidadSillas: {
      type: String,
      required: [true, "Por favor ingresar la cantidad de sillas!"]
    },
    Restaurante: {
      type: String,
      required: [true, "Por favor ingresar un restaurante!"]
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("mesa", mesaSchema);
