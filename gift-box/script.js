document.addEventListener('DOMContentLoaded', () => {
    const clickableBox = document.getElementById('clickable-box');
    const giftContainer = document.getElementById('gift-container');
    const surpriseMessage = document.getElementById('surprise-message');
    const closeBtn = document.getElementById('close-btn');
    const canvas = document.getElementById('confetti-canvas');
    const glow = document.getElementById('glow');
    const ctx = canvas.getContext('2d');

    let particles = [];
    let animationId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
            this.size = Math.random() * 8 + 4;
            this.speedX = (Math.random() - 0.5) * 20;
            this.speedY = (Math.random() - 0.5) * 20 - 10;
            const colors = ['#e63946', '#ffd700', '#ffffff', '#ff758f', '#ffb3c1'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.gravity = 0.25;
            this.friction = 0.98;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 15;
            this.opacity = 1;
        }

        update() {
            this.speedX *= this.friction;
            this.speedY *= this.friction;
            this.speedY += this.gravity;
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;
            this.opacity -= 0.005;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    function handleParticles() {
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].opacity <= 0 || particles[i].y > canvas.height) {
                particles.splice(i, 1);
                i--;
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleParticles();
        animationId = requestAnimationFrame(animate);
    }

    function burstConfetti() {
        for (let i = 0; i < 200; i++) {
            particles.push(new Particle());
        }
        if (!animationId) animate();
    }

    clickableBox.addEventListener('click', () => {
        if (clickableBox.classList.contains('open')) return;

        // Start anticipation jiggle
        clickableBox.classList.add('jiggle');

        setTimeout(() => {
            clickableBox.classList.remove('jiggle');
            clickableBox.classList.add('open');

            // Flash effect
            glow.classList.add('flash');

            // Initial burst
            setTimeout(burstConfetti, 100);

            // Hide box and show message
            setTimeout(() => {
                giftContainer.style.opacity = '0';
                giftContainer.style.transform = 'scale(0.5) rotateX(45deg)';

                setTimeout(() => {
                    giftContainer.classList.add('hidden');
                    surpriseMessage.classList.add('active');
                }, 600);
            }, 1200);

        }, 500); // Wait for jiggle
    });

    closeBtn.addEventListener('click', () => {
        surpriseMessage.classList.remove('active');
        glow.classList.remove('flash');
        setTimeout(() => {
            clickableBox.classList.remove('open');
            giftContainer.style.opacity = '1';
            giftContainer.style.transform = 'scale(1) rotateX(0)';
            giftContainer.classList.remove('hidden');
        }, 600);
    });
});
