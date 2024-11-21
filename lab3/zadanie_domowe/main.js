const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const sadMusic = new Audio('sad-music.mp3');

const backgroundImage = new Image();
backgroundImage.src = 'board-bg.jpg';

const cursorImage = new Image();
cursorImage.src = 'aim.png';

const zombieImage = new Image();
zombieImage.src = 'walkingdead.png';

const fullHeart = new Image();
const emptyHeart = new Image();
fullHeart.src = 'full_heart.png';
emptyHeart.src = 'empty_heart.png';

const canvasWidth = 1680;
const canvasHeight = 1050;
const zombieFrameWidth = 200;
const zombieFrameHeight = 312;
const zombieFrames = 10;

let lives = 3;
let score = 0;

let cursorX = canvasWidth / 2;
let cursorY = canvasHeight / 2;

let zombies = [];
const fps = 60;
const zombieInterval = 2000;
let lastZombieTime = 0;

function createZombie() {
  const size = Math.random() * 0.5 + 0.5;

  zombies.push({
    x: canvasWidth,
    y: Math.random() * (canvasHeight - zombieFrameHeight * size),
    speed: Math.random() * 2 + 1,
    scale: size,
    frame: 0,
    frameTimer: 0,
    frameInterval: 1000 / fps * 10
  });
}

function drawLives() {
  for (let i = 1; i <= 3; i++) {
    if(i > lives){
        ctx.drawImage(emptyHeart, 20 + i * 60, 10, 40, 40);
    } else{
        ctx.drawImage(fullHeart, 20 + i * 60, 10, 40, 40);
    }
  }
}

function drawScore() {
  ctx.fillStyle = 'white';
  ctx.font = '50px';
  ctx.fillText(`Wynik: ${score}`, canvasWidth - 120, 30);
}

function drawZombies() {
  zombies.forEach(zombie => {
    ctx.drawImage(
      zombieImage,
      zombie.frame * zombieFrameWidth,
      0,
      zombieFrameWidth,
      zombieFrameHeight,
      zombie.x,
      zombie.y,
      zombieFrameWidth * zombie.scale,
      zombieFrameHeight * zombie.scale
    );

    zombie.x -= zombie.speed;
    zombie.frameTimer += 1000 / fps;
    if (zombie.frameTimer >= zombie.frameInterval) {
      zombie.frame = (zombie.frame + 1) % zombieFrames;
      zombie.frameTimer = 0;
    }
  });
}

function checkCollisions() {
  zombies = zombies.filter(zombie => {
    if (zombie.x + zombieFrameWidth * zombie.scale < 0) {
      lives -= 1;
      return false;
    }
    return true;
  });
}

function handleShot(x, y) {
  let hit = false;
  zombies = zombies.filter(zombie => {
    const zombieWidth = zombieFrameWidth * zombie.scale;
    const zombieHeight = zombieFrameHeight * zombie.scale;
    if (
      x > zombie.x &&
      x < zombie.x + zombieWidth &&
      y > zombie.y &&
      y < zombie.y + zombieHeight
    ) {
      score += 20;
      hit = true;
      return false;
    }
    return true;
  });
  if (!hit) {
    score -= 5;
  }
}

function drawGame() {
    ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);
    drawZombies();
    ctx.drawImage(cursorImage, cursorX - 25, cursorY - 25, 50, 50);
    drawLives();
    drawScore();
}

function updateGame(timestamp) {
  if (lives <= 0) {
    endGame();
    return;
  }

  if (timestamp - lastZombieTime > zombieInterval) {
    createZombie();
    lastZombieTime = timestamp;
  }

  drawGame();
  checkCollisions();
  requestAnimationFrame(updateGame);
}

function endGame() {
  document.getElementById('game-over').style.display = 'block';
  document.getElementById('final-score').textContent = score;
  sadMusic.play();
}

canvas.addEventListener('mousemove', event => {
  const rect = canvas.getBoundingClientRect();
  cursorX = event.clientX - rect.left;
  cursorY = event.clientY - rect.top;
});

canvas.addEventListener('click', () => {
  handleShot(cursorX, cursorY);
});

document.getElementById('restart-btn').addEventListener('click', () => {
  lives = 3;
  score = 0;
  sadMusic.pause();
  zombies = [];
  document.getElementById('game-over').style.display = 'none';
  requestAnimationFrame(updateGame);
});

backgroundImage.onload = () => {
  cursorImage.onload = () => {
    zombieImage.onload = () => {
      fullHeart.onload = () => {
        requestAnimationFrame(updateGame);
      };
    };
  };
};
