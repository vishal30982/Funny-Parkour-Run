document.addEventListener('DOMContentLoaded', () => {
    // Request fullscreen
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
  
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

    
    const char = document.querySelector('#character');
    const pole = document.querySelector('#pole');
    const score = document.querySelector('#score #scoreCount');
    const pauseBtn = document.querySelector('#pause-btn');
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
        char.classList.add('jump');
        jumpSound.play();
        setTimeout(() => {
            char.classList.remove('jump');
            score.textContent = parseInt(score.textContent) + 1;
            success.load();
            success.play();
        }, 1000);
    }

    pauseBtn.addEventListener('click', () => {
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
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'ArrowUp' || e.code === 'Space') {
            jump()
        }
    })

    // swipe gesture
    document.addEventListener('touchstart', (event) => {
        touchStartY = event.changedTouches[0].screenY;
    })
    document.addEventListener('touchend', (event) => {
        touchEndY = event.changedTouches[0].screenY;
        isSwiped()
    })

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

    function gameLoop() {
        if (checkCollision(char, pole)) {
            bgMusic.pause()
            bgMusic.currentTime = 0;
            gameOverSound.play();
            alert(`Oops! You hit the pole!\nYour Score: ${score.textContent}\n\nclick ok to restart`);
            location.reload();
            clearInterval(intervalId); // clear the interval so it no longer check if the collision is happening
        }
    }

    intervalId = setInterval(gameLoop, 50);
});