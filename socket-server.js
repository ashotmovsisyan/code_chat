'use strict';

const socketIO = require('socket.io');
const ot = require('ot');
const roomList = {};

module.exports = (server) => {
    const str = `Javascript Editor \n\nconst i = 1;`;

    const io = socketIO(server);
    io.on('connection', (socket) => {
        socket.on('joinRoom', (data) => {;
            if (!roomList[data.room]) {

                const socketIOServer = new ot.EditorSocketIOServer(str, [], data.room, function (socket, cb) {
                    const self = this;
                    Task.findByIdAndUpdate(data.room, {content: self.document}, (err) => {
                        if (err) {
                            return cb(false);
                        }
                        cb(true);
                    });

                });
                roomList[data.room] = socketIOServer;
            }
            roomList[data.room].addClient(socket);
            roomList[data.room].setName(socket, data.username);

            socket.room = data.room;
            socket.join(data.room);
        });

        socket.on('chatMessage', function (data) {
            io.to(socket.room).emit('chatMessage', data);
            console.log(data);
        });

        socket.on('disconnect', function () {
            socket.leave(socket.room);
        });
    });
};
