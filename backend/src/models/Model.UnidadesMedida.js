const { Schema, model } = require("mongoose");


const unidadesmedidaSchema = new Schema(
  {
    consecutivo: {
      type: String,
      required: true,
      default: 'UM'
    },
    unidadmedida: {
      type: String,
      required: [true, "Por favor ingresar la unidad de medida!"],
      trim: true
    },
    escala: {
      type: String,
      required: [true, "Por favor ingrese la escala!"],
      trim: true
    },
    detalle: {
      type: String,
      required: [true, "Por favor ingrese un detalle!"],
      trim: true
    },
    simbologia: {
      type: String,
      required: [true, "Por favor ingrese una simbologia!"],
      trim: true
    }
  },
  { timestamps: true, versionKey: false }
);


module.exports = model("unidadesdemedida", unidadesmedidaSchema);
