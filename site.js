var Server = require('./server');


var server1 = new Server(5000);
var server2 = new Server(5001);

setTimeout(function () {
    server1.close();
    server2.close();
}, 8 * 60 * 60 * 1000);
