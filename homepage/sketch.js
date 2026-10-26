let glow;     
let bx, by;    
let tx, ty;  
let fs;        
let page = 'home'; 

function setup() {
  const container = document.getElementById('home-canvas');
  createCanvas(container.clientWidth, container.clientHeight).parent(container);
  bx = tx = width / 2;
  by = ty = height / 2;
  fs = min(width * 0.09, 110);
  makeGlow();
}

function makeGlow() {
  if (glow) glow.remove();
  glow = createGraphics(width, height);
  if (page === 'home') {
    const ctx = glow.drawingContext;
    const fontSize = min(width * 0.085, 100);
    const spacing = fontSize * 0.13;
    const letters = Array.from('YIXI TANG');
    ctx.save();
    ctx.font = `200 ${fontSize}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#f5f5f5';
    ctx.shadowColor = 'rgba(255,255,255,0.22)';
    ctx.shadowBlur = 10;
    const textWidth = letters.reduce((sum, letter) => sum + ctx.measureText(letter).width, 0)
      + spacing * (letters.length - 1);
    let x = (width - textWidth) / 2;
    for (const letter of letters) {
      ctx.fillText(letter, x, height / 2);
      x += ctx.measureText(letter).width + spacing;
    }
    ctx.restore();
    return;
  }
  var txt = 'hello';
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
  // Navigation is provided by accessible HTML controls.       

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
  const container = document.getElementById('home-canvas');
  resizeCanvas(window.innerWidth - parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sidebar')), window.innerHeight - 64);
  fs = min(width * 0.09, 110);
  makeGlow();
}
