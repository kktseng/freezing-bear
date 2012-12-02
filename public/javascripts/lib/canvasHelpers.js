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

    callback(img);
  });
}

// only allows sending states at 15fps
function cappedSendState(e, callback) {
  if(timeout) {
    timeout = false;
    callback(e);
    setTimeout(function() {
      timeout = true;
    }, 1000/FPS);
  }
}


function getItemState(item) {
  return {
    'src' : item.getSrc(), 
    'left' : item.get('left'), 
    'top' : item.get('top'), 
    'width' : item.getWidth(), 
    'height' : item.getHeight(), 
    'angle' : item.getAngle()
  }
}

// gets current state of canvas in JSON object
function getState(canvas) {
  var canvas_state = {};
  var canvas_items = canvas.getObjects();

  canvas_items.forEach(function(item) {
    if(item.getSrc) {
      canvas_state[item.get('img_id')] = getItemState(item);
    }
  });

  console.log('Canvas items: ' + JSON.stringify(canvas_state));
  return canvas_state;
}
