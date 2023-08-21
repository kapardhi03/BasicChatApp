$(document).ready(() => {
    const socket = io();
    const form = $('#form');
    const input = $('#input');
    const messages = $('#messages');
    const usernameInput = $('#username');
    const roomSelect = $('#room');

    form.submit((e) => {
        e.preventDefault();
        if (input.val()) {
            const messageData = {
                username: usernameInput.val(),
                room: roomSelect.val(),
                message: input.val()
            };
            socket.emit('chat message', messageData);
            input.val('');
        }
    });

    socket.on('chat message', (data) => {
        const message = `<p><strong>${data.username}:</strong> ${data.message}</p>`;
        messages.append(message);
    });
});
