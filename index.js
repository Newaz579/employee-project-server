const http = require('http');
const url = require('url');
const db = require('./dbManager/db');
const { addEmployeeController, searchEmployeeController, getSingleEmployeeController, updateEmployeeController, deleteEmployeeController, getAllEmployeeController } = require('./controller/controller');




// Create HTTP Server
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
        if (req.method === 'OPTIONS') {
            // Handle preflight requests
            res.writeHead(204);
            res.end();
            return;
        }

        if (pathname === '/add-employee') {
            addEmployeeController(body, res)
        } else if (pathname === '/search-employees') {
            searchEmployeeController(parsedUrl, res);
        } else if (pathname.startsWith('/getsingle-employee/')) {
            getSingleEmployeeController(pathname,res);
        } else if (req.method === 'PUT' && pathname.startsWith('/update-employee/')) {
            updateEmployeeController(pathname, body, res)
        } else if (req.method === 'DELETE' && pathname.startsWith('/delete-employee/')) {
            deleteEmployeeController(pathname, res);
        } else if (req.method === 'GET' && pathname === '/') {
            getAllEmployeeController(res);
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not Found');
        }
    });
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});











// else if(pathname === '/getsingle-employee/'){
            //     const id = parseInt(pathname.split('/')[2]);
            //     const sql = 'SELECT * FROM employees WHERE id = ?';
            //     db.query(sql, [id], (err, results) => {
            //         if(err){
            //             console.error(err);
            //             res.writeHead(500, {'Content-Type': 'text/plain'});
            //             res.end('Error to find Employee');
            //             return;
            //         }
            //         res.writeHead(200, {'Content-Type': ''});
            //         res.end(JSON.stringify(results));
            //     });