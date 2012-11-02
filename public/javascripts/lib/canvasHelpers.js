var FPS = 15;
var timeout = true;

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
  var canvas_state = [];

  var canvas_items = canvas.getObjects();
  canvas_items.forEach(function(item) {
    canvas_state.push({
      'url' : item.getSrc(), 
      'left' : item.get('left'), 
      'up' : item.get('up'), 
      'width' : item.getWidth(), 
      'height' : item.getHeight(), 
      'angle' : item.getAngle()
    });
  });

  console.log('Canvas items: ' + JSON.stringify(canvas_state));
}

function updateCanvas(prev_canvas, canvas_state) {
  var prev_canvas_items = prev_canvas.getObjects();
  prev_canvas_hash = {};

  prev_canvas_items.forEach(function(item) {
    if (prev_canvas_hash[item.getSrc()]) {
      prev_canvas_hash[item.getSrc()].push({
        'url' : item.getSrc(),
        'left' : item.get('left'),
        'up' : item.get('up'),
        'width' : item.getWidth(),
        'height' : item.getHeight(),
        'angle' : item.getAngle()
      });
    }
    else {
      prev_canvas_hash[item.getSrc()] = [{
        'url' : item.getSrc(),
        'left' : item.get('left'),
        'up' : item.get('up'),
        'width' : item.getWidth(),
        'height' : item.getHeight(),
        'angle' : item.getAngle()
      }];
    }
  });

  canvas_state.forEach(function(item) {
    var prev_canvas_item = prev_canvas_hash[item.url];

    if (prev_canvas_item && prev_canvas_item.length !== 0) {
      if (item.left !== prev_canvas_item[0].left) {
        console.log('TRANSFORM LEFT/RIGHT');
      }
      if (item.up !== prev_canvas_item[0].up) {
        console.log('TRANSFORM UP/DOWN');
      }
      if (item.width !== prev_canvas_item[0].width) {
        console.log('TRANSFORM WIDTH');
      }
      if (item.height != prev_canvas_item[0].height) {
        console.log('TRANSFORM HEIGHT');
      }
      if (item.angle != prev_canvas_item[0].angle) {
        console.log('TRANSFORM ANGLE');
      }

      //Remove compared image from hash
      prev_canvas_item.splice(0,1);

    } else {
      fabric.Image.fromURL(item.url, function(img) {
        img.set({
          left: item.left,
          top: item.top,
          width: item.width,
          height: item.height,
          angle: item.angle
        });

        prev_canvas.add(img);
      });
    }

  });
}