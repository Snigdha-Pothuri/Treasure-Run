 var player,ground;
 var obstaclesgroup,coinsgroup,riddlesgroup;
 var groundimg,playerimg,girl1,girl2;
 var choose = 0;  
 var score = 0;
 var PLAY = 0; 
 var END = 1;
 var gameState = PLAY;

 function preload (){
  groundimg = loadImage("ground2.png");
  playerimg = loadImage("player1.png");
  girl2img = loadImage("player2.png");                      
 }

function setup() {
  createCanvas(800,400); 
  player = createSprite(50, 200, 50, 50); 
  player.debug = true; 

  ground = createSprite(400,390,800,30);  

  girl1= createSprite(200,200,50,50); 
  girl1.addImage("girl1",playerimg) 
  girl1.scale = 0.4;
  girl1.visible = false;

  girl2 = createSprite(600,200,50,50)
  girl2.addImage("girl2",girl2img) 
  girl2.scale = 0.4;
  girl2.visible = false;

  ground.addImage("image",groundimg);
  ground.velocityX = -10;

 obstaclesgroup = new Group(); 
 riddlesgroup = new Group();
 coinsgroup = new Group (); 
}

function draw() { 
 background(255,255,255);
     
  player.collide(ground);  
 
  if (gameState === PLAY) { 


  if(choose === 0){
   girl1.visible = true ;   
   girl2.visible = true ; 

   player.visible = false; 
   ground.visible = false;
  } 

  if(mousePressedOver(girl1)) {
    player.addImage("player",playerimg); 
    player.setCollider("rectangle",0,0,200,350);
    player.scale = 0.4; 
    choose = 1;
  } 

  if(mousePressedOver(girl2)) {
    player.addImage("player2",girl2img); 
    player.setCollider("rectangle",0,0,250,350);
    player.scale = 0.4;
    choose = 1;
  }
  
  if (choose === 1) { 
    background(255,255,255);
    player.visible = true;
    girl1.visible = false ;
    girl2.visible = false; 
    ground.visible = true;

    spawnObstacles();
    riddles();
    coins();  
  } 
  

if(coinsgroup.isTouching(player)) {
  score = score + 5;
  coinsgroup.destroyEach();
}

  if(keyDown("space")){
    player.velocityY = -12;  
   }
   player.velocityY = player.velocityY+1;
 
   
   if(ground.x<0){
   ground.x = ground.width/2 
    } 

    if (obstaclesgroup.isTouching(player)) {
      gameState = END;
    }  
    
 
  }
  else if (gameState === END) {
    ground.velocityX = 0;  
    player.velocityY = 0; 
    obstaclesgroup.setVelocityXEach(0);
   riddlesgroup.setVelocityXEach(0);
  coinsgroup.setVelocityXEach(0); 

  }
  
 
  text("SCORE :" + score,700,30);

  drawSprites(); 


} 
function spawnObstacles(){
if(frameCount % 60 === 0) { 
  var obstacle = createSprite(800,370,50,50);
  //obstacle.x = Math.round(random (200,600)); 
  obstacle.velocityX = -10;  
  obstaclesgroup.add(obstacle);
} 
} 
function riddles () {
  if(frameCount % 480 === 0) {
 var booster1 = createSprite(400,370,50,50); 
 booster1.shapeColor = "red";
//booster1.x = Math.round(random(100,600)); 
 booster1.velocityX= -10; 
 riddlesgroup.add(booster1);
  }
} 
 
function coins () {
  if(frameCount % 80 === 0) {
 var coin1 = createSprite(400,370,50,50); 
 coin1.shapeColor = "yellow";
coin1.y = Math.round(random(250,320)); 
 coin1.velocityX= -10; 
 coinsgroup.add(coin1);
  }
} 
