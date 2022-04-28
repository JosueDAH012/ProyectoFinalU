const mongoose = require("mongoose");
require("dotenv").config();
const AutoIncrementFactory = require('mongoose-sequence');

const connection = mongoose.createConnection(process.env.MONGODB_URI);

const AutoIncrement = AutoIncrementFactory(connection);

const usuarioSchema = new mongoose.Schema(
  {
    consecutivo: {
      type: String,
      required: true,
      default: 'USU'
    },
    nombre: {
      type: String,
      required: [true, "Por favor ingresar su nombre!"],
      trim: true,
    },
    primerapellido: {
      type: String,
      required: [true, "Por favor ingresaer su primer apellido!"],
      trim: true,
    },
    segundoapellido: {
      type: String,
      required: [true, "Por favor ingresar su segundo apellido!"],
      trim: true,
    },
    numerotelefono: {
      type: String,
      required:  [true, "Por favor ingresaer un numero telefonico!"],
    },
    celular: {
      type: String,
      required:  [true, "Por favor ingresaer un numero celular!"],
    },
    username: {
      type: String,
      required: [true, "Por favor ingresar un nombre de usuario!"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Por favor ingresar una contraseña!"],
      trim: true,
    },
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
    },
    rol: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);
usuarioSchema.plugin(AutoIncrement, {inc_field: 'numeracion'});

module.exports = mongoose.model("usuario", usuarioSchema);
