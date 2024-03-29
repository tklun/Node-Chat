var socketCircle = socketCircle || {};
var socketCtx;

socketCircle.init = function () {
  socketCanvas = document.getElementById('socket-canvas');
  socketCanvas.setAttribute('width', window.innerWidth);
  socketCanvas.setAttribute('height', window.innerHeight);
  socketCtx = socketCanvas.getContext('2d');

// Data isn't passed along? Point coords are go through, but not methods. Socket.io converts data to JSON before sending.
  // (function animloop(){
  //   requestAnimFrame(animloop);
  //   render(socketCanvas, socketCtx, socketCircle.Circles);
  //   socketCtx.clearRect(0, 0, socketCanvas.width, socketCanvas.height);
  // })();
};

socketCircle.Circles = [];
socketCircle.Circles.i = 0;

socketCircle.create = function(circle, context) {
  var r = Math.floor(Math.random() * 256),
      g = Math.floor(Math.random() * 256),
      b = Math.floor(Math.random() * 256);
    context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + '.8' + ')';
    context.beginPath();
    // context.arc(circle.mx, circle.my, socketCircle.Circles.i * 1.2, 0, Math.PI * 2, true);
    context.arc(circle.mx, circle.my, 4, 0, Math.PI * 2, true);
    context.fill();
    socketCircle.Circles.push(circle);
    socketCircle.Circles.i++;
};
