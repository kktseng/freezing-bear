var helpers = require('../lib/helpers');
var async = require('async');
var rs = require('randomstring');

module.exports = function(app, basePath) {
  basePath = basePath || '/room';

  // returns an unused room id
  app.get(basePath, function(req, res) {
    res.send(rs.generate(10));
  });

  app.get(basePath + '/:roomid', function(req, res) {
    var room_id = req.params.roomid;
    res.render('room', {
      room: room_id
    });
  });

}