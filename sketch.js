var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var bottom, bottomImg, obsBottom1, obsBottom2, obsBottom3
var bottomObsGroup
var obsTop1, obsTop2, topImg
var gameState="play"
var gameOverImg, restartImg
var dieSound, jumpSound

function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

bottomImg1 = loadImage("assets/obsBottom1.png")
bottomImg2 = loadImage("assets/obsBottom2.png")
bottomImg3 = loadImage("assets/obsBottom3.png")

obsTop1 = loadImage("assets/obsTop1.png")
obsTop2 = loadImage("assets/obsTop2.png")

gameOverImg = loadImage("assets/gameOver.png")
restartImg = loadImage("assets/restart.png")

dieSound = loadSound("assets/die.mp3")
jumpSound = loadSound("assets/jump.mp3")

}

function setup(){

//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

gameOver = createSprite(200,200)
gameOver.addImage(gameOverImg)
gameOver.scale = 0.5
gameOver.visible = false

restart = createSprite(200,250)
restart.addImage(restartImg)
restart.scale = 0.5
restart.visible = false

bottomObsGroup = new Group()
topObsGroup = new Group()

edges = createEdgeSprites()



}

function topObstacles(){
if (World.frameCount% 75===0){
top1 = createSprite (width,50,20,10);
top1.y = random(10,50)
top1.addImage(obsTop1)
top1.scale = random(0.2225, 0.1)
top1.velocityX = -3

var rand = Math.round(random(1,2))
switch(rand){
  case 1: top1.addImage(obsTop1);
  break;
  case 2: top1.addImage(obsTop2);
  break;
  default: break;     
}
 
balloon.depth = top1.depth+1
topObsGroup.add(top1)

}


}

function obstacleImages(){
if (World.frameCount% 80===0){
bottom1 = createSprite(width,height-50,40,38);
bottom1.addImage(bottomImg1)
bottom1.scale = random(0.1,0.1225)
bottom1.velocityX = -3

var rand = Math.round(random(1,3))
switch(rand){
case 1: bottom1.addImage(bottomImg1);
break;
case 2: bottom1.addImage(bottomImg2);
break;
case 3: bottom1.addImage(bottomImg3);
break;
default: break;
}

bottom1.lifetime = 200
 
balloon.depth = bottom1.depth+1

bottomObsGroup.add(bottom1)
}



}


function reset(){
gameState = "play"
topObsGroup.destroyEach()
bottomObsGroup.destroyEach()

restart.visible = false
gameOver.visible = false
}


function draw() {
  
  background("black");
        if (gameState == "play"){
          //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY= -6 ;
            jumpSound.play()
          }

          //adding gravity
           balloon.velocityY = balloon.velocityY+0.2;
   
           //spawning bottom obstacles
           obstacleImages()
           topObstacles()

           balloon.bounceOff(edges[2])


           if(balloon.isTouching(bottomObsGroup)||balloon.isTouching(topObsGroup)||balloon.y>height-20){
            dieSound.play()
gameState = "end"


console.log(gameState)
           }
        }

           if (gameState == "end"){
            bottomObsGroup.setVelocityXEach(0)
            topObsGroup.setVelocityXEach(0)
            balloon.velocityX = 0
            balloon.velocityY = 0

            topObsGroup.setLifetimeEach(-1)
            bottomObsGroup.setLifetimeEach(-1)

            balloon.y = 200

            gameOver.visible = true
            gameOver.depth = gameOver.depth+1

            restart.visible = true
            restart.depth = restart.depth+1

           

            if (mousePressedOver(restart)){
reset()

            }

            
           }
            
                       
        drawSprites();

        
}