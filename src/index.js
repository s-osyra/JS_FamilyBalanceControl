const app = require('./app');
const portHTTP = process.env.PORT_HTTP;
const portHTTPS = process.env.PORT_HTTPS;

const https = require('https');
const http = require('http');
const fs = require('fs');

const httpsOptions = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};


http.createServer(app).listen(portHTTP, () => {
    console.log(`Server HTTP is on port  ${portHTTP}.`)
});

https.createServer(httpsOptions , app).listen(portHTTPS, () => {
    console.log(`Server HTTPS is on port  ${portHTTPS}.`)
});