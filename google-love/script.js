document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const homepage = document.getElementById('homepage');
    const resultsPage = document.getElementById('results-page');
    const searchingOverlay = document.getElementById('searching-overlay');
    const suggestionsBox = document.getElementById('suggestions');
    const searchBox = document.querySelector('.search-box');
    const confettiContainer = document.getElementById('confetti-container');

    const phrase = "Who loves Priya?";
    const suggestions = [
        "Who loves Priya?",
        "Who loves Priya more than anyone?",
        "Who loves Priya forever?",
        "Priya and Harry soulmates",
        "Harry's secret for Priya",
        "Why Harry is crazy about Priya",
        "Harry loves Priya 100% truth"
    ];

    let charIndex = 0;

    // Typewriter with human-like variability
    function typeEffect() {
        if (charIndex < phrase.length) {
            searchInput.value += phrase.charAt(charIndex);
            charIndex++;

            // Show suggestions once we've typed a few characters
            if (charIndex > 3) {
                showSuggestions();
            }

            const delay = Math.random() * 80 + 40; // Variable speed for realism
            setTimeout(typeEffect, delay);
        } else {
            setTimeout(triggerSearch, 1500);
        }
    }

    function showSuggestions() {
        suggestionsBox.classList.remove('hidden');
        searchBox.style.borderBottomLeftRadius = '0';
        searchBox.style.borderBottomRightRadius = '0';
        searchBox.style.boxShadow = '0 4px 6px rgba(32,33,36,0.28)';

        // Dynamically build suggestions list
        suggestionsBox.innerHTML = '';
        suggestions.forEach(text => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.innerHTML = `<span class="s-icon">🔍</span> <span>${text}</span>`;
            div.onclick = triggerSearch; // Allow clicking suggestions
            suggestionsBox.appendChild(div);
        });
    }

    function triggerSearch() {
        // Hide suggestions and home
        suggestionsBox.classList.add('hidden');
        searchBox.style.borderBottomLeftRadius = '24px';
        searchBox.style.borderBottomRightRadius = '24px';
        searchBox.style.boxShadow = 'none';

        // Show loading overlay
        searchingOverlay.classList.remove('hidden');
        searchingOverlay.style.opacity = '1';

        setTimeout(() => {
            searchingOverlay.style.opacity = '0';
            setTimeout(() => {
                searchingOverlay.classList.add('hidden');
                homepage.classList.add('hidden');
                resultsPage.classList.remove('hidden');
                document.title = "Who loves Priya? - Google Search";
                startHeartConfetti();
            }, 500);
        }, 2000); // 2 full seconds of "Search" feel
    }

    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = (Math.random() > 0.5 ? '❤️' : '💖');
        heart.className = 'heart';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.fontSize = (Math.random() * 25 + 15) + 'px';
        heart.style.animation = `floatUp ${Math.random() * 4 + 3}s linear forwards`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 7000);
    }

    function startHeartConfetti() {
        const interval = setInterval(createHeart, 200);
        setTimeout(() => clearInterval(interval), 15000);
    }

    // Initialize after a short beat
    setTimeout(typeEffect, 1200);

    // Focus state for search box
    searchInput.addEventListener('focus', () => searchBox.classList.add('focussed'));
    searchInput.addEventListener('blur', () => searchBox.classList.remove('focussed'));
});
