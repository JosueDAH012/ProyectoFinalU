const { Schema, model } = require("mongoose");

const puestosSchema = new Schema(
  {
    consecutivo: {
      type: String,
      required: true,
      default: 'PU'
    },
    nombre: {
      type: String,
      required: [true, "Por favor ingresar un nombre!"],
      trim: true
    },
    posicionrestaurante: {
      type: String,
      required: [true, "Por favor ingresar una posicion en el restuarante!"]
    },
    rol: {
      type: String,
      required: [true, "Por favor ingresar un puesto!"]
    }
  },
  { timestamps: true, versionKey: false }
);



module.exports = model("puestos", puestosSchema);
