document.addEventListener('DOMContentLoaded', () => {
    const cookie = document.getElementById('main-cookie');
    const fortuneText = document.getElementById('fortune-text');
    const resetBtn = document.getElementById('reset-btn');
    const instruction = document.querySelector('.instruction');
    const crumbContainer = document.getElementById('crumb-container');

    const fortunes = [
        "Your smile is the most beautiful thing in the world.",
        "A secret admirer will soon reveal themselves (spoiler: it's Harry).",
        "Priya is destined for a life filled with endless happiness.",
        "The best things in life are even better with you.",
        "Your heart is made of gold and stars.",
        "Someone is thinking of you right now... ❤️",
        "A magical moment is waiting just around the corner.",
        "You are more loved than you can possibly imagine."
    ];

    function createCrumb(x, y) {
        const crumb = document.createElement('div');
        crumb.className = 'crumb';
        crumb.style.left = x + 'px';
        crumb.style.top = y + 'px';

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 12 + 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 10;

        let tx = 0;
        let ty = 0;
        let rotation = 0;
        let opacity = 1;

        const animateCrumb = () => {
            if (opacity <= 0) {
                crumb.remove();
                return;
            }
            tx += vx;
            ty += vy + 0.5; // Gravity
            rotation += 10;
            opacity -= 0.02;

            crumb.style.transform = `translate(${tx}px, ${ty}px) rotate(${rotation}deg)`;
            crumb.style.opacity = opacity;
            requestAnimationFrame(animateCrumb);
        };

        crumbContainer.appendChild(crumb);
        requestAnimationFrame(animateCrumb);
    }

    function crackCookie(e) {
        if (cookie.classList.contains('broken')) return;

        // Visual feedback
        const rect = cookie.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        for (let i = 0; i < 30; i++) {
            createCrumb(cx, cy);
        }

        // Pick a random fortune
        const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        fortuneText.textContent = randomFortune;

        // Trigger animation
        cookie.classList.add('broken');
        instruction.classList.add('hidden');

        // Show reset button after reveal
        setTimeout(() => {
            resetBtn.classList.remove('hidden');
        }, 1500);
    }

    function resetCookie() {
        cookie.classList.remove('broken');
        resetBtn.classList.add('hidden');
        instruction.classList.remove('hidden');
    }

    cookie.addEventListener('click', crackCookie);
    resetBtn.addEventListener('click', resetCookie);
});
