const url = require('url');
const {
    addEmployeeController,
    searchEmployeeController,
    getSingleEmployeeController,
    updateEmployeeController,
    deleteEmployeeController,
    getAllEmployeeController
} = require('../controller/controller');

function employeeRoutes(req, res, body) {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (req.method === 'POST' && pathname === '/add-employee') {
        // console.log('Adding employee...');
        addEmployeeController(body, res);
    } else if (req.method === 'GET' && pathname === '/search-employees') {
        // console.log('Searching employees...');
        searchEmployeeController(parsedUrl, res);
    } else if (req.method === 'GET' && pathname.startsWith('/getsingle-employee/')) {
        // console.log('Getting single employee...');
        getSingleEmployeeController(pathname, res);
    } else if (req.method === 'PUT' && pathname.startsWith('/update-employee/')) {
        console.log('Updating employee...');
        updateEmployeeController(pathname, body, res);;
    } else if (req.method === 'DELETE' && pathname.startsWith('/delete-employee/')) {
        // console.log('Deleting employee...');
        deleteEmployeeController(pathname, res);
    } else if (req.method === 'GET' && pathname === '/getAll') {
        // console.log('Getting all employees...');
        getAllEmployeeController(res);
    } else {
        // console.log(`Route not found: ${pathname}`);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
}

module.exports = employeeRoutes;






























// const url = require('url');
// const path = require('path');
// const fs = require('fs');
// const {
//     addEmployeeController,
//     searchEmployeeController,
//     getSingleEmployeeController,
//     updateEmployeeController,
//     deleteEmployeeController,
//     getAllEmployeeController
// } = require('../controller/controller');


// function employeeRoutes(req, res){
//     const parsedUrl = url.parse(req.url, true);
//     const pathname = parsedUrl.pathname;
//     let body = '';

//         // console.log(`Request URL: ${req.url}, Method: ${req.method}`); // Debug
//     if (pathname === '/add-employee') {
//         console.log('add');
//         addEmployeeController(body, res);
//     } else if (pathname === '/search-employees') {
//         searchEmployeeController(parsedUrl, res);
//     } else if (pathname.startsWith('/getsingle-employee/')) {
//         getSingleEmployeeController(pathname, res);
//     } else if (req.method === 'PUT' && pathname.startsWith('/update-employee/')) {
//         updateEmployeeController(pathname, body, res);
//     } else if (req.method === 'DELETE' && pathname.startsWith('/delete-employee/')) {
//         deleteEmployeeController(pathname, res);
//     } else if (req.method === 'GET' && pathname === '/getAll') {
//         getAllEmployeeController(res);
//     }
//     else {
//         // console.log(`Route not found: ${pathname}`); // Debug
//         res.writeHead(404, { 'Content-Type': 'text/plain' });
//         res.end('Not Found');
//     }
// }



// module.exports = employeeRoutes;
