module.exports = class Bitacora{
    constructor(){
        this.ID;
        // Se guarda el ID para así poder traer
        // toda la informacion posible de éste.
        this.UsuarioID;
        this.Fecha;
        this.DescripcionTitulo;
        // Descripción detallada del registro.
        this.DescripcionCuerpo;
    }
}