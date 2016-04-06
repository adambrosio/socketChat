var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var jade = require('jade');
var path = require('path');
var jadeOptions = {cache: false};
var events = require('./events');
console.log('Events: ' + JSON.stringify(events));

app.locals.basedir = path.join(__dirname, 'templates');
console.log('basedir: ' + app.locals.basedir);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/app', function(req, res){
	console.log('Opening index!');
  //res.redirect(__dirname + '/public');
	var html = jade.renderFile(path.join(app.locals.basedir,'index.jade'), jadeOptions);
	console.log('index Rendered!');
	res.send(html);
});

io.on('connection', function(socket){
  var connectMsg = 'User connected!';
  var disconnectMsg = 'User disconnected!';
  //var chatMsgEvent = 'chatMessage';
  //var connectionEvent = 'connection';

  console.log(connectMsg);
  socket.broadcast.emit(events.CONNECTION_EVENT, connectMsg);
  socket.on('disconnect', function(){
	console.log(disconnectMsg);
	socket.broadcast.emit(events.CONNECTION_EVENT, disconnectMsg);
  });
  socket.on(events.CHAT_MESSAGE_EVENT, function(msg){
    console.log('message from ' + msg.source + ': ' + msg.message);
    io.emit(events.CHAT_MESSAGE_EVENT, msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
