function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

for(let i = 0; i < 17; i = i + 1){
  fill(255 - i*7, 255 - i*20, i*10)
  rect(20 + ((width - 40)/17)*i, 20, (width - 40)/17, width - 40)
}
stroke(255)
}
