let figures = [];
let rec_size = 25;
let cir_size = 17;
let encounters = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  for (let i = 0; i < 50; i++) {
    figures.push(new Figure());
  }
}

class Figure {
  constructor() {
    this.position = createVector(
      random(rec_size / 2, width - rec_size / 2),
      random(cir_size / 2, height - rec_size * 2.3)
    );
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.collided = false;
    this.col = [random(0, 255), random(0, 255), random(0, 255), 160];
    this.size = random(18, 27);
    this.head = random(15, 18);
    this.marks = [];
  }

  colorChange() {
    this.col = [random(0, 255), random(0, 255), random(0, 255), 180];
    this.marks = [];
  }

  show() {
    noStroke();
    fill(this.col[0], this.col[1], this.col[2], this.col[3]);
    circle(this.position.x, this.position.y, this.head);
    rect(
      this.position.x,
      this.position.y + this.size * 1.4,
      this.size,
      this.size * 1.8,
      8,
      8,
      0,
      0
    );
    for (let k = 0; k < this.marks.length; k++) {
      fill(
        red(this.marks[k].col),
        green(this.marks[k].col),
        blue(this.marks[k].col)
      );
      if (this.marks[k].part === "head") {
        circle(
          this.position.x + this.marks[k].x,
          this.position.y + this.marks[k].y,
          this.marks[k].size
        );
      } else {
        circle(
          this.position.x + this.marks[k].x,
          this.position.y + this.size * 1.4 + this.marks[k].y,
          this.marks[k].size
        );
      }
    }
  }

    move(speed) {
  this.position.add(p5.Vector.mult(this.velocity, speed));
    if (this.position.x < 0 - rec_size / 2) {
      this.position.x = width;
      this.colorChange();
    }
    if (this.position.x > width + rec_size / 2) {
      this.position.x = 0;
      this.colorChange();
    }
    if (this.position.y > height + cir_size / 2) {
      this.position.y = 0;
      this.colorChange();
    }

    if (this.position.y < 0 - rec_size * 2.3) {
      this.position.y = height;
      this.colorChange();
    }
  }
}

function draw() {
  let dayColor = color(247, 243, 233);
  let nightColor = color(32, 36, 59);

  let t = (sin(frameCount * 0.007) + 1) / 2;

  let skyColor = lerpColor(dayColor, nightColor, t);

  background(skyColor);

  let speed = lerp(1, 0.2, t)

  for (let i = 0; i < 50; i++) {
    figures[i].show();
    figures[i].move(speed);
    for (let j = i + 1; j < 50; j++) {
      let d = figures[i].position.dist(figures[j].position);
      if (d < 80) {
        strokeWeight(1.5);
        stroke(255, 0, 0);
        line(
          figures[i].position.x,
          figures[i].position.y + figures[i].size * 1.2,
          figures[j].position.x,
          figures[j].position.y + figures[j].size * 1.2
        );
      }

      let alreadyMet = encounters.some(
        (pair) => pair[0] === i && pair[1] === j
      );
      if (d < 50 && !alreadyMet) {
        let colorA = color(
          figures[i].col[0],
          figures[i].col[1],
          figures[i].col[2],
          figures[i].col[3]
        );
        let colorB = color(
          figures[j].col[0],
          figures[j].col[1],
          figures[j].col[2],
          figures[j].col[3]
        );
        let mixedColor = lerpColor(colorA, colorB, random(0.3, 0.7));
        encounters.push([i, j]);
        let partA = random(["head", "body"]);
        figures[i].marks.push({
          part: partA,
          col: mixedColor,
          x:
            partA === "head"
              ? random(-figures[i].head * 0.15, figures[i].head * 0.15)
              : random(-figures[i].size * 0.35, figures[i].size * 0.35),
          y:
            partA === "head"
              ? random(-figures[i].head * 0.15, figures[i].head * 0.15)
              : random(
                  -(figures[i].size * 1.8) * 0.35,
                  figures[i].size * 1.8 * 0.35
                ),
          size: random(4, 8),
        });
        let partB = random(["head", "body"]);
        figures[j].marks.push({
          part: partB,
          col: mixedColor,
          x:
            partB === "head"
              ? random(-figures[j].head * 0.15, figures[j].head * 0.15)
              : random(-figures[j].size * 0.35, figures[j].size * 0.35),
          y:
            partB === "head"
              ? random(-figures[j].head * 0.15, figures[j].head * 0.15)
              : random(
                  -(figures[j].size * 1.8) * 0.35,
                  figures[j].size * 1.8 * 0.35
                ),
          size: random(4, 8),
        });
      }

      if (d > 65) {
        encounters = encounters.filter(
          (pair) => !(pair[0] === i && pair[1] === j)
        );
      }
    }
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
