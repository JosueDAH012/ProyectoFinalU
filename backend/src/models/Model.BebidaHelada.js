const { Schema, model } = require("mongoose");

const bebidaheladaSchema = new Schema(
  {
    Consecutivo: {
      type: String,
      required: true,
    },
    Numeracion: {
      type: Number,
      required: true,
    },
    Nombre: {
      type: String,
      required: true,
      trim: true,
    },
    Ingredientes: {
      type: String,
      required: true,
      trim: true,
    },
    Precio: {
      type: Number,
      required: true,
    },
    Restaurante: {
      type: String,
      required: true,
    },
    Descripcion: {
      type: String,
      required: true,
      trim: true,
    },
    Foto: {
      type: String,
      required: true,
    }
  },
  { timestamps: true, versionKey: false }
);


module.exports = model("bebidahelada", bebidaheladaSchema);
