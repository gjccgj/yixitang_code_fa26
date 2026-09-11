function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

for(let a = 0; a/3 < width; a = a + 10){
  line((width/2) + a/3, 0, (width/2) + a*2, height)
  line(width - ((width/2) + a/3), 0, width - ((width/2) + a*2.5), height)

strokeWeight(2)
}
}