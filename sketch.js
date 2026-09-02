let glow;     
let bx, by;    
let tx, ty;  
let fs;        
let page = 'home'; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  bx = tx = width / 2;
  by = ty = height / 2;
  fs = min(width * 0.09, 110);
  makeGlow();
}

function makeGlow() {
  glow = createGraphics(width, height);
  var txt = (page === 'home') ? 'yixi tang' : 'hello';
  glow.textAlign(CENTER, CENTER);
  glow.textSize(fs);
  glow.textStyle(BOLD);

  glow.push();
  glow.drawingContext.shadowBlur = 34;
  glow.drawingContext.shadowColor = 'rgba(255,255,255,0.9)';
  glow.fill(255);
  glow.text(txt, width / 2, height / 2);
  glow.pop();

  glow.push();
  glow.fill(255);
  glow.text(txt, width / 2, height / 2);
  glow.pop();
}

function draw() {
  background(0);
  image(glow, 0, 0); 
  drawNav();       

  bx += (tx - bx) * 0.18;
  by += (ty - by) * 0.18;

  noStroke();
  push();
  drawingContext.shadowBlur = 32;
  drawingContext.shadowColor = 'rgba(255,255,255,0.95)';
  fill(255, 235);
  ellipse(bx, by, 34, 34);
  pop();
  fill(255);
  ellipse(bx, by, 16, 16);
}

function drawNav() {
  noStroke();
  fill(15);
  rect(0, 0, width, 64);

  var navTxt = (page === 'hello') ? 'yixitang' : 'hello';
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(24);
  fill(255);
  text(navTxt, 32, 32);

}

function mousePressed() {
  if (mouseY < 64 && mouseX > 10 && mouseX < 300) {
    page = (page === 'home') ? 'hello' : 'home';
    makeGlow(); 
  }
}

function mouseMoved() {
  tx = mouseX;
  ty = mouseY;
}

function touchMoved() {
  if (touches.length > 0) {
    tx = touches[0].x;
    ty = touches[0].y;
  }
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  fs = min(width * 0.09, 110);
  makeGlow();
}
