const { addEmployee, searchEmployee, getSingleEmployee, updateEmployee, deleteEmployee, getAllEmployee } = require("../dbManager/manager");

async function addEmployeeController(body, res){

    try{
        const employee = JSON.parse(body);
        await addEmployee(employee)
        res.writeHead(200, {'Content-Type':'text/plain'});
        res.end('Employee Added...');
    } catch(error){
        console.error(error);
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Failed to add employee');
    }
}

async function searchEmployeeController(parsedUrl, res){
    try{
        const { attribute, value } = parsedUrl.query;
        const results = await searchEmployee(attribute, value);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(results));
    }catch(error){
        console.error(error);
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Error searching employees');
    }
}

async function getAllEmployeeController(res) {
    try {
        const results = await getAllEmployee();
        res.writeHead(200, {'Content-Type':'application/json'});
        res.end(JSON.stringify(results));
    } catch (error) {
        console.error(error);
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Failed to Retrieved Employee');
    }
}

async function getSingleEmployeeController(pathname,res) {
    try{
        const segments = pathname.split('/');
        const id = parseInt(segments[segments.length - 1], 10);
        if (isNaN(id)) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Invalid employee ID');
            return;
        }
        const result = await getSingleEmployee(id);
        if (result.length === 0) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Employee not found');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result[0]));
    }catch(error){
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error finding Employee');
    }
    
}

async function updateEmployeeController(pathname, body, res) {
    try{
        const id = parseInt(pathname.split('/')[2]);
        const newData = JSON.parse(body);
        await updateEmployee(newData, id);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Employee updated...');
    }catch(error){
        console.error(error);
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Error updating employee');
    }
}

async function deleteEmployeeController(pathname,res) {
    try{
        const id = parseInt(pathname.split('/')[2]);
        await deleteEmployee(id);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Employee deleted...');
    } catch(error){
        console.error(error);
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Error deleting employee');
    }
    

}

module.exports = {
    addEmployeeController,
    searchEmployeeController,
    getAllEmployeeController,
    getSingleEmployeeController,
    updateEmployeeController,
    deleteEmployeeController
}