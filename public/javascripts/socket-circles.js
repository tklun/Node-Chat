var socketCircle = socketCircle || {};

socketCircle.init = function() {
  socketCanvas = document.getElementById('socket-canvas');
  socketCanvas.setAttribute('width', window.innerWidth );
  socketCanvas.setAttribute('height', window.innerHeight );
  socketCtx = socketCanvas.getContext('2d');
};

socketCircle.Circles = [];
socketCircle.Circles.i = 0;

socketCircle.create = function(circle, context) {
  var r = Math.floor(Math.random() * 256),
      g = Math.floor(Math.random() * 256),
      b = Math.floor(Math.random() * 256);

    context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + '.8' + ')';
    context.beginPath();
    context.arc(circle.mx, circle.my, socketCircle.Circles.i * 2, 0, Math.PI * 2, true);
    context.fill();
    socketCircle.Circles.i++;
};
