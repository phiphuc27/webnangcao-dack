const io = require('socket.io-client');

export default function(sendID, receiveID, addOneMessage) {
  const socket = io.connect('');

  // join room first to send message
  socket.emit('join room', { sendID, receiveID });

  function message(room, msg, sendID, receiveID) {
    const value = {
      IDG: sendID,
      IDN: receiveID,
      NGAYGUI: new Date(),
      NOIDUNG: msg
    };
    socket.emit('message', { room, value }, function(data) {
      addOneMessage(data);
    });
  }

  socket.on('receive message', function(value) {
    console.log(value);
    addOneMessage(value);
  });
  function disconnect() {
    socket.disconnect();
  }

  return {
    room: sendID < receiveID ? `room-${sendID}_${receiveID}` : `room-${receiveID}_${sendID}`,
    socket,
    message,
    disconnect
  };
}
