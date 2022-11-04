require('dotenv').config();
const mysql = require('mysql');

const env = process.env;

function newConnection() {
    let conn = mysql.createConnection({
        host: env.MYSQL_HOST || 'localhost',
        user: env.MYSQL_USER || 'varan',
        password: env.MYSQL_PASSWORD || 'gill',
        database: env.MYSQL_DATABASE || 'tutorplatform'
    });
    return conn;
}
console.log(env.MYSQL_HOST);
console.log("pw: " + env.MYSQL_PASSWORD);
module.exports = newConnection;