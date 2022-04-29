const { Schema, model } = require("mongoose");

const productoscomestibleSchema = new Schema(
  {
    consecutivo: {
      type: String,
      required: true,
      default: "COM",
    },
    nombre: {
      type: String,
      required: [true, "Por favor ingresar un nombre!"],
      trim: true,
    },
    cantidad: {
      type: String,
      required: [true, "Por favor ingresar una cantidad!"],
    },
    tipocomestible: {
      type: String,
      required: [true, "Por favor ingresar un tipo de comestible!"],
    },
    restaurante: {
      type: String,
      required: [true, "Por favor ingresar un restaurante!"],
    },
    marcas: {
      type: String,
      required: [true, "Por favor ingresar una marca!"],
      trim: true,
    },
    clasecomestible: {
      type: String,
      required: [true, "Por favor ingresar una clase comestible!"],
      trim: true,
    },
    lineacomestible: {
      type: String,
      required: [true, "Por favor ingresar una linea comestible!"],
      trim: true,
    },
    unidadmedida: {
      type: String,
      required: [true, "Por favor ingresar una unidad de medida!"],
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("productoscomestible", productoscomestibleSchema);

/*
 * Posibles datos de la variable Tipo para
 * categorizar los tipos de Tipo de Comestible.
 *
 *  Frutas
 *  Cacao
 *  Carnes
 *  Aceites
 *  Cereales
 *  Vegetales
 *  Legumbres
 *  Frutos Secos
 */

/*
 * Posibles datos de la variable Tipo para
 * categorizar los tipos de Clase de Comestible.
 *
 *  Fibra
 *  Grasas
 *  Proteínas
 *  Vitaminas
 *  Minerales
 *  Carbohidratos
 */

/*
 * Posibles datos de la variable Tipo para
 * categorizar los tipos de Línea de Comestible.
 *
 *  Secos
 *  Congelados
 *  Refrigerados
 */
