var events = {
	CHAT_MESSAGE_EVENT: 'chatMessage',
	CONNECTION_EVENT: 'connection'
};


var connectMsg = 'User connected!';
var disconnectMsg = 'User disconnected!';
//var chatMsg = 'chatMessage';
//var connectionEvent = 'connection';

$(document).ready(function(){
	var socket = io();
	var name = prompt("Ingresá tu nombre", "");
	$('#nombre').val(name);

	$('form').submit(function(){ //$('#nombre').val()
		socket.emit(events.CHAT_MESSAGE_EVENT, {source: name, message: $('#m').val()});
		$('#m').val('');
		return false;
	});
	socket.on(events.CHAT_MESSAGE_EVENT, function(msg){
		$('#messages').append($('<li class="'+(msg.source === name?'ownMsg':'othersMsg')+'">').text(msg.source + ': ' + msg.message));
	});
	socket.on(events.CONNECTION_EVENT, function(msg){
		$('#messages').append($('<li class="'+events.CONNECTION_EVENT+'">').text(msg));
	});
});