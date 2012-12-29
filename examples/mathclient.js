/*
 * Sample math JSON RPC client calling ZeroMQ server
 */

var zmqrpc = require('..').Client;

// math service have four methods
// - add, subtract, multiply, divide

// - can give a global callback 
//var mathObj = new zmqrpc('tcp://127.0.0.1:12345', function(error, res) { ..global callback .. });
var mathObj = new zmqrpc('tcp://127.0.0.1:12345');

// or use a per call based callback
mathObj.add(12,3, function(error, res) {
  console.log('Result of addition: '+res);
});
mathObj.subtract(12,3, function(error, res) {
  console.log('Result of subtraction: '+res);
});
mathObj.multiply(12,3, function(error, res) {
  console.log('Result of multiplicatin: '+res);
});
mathObj.divide(12,3, function(error, res) {
  console.log('Result of multiplicatin: '+res);
});
