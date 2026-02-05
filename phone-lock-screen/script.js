document.addEventListener('DOMContentLoaded', () => {
    const timeDisplay = document.getElementById('time');
    const dateDisplay = document.getElementById('date');
    const swipeHandle = document.getElementById('swipe-handle');
    const swipeTrack = document.getElementById('swipe-track');
    const lockScreen = document.getElementById('lock-screen');
    const homeScreen = document.getElementById('home-screen');
    const relockBtn = document.getElementById('relock-btn');
    const wallpaper = document.getElementById('wallpaper');
    const island = document.getElementById('island');
    const islandNotif = document.getElementById('island-notif');
    const flashlightBtn = document.getElementById('flashlight-btn');
    const cameraBtn = document.getElementById('camera-btn');
    const messageApp = document.getElementById('message-app');
    const messageOverlay = document.getElementById('hidden-message-overlay');
    const closeMessageBtn = document.getElementById('close-message-btn');

    // 1. Clock Logic
    function updateClock() {
        const now = new Date();
        const hrs = now.getHours().toString().padStart(2, '0');
        const mins = now.getMinutes().toString().padStart(2, '0');
        timeDisplay.textContent = `${hrs}:${mins}`;

        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        dateDisplay.textContent = now.toLocaleDateString('en-US', options);
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 2. Parallax Wallpaper
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        wallpaper.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
    });

    // 3. Dynamic Island Scan Effect
    function triggerScan() {
        island.classList.add('expanded');
        islandNotif.classList.remove('hidden');
        setTimeout(() => {
            island.classList.remove('expanded');
            islandNotif.classList.add('hidden');
        }, 2500);
    }

    // 4. Swipe Logic
    let isDragging = false;
    let startX = 0;
    const maxTrackWidth = swipeTrack.offsetWidth - swipeHandle.offsetWidth - 12;

    function onDragStart(e) {
        if (lockScreen.classList.contains('unlocked')) return;
        isDragging = true;
        startX = (e.type.includes('touch')) ? e.touches[0].clientX : e.clientX;
        swipeHandle.style.transition = 'none';
        swipeHandle.style.cursor = 'grabbing';
        triggerScan();
    }

    function onDragMove(e) {
        if (!isDragging) return;

        const currentX = (e.type.includes('touch')) ? e.touches[0].clientX : e.clientX;
        let deltaX = currentX - startX;

        deltaX = Math.max(0, Math.min(deltaX, maxTrackWidth));
        swipeHandle.style.transform = `translateX(${deltaX}px)`;

        if (deltaX >= maxTrackWidth * 0.95) {
            unlockPhone();
        }
    }

    function onDragEnd() {
        if (!isDragging) return;
        isDragging = false;
        swipeHandle.style.cursor = 'grab';

        if (!lockScreen.classList.contains('unlocked')) {
            swipeHandle.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            swipeHandle.style.transform = 'translateX(0)';
        }
    }

    function unlockPhone() {
        isDragging = false;
        lockScreen.classList.add('unlocked');
        homeScreen.classList.remove('hidden');
        setTimeout(() => {
            homeScreen.classList.add('active');
        }, 50);
    }

    function relockPhone() {
        homeScreen.classList.remove('active');
        setTimeout(() => {
            lockScreen.classList.remove('unlocked');
            swipeHandle.style.transform = 'translateX(0)';
            homeScreen.classList.add('hidden');
            messageOverlay.classList.remove('active');
            messageOverlay.classList.add('hidden');
        }, 850);
    }

    // 5. App & Shortcut Logic
    flashlightBtn.addEventListener('click', () => flashlightBtn.classList.toggle('active'));
    cameraBtn.addEventListener('click', () => cameraBtn.classList.toggle('active'));

    messageApp.addEventListener('click', () => {
        messageOverlay.classList.remove('hidden');
        setTimeout(() => messageOverlay.classList.add('active'), 10);
    });

    closeMessageBtn.addEventListener('click', () => {
        messageOverlay.classList.remove('active');
        setTimeout(() => messageOverlay.classList.add('hidden'), 500);
    });

    // Event Listeners
    swipeHandle.addEventListener('mousedown', onDragStart);
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('mouseup', onDragEnd);

    swipeHandle.addEventListener('touchstart', onDragStart, { passive: true });
    window.addEventListener('touchmove', onDragMove, { passive: true });
    window.addEventListener('touchend', onDragEnd);

    relockBtn.addEventListener('click', relockPhone);

    // Initial Island subtle expand
    setTimeout(triggerScan, 1000);
});
