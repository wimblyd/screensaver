let speed = 6;
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

    // trail
    let px = map(this.x / this.pz, 0, 1, 0, width / 2);
    let py = map(this.y / this.pz, 0, 1, 0, height / 2);
    stroke(255, 50);
    line(px, py, sx, sy);

    this.pz = this.z;
  }
}

function setup() {
  // Create full-window canvas
  let canvas = createCanvas(windowWidth, windowHeight);

  // High DPI scaling
  const ctx = canvas.elt.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  canvas.elt.width = windowWidth * dpr;
  canvas.elt.height = windowHeight * dpr;
  ctx.scale(dpr, dpr);

  // Initialize stars
  for (let i = 0; i < starsNum; i++) stars[i] = new Star();

  // Delay redirect readiness
  setTimeout(() => (redirectReady = true), 10000);
}

function draw() {
  // Clear frame (semi-transparent for trails)
  background(0, 40);

  // Center and subtle flicker
  translate(width / 2, height / 2);
  scale(random(0.97, 1.03));

  // Draw stars
  for (let s of stars) {
    s.update();
    s.show();
  }

  // Fade out overlay
  if (fading) {
    noStroke();
    fill(0, fadeAlpha);
    rect(-width / 2, -height / 2, width, height);
    fadeAlpha += 10;
    if (fadeAlpha >= 255) {
      window.location.href = "https://wimblyd.github.io/tripletriad/checklist.html";
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Recreate DPR scaling on resize
  const ctx = drawingContext;
  const dpr = window.devicePixelRatio || 1;
  canvas.elt.width = windowWidth * dpr;
  canvas.elt.height = windowHeight * dpr;
  ctx.scale(dpr, dpr);
}

function triggerFade() {
  if (redirectReady && !fading) fading = true;
}

function mouseMoved() { triggerFade(); }
function mousePressed() { triggerFade(); }
function keyPressed() { triggerFade(); }
