const { Schema, model } = require("mongoose");

const bebidacalienteSchema = new Schema(
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
      required: [true, "Por favor ingresar un nombre!"],
      trim: true,
    },
    Ingredientes: {
      type: String,
      required: [true, "Por favor ingresar los ingredientes!"],
      trim: true,
    },
    Precio: {
      type: String,
      required: [true, "Por favor ingresar un precio!"]
    },
    Restaurante: {
      type: String,
      required: [true, "Por favor ingresar un restaurante!"]
    },
    Descripcion: {
      type: String,
      required: [true, "Por favor ingresar una descripcion!"],
      trim: true,
    },
    Foto: {
      type: String,
      required: true,
    }
  },
  { timestamps: true, versionKey: false }
);



module.exports = model("bebidacaliente", bebidacalienteSchema);
