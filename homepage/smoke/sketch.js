let video;
let handPose;
let hands = [];
let smokes = [];

let options = {
  flipped: true,
};

class Smoke {
  constructor(x, y){
    this.x = x
    this.y = y
    this.size = random(1, 5);
    this.alpha = 130;
  }
  move(){
    this.y = this.y - 1;
    this.x = this.x + (random(-1, 1));
    this.size = this.size + 0.2;
    this.alpha = this.alpha - 0.6
  }
  show(){
    noStroke()
    fill(255, 255, 255, this.alpha)
    circle(this.x, this.y, this.size)
  }
}

async function setup() {
  createCanvas(640, 480).parent("smoke-artwork");
  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();
  handPose = await ml5.handPose(options);
  handPose.detectStart(video, gotHands);
}

function draw() {
  background(220);
  if (video) image(video, 0, 0, width, height);

  if (hands.length > 0) {
    let hand = hands[0];
    let indexFinger = createVector(
      hand.index_finger_tip.x,
      hand.index_finger_tip.y
    );
    let middleFinger = createVector(
      hand.middle_finger_tip.x,
      hand.middle_finger_tip.y
    );
    // stroke(0, 255, 255)
    // strokeWeight(10)
    // line(indexFinger.x, indexFinger.y, middleFinger.x, middleFinger.y)
    let d = indexFinger.dist(middleFinger);
    let palmSize = dist(
      hand.wrist.x,
      hand.wrist.y,
      hand.middle_finger_mcp.x,
      hand.middle_finger_mcp.y
    );
    let ratio = d / palmSize;

        let x = lerp(indexFinger.x, middleFinger.x, 0.5);
    let y = lerp(indexFinger.y, middleFinger.y, 0.5);

    if (ratio < 0.4) {
      smokes.push(new Smoke(x, y))
    }
  }

    smokes = smokes.filter(smoke => smoke.alpha > 0);
    for (let i = 0; i < smokes.length; i++) {
  smokes[i].move();
  smokes[i].show();}


}
    // textSize(40)
    // fill(255)
    // text(round(d, 1), 40, 40)
    //   text(round(palmSize, 1), 150, 40)

function gotHands(results) {
  hands = results;
}
