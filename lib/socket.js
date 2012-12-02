var async = require('async'),
    helpers = require('./helpers'),
    logger = require('./logger');

var io;
var images = {};

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
      if(err) { return logger.err(err); }
      async.parallel([
        async.apply(helpers.getImages, room),
        async.apply(helpers.getPaths, room),
        async.apply(helpers.redis.lrange.bind(helpers.redis), 'room_' + room + '_users', 0, -1)
      ], function(err, results) {
        if(err) { return logger.err(err); }
        socket.emit('images', JSON.stringify(results[0]));
        socket.emit('paths', JSON.stringify(results[1]));
        socket.emit('userlist', results[2]);
      });
    });
  });

  // set username
  socket.on('setUser', function(username) {
    socket.username = username;
  });

  // adding image
  socket.on('addImage', function(room, image_id, image) {
    logger.info('Adding to room ' + room + ' image ' + image_id + ': ' + image);
    image = JSON.parse(image);
    helpers.getImages(room, function(err, images) {
      if(err) { return logger.err(err); }
      images[image_id] = image;
      helpers.setImages(room, images, function(err) {
        if(err) { return logger.err(err); }
        io.sockets.in(socket.room).emit('images', JSON.stringify(images));
      });
    });
  });

  // deleting image
  socket.on('deleteImage', function(room, image_id) {

  });

  // modifying image
  socket.on('modifyImage', function(room, image_id, image) {
    image = JSON.parse(image);
    helpers.getImages(room, function(err, images) {
      if(err) { return logger.err(err); }
      images[image_id] = image;
      helpers.setImages(room, images, function(err) {
        if(err) { return logger.err(err); }
        io.sockets.in(socket.room).emit('images', JSON.stringify(images));
      });
    });
  });

  //adding path
  socket.on('addPath', function(room, path) {
    logger.info('Adding to room ' + room + ' path');
    path = JSON.parse(path);
    helpers.getPaths(room, function(err, paths) {
      if(err) { return logger.err(err); }
      paths.push(path);
      helpers.setPaths(room, paths, function(err) {
        if(err) { return logger.err(err); }
        io.sockets.in(socket.room).emit('paths', JSON.stringify(paths));
      });
    });
  })

  socket.on('disconnect', function() {
    io.sockets.in(socket.room).emit('userDisconnect', socket.username);
    helpers.redis.lrem('room_' + socket.room + '_users', 1, socket.username, logger.err);
  });
};
