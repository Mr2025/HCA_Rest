#!/usr/bin/env node

/**
 * Module dependencies.
 */
require('dotenv').config();
const app = require('./app');
const http = require('http');
let chalk = require('chalk');
const debug = require('debug');
const error = debug('App:error');
const log = debug('App:WWW');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
server.on('close', onClose);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  // Step A. Is this a valid number, if NOT, return it as a string type, containing the named pipe path.
  if (isNaN(port)) { return val;  }

  // Step A. Is this a valid number, if so, return it as a number type.
  if (port >= 0) { return port;  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    //Vacuous truth - I suspect this is always thrown.
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe: ' + addr
    : 'port: ' + addr.port;
  log(chalk.green(`Server is listening on [${chalk.white(bind)}]`));
  app.onConnect();
}

function onClose() {    
    app.onClose();
  }
  