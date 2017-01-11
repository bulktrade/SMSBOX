'use strict';

const app = require('./app');
const host = process.env.BACKEND_HOST ? process.env.BACKEND_HOST : app.get('host');
const port = process.env.BACKEND_PORT ? process.env.BACKEND_PORT : app.get('port');
const server = app.listen(port);

server.on('listening', () =>
  console.log(`Feathers application started on ${host}:${port}`)
);
