const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
    // Parse the request URL
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname; // Extract the pathname

    // If requesting the root URL ("/"), serve index.html
    if (pathname === '/') {
        let filePath = path.join(__dirname, 'index.html');
        readHTML(filePath, res);
    }
    else if (pathname === '/aboutus.html') {
        let filepath = path.join(__dirname, './aboutus.html');
        readHTML(filepath, res);
    }
else if (pathname === '/dashboard.html') {
    let filepath = path.join(__dirname, './dashboard.html');
    readHTML(filepath, res);
}
else if (pathname === '/login.html') {
    let filepath = path.join(__dirname, './login.html');
    readHTML(filepath, res);
}
else if (pathname === '/register.html') {
    let filepath = path.join(__dirname, './register.html');
    readHTML(filepath, res);
}
else if (pathname === '/thankyou.html') {
    let filepath = path.join(__dirname, './thankyou.html');
    readHTML(filepath, res);
}
    // Serve the subscribe route
    else if (pathname === '/subscribe' && req.method == 'GET') {
        let filePath = path.join(__dirname, 'routes','/subscribtion');
        const parsedURL = url.parse(req.url, true)
        const {email} = parsedURL.query

        readHTML(filePath, res, email);
    }
    // Serve static files (CSS, JS, Images)
    else {
        let extname = path.extname(pathname);
        let contentType = 'text/plain';

        // Map file extension to content type
        switch (extname) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
            case '.jpeg':
                contentType = 'image/jpeg';
                break;
            case '.gif':
                contentType = 'image/gif';
                break;
            case '.svg':
                contentType = 'image/svg+xml';
                break;
            case '.ico':
                contentType = 'image/x-icon';
                break;
            default:
                contentType = 'text/plain';
        }

        // Serve the requested file
        let filePath = path.join(__dirname, pathname);
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File Not Found');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
});

// Start the server
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});

function readHTML(filePath, res, email = "") {
    // Read and serve the HTML file
    fs.readFile(filePath, 'utf-8', (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('404 Not Found');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // If email is provided, inject it into the HTML content
            if (email) {
                // Inject the email into the content, for example, at a placeholder
                content = content.replace('</body>', `<center>${email}</center></body>`);
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });
}