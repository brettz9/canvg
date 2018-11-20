const http = require('http');
const Promise = require('bluebird'), // eslint-disable-line no-shadow
  handler = require('serve-handler');

Promise.Deferred = function () {
  let resolve, reject;
  const _promise = new Promise(function (res, rej) { // eslint-disable-line promise/avoid-new, promise/param-names
    resolve = res;
    reject = rej;
  });

  const promise = function () {
    return _promise;
  };

  return {
    resolve,
    reject,
    promise
  };
};

/**
 * Normalize a port into a number, string, or false.
 * @param {string|number} val
 * @returns {string|number|boolean}
 */
function normalizePort (val) {
  const port = parseInt(val);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const initServer = function (port) {
  const server = http.createServer((request, response) => {
    // You pass two more arguments for config and middleware
    // More details here: https://github.com/zeit/serve-handler#options
    return handler(request, response);
  });

  /**
   * Get port from environment and store in Express.
   */
  const normalizedPort = normalizePort(port || process.env.PORT || 3123); // eslint-disable-line no-process-env

  /**
   * Event listener for HTTP server "error" event.
   * @param {Error} error
   * @returns {undefined}
   */
  function onError (error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind =
      typeof normalizedPort === 'string'
        ? 'Pipe ' + normalizedPort
        : 'Port ' + normalizedPort;

    // handle specific listen errors with friendly messages
    let errmsg;
    switch (error.code) {
    case 'EACCES':
      errmsg = `${bind} requires elevated privileges`;
      console.error(errmsg);
      // closeMe();
      break;
    case 'EADDRINUSE':
      errmsg = `${bind} is already in use`;
      console.error();
      // closeMe();
      break;
    default:
      throw error;
    }
  }

  server.ready = new Promise.Deferred();

  /**
   * Event listener for HTTP server "listening" event.
   * @returns {undefined}
   */
  function onListening () {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log(`Listening on ${bind}`);
  }

  server.on('error', onError);
  server.once('listening', onListening);

  server.on('close', function () {
    console.log(`Closing server on ${normalizedPort}`);
  });

  process.on('SIGTERM', function () {
    server.close();
  });

  process.on('SIGINT', function () {
    server.close();
  });

  server.listen(normalizedPort, () => {
    console.log(`Running at http://localhost:${normalizedPort}`);
    server.ready.resolve(server);
  });

  return server;
};

if (require.main === module) {
  const server = initServer(3123);
  (async () => {
    await server.ready.promise();
    console.log('Server ready');
  })();
}
module.exports = initServer;
