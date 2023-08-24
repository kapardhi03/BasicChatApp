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
            const messageText = input.val();
            if (messageText === '/clear' || messageText === '/random' || messageText === '/help') {
                // For special commands, just emit the message without the username
                socket.emit('chat message', { message: messageText });
            } else {
                // For regular messages, emit the full message data
                const messageData = {
                    username: usernameInput.val(),
                    room: roomSelect.val(),
                    message: messageText
                };
                socket.emit('chat message', messageData);
            }
            input.val('');
            isTyping = false;
            updateTypingIndicator();
        }
    });
    socket.on('clear messages', () => {
        messages.empty(); // Clear messages for this user
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
