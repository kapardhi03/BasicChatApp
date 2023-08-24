const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, '')));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (msgData) => {
        const msg = modifyMessage(msgData.message);
        const modifiedMsgData = { ...msgData, message: msg };
        io.emit('chat message', modifiedMsgData);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
function modifyMessage(message) {




    if (/\breact\b/i.test(message)) {

        return message.replace('react' , '⚛️');
    }
    else if (message.includes('hey')) {
        return message.replace('hey', '👋');
    } else if (message.includes('woah')) {
        return message.replace('woah', '🤯');
    } else if (message.includes('lol')) {
        return message.replace('lol', '😂');
    } else if (message.includes('like')) {
        return message.replace('like', '❤️');
    } else if (message.includes('congratulations')) {
        return message.replace('congratulations', '🎉');
    }
    return message;


}

