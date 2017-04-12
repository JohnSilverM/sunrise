var express               = require('express');
var http                  = require('http');
var fs                    = require('fs');
var path                  = require('path');
var readSync              = require('read-file-relative').readSync;
var Mustache              = require('mustache');
var promisify             = require('./utils/promisify.js');
var readFile = promisify(fs.readFile);

var REDIRECT = readSync('./views/redirect.mustache');

var CONTENT_TYPES = {
    '.js':   'application/javascript',
    '.css':  'text/css',
    '.html': 'text/html',
    '.png':  'image/png'
};

var Server = module.exports = function (port) {
    var server = this;

    this.app       = express();
    this.appServer = http.createServer(this.app).listen(port);
    this.sockets   = [];

    this._setupRoutes();

    var handler = function (socket) {
        server.sockets.push(socket);
        socket.on('close', function () {
            server.sockets.splice(server.sockets.indexOf(socket), 1);
        });
    };

    this.appServer.on('connection', handler);
};

Server.prototype._setupRoutes = function () {

    this.app.get('/redirect', function (req, res) {
        res.end(Mustache.render(REDIRECT,  {url:'http://example.com'}));
    });
    
   this.app.get('*', function (req, res) {
        var reqPath      = req.params[0] || '';
        var resourcePath = path.join(__dirname,'views', reqPath);
        console.log(resourcePath);
        var delay        = req.query.delay ? parseInt(req.query.delay, 10) : 0;

        readFile(resourcePath)
            .then(function (content) {
                res.setHeader('content-type', CONTENT_TYPES[path.extname(resourcePath)]);

                setTimeout(function () {
                    res.send(content);
                }, delay);
            })
            .catch(function () {
                res.status(404);
                res.send('Not found');
            });
    });

    this.app.get('/frame', function (req, res) {
        res.end(Mustache.render(FRAME));
    });

};

Server.prototype.close = function () {
    this.appServer.close();
    this.sockets.forEach(function (socket) {
        socket.destroy();
    });
};
