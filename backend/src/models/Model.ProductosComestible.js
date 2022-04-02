const { Schema, model } = require("mongoose");

const productoscomestibleSchema = new Schema(
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
    Cantidad: {
      type: String,
      required: true,
    },
    TipoComestible: {
      type: String,
      required: true,
    },
    Restaurante: {
      type: String,
      required: true,
    },
    Marcas: {
      type: String,
      required: true,
      trim: true,
    },
    ClaseComestible: {
      type: String,
      required: true,
      trim: true,
    },
    LineaComestible: {
      type: String,
      required: true,
      trim: true,
    },
    UnidadMedida: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

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


module.exports = model("productoscomestible", productoscomestibleSchema);
