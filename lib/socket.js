var helpers = require('./helpers'),
    logger = require('./logger');

var io;

exports.init = function(socketio) {
  io = socketio;
};

exports.connection = function(socket) {
  // sending chat messages
  socket.on('sendChat', function(message) {
    io.sockets.in(socket.room).emit('updateChat', socket.username, message);
  });

  // initialized when loading room page
  socket.on('joinRoom', function(room) {
    socket.room = room;
    io.sockets.in(socket.room).emit('userConnect', socket.username);
    socket.join(room);
    helpers.redis.lpush('room_' + room + '_users', socket.username, function(err) {
      if(err) { logger.err(err); }
      helpers.redis.lrange('room_' + room + '_users', 0, -1, function(err, users) {
        if(err) { logger.err(err); }
        socket.emit('userlist', users);
      });
    });
  });

  // set username
  socket.on('setUser', function(username) {
    socket.username = username;
  });

  socket.on('disconnect', function() {
    io.sockets.in(socket.room).emit('userDisconnect', socket.username);
    helpers.redis.lrem('room_' + socket.room + '_users', 1, socket.username, logger.err);
  });
};
