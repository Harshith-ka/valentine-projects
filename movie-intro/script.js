document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const replayBtn = document.getElementById('replay-btn');
    const introScreen = document.getElementById('intro-screen');
    const introContent = document.querySelector('.intro-content');
    const movieContainer = document.getElementById('movie-container');
    const credits = [
        document.getElementById('credit-1'),
        document.getElementById('credit-2'),
        document.getElementById('credit-3')
    ];
    const finalMessage = document.getElementById('final-message');

    async function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function showCredit(el) {
        el.classList.remove('hidden');
        await wait(100);
        el.classList.add('fade-in');
        await wait(4500); // More time to read
        el.classList.remove('fade-in');
        el.classList.add('fade-out');
        await wait(2500); // Slow cinematic fade
        el.classList.add('hidden');
        el.classList.remove('fade-out');
    }

    async function playMovie() {
        // Hide button first
        introContent.style.opacity = '0';
        await wait(500);

        // Open curtains
        document.body.classList.add('playing');
        await wait(2000); // Wait for curtains to halfway open

        movieContainer.classList.remove('hidden');

        for (const credit of credits) {
            await showCredit(credit);
        }

        await wait(800);
        finalMessage.classList.remove('hidden');
        await wait(100);
        finalMessage.classList.add('fade-in');
    }

    function resetMovie() {
        // Reset message and container
        finalMessage.classList.remove('fade-in');
        finalMessage.classList.add('hidden');
        movieContainer.classList.add('hidden');

        // Close curtains and show intro
        document.body.classList.remove('playing');
        introScreen.classList.remove('hidden');
        introContent.style.opacity = '1';

        // Clear any leftover animation classes from credits
        credits.forEach(credit => {
            credit.classList.add('hidden');
            credit.classList.remove('fade-in', 'fade-out');
        });
    }

    startBtn.addEventListener('click', playMovie);
    replayBtn.addEventListener('click', resetMovie);
});
