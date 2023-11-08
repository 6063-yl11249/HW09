let player;
let platforms = [];
let gravity = 0.5;
let jumpForce = -10;
let score = 0;
let left = false;
let right = false;
let platformBuffer = 140;

function setup() {
  createCanvas(400, 600);

  // Initialize player as a square sprite
  player = createSprite(width / 2, height - 50, 50, 50);

  // Create an initial platform for the player to stand on
  let initialPlat = createSprite(width / 2, height - 25, 100, 20);
  platforms.push(initialPlat);

  // Generate some platforms off the screen to start
  for (let i = 1; i < 5; i++) {
    let plat = createSprite(
      random(50, width - 50),
      height - i * platformBuffer,
      100,
      20
    );
    platforms.push(plat);
  }
}

function draw() {
  background("pink");

  // Apply gravity to player
  player.velocity.y += gravity;

  // Player movement
  if (left) {
    player.velocity.x = -5;
  } else if (right) {
    player.velocity.x = 5;
  } else {
    player.velocity.x = 0;
  }

  // Player jump
  for (let i = platforms.length - 1; i >= 0; i--) {
    let plat = platforms[i];
    if (player.collide(plat) && player.velocity.y > 0) {
      player.velocity.y = jumpForce;
    }
  }

  // When the player is above a third of the screen, move platforms down
  if (player.position.y < height / 3) {
    player.position.y = height / 3;
    for (let plat of platforms) {
      plat.position.y += abs(player.velocity.y);
    }

    // Increase score as player goes up
    score++;
  }

  // Remove off-screen platforms and add new ones
  for (let i = platforms.length - 1; i >= 0; i--) {
    if (platforms[i].position.y > height) {
      platforms[i].remove();
      platforms.splice(i, 1);
    }
  }

  // If there are less than 5 platforms, add a new one
  if (platforms.length < 5) {
    let newPlatY = platforms[platforms.length - 1].position.y - platformBuffer;
    let newPlat = createSprite(random(50, width - 50), newPlatY, 100, 20);
    platforms.push(newPlat);
  }

  // Check for game over
  if (player.position.y > height) {
    noLoop();
    alert("Game Over! Score: " + score);
  }

  // Draw all sprites
  drawSprites();

  // Display score
  fill(255);
  textAlign(CENTER);
  textSize(32);
  text(score, width / 2, 50);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    left = true;
  } else if (keyCode === RIGHT_ARROW) {
    right = true;
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    left = false;
  } else if (keyCode === RIGHT_ARROW) {
    right = false;
  }
}
