const mongoose = require("mongoose");
require("dotenv").config();
const AutoIncrementFactory = require('mongoose-sequence');

const connection = mongoose.createConnection(process.env.MONGODB_URI);

const AutoIncrement = AutoIncrementFactory(connection);

const usuarioSchema = new mongoose.Schema(
  {
    Consecutivo: {
      type: String,
      required: true,
      default: 'USU'
    },
    Numeracion: {
      type: Number,
      required: true,
    },
    Nombre: {
      type: String,
      required: [true, "Por favor ingresar su nombre!"],
      trim: true,
    },
    PrimerApellido: {
      type: String,
      required: [true, "Por favor ingresaer su primer apellido!"],
      trim: true,
    },
    SegundoApellido: {
      type: String,
      required: [true, "Por favor ingresar su segundo apellido!"],
      trim: true,
    },
    NumeroTelefono: {
      type: String,
      required:  [true, "Por favor ingresaer un numero telefonico!"],
    },
    Celular: {
      type: String,
      required:  [true, "Por favor ingresaer un numero celular!"],
    },
    Username: {
      type: String,
      required: [true, "Por favor ingresar un nombre de usuario!"],
      trim: true,
      unique: true,
    },
    Password: {
      type: String,
      required: [true, "Por favor ingresar una contraseña!"],
      trim: true,
    },
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
    },
    Rol: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);
usuarioSchema.plugin(AutoIncrement, {inc_field: 'numeracion'});

module.exports = mongoose.model("usuario", usuarioSchema);
