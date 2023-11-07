let player;
let platforms = [];
let gravity = 0.5;
let jumpForce = -10;
let score = 0;

function setup() {
  createCanvas(400, 600);

  // Initialize player as a square sprite
  player = createSprite(width / 2, height - 50, 50, 50);

  // Create initial platforms
  for (let i = 0; i < 5; i++) {
    let plat = createSprite(random(50, width - 50), i * 120, 100, 20);
    platforms.push(plat);
  }
}

function draw() {
  background(150);

  // Apply gravity to player
  player.velocity.y += gravity;

  // Player movement
  if (keyIsDown(LEFT_ARROW)) {
    player.velocity.x = -5;
  } else if (keyIsDown(RIGHT_ARROW)) {
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

  // Move platforms down and regenerate new ones
  if (player.position.y < height / 3) {
    player.position.y = height / 3;

    // Move platforms down
    for (let i = platforms.length - 1; i >= 0; i--) {
      platforms[i].position.y += abs(player.velocity.y);
      if (platforms[i].position.y > height) {
        platforms[i].remove();
        platforms.splice(i, 1);
      }
    }

    // Add new platform at the top
    let newPlat = createSprite(random(50, width - 50), player.position.y - height, 100, 20);
    platforms.push(newPlat);

    // Increase score
    score++;
  }

  // Check for game over
  if (player.position.y > height) {
    noLoop(); // Stop the draw loop
    console.log("Game Over! Score: " + score);
  }

  // Draw all sprites
  drawSprites();

  // Display score
  fill(255);
  textAlign(CENTER);
  textSize(32);
  text(score, width / 2, 50);
}

