function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

let s = 1.3

for(let i = 0; i < 20; i = i + 1){
  noFill()
  strokeWeight(s**i)
  circle(width/2, height, 20*(s**i))
  }
}