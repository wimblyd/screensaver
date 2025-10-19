let speed = 4;
let stars = [];
let starsNum = 500;
let fading = false;
let fadeAlpha = 0;
let redirectReady = false;

class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    this.pz = this.z;
  }

  update() {
    this.z -= speed;
    if (this.z < 1) this.reset();
  }

  show() {
    let sx = map(this.x / this.z, 0, 1, 0, width / 2);
    let sy = map(this.y / this.z, 0, 1, 0, height / 2);
    let r = map(this.z, 0, width, 6, 0);

    // twinkle
    fill(random(180, 255));
    noStroke();
    ellipse(sx, sy, r, r);

    // trail
    let px = map(this.x / this.pz, 0, 1, 0, width / 2);
    let py = map(this.y / this.pz, 0, 1, 0, height / 2);
    stroke(255, 150);
    line(px, py, sx, sy);

    this.pz = this.z;
  }
}

function setup() {
  createCanvas(600, 600);
  for (let i = 0; i < starsNum; i++) stars[i] = new Star();
  // wait before listening for user input
  setTimeout(() => (redirectReady = true), 10000);
}

function draw() {
  // semi-transparent background for trails
  background(0, 40);

  // subtle CRT flicker
  translate(width / 2, height / 2);
  scale(random(0.97, 1.03));

  // draw all stars
  for (let s of stars) {
    s.update();
    s.show();
  }

  // fade overlay if triggered
  if (fading) {
    noStroke();
    fill(0, fadeAlpha);
    rect(-width / 2, -height / 2, width, height);
    fadeAlpha += 10;
    if (fadeAlpha >= 255) {
      // redirect when fully faded
      window.location.href = "https://wimblyd.github.io/tripletriad/checklist.html";
    }
  }
}

function triggerFade() {
  if (redirectReady && !fading) {
    fading = true;
  }
}

function mouseMoved() { triggerFade(); }
function mousePressed() { triggerFade(); }
function keyPressed() { triggerFade(); }
