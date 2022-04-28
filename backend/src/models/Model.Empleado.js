const { Schema, model } = require("mongoose");

const empleadoSchema = new Schema(
  {
    consecutivo: {
      type: String,
      required: true,
    },
    cedula: {
      type: String,
      required: [true, "Por favor ingresar su cedula!"],
      trim: true,
    },
    nombre: {
      type: String,
      required: [true, "Por favor ingresar su nombre!"],
      trim: true,
    },
    primerapellido: {
      type: String,
      required: [true, "Por favor ingresar su primer apellido!"],
      trim: true,
    },
    segundoapellido: {
      type: String,
      required: [true, "Por favor ingresar su segundo apellido!"],
      trim: true,
    },
    numerotelefono: {
      type: String,
      required: [true, "Por favor ingresar un numero telefonico!"]
    },
    celular: {
      type: String,
      required: [true, "Por favor ingresar un numero celular!"]
    },
    puesto: {
        type: String,
        required: [true, "Por favor ingresar un puesto!"]
    },
    nacionalidad: {
        type: String,
        required: [true, "Por favor ingresar una nacionalidad!"],
        trim: true
    },
    restaurante: {
        type: String,
        required: [true, "Por favor ingresar un restaurante!"]
    },
    foto: {
        type: String,
        required: true
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("empleado", empleadoSchema);
