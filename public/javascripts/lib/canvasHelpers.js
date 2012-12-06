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

var updateCanvas = function(canvas, movingPic, canvas_state) {
  var prev_canvas_items = canvas.getObjects();

  prev_canvas_items.forEach(function(prev_item) {
    if(movingPic != prev_item.get('img_id')) {
      var item = canvas_state[prev_item.get('img_id')];
      if (item) {
        if (item.left !== prev_item.get('left')) prev_item.set('left', item.left);
        if (item.top !== prev_item.get('top')) prev_item.set('top', item.top);
        if (item.width !== prev_item.getWidth()) prev_item.set('width', item.width);
        if (item.height != prev_item.getHeight()) prev_item.set('height', item.height);
        if (item.angle != prev_item.getAngle()) prev_item.set('angle', item.angle);
        delete canvas_state[prev_item.get('img_id')];
      } else {
        if(prev_item.getSrc) canvas.remove(prev_item);
      }
    } else delete canvas_state[movingPic];
    canvas.renderAll();
  });

  var keys = Object.keys(canvas_state);
  keys.forEach(function(id) {
    var new_item = canvas_state[id];
    addImg(new_item.src, new_item.left, new_item.top, function(image) {
        image.set('angle', new_item.angle);
        image.set('width', new_item.width);
        image.set('height', new_item.height);
        image.set('img_id', id);
        canvas.add(image);
        // do this in case any async images were uploaded
        if(keys.length > 0) {
          updateCanvasPaths(all_canvas_paths);
        }
    });
  });
};

var updateCanvasPaths = function(canvas, canvas_paths) {
  var path;
  canvas_paths.forEach(function(canvas_path) {
    path = new fabric.Path(canvas_path.path.path);
    path.set('fill', 'transparent');
    path.set('left', canvas_path.path.left);
    path.set('top', canvas_path.path.top);
    path.set('width', canvas_path.path.width);
    path.set('height', canvas_path.path.height);
    path.set('stroke', canvas_path.path.stroke);
    path.set('strokeWidth', canvas_path.path.strokeWidth);
    path.selectable = false;
    canvas.add(path);
  });

  canvas.renderAll();
};
