// Sample Service Object
var MyService = {
 getName: function() { return 'Hello, there'; },
 doubleIt: function(no) { return no*no; }
};

var zmqrpc = require('..').Server;
// first argument is zmqport
// second argument is debug
var service = new zmqrpc('tcp://127.0.0.1:12345', true);
// set the service object
service.context(MyService);
// run the service
service.run();

