//Add Employee

const db = require("./db");

function addEmployee(employee) {
    // console.log(employee);
    const sql = 'INSERT INTO employees SET ?';
    return new Promise((resolve, reject) => {
        db.query(sql, employee, (err, result) => {
            if(err){
                return reject(err);
            } 
            // console.log(result);
            return resolve(result);
            
        });
    });
}

function searchEmployee(attribute, value){
    const sql = 'SELECT * FROM employees WHERE ?? LIKE ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [attribute, `%${value}%`], (err, result) => {
            if(err){
                return reject(err);
            }
            return resolve(result);
        });
    });
}

function getAllEmployee(){
    const sql = 'SELECT * FROM employees';
    return new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
}

function getSingleEmployee(id){
    const sql = 'SELECT * FROM employees WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [id], (err, results) => {
            if(err){
                return reject(err);
            }
            
            return resolve(results)
        })
    })
}

function updateEmployee(newData, id){
    const sql = 'UPDATE employees SET ? WHERE id = ?';
    return new Promise ((resolve, reject) => {
        db.query(sql, [newData, id], (err, result) => {
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

function deleteEmployee(id){
    const sql = 'DELETE FROM employees WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, id, (err, result) => {
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
}

module.exports = {
    addEmployee,
    searchEmployee,
    getAllEmployee,
    getSingleEmployee,
    updateEmployee,
    deleteEmployee
};