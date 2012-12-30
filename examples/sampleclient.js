var zmqrpc = require('zmqrpc').Client;
// use the same port as given in server
var myobj = new zmqrpc('tcp://127.0.0.1:12345');
// call the method
// call back to have:
//   - first argument typically captures any errors
//   - second argument is the result from rpc service
myobj.getName(function(err, name) { 
  console.log('Got name:'+ name);
});
    
