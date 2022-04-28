const { Schema, model } = require("mongoose");

const empleadoSchema = new Schema(
  {
    Consecutivo: {
      type: String,
      required: true,
    },
    Numeracion: {
      type: String,
      required: true,
    },
    Cedula: {
      type: String,
      required: [true, "Por favor ingresar su cedula!"],
      trim: true,
    },
    Nombre: {
      type: String,
      required: [true, "Por favor ingresar su nombre!"],
      trim: true,
    },
    PrimerApellido: {
      type: String,
      required: [true, "Por favor ingresar su primer apellido!"],
      trim: true,
    },
    SegundoApellido: {
      type: String,
      required: [true, "Por favor ingresar su segundo apellido!"],
      trim: true,
    },
    NumeroTelefono: {
      type: String,
      required: [true, "Por favor ingresar un numero telefonico!"]
    },
    Celular: {
      type: String,
      required: [true, "Por favor ingresar un numero celular!"]
    },
    Puesto: {
        type: String,
        required: [true, "Por favor ingresar un puesto!"]
    },
    Nacionalidad: {
        type: String,
        required: [true, "Por favor ingresar una nacionalidad!"],
        trim: true
    },
    Restaurante: {
        type: String,
        required: [true, "Por favor ingresar un restaurante!"]
    },
    Foto: {
        type: String,
        required: true
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("empleado", empleadoSchema);
