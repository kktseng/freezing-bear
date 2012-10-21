var redis = require('redis');

var helpers = module.exports = {

  redis: redis.createClient(6379, 'localhost')

};

// so it won't interfere with my other redis dbs :)
helpers.redis.select(5);