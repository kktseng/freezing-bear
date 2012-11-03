var redis = require('redis');

var helpers = module.exports = {

  redis: redis.createClient(6379, 'localhost'),

  getImages: function(room, cb) {
    helpers.redis.get('room_' + room + '_images', function(err, images) {
      if(err) { return cb(err); }
      if(!images) return cb(null, {});
      return cb(null, JSON.parse(images));
    });
  },

  setImages: function(room, images, cb) {
    helpers.redis.set('room_' + room + '_images', JSON.stringify(images), cb);
  }

};

// so it won't interfere with my other redis dbs :)
helpers.redis.select(5);