var init = function () {
  socketCircle.init();
  canvas = document.getElementById('user-canvas');
  canvas.setAttribute('width', window.innerWidth );
  canvas.setAttribute('height', window.innerHeight );
  ctx = canvas.getContext('2d');
  listen();
  (function animloop(){
    requestAnimFrame(animloop);
    // run();
    render(canvas, ctx, Circles);
  })();
};

var Circles = [];

var listen = function () {
  canvas.addEventListener('mousemove', function(e) {
    var mx = e.offsetX,
        my = e.offsetY,
        circle = new Circle(mx, my);
    Circles.push(circle);

    // Emits circle on move
    socket.emit('sendcircle', circle);
  });

  canvas.addEventListener('click', function(e) {
    var mx = e.layerX - e.currentTarget.offsetLeft,
        my = e.layerY - e.currentTarget.offsetTop,
        circle = new Circle(mx, my);
    // Emits circle on click
    //socket.emit('sendcircle', circle);
  });

  socket.on('updatesocketcircle', function(username, circle) {
    if (username === GLOBAL_USERNAME) {
      console.log('My own circle: ', circle);
    } else {
      console.log('Guest circle: ', circle);
      socketCircle.create(circle, socketCtx);
    }
  });
};

var render = function(canvas, context, circlesArray) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  var CirclesNext = [];
  for(var i = 0; i < circlesArray.length; i++) {
    circlesArray[i].create();
    if(circlesArray[i].i <= 30) {
      CirclesNext.push(circlesArray[i]);
    }
  }
  circlesArray = CirclesNext;
};

// var run = function() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   var CirclesNext = [];
//   for(var i = 0; i < Circles.length; i++) {
//     Circles[i].create();
//     if(Circles[i].i <= 30) {
//       CirclesNext.push(Circles[i]);
//     }
//   }
//   Circles = CirclesNext;
// };

var Circle = function(mx, my) {
  var thisCircle = {},
    r = Math.floor(Math.random() * 256),
    g = Math.floor(Math.random() * 256),
    b = Math.floor(Math.random() * 256);
  thisCircle.mx = mx;
  thisCircle.my = my;
  thisCircle.i = 0;

  thisCircle.create = function() {
    if (thisCircle.i <= 30) {
      ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + ((30 - thisCircle.i) / 30) + ')';
      ctx.beginPath();
      ctx.arc(thisCircle.mx, thisCircle.my, thisCircle.i * 2, 0, Math.PI * 2, true);
      ctx.fill();
      thisCircle.i++;
    }
  };

  return thisCircle;
};

window.onload = function () {
  init();
};
