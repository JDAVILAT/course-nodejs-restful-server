/**
 * Puerto
 */
process.env.PORT = process.env.PORT || 3000;

/**
 * ENTORNO
 */

// process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * VENCIMIENTO DEL TOKEN
 * ***********************
 * 60 seconds - segundos
 * 60 minutes - minutos
 * 24 hours - horas
 * 30 days - días
 */

process.env.EXPIRATION_TOKEN = 60 * 60 * 24 * 30;

/**
 * SEMILLA DE AUTENTICACIÓN TOKEN
 */
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

/**
 * BASE DE DATOS
 */

let urlDataBase;

if (process.env.NODE_ENV) {
    urlDataBase = process.env.MONGO_URI;
} else {
    urlDataBase = 'mongodb://localhost:27017/coffee';
}

process.env.URL_DB = urlDataBase;