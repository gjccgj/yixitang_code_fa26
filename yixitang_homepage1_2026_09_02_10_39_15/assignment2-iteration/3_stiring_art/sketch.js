function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

// line(x1, y1, x2, y2)
line(20, 370, 370, 370)
line(20, 30, 20, 370)
// 横 线长340 六条线

let d = 60

for(let i = 0, a = (width - d)/6; i < 7, a < width - d; i = i + 1, a = a + 50){
  line(20, 30 + a, 20 + a, 370)
}
  
strokeWeight(2)
}