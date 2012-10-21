var helpers = require('../lib/helpers');

module.exports = function(app, basePath) {
  basePath = basePath || '/room';

  app.get(basePath + '/:roomid', function(req, res) {
    var room_id = req.params.roomid;
    res.render('room', {
      room: room_id
    });
  });

}