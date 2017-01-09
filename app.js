const http = require('http');
const express = require('express');
const proxy = require('http-proxy-middleware');

let childProcess = require('child_process'),
    backend,
    client;

client = childProcess.exec('node modules/client/dist/server', {
    env: {
        PORT: 8080
    }
}, function (error, stdout, stderr) {
    if (error) {
        console.log(error.stack);
        console.log('Client error code: ' + error.code);
        console.log('Client signal received: ' + error.signal);
        return;
    }

    console.log(`Client stdout: ${stdout}`);
    console.log(`Client stderr: ${stderr}`);
});

client.on('exit', function (code) {
    console.log('Client process exited with exit code ' + code);
    process.exit(code);
});

backend = childProcess.exec('node modules/backend/src', function (error, stdout, stderr) {
    if (error) {
        console.log(error.stack);
        console.log('Backend error code: ' + error.code);
        console.log('Backend signal received: ' + error.signal);
        return;
    }

    console.log(`Backend stdout: ${stdout}`);
    console.log(`Backend stderr: ${stderr}`);
});

backend.on('exit', function (code) {
    console.log('Backend process exited with exit code ' + code);
    process.exit(code);
});

process.on('exit', function (code) {
    console.log('Main process exited with exit code ' + code);

    try {
        backend.kill();
    } catch (e) {
        console.log('Error!', e);
    }

    try {
        client.kill();
    } catch (e) {
        console.log('Error!', e);
    }
});

client.stdout.on('data', function(data) {
    console.log(`Client stdout: ${data}`);
});

client.stderr.on('data', function(data) {
    console.error(`Client stderr: ${data}`);
});

backend.stdout.on('data', function(data) {
    console.log(`Backend stdout: ${data}`);
});

backend.stderr.on('data', function(data) {
    console.error(`Backend stderr: ${data}`);
});

// proxy middleware options
const serverOptions = {
  target: 'http://localhost:8080',  // target host
  changeOrigin: true,               // needed for virtual hosted sites
  ws: true                          // proxy websockets
};

// proxy middleware options
const clientOptions = {
  target: 'http://localhost:3030',  // target host
  changeOrigin: true,               // needed for virtual hosted sites
  ws: true,                         // proxy websockets
  pathRewrite: {
    '^/api' : '/',                  // rewrite path
  },
};

const app = express();
app.use('/api', proxy(clientOptions));
app.use('/', proxy(serverOptions));
app.listen(80);
