const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config(); 


//MYSQL connection setup
const db = mysql.createConnection({
    // host: process.env.HOST,
    // user: process.env.USER,
    // password: process.env.PASSWORD,
    // database: process.env.DATABASE

    host: 'localhost',
    user: 'root',
    password: '123Newaz@',
    database: 'employee_management'
});

db.connect((err) => {
    if(err) throw err;
    console.log('MySQL Connected...');
});

module.exports = db;