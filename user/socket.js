// const UsersModel = require('./models/Users');
const ChatModel = require('./models/Chat');

const socketIO = io => {
  io.on('connection', socket => {
    console.log(`user ${socket.id} connected!`);
    // start connect and join room
    socket.on('join room', ({ sendID, receiveID }) => {
      let firstID = sendID;
      let secondID = receiveID;
      // smaller first
      if (sendID > receiveID) {
        firstID = receiveID;
        secondID = sendID;
      }
      const room = `room-${firstID}_${secondID}`;
      // console.log(room);
      socket.join(room);
    });
    socket.on('message', ({ room, value }, cb) => {
      value.NGAYGUI = new Date();
      ChatModel.insert(value)
        .then(result => {
          value.ID = result.insertId;
          // console.log(value);
          socket.broadcast.to(room).emit('receive message', value);
          cb(value);
        })
        .catch(err => {
          console.log(err);
        });
    });

    socket.on('disconnect', () => {
      console.log(`user ${socket.id} disconnected!`);
    });
  });
};

module.exports = socketIO;
