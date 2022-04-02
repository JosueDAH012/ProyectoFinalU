// Clase encargada de hacer una conexión a la base de datos.
require("dotenv").config();
const mongoose = require('mongoose');

module.exports = class DBConnection {
    constructor() {
        this.MONGODB_HOST = process.env.MONGODB_URI
        this.config = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
    }

    // Inicia una conexión en la base de datos.
    async connect(log = false) {
        try {
            const conn = await mongoose.connect(this.MONGODB_HOST, {
                useNewUrlParser: this.config.useNewUrlParser,
                useUnifiedTopology: this.config.useUnifiedTopology
            });
            if (log) console.log(`Database connected to ${conn.connection.host}`);
        } catch (error) { console.error(error); }
    }

    // Termina la conexión de la base de datos.
    async disconnect() {
        await mongoose.disconnect();
    }
};
