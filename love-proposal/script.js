document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const mainCard = document.getElementById('main-card');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const successScreen = document.getElementById('success-screen');
    const bgMusic = document.getElementById('bg-music');
    const heartsContainer = document.getElementById('hearts-container');
    const starsContainer = document.getElementById('stars-container');

    const noTexts = [
        "Are you sure?",
        "Think again! 🥺",
        "Really? No?",
        "Don't do this! 💔",
        "Look at the flowers!",
        "Maybe later?",
        "Sure??",
        "Oops! Wrong button?"
    ];

    let noCount = 0;

    // Create Stars for Background
    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        starsContainer.appendChild(star);
    }

    for (let i = 0; i < 100; i++) createStar();

    // Create Floating Hearts
    function createHeart(x, y, isExplosion = false) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = isExplosion ? (Math.random() > 0.5 ? '❤️' : '💖') : '❤️';

        if (isExplosion) {
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            heart.style.position = 'fixed';
            heart.style.fontSize = (Math.random() * 40 + 20) + 'px';

            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 15 + 5;
            const dx = Math.cos(angle) * velocity * 50;
            const dy = Math.sin(angle) * velocity * 50;

            heart.animate([
                { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
                { transform: `translate(${dx}px, ${dy}px) scale(0) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: 2000,
                easing: 'cubic-bezier(0, 0.5, 0.5, 1)'
            }).onfinish = () => heart.remove();
        } else {
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '105vh';
            heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
            heart.style.opacity = Math.random() * 0.5 + 0.3;

            heart.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
                { transform: 'translateY(-20vh) rotate(20deg)', opacity: 1, offset: 0.1 },
                { transform: 'translateY(-110vh) rotate(-20deg)', opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 4000,
                easing: 'linear'
            }).onfinish = () => heart.remove();

            heartsContainer.appendChild(heart);
        }
    }

    setInterval(() => createHeart(), 700);

    // Envelope Opening Logic
    envelopeWrapper.addEventListener('click', () => {
        envelope.classList.add('open');

        // Music start (attempts)
        bgMusic.play().catch(() => { });

        setTimeout(() => {
            envelopeWrapper.style.transition = 'all 1s ease';
            envelopeWrapper.style.opacity = '0';
            envelopeWrapper.style.transform = 'translateY(100px) scale(0.5)';

            setTimeout(() => {
                envelopeWrapper.classList.add('hidden');
                mainCard.classList.remove('hidden');
            }, 800);
        }, 1500);
    });

    // No Button Logic
    const moveNoButton = () => {
        const padding = 50;
        const maxX = window.innerWidth - noBtn.offsetWidth - padding;
        const maxY = window.innerHeight - noBtn.offsetHeight - padding;

        const x = Math.max(padding, Math.random() * maxX);
        const y = Math.max(padding, Math.random() * maxY);

        noBtn.style.position = 'fixed';
        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';

        noBtn.innerText = noTexts[Math.min(noCount, noTexts.length - 1)];
        noCount++;

        // Growth effect for YES button
        const scale = 1 + (noCount * 0.25);
        yesBtn.style.transform = `scale(${scale})`;
    };

    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('click', moveNoButton);

    // YES Button Logic
    yesBtn.addEventListener('click', () => {
        successScreen.classList.remove('hidden');
        mainCard.classList.add('hidden');

        for (let i = 0; i < 120; i++) {
            setTimeout(() => {
                createHeart(window.innerWidth / 2, window.innerHeight / 2, true);
            }, i * 15);
        }
    });
});
