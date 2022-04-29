const { Schema, model } = require("mongoose");

const restauranteSchema = new Schema(
  {
    consecutivo: {
      type: String,
      required: true,
      default: 'RES'
    },
    nombre: {
      type: String,
      required: [true, "Por favor ingrese el nombre!"],
      trim: true
    },
    especialidad: {
      type: String,
      required: [true, "Por favor ingrese la especialidad!"]
    },
    direccion: {
      type: String,
      required: [true, "Por favor ingrese la direccion!"],
      trim: true
    },
    telefono: {
      type: String,
      required: [true, "Por favor ingrese el numero de telefono!"]
    },
    activo: {
      type: String,
      required: true
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("restaurante", restauranteSchema);
