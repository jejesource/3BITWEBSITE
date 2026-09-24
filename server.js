const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME = {
   '.html': 'text/html',
   '.css': 'text/css',
   '.js': 'application/javascript',
   '.png': 'image/png',
   '.jpg': 'image/jpeg',
   '.svg': 'image/svg+xml',
   '.ico': 'image/x-icon',
   '.exe': 'application/octet-stream',
};

const server = http.createServer(async (req, res) => {
   const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);

   let filePath = parsedUrl.pathname === '/' ? '/index.html' : parsedUrl.pathname;
   filePath = path.join(__dirname, filePath);
   const ext = path.extname(filePath).toLowerCase();
   try {
      const content = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      res.end(content);
   } catch {
      res.writeHead(404);
      res.end('Not found');
   }
});

process.on('SIGINT', () => {
   process.exit();
});

server.listen(PORT, () => {
   console.log(`\n  3-BITS Server running at http://localhost:${PORT}\n`);
});
