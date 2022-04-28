const { Schema, model, mongoose } = require("mongoose");
require("dotenv").config();
const AutoIncrementFactory = require('mongoose-sequence');

const connection = mongoose.createConnection(process.env.MONGODB_URI);

const AutoIncrement = AutoIncrementFactory(connection);

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
unidadesmedidaSchema.plugin(AutoIncrement, {inc_field: 'numeracion'});

module.exports = model("unidadesmedida", unidadesmedidaSchema);
