const { Schema, model } = require("mongoose");

const consecutivoSchema = new Schema(
  {
    codigo: {
      type: String,
      unique: true,
      required: true,
    },
    descripcion: {
      type: String,
      unique: true,
      required: true,
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("consecutivo", consecutivoSchema);


/*{ "Codigo": "CLI", "Descripcion": "Clientes" },
      { "Codigo": "PE", "Descripcion": "Personal" },
      { "Codigo": "PRO", "Descripcion": "Proveedores" },
      { "Codigo": "PU", "Descripcion": "Puestos" },
      { "Codigo": "EVE", "Descripcion": "Eventos o Roles" },
      { "Codigo": "USU", "Descripcion": "Usuarios" },
      { "Codigo": "UM", "Descripcion": "Unidad de Medida" },
      { "Codigo": "P", "Descripcion": "Paises" },
      { "Codigo": "M", "Descripcion": "Marcas" },
      { "Codigo": "COM", "Descripcion": "Comestibles" },
      { "Codigo": "DE", "Descripcion": "Desechables y Empaques" },
      { "Codigo": "EU", "Descripcion": "Equipos y Utensilios" },
      { "Codigo": "LH", "Descripcion": "Limpieza e Higiene" },
      { "Codigo": "TEC", "Descripcion": "Tecnologia" },
      { "Codigo": "RES", "Descripcion": "Restaurante" },
      { "Codigo": "BUF", "Descripcion": "Buffet" },
      { "Codigo": "ESP", "Descripcion": "Especialidades" },
      { "Codigo": "BC", "Descripcion": "Bebidas Calientes" },
      { "Codigo": "BH", "Descripcion": "Bebidas Heladas" },
      { "Codigo": "BG", "Descripcion": "Bebidas Gaseosas" },
      { "Codigo": "L", "Descripcion": "Licores" },
      { "Codigo": "V", "Descripcion": "Vinos" },
      { "Codigo": "EMP", "Descripcion": "Empleados" },
      { "Codigo": "ME", "Descripcion": "Mesas" },
      { "Codigo": "BIT", "Descripcion": "Bitacoras" },
      { "Codigo": "FAC", "Descripcion": "Facturas" }
      */