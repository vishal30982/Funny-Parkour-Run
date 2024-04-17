const char = document.querySelector('#character');
const fence = document.querySelector('#fence');
const score = document.querySelector('#score #scoreCount');
const jumpSound = new Audio('./audios/jump-sound.mp3');
const success = new Audio('./audios/success.mp3');
const gameOverSound = new Audio('./audios/game-over.mp3');
const bgMusic = new Audio('./audios/bg-music.mp3');
bgMusic.autoplay = true;
bgMusic.volume = 0.1;

document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowUp' || e.code === 'Space') {
        char.classList.add('jump');
        jumpSound.play();
        setTimeout(() => {
            char.classList.remove('jump');
            score.textContent = parseInt(score.textContent) + 1;
            success.load();
            success.play();
        }, 1000);
    }
})
// setInterval(() => {
//     // left right collision detection
//     if (parseInt(window.getComputedStyle(fence).getPropertyValue('left')) <= parseInt(window.getComputedStyle(char).getPropertyValue('left')) + char.width && parseInt(window.getComputedStyle(char).getPropertyValue('bottom') < fence.height )) {
//         console.log('left right collision!!')
//     }
//     // top bottom collision detection
//     if (parseInt(window.getComputedStyle(char).getPropertyValue('bottom')) <= parseInt(window.getComputedStyle(fence).getPropertyValue('bottom')) + fence.height && parseInt(window.getComputedStyle(char).getPropertyValue('bottom')) > 241) {
//         console.log('top bottom collision!!')
//     }
    
//     // todo: top botom collision detection
// }, 1);

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
    if (checkCollision(char, fence)) {
        bgMusic.pause()
        bgMusic.currentTime = 0;
        gameOverSound.play();
        alert(`Oops! You hit the pole!\nYour Score: ${score.textContent}\n\nclick ok to restart`);
        location.reload();
        clearInterval(intervalId);
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        char.classList.add('jump');
        setTimeout(() => {
            char.classList.remove('jump');
        }, 1000);
    }
});


intervalId = setInterval(gameLoop, 50);