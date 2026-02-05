document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const postGrid = document.getElementById('post-grid');
    const postModal = document.getElementById('post-modal');
    const storyModal = document.getElementById('story-modal');
    const dmModal = document.getElementById('dm-modal');
    const followBtn = document.getElementById('follow-btn');
    const followerCount = document.getElementById('follower-count');
    const messageBtn = document.getElementById('message-btn');
    const dmClose = document.getElementById('dm-close');
    const navDmIcon = document.getElementById('nav-dm-icon');
    const profileStory = document.getElementById('profile-story');
    const heartPop = document.getElementById('heart-pop');

    // State
    let isFollowing = false;
    let baseFollowers = 1204567;
    let storyInterval;

    // 1. Data Definitions
    const posts = [
        { id: 1, url: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=600", caption: "The brightest star in my sky. 🌟❤️", likes: 125432, liked: false },
        { id: 2, url: "https://images.unsplash.com/photo-1516589174184-c685266e430c?q=80&w=600", caption: "Forever isn't long enough when I'm with you. 🌹", likes: 98765, liked: false },
        { id: 3, url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=600", caption: "Your smile is my favorite view. 😊✨", likes: 210000, liked: false },
        { id: 4, url: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?q=80&w=600", caption: "Making every moment count with my favorites. ☕🍁", likes: 45210, liked: false },
        { id: 5, url: "https://images.unsplash.com/photo-1512404044943-34063c19e7cf?q=80&w=600", caption: "Sunshine and Roses. ☀️🌹", likes: 330400, liked: false },
        { id: 6, url: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=600", caption: "Dreamy sunsets and heart-to-hearts. 🌅", likes: 88200, liked: false },
        { id: 7, url: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=600", caption: "Captured by Harry. 📸✨", likes: 1200450, liked: false },
        { id: 8, url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=600", caption: "My world. ❤️💎", likes: 500000, liked: false },
        { id: 9, url: "https://images.unsplash.com/photo-1516589174184-c685266e430c?q=80&w=600", caption: "I love you. 🌹", likes: 250300, liked: false }
    ];

    const storyImages = [
        "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=800",
        "https://images.unsplash.com/photo-1516589174184-c685266e430c?q=80&w=800",
        "https://plus.unsplash.com/premium_photo-1663013220088-cc23fb796914?q=80&w=800"
    ];

    // 2. Initialize Post Grid
    function renderPosts() {
        postGrid.innerHTML = '';
        posts.forEach(post => {
            const el = document.createElement('div');
            el.className = 'post-item';
            el.innerHTML = `<img src="${post.url}" loading="lazy"><div class="post-overlay"><span>❤️ ${post.likes.toLocaleString()}</span></div>`;
            el.addEventListener('click', () => openPost(post));
            el.addEventListener('dblclick', (e) => likePost(post, el));
            postGrid.appendChild(el);
        });
    }
    renderPosts();

    // 3. Like System
    function likePost(post, el) {
        if (!post.liked) {
            post.liked = true;
            post.likes++;
            triggerHeartPop();
            renderPosts(); // Refresh grid
            if (postModal.classList.contains('active')) updateModalLike(post);
        }
    }

    function triggerHeartPop() {
        heartPop.classList.remove('hidden');
        heartPop.classList.add('animate');
        setTimeout(() => {
            heartPop.classList.remove('animate');
            heartPop.classList.add('hidden');
        }, 800);
    }

    // 4. Modal Logic
    function openPost(post) {
        document.getElementById('modal-image').src = post.url;
        document.getElementById('modal-caption').textContent = post.caption;
        document.getElementById('modal-likes').innerHTML = `<strong>${post.likes.toLocaleString()}</strong> likes`;
        document.getElementById('modal-heart').textContent = post.liked ? '❤️' : '🤍';
        document.getElementById('modal-heart').style.color = post.liked ? '#ed4956' : 'white';
        postModal.classList.remove('hidden');
        postModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function updateModalLike(post) {
        document.getElementById('modal-likes').innerHTML = `<strong>${post.likes.toLocaleString()}</strong> likes`;
        document.getElementById('modal-heart').textContent = '❤️';
        document.getElementById('modal-heart').style.color = '#ed4956';
    }

    // 5. Follow System
    followBtn.addEventListener('click', () => {
        isFollowing = !isFollowing;
        followBtn.textContent = isFollowing ? 'Following' : 'Follow';
        followBtn.classList.toggle('following');

        let targetCount = isFollowing ? baseFollowers + 1 : baseFollowers;
        animateNumber(followerCount, targetCount);
    });

    function animateNumber(el, target) {
        el.innerHTML = `<strong>${target.toLocaleString()}</strong> followers`;
    }

    // 6. Story Logic
    const storyProgress = document.getElementById('story-progress');
    const storyImg = document.getElementById('story-img');
    let storyIndex = 0;

    function playStory() {
        storyModal.classList.remove('hidden');
        storyIndex = 0;
        startStorySegment();
    }

    function startStorySegment() {
        if (storyIndex >= storyImages.length) {
            closeStoryViewer();
            return;
        }
        storyImg.src = storyImages[storyIndex];
        let progress = 0;
        storyProgress.style.width = '0%';

        if (storyInterval) clearInterval(storyInterval);
        storyInterval = setInterval(() => {
            progress += 1;
            storyProgress.style.width = `${progress}%`;
            if (progress >= 100) {
                storyIndex++;
                startStorySegment();
            }
        }, 40); // ~4 seconds per story
    }

    function closeStoryViewer() {
        storyModal.classList.add('hidden');
        clearInterval(storyInterval);
    }

    profileStory.addEventListener('click', playStory);
    document.getElementById('story-self').addEventListener('click', playStory);
    document.querySelector('.close-story').addEventListener('click', closeStoryViewer);

    // 7. DM Logic
    messageBtn.addEventListener('click', () => dmModal.classList.remove('hidden'));
    navDmIcon.addEventListener('click', () => dmModal.classList.remove('hidden'));
    dmClose.addEventListener('click', () => dmModal.classList.add('hidden'));

    // 8. Global Hooks
    document.querySelector('.close-modal').addEventListener('click', () => {
        postModal.classList.add('hidden');
        postModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});
