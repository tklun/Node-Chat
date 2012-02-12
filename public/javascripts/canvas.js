init = function() {
  canvas = document.getElementById('canvas');
  canvas.setAttribute('width', window.innerWidth );
  canvas.setAttribute('height', window.innerHeight );
  ctx = canvas.getContext('2d');
  listen();
};

var Circles = [];

listen = function() {
  canvas.addEventListener('mousemove', function(e) {
    var mx = e.layerX - e.currentTarget.offsetLeft,
      my = e.layerY - e.currentTarget.offsetTop,
      circle = new Circle(mx, my);
    Circles.push(circle);
  });
};


var handle = null;
var run = function() {
  if(Circles.length == 0) {
    clearInterval(handle);
    handle = null;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var CirclesNext = [];
  for(var i = 0; i < Circles.length; i++) {
    Circles[i].create();
    if(Circles[i].i <= 30)
            CirclesNext.push(Circles[i]);
  }
  Circles = CirclesNext;
};


window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var startRun = function() {
  handle = setInterval(run, 1000/30);
};

Circle = function(mx, my) {

  var Circle = {},
    r = Math.floor(Math.random() * 256),
    g = Math.floor(Math.random() * 256),
    b = Math.floor(Math.random() * 256);
  Circle.mx = mx;
  Circle.my = my;
  Circle.i = 0;

  Circle.create = function() {
    if (Circle.i <= 30) {
      ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + ((30 - Circle.i) / 30) + ')';
      ctx.beginPath();
      ctx.arc(Circle.mx, Circle.my, Circle.i * 2, 0, Math.PI * 2, true);
      ctx.fill();
      Circle.i++;
    }
  };


  if(handle === null) {
    startRun();
  }

  return Circle;
};

window.onload = function () {
  init();
};
