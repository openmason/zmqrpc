/*
 * Sample math JSON RPC server running on ZeroMQ
 */

var zmqrpc = require('..').Server;

/*
 * Describe the service
 */
var MathService = {
  add:      function(a,b) { return a+b; },
  subtract: function(a,b) { return a-b; },
  multiply: function(a,b) { return a*b; },
  divide:   function(a,b) { return a/b; }
};

var service = new zmqrpc('tcp://127.0.0.1:12345', true);
service.context(MathService);
service.run();