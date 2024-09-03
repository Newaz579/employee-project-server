const http = require('http');
const url = require('url');
const db = require('./dbManager/db');
const addEmployee = require('./dbManager/manager');



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
            addEmployee(body, res);
        } else if (pathname === '/search-employees') {
            const { attribute, value } = parsedUrl.query;
            const sql = 'SELECT * FROM employees WHERE ?? LIKE ?';
            db.query(sql, [attribute, `%${value}%`], (err, results) => {
                if (err) {
                    console.error(err);
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Error searching employees');
                    return;
                }
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(results));
            });
        }
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
        else if (pathname.startsWith('/getsingle-employee/')) {
            const segments = pathname.split('/');
            const id = parseInt(segments[segments.length - 1], 10);
        
            // Ensure id is a valid number
            if (isNaN(id)) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid employee ID');
                return;
            }
        
            const sql = 'SELECT * FROM employees WHERE id = ?';
            db.query(sql, [id], (err, results) => {
                if (err) {
                    console.error(err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error finding Employee');
                    return;
                }
        
                // Assuming results is an array
                if (results.length === 0) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('Employee not found');
                    return;
                }
        
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(results[0]));
            });
        }
        else if (req.method === 'PUT' && pathname.startsWith('/update-employee/')) {
            const id = parseInt(pathname.split('/')[2]);
            const newData = JSON.parse(body);
            const sql = 'UPDATE employees SET ? WHERE id = ?';
            db.query(sql, [newData, id], (err, result) => {
                if (err) {
                    console.error(err);
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Error updating employee');
                    return;
                }
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('Employee updated...');
            });

        } else if (req.method === 'DELETE' && pathname.startsWith('/delete-employee/')) {
            const id = parseInt(pathname.split('/')[2]);
            const sql = 'DELETE FROM employees WHERE id = ?';
            db.query(sql, id, (err, result) => {
                if (err) {
                    console.error(err);
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Error deleting employee');
                    return;
                }
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('Employee deleted...');
            });

        } else if (req.method === 'GET' && pathname === '/') {
            const sql = 'SELECT * FROM employees';
            db.query(sql, (err, results) => {
                if (err) {
                    console.error(err);
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Error retrieving employees');
                    return;
                }
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(results));
            });

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
