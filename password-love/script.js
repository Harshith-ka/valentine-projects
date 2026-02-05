document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password-input');
    const unlockBtn = document.getElementById('unlock-btn');
    const lockScreen = document.getElementById('lock-screen');
    const secretMessage = document.getElementById('secret-message');
    const errorMsg = document.getElementById('error-msg');
    const lockGlyph = document.getElementById('lock-glyph');
    const backBtn = document.getElementById('back-btn');
    const celebrationContainer = document.getElementById('celebration-container');

    const SECRET_PHRASE = "ourfirstmeet";

    // Auto-focus input on load
    passwordInput.focus();

    function unlockVault() {
        const value = passwordInput.value.toLowerCase().trim();

        if (value === SECRET_PHRASE) {
            // Initiate success sequence
            document.body.classList.add('unlocked');
            lockGlyph.innerHTML = "🔓";
            lockGlyph.style.transform = "scale(1.4) rotate(-15deg)";
            errorMsg.classList.add('hidden');

            // Wait for lock icon pop
            setTimeout(() => {
                lockScreen.classList.remove('active');
                lockScreen.classList.add('hidden');

                setTimeout(() => {
                    secretMessage.classList.remove('hidden');
                    secretMessage.classList.add('active');
                    startCelebration();
                }, 500);
            }, 800);

        } else {
            // Trigger failure feedback
            errorMsg.classList.remove('hidden');
            passwordInput.value = "";
            passwordInput.focus();

            // Re-trigger shake animation
            errorMsg.style.animation = 'none';
            errorMsg.offsetHeight; // force reflow
            errorMsg.style.animation = null;

            // Subtle card shake
            const card = document.querySelector('.lock-card');
            card.style.animation = 'shake 0.4s ease-in-out';
            setTimeout(() => card.style.animation = 'none', 400);
        }
    }

    function createCelebrationHeart() {
        const heart = document.createElement('div');
        const types = ["❤️", "💖", "✨", "💓", "🌸"];
        heart.innerHTML = types[Math.floor(Math.random() * types.length)];
        heart.className = "heart-flare";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = "100vh";
        heart.style.fontSize = (Math.random() * 20 + 15) + "px";

        celebrationContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 7000);
    }

    function startCelebration() {
        // Initial burst
        for (let i = 0; i < 20; i++) {
            setTimeout(createCelebrationHeart, i * 50);
        }
        // Continuous flow
        const interval = setInterval(createCelebrationHeart, 250);
        setTimeout(() => clearInterval(interval), 12000);
    }

    // Event Listeners
    unlockBtn.addEventListener('click', unlockVault);

    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') unlockVault();
    });

    backBtn.addEventListener('click', () => {
        document.body.classList.remove('unlocked');
        secretMessage.classList.remove('active');
        secretMessage.classList.add('hidden');

        setTimeout(() => {
            lockGlyph.innerHTML = "🔒";
            lockGlyph.style.transform = "none";
            passwordInput.value = "";
            lockScreen.classList.remove('hidden');
            lockScreen.classList.add('active');
            passwordInput.focus();
        }, 500);
    });
});
