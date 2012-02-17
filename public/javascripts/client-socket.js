var socket = io.connect('http://10.101.26.78:80'),
    GLOBAL_USERNAME;

// on connection to server, ask for user's name with an anonymous callback
socket.on('connect', function(){
  GLOBAL_USERNAME = prompt("What's your name?");
  // call the server-side function 'adduser' and send one parameter (value of prompt)
  socket.emit('adduser', GLOBAL_USERNAME);
});

// listener, whenever the server emits 'updatechat', this updates the chat body
socket.on('updatechat', function (username, data) {
  $('.conversation').append('<b>'+username + ':</b> ' + data + '<br>');
});

// listener, whenever the server emits 'updateusers', this updates the username list
socket.on('updateusers', function(data) {
  $('.users-list').empty();
  $.each(data, function(key, value) {
    $('.users-list').append('<div>' + key + '</div>');
  });
});

var sendChatMessage = function () {
  var message = $('.data').val();
  $('.data').val('');
  // tell server to execute 'sendchat' and send along message
  socket.emit('sendchat', message);
};

$(document).ready(function() {
  $('.clear-data .clear-chat').bind('click', function(event) {
    event.preventDefault();
    $('.conversation').empty();
  });

  $('.clear-data .clear-canvas').bind('click', function(event) {
    event.preventDefault();
    socketCtx.clearRect(0, 0, socketCanvas.width, socketCanvas.height);
  });

  $('#datasend').bind('click', function() {
    sendChatMessage();
  });

  $('.data').keypress(function(event) {
    if(event.which == 13) {
      sendChatMessage();
    }
  });
});
