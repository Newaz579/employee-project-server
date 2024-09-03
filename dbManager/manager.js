const db = require("./db");

//Add Employee
function addEmployee(body,res){
    const employee = JSON.parse(body);
    const sql = 'INSERT INTO employees SET ?';
    db.query(sql, employee, (err, result) => {
        if (err) {
            console.error(err);
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Error adding employee');
            return;
        }
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Employee added...');
    });
}

module.exports = addEmployee