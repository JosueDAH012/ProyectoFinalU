const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
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
    Username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
      trim: true,
    },
    Roles: {
      type: String,
      required: true,
      default: 0 // 0 = user, 1 = admin
    },
  },
  { timestamps: true, versionKey: false }
);


module.exports = mongoose.model("usuario", usuarioSchema);
