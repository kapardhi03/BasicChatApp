$(document).ready(() => {
    const socket = io();
    const form = $('#form');
    const input = $('#input');
    const messages = $('#messages');
    const usernameInput = $('#username');
    const roomSelect = $('#room');
    const typingIndicator = $('#typingIndicator');
    const sendButton = $('#sendButton');
    $('#sendButton').hide();

    let isTyping = false;

    input.on('input', () => {
        isTyping = input.val().length > 0;
        updateTypingIndicator();
        if (isTyping) {
            $('#sendButton').show();
        } else {
            $('#sendButton').hide();
        }
    });

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
            isTyping = false;
            updateTypingIndicator();
        }
    });

    socket.on('chat message', (data) => {
        const message = `<p><strong>${data.username}:</strong> ${data.message}</p>`;
        messages.append(message);
        isTyping = false;
        updateTypingIndicator();
    });

    function updateTypingIndicator() {
        typingIndicator.text(isTyping ? 'Typing...' : '');
    }
});
