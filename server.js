const express = require('express');

// const parser = require('body-parser');

const path = require('path');

const app = express();

// const encodeUrl = parser.urlencoded({ extended: false });

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

// app.post('/index.html', encodeUrl, (req, res) => {
//     // const name = req.body.mame;
//     // const email = req.body.email;
//     // const pword = req.body.password;
//     return res;
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${PORT}`);
});

// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// const server = http.createServer((req, res) => {
//   let filePath = req.url === '/' ? '/index.html' : req.url;
//   filePath = path.join(__dirname, filePath);

//   fs.readFile(filePath, 'utf-8', (err, content) => {
//     if (err) {
//       res.writeHead(404);
//       res.end('File not found!');
//       return;
//     }

//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end(content);
//   });
// });

// const port = 3000;
// server.listen(port, () => {
//   console.log(`Server running on http://localhost:3000`);
// });
