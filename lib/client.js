/**
 * zmqrpc - client wrappers
 * copyright (c) 2012 openmason.
 * MIT Licensed.
 */

var zeromq = require('zmq');
var Proxy  = require('node-proxy');
var handy  = require('handy');

/*
 * ZeroMQ & node-proxy based RPC Client.
 * - Async client, so callback has to be
 *   given.
 */
var RpcClient = function (port, cb, debug) {
  this.port = port || 'tcp://127.0.0.1:13674';
  this.debug = debug || false;
  this.socket = zeromq.socket('dealer');
  this.socket.identity = 'zmqrpc-c-'+process.pid;
  // connect right away
  this.socket.connect(port);
  // @todo - id to be fixed to be uniq
  this.id = Math.floor(Math.random()*484837+1);
  this.callbacks = {};
  var self = this;
  // Socket data
  self.socket.on('message', function(data) {
    //console.log(self.socket.identity + ': answer data ' + data);
    var obj = JSON.parse(data);
    /*
    if(obj.error) {
      console.log('error returned:'+obj.id);
    } else {
      console.log('result for:'+obj.id+' = '+obj.result);
    } 
    */
    if(self.callbacks.hasOwnProperty(obj.id)) {
      self.callbacks[obj.id](obj.error, obj.result);
      delete self.callbacks[obj.id];
    }
  });
  // lets create the proxy context
  return Proxy.create({
    get: function(rcvr, name) {
      return function() {
        var args = Array.prototype.slice.call(arguments);
        var jsonObj ={ jsonrpc:"2.0",
                       method: name,
                       params: args,
                       id: self.id.toString(36)
                     };
        // check if last argument is a function
        // if so, then set that as the callback
        var f = cb;
        if(args && args.length>0) {
          if(handy.getType(args[args.length-1])=='function') {
            f = args.pop();
          }
        }
        self.callbacks[jsonObj.id] = f;
        self.socket.send(JSON.stringify(jsonObj));
        self.id++;
        return jsonObj;
      };
    }
  });
};

module.exports = RpcClient;

// -- EOF
