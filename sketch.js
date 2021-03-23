var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var foodGroup, obstacleGroup;

function preload() {
  bgImage = loadImage("jungle.jpg");
  playerRunning = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(600, 400);
  bg = createSprite(200, 200, 20, 20);
  bg.scale = 0.81;
  bg.addImage(bgImage);

  mon = createSprite(100, 350, 20, 20);
  mon.addAnimation("0", playerRunning);
  mon.scale = 0.1;
  foodGroup = new Group();
  obstacleGroup = new Group();

  ground = createSprite(100, 393, 90, 20);
  ground.visible = false;
}

function draw() {
  background(220);
  drawSprites();

  if (gameState === PLAY) {
    stroke("navy");
    textSize(30);
    fill("maroon");
    text("Score👉" + score, 400, 50);

    bg.velocityX = -4;
    if (bg.x < 200) {
      bg.x = bg.width / 2;
    }

    if (keyDown("space") && mon.y > 200) {
      mon.velocityY = -17;

    }
    mon.velocityY = mon.velocityY + 0.8
    mon.collide(ground);
    bananafood();
    rockobstacle();

    if (foodGroup.isTouching(mon)) {
      score = score + 2;
      foodGroup.destroyEach();
    }
    switch (score) {
      case 10:
        mon.scale = 0.12;
        break;
      case 20:
        mon.scale = 0.12;
        break;
      case 30:
        mon.scale = 0.12;
        break;
      case 40:
        mon.scale = 0.12;
        break;
      default:
        break;
    }

    if (obstacleGroup.isTouching(mon)) {
      gameState = END;
    }

  } else if (gameState === END) {
    background("MistyRose ");
    fill("navy");
    textSize(40);
    text("Opps!!!😔", 250, 170);
    text("Game Over⌛", 220, 220);
    text("Score👉" + score, 240, 270);

  }


}

function bananafood() {
  if (frameCount % 130 === 0) {
    var banana = createSprite(700, 120, 20, 20);
    banana.y = Math.round(random(150, 300));
    banana.addImage("0", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -6;
    banana.lifetime = 200;
    foodGroup.add(banana);

  }
}

function rockobstacle() {
  if (frameCount % 170 === 0) {
    var rock = createSprite(700, 350, 20, 20);
    rock.addImage("0", obstacleImage);
    rock.scale = 0.125;
    rock.velocityX = -5;
    rock.lifetime = 200;
    obstacleGroup.add(rock);

  }
}