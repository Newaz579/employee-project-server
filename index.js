// const http = require('http');
// const url = require('url');
// const path = require('path');
// const { 
//     addEmployeeController, 
//     searchEmployeeController, 
//     getSingleEmployeeController, 
//     updateEmployeeController, 
//     deleteEmployeeController, 
//     getAllEmployeeController 
// } = require('./controller/controller');
// const fs = require('fs');


// function serveStaticFile(filePath, contentType, res){
//     fs.readFile(filePath, (err, content) => {
//         if(err){
//             res.writeHead(500);
//             res.end('Error');
//         } else{
//             res.writeHead(200, {'Content-Type': contentType});
//             res.end(content, 'utf-8')
//         }
//     });
// };





// // Create HTTP Server
// const server = http.createServer((req, res) => {
//     const parsedUrl = url.parse(req.url, true);
//     const pathname = parsedUrl.pathname;
//     let body = '';

//     // Handle CORS
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//     req.on('data', chunk => {
//         body += chunk.toString();
//     });

//     req.on('end', () => {
        
        
        
//         if(pathname === '/'){
//             serveStaticFile('./view/index.html', 'text/html', res);
//         } else if(req.url.startsWith('/addEmployee/')){
//             console.log('is working')
//             serveStaticFile('./view/addEmployee.html', 'text/html', res);
//             console.log('is working two')
//         } else if(req.url.startsWith('/updateEmployee/')){
//             serveStaticFile('./view/updateEmployee.html', 'text/html', res);
//         } else if (pathname === '/add-employee') {
//             addEmployeeController(body, res)
//         } else if (pathname === '/search-employees') {
//             searchEmployeeController(parsedUrl, res);
//         } else if (pathname.startsWith('/getsingle-employee/')) {
//             getSingleEmployeeController(pathname,res);
//         } else if (req.method === 'PUT' && pathname.startsWith('/update-employee/')) {
//             updateEmployeeController(pathname, body, res)
//         } else if (req.method === 'DELETE' && pathname.startsWith('/delete-employee/')) {
//             deleteEmployeeController(pathname, res);
//         } else if (req.method === 'GET' && pathname === '/getAll') {
//             getAllEmployeeController(res);
//         } else {
//             res.writeHead(404, {'Content-Type': 'text/plain'});
//             res.end('Not Found');
//         }
//     });
// })

// const PORT = 5000;
// server.listen(PORT, () => {
//     console.log(`Server running on port http://localhost:${PORT}`);
// });






// if (pathname === '/') {
        //     fs.readFile('./view/index.html', (err, data) => {
        //         if (err) {
        //             res.writeHead(404, {'Content-Type': 'text/plain'});
        //             res.end('File not found');
        //         } else {
        //             res.writeHead(200, {'Content-Type': 'text/html'});
        //             res.end(data);
        //         }
        //     });
        //     return;
        // } 










const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const {
    addEmployeeController,
    searchEmployeeController,
    getSingleEmployeeController,
    updateEmployeeController,
    deleteEmployeeController,
    getAllEmployeeController
} = require('./controller/controller');

// Function to serve static files
function serveStaticFile(filePath, contentType, res) {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // console.error(`Error reading file ${filePath}:`, err);
            res.writeHead(500);
            res.end('Error occurred');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}

// Create HTTP server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    let body = '';

    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        // console.log(`Request URL: ${req.url}, Method: ${req.method}`); // Debug

        if (pathname === '/') {
            serveStaticFile(path.join(__dirname, 'view', 'index.html'), 'text/html', res);
        } else if (pathname === '/addEmployee') {
            serveStaticFile(path.join(__dirname, 'view', 'addEmployee.html'), 'text/html', res);
        } else if (pathname === '/updateEmployee') {
            serveStaticFile(path.join(__dirname, 'view', 'updateEmployee.html'), 'text/html', res);
        } else if (pathname === '/add-employee') {
            addEmployeeController(body, res);
        } else if (pathname === '/search-employees') {
            searchEmployeeController(parsedUrl, res);
        } else if (pathname.startsWith('/getsingle-employee/')) {
            getSingleEmployeeController(pathname, res);
        } else if (req.method === 'PUT' && pathname.startsWith('/update-employee/')) {
            updateEmployeeController(pathname, body, res);
        } else if (req.method === 'DELETE' && pathname.startsWith('/delete-employee/')) {
            deleteEmployeeController(pathname, res);
        } else if (req.method === 'GET' && pathname === '/getAll') {
            getAllEmployeeController(res);
        } else {
            // console.log(`Route not found: ${pathname}`); // Debug
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    });
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
