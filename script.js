document.addEventListener('DOMContentLoaded', () => {
    const char = document.querySelector('#character');
    const pole = document.querySelector('#pole');
    const score = document.querySelector('#score #scoreCount');
    let touchStartY = 0;
    let touchEndY = 0;
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

    document.addEventListener('keydown', (e) => {
        if (e.code === 'ArrowUp' || e.code === 'Space') {
            jump()
        }
    })

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
            clearInterval(intervalId);
        }
    }

    intervalId = setInterval(gameLoop, 50);
});