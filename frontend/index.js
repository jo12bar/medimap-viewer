const express = require('express');
const http = require('http');
const path = require('path');

const PORT = 80;

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, '/static')));

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
