const { Schema, model, mongoose } = require("mongoose");
require("dotenv").config();
const AutoIncrementFactory = require('mongoose-sequence');

const connection = mongoose.createConnection(process.env.MONGODB_URI);

const AutoIncrement = AutoIncrementFactory(connection);

const proveedoresSchema = new Schema(
  {
    _id: Number,
    consecutivo: {
      type: String,
      required: true,
      default: 'PRO'
    },

    nombre: {
      type: String,
      required: [true, "Por favor ingresar un nombre!"],
      trim: true
    },
    primerapellido: {
      type: String,
      required: [true, "Por favor ingresar un primer apellido!"],
      trim: true
    },
    segundoapellido: {
      type: String,
      required: [true, "Por favor ingresar un segundo apellido!"],
      trim: true
    },
    correoelectronico: {
      type: String,
      required: [true, "Por favor ingresar un correo electronico!"],
      trim: true
    },
    telefonooficina: {
      type: String,
      required: [true, "Por favor ingresar un telefono de oficina!"]
    },
    fax: {
      type: String,
      required: [true, "Por favor ingresar un telefono fax!"]
    },
    celular: {
      type: String,
      required: [true, "Por favor ingresar un telefono celular!"]
    },
    cedula: {
      type: String,
      required: [true, "Por favor ingresar una cedula!"]
    },
    fechaingreso: {
      type: Date,
      required: true,
      default: new Date()
    },
    direccion: {
      type: String,
      required: [true, "Por favor ingresar una direccion!"],
      trim: true
    },
    productosmanejados: {
      type: String,
      required: [true, "Por favor ingresar los productos manejados!"],
      trim: true
    },
    nombrecontacto: {
      type: String,
      required: [true, "Por favor ingresar un nombre de contacto!"],
      trim: true
    },
    telefonocontacto: {
      type: String,
      required: [true, "Por favor ingresar un telefono de contacto!"],
    },
    direccioncontacto: {
      type: String,
      required: [true, "Por favor ingresar una contraseña!"],
      trim: true
    },
    foto: {
      type: String,
      required: true
    }
  },
  { timestamps: true, versionKey: false }
);
proveedoresSchema.plugin(AutoIncrement);

module.exports = model("proveedores", proveedoresSchema);
