/**
 * Puerto
 */

process.env.PORT = process.env.PORT || 3000;

/**
 * ENTORNO
 */

// process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * BASE DE DATOS
 */

let urlDataBase;

if (process.env.NODE_ENV) {
    urlDataBase = 'mongodb+srv://jjordandt:u8iPKIk233BgfQfF@cluster0-47a4i.mongodb.net/coffee';
} else {
    urlDataBase = 'mongodb://localhost:27017/coffee';
}

process.env.URL_DB = urlDataBase;