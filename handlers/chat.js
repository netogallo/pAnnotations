(function chat_handlers_module (handlers) {

  var messages = [];

  handlers.__init = function init (socket) {
    socket.emit('chat_load', {
      messages: messages
    });
  };

  handlers.chat = function on_chat (socket, data) {
    var defaults = {
      id: 'no-id',
      message: '(no message)'
    };
    var new_message = {};
    for (var key in defaults) {
      new_message[key] = data[key] !== undefined ? data[key] : defaults[key];
    }
    new_message.timestamp = (new Date()).getTime();
    messages.push(new_message);
    socket.broadcast.emit('chat', new_message);
    socket.emit('chat', new_message);
  };

})(exports);