const { Schema, model } = require("mongoose");

const bitacoraSchema = new Schema(
  {
    UsuarioID: {
      type: String,
      required: true,
      unique: true,
    },
    Consecutivo: {
      type: String,
      required: true
    },
    Numeracion: {
      type: Number,
      required: true
    },
    Fecha: {
      type: Date,
      required: true,
    },
    Titulo: {
      type: String,
      required: true,
      trim: true,
    },
    Descripcion: {
      type: String,
      required: true,
      trim: true,
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("bitacora", bitacoraSchema);
