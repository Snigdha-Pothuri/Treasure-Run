 var player,ground,r1,r2,r3,rid1,rid2,rid3;
 var obstaclesgroup,coinsgroup,riddlesgroup;
 var groundimg,playerimg,girl1,girl2,coinimg,obstacleimg,giftimg,backgroundimg; 
 var button,box;
 var choose = 0;  
 var score = 0;
 var PLAY = 0; 
 var END = 1; 
 var RESUME = 2; 
 var gameState = PLAY; 
 var ans,a;

 function preload (){
  groundimg = loadImage("ground2.png");
  playerimg = loadImage("player1.png");
  girl2img = loadImage("player2.png");  
  coinimg = loadImage("coin.png"); 
  obstacleimg = loadImage("obstacle.png");
  giftimg = loadImage("gift.png"); 
  backgroundimg = loadImage("b1.jpg");   
   r1 = loadImage("riddle1.jpg")
  r2 = loadImage("riddle2.jpg") 
  r3 = loadImage("riddle3.png")
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


  button = createButton("Submit"); 
  box = createInput()
  button.position (50,50);
  box.position (50,20)

 obstaclesgroup = new Group(); 
// riddlesgroup = new Group();
 coinsgroup = new Group (); 
}

function draw() { 
 background(255,255,255);
     
  player.collide(ground);   

  
 console.log(frameCount)

 
  if (gameState === PLAY) { 
  
    ground.velocityX = -10; 

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
    background(backgroundimg); 

    player.visible = true;
    girl1.visible = false ;
    girl2.visible = false; 
    ground.visible = true; 

    spawnObstacles();
    //riddles();
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
    if(frameCount===300){ 
      rid1=createSprite(400,200); 
      rid1.lifetime=150;
       rid1.addImage(r1); 
       ans='carrot'; 
       if(rid1.isTouching(player)){ 
         gameState=RESUME; } 
      }

      if(frameCount=== 900){ 
        rid2=createSprite(400,200); 
        rid2.lifetime=150;
         rid2.addImage(r2); 
         ans='clock'; 
         if(rid2.isTouching(player)){ 
           gameState=RESUME; } 
        }
   
        if(frameCount=== 1800){ 
          rid3=createSprite(350,200);  
          rid3.scale = 2;
          rid3.lifetime=150;
           rid3.addImage(r3); 
           ans='breath'; 
           if(rid3.isTouching(player)){ 
             gameState=RESUME; } 
          }

    if (obstaclesgroup.isTouching(player)) {
      gameState = END;
    }  
   /* if(frameCount === 480) {
      rid1 = createSprite(200,330); 
      rid1.addImage("r",r1); 
      rid1.scale = 0.5;  
      rid1.lifetime = 150;
      ans = 'carrot';
       if(player.isTouching(rid1)) {
        gameState = RESUME;  
       } 
      }   */
 
  }
  else if (gameState === END) { 
    background(backgroundimg); 
    ground.velocityX = 0;  
    player.velocityY = 0; 
    obstaclesgroup.setVelocityXEach(0);
   //riddlesgroup.setVelocityXEach(0);
  coinsgroup.setVelocityXEach(0);   
  fill("black")
  textSize(30);
  text("Game Over :(",50,100);
  }; 

  if(gameState === RESUME) {
    ground.velocityX = 0;  
    player.velocityY = 0; 
    obstaclesgroup.setVelocityXEach(0);
  coinsgroup.setVelocityXEach(0);    

  button.mousePressed (()=>{
  a = box.value (); 
  console.log(a); 
  }) 
  if(ans === a) {
    gameState = PLAY ;
    obstaclesgroup.destroyEach ();  
    coinsgroup.destroyEach (); 
  } 
  if(ans !== a) { 
    fill("black") 
    textSize(20)
    text("Wrong!,Try Again",50,100);
  }
  }
  
  drawSprites();  

  fill("black") 
  textSize(25)
 text("SCORE :" + score,650,30);


} 
function spawnObstacles(){
if(frameCount % 60 === 0) { 
  var obstacle = createSprite(800,370,50,50);
  //obstacle.x = Math.round(random (200,600)); 
  obstacle.velocityX = -10;  
  obstaclesgroup.add(obstacle); 
  obstacle.addImage("i",obstacleimg); 
  obstacle.scale = 0.3 
  obstacle.debug = true; 
  obstacle.setCollider("rectangle",0,0,100,100);
} 
} 
/*function riddles () {
  if(frameCount % 480 === 0) {
 var booster1 = createSprite(400,370,50,50); 
 booster1.shapeColor = "red";
//booster1.x = Math.round(random(100,600)); 
 booster1.velocityX= -10; 
 riddlesgroup.add(booster1); 
booster1.addImage("j",giftimg);
booster1.scale = 0.2;
  }
} */
 
function coins () {
  if(frameCount % 80 === 0) {
 var coin1 = createSprite(400,370,50,50); 
 coin1.shapeColor = "yellow";
coin1.y = Math.round(random(250,320)); 
 coin1.velocityX= -10; 
 coinsgroup.add(coin1); 
 coin1.addImage("k",coinimg); 
 coin1.scale = 0.5;
  }
} 
