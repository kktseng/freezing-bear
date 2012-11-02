var FPS = 15;
var timeout = true;

//adds an image to the canvas
function addImg(url, left, up, callback) {
  fabric.Image.fromURL(url, function(img) {
    img.set({
      left: left,
      top: up,
      angle: 0
    });

    img.perPixelTargetFind = true;
    img.targetFindTolerance = 4;

    img.scale(1);

    img.set('img_id', CryptoJS.SHA1(url + new Date() + left + up + '0' + '100' + '100'));
    callback(img);
  });
}

// only allows sending states at 15fps
function cappedSendState(canvas) {
  if(timeout) {
    timeout = false;
    sendState(canvas);
    setTimeout(function() {
      timeout = true;
    }, 1000/FPS);
  }
}

// sends state of 
function sendState(canvas) {
  console.log('send state');
}

//gets current state of canvas in JSON object
function getState(canvas) {
  var canvas_state = {};

  var canvas_items = canvas.getObjects();

  canvas_items.forEach(function(item) {
    canvas_state[item.get('img_id')] = {
      'url' : item.getSrc(), 
      'left' : item.get('left'), 
      'up' : item.get('up'), 
      'width' : item.getWidth(), 
      'height' : item.getHeight(), 
      'angle' : item.getAngle()
    }

  });

  console.log('Canvas items: ' + JSON.stringify(canvas_state));
}
