const { Schema, model } = require("mongoose");

const bitacoraSchema = new Schema(
  {
    UsuarioID: {
      type: String,
      required: [true, "Por favor ingresar el usuario id!"],
      unique: true,
    },
    Consecutivo: {
      type: String,
      required: true
    },
    Numeracion: {
      type: String,
      required: true
    },
    Fecha: {
      type: Date,
      required: true,
      default: new Date()
    },
    Titulo: {
      type: String,
      required: [true, "Por favor ingresar un titulo!"],
      trim: true,
    },
    Descripcion: {
      type: String,
      required: [true, "Por favor ingresar una descripcion!"],
      trim: true,
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("bitacora", bitacoraSchema);
