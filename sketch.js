const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;
var bgImg,melon,bunny,bunnyImg;
var button;
var sad,blink,eat;
var bkSound,cutSound,sadSound,eatSound,air;
var blower
var mute_btn
var button2,button3;
var rope3,rope2;
var fruit_con2,fruit_con3;

function preload(){
  bgImg = loadImage("background.png")
  melon = loadImage("melon.png")
  bunnyImg = loadImage("Rabbit-01.png")
  eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png")
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png")
  blink.playing = true
  eat.playing = true
  eat.looping = false
  sad.looping = false

  bkSound = loadSound("sounds/sound1.mp3")
  cutSound = loadSound("sounds/rope_cut.mp3")
  sadSound = loadSound("sounds/sad.wav")
  eatSound = loadSound("sounds/eating_sound.mp3")
  air = loadSound("sounds/air.wav")
}
function setup() 
{
  var isMobile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if(isMobile){
    canW = displayWidth
    canH = displayHeight
    createCanvas(canW+80,canH)
  }else{
    canW = windowWidth
    canH = windowHeight
    createCanvas(canW,canH)
  }

  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  
  ground = new Ground(470,canH,1200,20);

  rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:370,y:40})
  rope3 = new Rope(4,{x:400,y:225})

  var fruit_option = {
    density:0.001,
    frictionAir:0.002
  }
  
  fruit = Bodies.circle(300,300,20,fruit_option);

  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit)
  fruit_con3 = new Link(rope3,fruit)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

  eat.frameDelay = 20
  blink.frameDelay = 13
  sad.frameDelay = 15
  bunny = createSprite(450,canH-80,100,100);
  bunny.addImage(bunnyImg)
  bunny.scale = 0.2
  bunny.addAnimation("blinking",blink)
  bunny.addAnimation("eating",eat)
  bunny.addAnimation("crying",sad)
  bunny.changeAnimation("blinking")
  

  button = createImg("cut_btn.png");
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop)

  button2 = createImg("cut_btn.png")
  button2.position(340,35)
  button2.size(50,50)
  button2.mouseClicked(drop2)

  button3 = createImg("cut_btn.png")
  button3.position(360,200)
  button3.size(50,50)
  button3.mouseClicked(drop3)
 

  blower = createImg("balloon.png")
  blower.position(10,250)
  blower.size(150,100)
  blower.mouseClicked(airBlow)

  mute_btn = createImg("mute.png")
  mute_btn.position(450,20)
  mute_btn.size(50,50)
  mute_btn.mouseClicked(mute)

  bkSound.play()
  bkSound.setVolume(0.1)
}

function draw() 
{
  background(51);
  imageMode(CENTER)
  image(bgImg,width/2,height/2,canW,canH)
  rope.show();
  rope3.show();
  rope2.show();

  if(fruit!=null){
    image(melon,fruit.position.x,fruit.position.y,60,60);
  }
  
  Engine.update(engine);
  ground.show();
   
  if(collide(fruit,bunny)==true){
    bunny.changeAnimation("eating")
    eatSound.play();
  }
 if(fruit!=null&& fruit.position.y>=canH-50){
   bunny.changeAnimation("crying")
   sadSound.play();
   fruit = null
 }

  drawSprites()
   
}
function drop(){
  rope.break();
  fruit_con.detach();
  fruit_con = null;
  cutSound.play();
  button.hide()

}
function collide(body,sprite){
  if(body!=null){
   var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
   if(d <=80){
     World.remove(world,fruit)
     fruit = null
     return true
   }
   else{return false}
  }
}

function airBlow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.02,y:-0.01})
  air.play();
}
function mute(){
  if(bkSound.isPlaying()){
    bkSound.stop()
  }else{
    bkSound.play()
  }
}
function drop2(){
  cutSound.play()
  rope2.break()
  fruit_con2.detach()
  fruit_con2 = null;
  button2.hide()
}
function drop3(){
  cutSound.play()
  rope3.break()
  fruit_con3.detach()
  fruit_con3 = null;
  button3.hide()
}