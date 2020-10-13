var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running;

var banana, bananaImage, obstacle, obstacleImage

var FoodGroup, obstacleGroup;

var score = 0;

var ground;

//var monkey_collided;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  //monkey_collided = loadAnimation("sprite_0.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 600);

  monkey = createSprite(200, 500, 20, 20);
  monkey.addAnimation("monkey", monkey_running);
  //monkey.addAnimation("m", monkey_collided);
  monkey.scale = 0.15;

  ground = createSprite(300, 550, 600, 10);

  FoodGroup = new Group();
  obstacleGroup = new Group();

  //monkey.debug = true;

}


function draw() {
  background(220);

  text("Score: " + score, 250, 100);

  monkey.collide(ground);

  if (gameState === PLAY) {

    obstacless();
    bananas();


    if (keyDown("space") && monkey.y >= 100) {
      monkey.velocityY = -19;

    }

    monkey.velocityY = monkey.velocityY + 0.8;

    if (monkey.isTouching(FoodGroup)) {
      score = score + 10;

      FoodGroup.destroyEach();

    }

    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;
    }



  } else if (gameState === END) {

    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);

    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);

    monkey.velocityX = 0;

    textSize = 20;
    text("Press 'r' To Restart", 250, 300);

    //monkey.changeAnimation(monkey_collided);

    if (keyDown("r") && gameState === END) {
      gameState = PLAY;

      FoodGroup.destroyEach();
      obstacleGroup.destroyEach();

      frameCount = 0;

      score = 0;

    }

  }



  drawSprites();

}

function bananas() {

  if (frameCount % 130 === 0) {

    banana = createSprite(600, 300, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 130;

    banana.y = Math.round(random(200, 350));

    FoodGroup.add(banana);

  }
  console.log(frameCount);

}


function obstacless() {

  if (frameCount % 150 === 0) {
    obstacle = createSprite(600, 490, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.3;
    obstacle.velocityX = -5;
    obstacle.lifetime = 130;

    obstacleGroup.add(obstacle);
  }
}