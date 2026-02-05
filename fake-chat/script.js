document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const startBtn = document.getElementById('start-btn');
    const chatMessages = document.getElementById('chat-messages');
    const finalReveal = document.getElementById('final-reveal');
    const bgMusic = document.getElementById('bg-music');
    const sentAudio = document.getElementById('msg-sent');
    const receivedAudio = document.getElementById('msg-received');

    const messages = [
        { type: 'sent', text: "Hey..." },
        { type: 'received', text: "Hey! You okay?" },
        { type: 'sent', text: "I have to tell you something." },
        { type: 'received', text: "You're making me nervous lol. What is it?" },
        { type: 'sent', text: "I love you." },
        { type: 'received', text: "Really?" },
        { type: 'sent', text: "Yes ❤️" },
        { type: 'received', text: "I love you too! More than words can say. ✨" }
    ];

    let msgIndex = 0;

    function formatTime() {
        const now = new Date();
        return now.getHours() % 12 + ':' + now.getMinutes().toString().padStart(2, '0') + (now.getHours() >= 12 ? ' PM' : ' AM');
    }

    function addMessage(type, text) {
        const wrapper = document.createElement('div');
        wrapper.className = `message-wrapper ${type}`;

        const msgDiv = document.createElement('div');
        msgDiv.className = 'message';
        msgDiv.innerText = text;

        const meta = document.createElement('div');
        meta.className = 'meta';
        const time = document.createElement('span');
        time.innerText = formatTime();
        meta.appendChild(time);

        if (type === 'sent') {
            const status = document.createElement('span');
            status.innerText = 'Read';
            meta.appendChild(status);
            sentAudio.play().catch(() => { });
        } else {
            receivedAudio.play().catch(() => { });
        }

        wrapper.appendChild(msgDiv);
        wrapper.appendChild(meta);
        chatMessages.appendChild(wrapper);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing';
        typingDiv.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return typingDiv;
    }

    function runConversation() {
        if (msgIndex >= messages.length) {
            setTimeout(() => {
                finalReveal.classList.remove('hidden');
            }, 3000);
            return;
        }

        const msg = messages[msgIndex];

        // Realistic calculation: 50ms per character + base delay
        const typingDelay = Math.min(msg.text.length * 40 + 500, 3000);
        const nextMsgDelay = 1500;

        if (msg.type === 'received') {
            const typing = showTyping();
            setTimeout(() => {
                typing.remove();
                addMessage(msg.type, msg.text);
                msgIndex++;
                setTimeout(runConversation, nextMsgDelay);
            }, typingDelay);
        } else {
            setTimeout(() => {
                addMessage(msg.type, msg.text);
                msgIndex++;
                setTimeout(runConversation, nextMsgDelay);
            }, 1000);
        }
    }

    startBtn.addEventListener('click', () => {
        startScreen.style.opacity = '0';
        setTimeout(() => startScreen.classList.add('hidden'), 800);

        // Init Audio
        bgMusic.volume = 0.4;
        bgMusic.play().catch(() => { });

        // Start Chat
        setTimeout(runConversation, 1000);
    });
});
