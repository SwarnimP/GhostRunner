var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost,ghostImage,inv;
var invBlock,invBG;
var gameState="PLAY";
var spooky;

function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png")
  ghostImage=loadImage("ghost-standing.png") ;
  spooky = loadSound("spooky.wav");
}


function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300,100,100);
  tower.addImage("tower", towerImg);
  tower.velocityY=1;
  
  inv = createSprite(300,550,600,10);
  inv.visible=false;
  
  doorsGroup=new Group();
  climbersGroup=new Group();
  invBG=new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImage);
  ghost.scale =0.3;
  
  spooky.loop();
}

function draw(){
  background(0);
  if(gameState === "PLAY"){
    if(tower.y > 400){
      tower.y=300;
    }

     if (keyDown("space")) {
       ghost.velocityY = -5;
     }
    ghost.velocityY=ghost.velocityY+0.5;
    if (keyDown("left_arrow")){
      ghost.x=ghost.x-3;
    }
    if (keyDown("right_arrow")){
      ghost.x=ghost.x+3;
    }

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }

    if(invBG.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
      gameState = "END";
    }

    ghost.collide(inv);
    spawnDoors();
    drawSprites();
  }
  if (gameState === "END"){
    textSize(30);
    fill("yellow");
    stroke("red");
    text("Game Over",230,250);
  }

}

function spawnDoors(){
  if(frameCount%240 ===0){
    door=createSprite(200,50,10,10);
    door.addImage(doorImg);
    
    climber = createSprite(200,110,10,10);
    climber.addImage(climberImg);
    
    invBlock=createSprite(200,115,10,2);
    invBlock.width=climber.width;
    
    
    door.x=Math.round(random(120,400));
    door.velocityY=1;
    
    climber.x = door.x;
    climber.velocityY=1;
    
    invBlock.x=door.x;
    invBlock.velocityY=1;
    
    ghost.depth=door.depth;
    ghost.depth+=1;
    
    climber.lifetime = 800;
    door.lifetime=800;
    invBlock.lifetime=800;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invBG.add(invBlock);
    //invBlock.debug = true;
  } 
}