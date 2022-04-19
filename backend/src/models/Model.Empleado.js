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
      required: true,
      trim: true,
    },
    Nombre: {
      type: String,
      required: true,
      trim: true,
    },
    PrimerApellido: {
      type: String,
      required: true,
      trim: true,
    },
    SegundoApellido: {
      type: String,
      required: true,
      trim: true,
    },
    NumeroTelefono: {
      type: String,
      required: true,
    },
    Celular: {
      type: String,
      required: true,
    },
    Puesto: {
        type: String,
        required: true
    },
    Nacionalidad: {
        type: String,
        required: true,
        trim: true
    },
    Restaurante: {
        type: String,
        required: true
    },
    Foto: {
        type: String,
        required: true
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("empleado", empleadoSchema);
