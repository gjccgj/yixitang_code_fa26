function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  // x, y, width, height

let numRec = 14
let size = (width-40)/numRec
  
for(let x = 0, c = 0; x < width - 20, c < 255; x = x + size, c = c + 255/numRec){
  fill(c)
  rect(x + 20, ((height -20) - (size + x)), size, size + x)
  }
}
