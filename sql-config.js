const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

module.exports = connection;

//look into connection pooling - https://github.com/mysqljs/mysql#pooling-connections
// and for timezones with pools - https://medium.com/@magnusjt/gotcha-timezones-in-nodejs-and-mysql-b39e418c9d3