var helpers = require('../lib/helpers');
var async = require('async');

module.exports = function(app, basePath) {
  basePath = basePath || '/room';

  // returns an unused room id
  app.get(basePath, function(req, res) {
    // use async.until
    // get random number between 1-1billion
    res.send('roomid');
  });

  app.get(basePath + '/:roomid', function(req, res) {
    var room_id = req.params.roomid;
    res.render('room', {
      room: room_id
    });
  });

}