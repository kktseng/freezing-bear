exports.debug = function(message) {
  console.log('[DEBUG] ' + message);
}

exports.info = function(message) {
  console.log('[INFO] ' + message);
}

exports.err = function(error) {
  if(error)
    console.log('[ERR] ' + error);
}