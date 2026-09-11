function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

for(let i = 0; i < 10; i = i + 1){
  line(mouseX, mouseY, mouseX + 20*i, mouseY - 100)
}
  
}