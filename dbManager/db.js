const mysql = require('mysql');

//MYSQL connection setup
const db = mysql.createConnection({
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