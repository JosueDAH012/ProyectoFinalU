const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserProfile = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "usuario",
      required: true
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
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/mowglirealg/image/upload/v1651175237/avatar/avatar_zaroie.png"
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("profiles", UserProfile);
