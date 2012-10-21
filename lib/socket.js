var io;

exports.init = function(socketio) {
  io = socketio;
}

exports.connection = function(socket) {
  // sending chat messages
  socket.on('sendChat', function(message) {
    console.log('sending chat: ' + socket.room + socket.username + message);
    io.sockets.in(socket.room).emit('updateChat', socket.username, message);
  });

  // initialized when loading room page
  socket.on('joinRoom', function(room) {
    console.log(socket.username + ' is joining ' + room);
    socket.room = room;
    socket.join(room);
  });

  // set username
  socket.on('setUser', function(username) {
    socket.username = username;
  });
}