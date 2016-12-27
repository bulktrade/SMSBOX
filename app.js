var http = require('http');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxy();

http.createServer(function(req, res) {
    var target;

    if (req.path.indexOf('/api') == 0) {
        target = 'http://127.0.0.1:3030';
    } else {
        target = 'http://127.0.0.1:8080';
    }

    proxy.web(req, res, {
        target: target
    });
}).listen(80);