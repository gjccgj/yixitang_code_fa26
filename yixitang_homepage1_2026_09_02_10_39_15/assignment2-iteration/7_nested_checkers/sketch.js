function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  let s = width / 8;

  for (let x = 0; x < 8; x = x + 1) {
    for (let y = 0; y < 8; y = y + 1) {
      if (y%2 == 0 != x%2 ==0) {
        fill(0);
      } else {
        fill(255);
      }
      rect(0 + x * s, 0 + y * s, s, s);
    }
  }
}
