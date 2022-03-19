const app = require('./server');

(async () => {
    const DBConnection = require('./config/database'), dbConnection = new DBConnection();
    await dbConnection.connect(); // Antes de inicial la aplicación debe haber una conexion a la DB.

    require('./libs/lib.db.defaults')(); // Se crean los DBDefaults.

    app.listen(app.get('port'), () => {
        console.log(`Aplicacion corriendo en puerto: ${app.get('port')}`);
    });
})();
