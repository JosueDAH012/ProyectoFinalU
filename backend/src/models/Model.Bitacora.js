const { Schema, model } = require("mongoose");

const bitacoraSchema = new Schema(
  {
    usuarioID: {
      type: String,
      required: [true, "Por favor ingresar el usuario id!"],
      unique: true,
    },
    consecutivo: {
      type: String,
      required: true
    },
    fecha: {
      type: Date,
      required: true,
      default: new Date()
    },
    titulo: {
      type: String,
      required: [true, "Por favor ingresar un titulo!"],
      trim: true,
    },
    descripcion: {
      type: String,
      required: [true, "Por favor ingresar una descripcion!"],
      trim: true,
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("bitacora", bitacoraSchema);
