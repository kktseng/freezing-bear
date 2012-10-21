var FPS = 15;
var timeout = true;

// only allows sending states at 15fps
function cappedSendState(canvas) {
  if(timeout) {
    timeout = false;
    sendState();
    setTimeout(function() {
      timeout = true;
    }, 1000/FPS);
  }
}

// sends state of 
function sendState(canvas) {
  console.log('send state');
}