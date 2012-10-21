var express = require('express'),
    http = require('http'),
    io = require('socket.io'),
    path = require('path'),
    socket = require('./lib/socket');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

require('./routes/index')(app, '/');
require('./routes/room')(app, '/room');

var server = http.createServer(app),
    io = require('socket.io').listen(server);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

socket.init(io);

io.sockets.on('connection', socket.connection);