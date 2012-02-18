var Circles = [];

var init = function () {
  socketCircle.init();
  var canvas = document.getElementById('user-canvas'),
      ctx = canvas.getContext('2d');
  canvas.setAttribute('width', window.innerWidth);
  canvas.setAttribute('height', window.innerHeight);
  listen();
  (function animloop() {
    requestAnimFrame(animloop);
    render(canvas, ctx, Circles);
  })();
};

var listen = function () {
  canvas.addEventListener('mousemove', function(e) {
    var mx = e.offsetX,
        my = e.offsetY,
        circle = new Circle(mx, my);
    Circles.push(circle);

    // Emits circle on move
    socket.emit('sendcircle', circle);
  });

  canvas.addEventListener('click', function (e) {
    var mx = e.layerX - e.currentTarget.offsetLeft,
        my = e.layerY - e.currentTarget.offsetTop,
        circle = new Circle(mx, my);
  });

  socket.on('updatesocketcircle', function (username, circle) {
    if (username === GLOBAL_USERNAME) {
      console.log('My own circle: ', circle);
    } else {
      console.log('Guest circle: ', circle);
      socketCircle.create(circle, socketCtx);
      //Try below code instead of line 41
      //circle.create(socketCtx);
    }
  });
};

var render = function (canvas, context, circlesArray) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  var CirclesNext = [];
  for(var i = 0; i < circlesArray.length; i++) {
    circlesArray[i].create(context);
    if(circlesArray[i].i <= 30) {
      CirclesNext.push(circlesArray[i]);
    }
  }
  circlesArray = CirclesNext;
};

/** Start experimental prototype code **/
var Circle = function (mx, my) {
  this.r = Math.floor(Math.random() * 256),
  this.g = Math.floor(Math.random() * 256),
  this.b = Math.floor(Math.random() * 256);
  this.mx = mx;
  this.my = my;
  this.i = 0;
};

Circle.prototype.create = function (context) {
  if (this.i <= 30) {
    context.fillStyle = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + ((30 - this.i) / 30) + ')';
    context.beginPath();
    context.arc(this.mx, this.my, this.i * 2, 0, Math.PI * 2, true);
    context.fill();
    this.i++;
  }
};

/** End experimental prototype code **/

window.onload = function () {
  init();
};
