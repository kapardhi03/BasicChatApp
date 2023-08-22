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
    if (message.includes('react')) {
        return message.replace('react', '⚛️'); // React emoji
    } else if (message.includes('hey')) {
        return message.replace('hey', '👋'); // Wave emoji
    } else if (message.includes('woah')) {
        return message.replace('woah', '🤯'); // Wosh emoji
    } else if (message.includes('lol')) {
        return message.replace('lol', '😂'); // Laughing emoji
    } else if (message.includes('like')) {
        return message.replace('like', '❤️'); // Love emoji
    } else if (message.includes('congratulations')) {
        return message.replace('congratulations', '🎉'); // Party emoji
    }
    return message;
}

