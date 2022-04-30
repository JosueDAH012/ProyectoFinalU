const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    consecutivo: {
      type: String,
      required: true,
      default: 'USU'
    },
    name: {
      type: String,
      required: [true, "Por favor ingresar su nombre!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Por favor ingresar su email!"],
      trim: true,
      unique: true
    },
    username: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Por favor ingresar una contraseña!"],
    },
    role: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("usuario", usuarioSchema);
