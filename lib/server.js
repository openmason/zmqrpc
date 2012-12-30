/**
 * zmqrpc - server.
 * copyright (c) 2012 openmason.
 * MIT Licensed.
 */

var zeromq = require('zmq');
var rpclib = require('jsonrpclib');
var logger = require('util');
var handy  = require('handy');
/*
 * ZeroMQ based JSON RPC Server.
 * - starts a new ZeroMQ Server on given 'port'
 * - svcObj carries the functions 
 * - debug would enable full dump of contents - defaults to false
 */
var RpcServer = function (port, debug) {
  this.port = port || 'tcp://127.0.0.1:13674';
  this.debug = debug || false;
  this.socket = zeromq.socket('router');
  this.socket.identity = 'zmqrpc-'+process.pid;
  this.rpc = undefined;
};

/*
 * Set the service context
 */
RpcServer.prototype.context = function(svcObj) {
  this.rpc = new rpclib(svcObj, this.debug);
  this._debug('Service context set.');
};

/* Run the server with given service object
 * 
 */
RpcServer.prototype.run = function() {
  var self = this;
  if(!self.rpc) {
    throw Error('set the service context before starting the server');
  }
  self.socket.bind(self.port, function(err) {
    if(err) {
      self._debug('unable to setup zeromq service:'+err);
      throw err;
    }
    // listen to any activity on socket
    self.socket.on('message', function(envelope, data) {
      self._debug('request from : ' + envelope + ' - ' + data.toString());
      var res = self.rpc.request(data.toString());
      self.socket.send([envelope, res]);
    });
  });
};

// debug messages
RpcServer.prototype._debug = function(value) {
  if(this.debug) {
    if(handy.getType(value)!='string') {
      value = JSON.stringify(value);
    }
    logger.debug(this.socket.identity + ' ' + value);
  }
};

module.exports = RpcServer;

// -- EOF
