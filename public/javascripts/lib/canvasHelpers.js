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

function updateCanvas(prev_canvas, canvas_state) {
  var prev_canvas_items = prev_canvas.getObjects();

  prev_canvas_items.forEach(function(prev_item) {
    var item = canvas_state[prev_item.get('img_id')];
    if (item) {
      if (item.left !== prev_item.get('left')) {
        console.log('TRANSFORM LEFT/RIGHT');
      }
      if (item.up !== prev_item.get('up')) {
        console.log('TRANSFORM UP/DOWN');
      }
      if (item.width !== prev_item.getWidth()) {
        console.log('TRANSFORM WIDTH');
      }
      if (item.height != prev_item.getHeight()) {
        console.log('TRANSFORM HEIGHT');
      }
      if (item.angle != prev_item.getAngle()) {
        console.log('TRANSFORM ANGLE');
      }
    }
    else {
      
    }
  });
}