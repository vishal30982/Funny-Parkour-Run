document.addEventListener('DOMContentLoaded', () => {
    function launchFullScreen(element) {
        if(element.requestFullScreen) {
            element.requestFullScreen();
        } else if(element.mozRequestFullScreen) { // Firefox
            element.mozRequestFullScreen();
        } else if(element.webkitRequestFullScreen) { // Chrome, Safari and Opera
            element.webkitRequestFullScreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            element.msRequestFullscreen();
        }
    }
    document.addEventListener('click', () => launchFullScreen(document.documentElement))
    document.addEventListener('keydown', () => launchFullScreen(document.documentElement))
    // Exit fullscreen
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }

    window.scrollTo(0, document.querySelector('body').scrollHeight);
    
    const char = document.querySelector('#character');
    const pole = document.querySelector('#pole');
    const score = document.querySelector('#score #scoreCount');
    const pauseBtn = document.querySelector('#pause-btn');
    const dialog = document.querySelector('#game-over-modal');
    const restartBtn = dialog.querySelector('#restart-btn');
    let touchStartY = 0;
    let touchEndY = 0;
    // swipe checking function
    let isSwiped = () => {
        if (touchEndY < touchStartY) {
            jump();
        }
    };
    const jumpSound = new Audio('./audios/jump-sound.mp3');
    const success = new Audio('./audios/success.mp3');
    const gameOverSound = new Audio('./audios/game-over.mp3');
    const bgMusic = new Audio('./audios/bg-music.mp3');
    bgMusic.autoplay = true;
    bgMusic.volume = 0.1;

    function jump() {
        if(char.style.animationPlayState != "paused") {
            if(!char.classList.contains('jump')) {
                char.classList.add('jump');
                jumpSound.play();
                setTimeout(() => {
                    char.classList.remove('jump');
                    score.textContent = parseInt(score.textContent) + 1;
                    success.load();
                    success.play();
                }, 1000);
            }
        }
    }
    function pauseAndResume() {
        if(pauseBtn.id === 'pause-btn') {
            char.style.animationPlayState = "paused";
            pole.style.animationPlayState = "paused";
            pauseBtn.id = 'resume-btn';
            pauseBtn.textContent = 'resume';
        }
        else {
            pauseBtn.id = 'pause-btn';
            pauseBtn.textContent = 'pause';
            char.style.animationPlayState = "running"
            pole.style.animationPlayState = "running";
        }
    }
    pauseBtn.addEventListener('click', pauseAndResume);

    document.addEventListener('keydown', (e) => {
        if (e.key === 's') {
            pauseAndResume();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.code === 'ArrowUp' || e.code === 'Space') {
            jump()
        }
    });

    // swipe gesture
    document.addEventListener('touchstart', (event) => {
        touchStartY = event.changedTouches[0].screenY;
    });
    document.addEventListener('touchend', (event) => {
        touchEndY = event.changedTouches[0].screenY;
        isSwiped()
    });

    let intervalId;

    function checkCollision(elem1, elem2) {
        const rect1 = elem1.getBoundingClientRect();
        const rect2 = elem2.getBoundingClientRect();

        // its check the condition in which the collision is not happening and convert that value in vice versa means opposite for example if the collision is not happening it returns true then its converted into false and is collision happening it returns false and convert it in true so that's how it works
        return !(rect1.right < rect2.left ||
                rect1.left > rect2.right ||
                rect1.bottom < rect2.top ||
                rect1.top > rect2.bottom);
    }

    restartBtn.onclick = () => {
        dialog.close()
        pauseAndResume();
        score.textContent = 0;
        bgMusic.play()
        bgMusic.autoplay = true;
        setTimeout(() => intervalId = setInterval(gameLoop, 50), 800)
    }

    function gameLoop() {
        if (checkCollision(char, pole)) {
            bgMusic.pause()
            bgMusic.currentTime = 0;
            gameOverSound.play();
            dialog.showModal();
            pauseAndResume();
            clearInterval(intervalId); // clear the interval so it no longer check if the collision is happening
        }
    }

    intervalId = setInterval(gameLoop, 50);
});