var redis = require('redis');

module.exports = {

  redis: redis.createClient(6379, 'localhost')

};