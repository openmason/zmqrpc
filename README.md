[![build status](https://secure.travis-ci.org/openmason/zmqrpc.png)](http://travis-ci.org/openmason/zmqrpc)
# ZeroMQ Json RPC 2.0 Server
ZeroMQ based JSON RPC 2.0 Server

# Starting a service (Server)
Please refer to examples directory for full explanation.

To define a service, just use any object with functions within it, an example would be

    // Sample Service Object
    var MyService = {
      getName: function() { return 'Hello, there'; },
      doubleIt: function(no) { return no*no; }
    };

To start this as a service

    var zmqrpc = require('zmqrpc').Server;
    // first argument is zmqport
    // second argument is debug
    var service = new zmqrpc('tcp://127.0.0.1:12345', true);
    // set the service object
    service.context(MyService);
    // run the service
    service.run();

The above service now has two methods, that can be called remotely
  * getName
  * doubleIt

# Running a Client
