//import { loadImg } from "../utils/imageLoader";
import { logoImage } from "../utils/image";
//import { spawnParticles } from "../utils/imageLoader";
import { Particle } from "../utils/particle";

const MIN_PARTICLE_COUNT = 1000;
const MAX_PARTICLE_COUNT = 1100;
const MIN_PARTICLE_SIZE = 5;
const MAX_PARTICLE_SIZE = 30;
const IMG_RESIZED_WIDTH = 500;
const IMG_SCAN_STEPS = 2;
const width = window.innerWidth;
const height = window.innerHeight;
const SPIN_MULTIPLIER = 45;

let particles = [];
let indices = [];
let particleCount = 1000;
let maxSize = 0;
let img;
let res = [];
let mouse = "";

export default function SketchHome(p) {
  p.setup = () => {
    p.createCanvas(width, height);
    particles = loadImg(logoImage, p);
    // mouse = new Mouse();
  };

  p.draw = () => {
    p.background("#080808");
    p.fill(0);
    p.noStroke();

    if (img == null) {
      return;
    }

    p.push();
    p.translate(width / 2 - img.width / 2, height / 2 - img.height / 2);
    p.fill(0);
    p.noStroke();

    p.rectMode(p.CENTER);

    particles.forEach((particle) => {
      particle.move();

      p.push();
      p.translate(particle.pos.x, particle.pos.y);

      let spin = particle.vel.mag() * SPIN_MULTIPLIER;
      p.rotate(p.radians(particle.mapped_angle + spin));

      p.fill(particle.color);

      p.ellipse(0, 0, particle.size, particle.size);

      p.pop();
    });

    p.rectMode(p.CENTER);
    p.pop();
  };
}

export function loadImg(displayImage, p) {
  p.loadImage(displayImage.path, (newImg) => {
    img = newImg;
    img.loadPixels();
    img.resize(IMG_RESIZED_WIDTH, 0);
    p.background(displayImage.backgroundColor);
    spawnParticles(displayImage.particleColor, p);
  });
}

// Collects valid positions where a particle can spawn onto.
function setupImg() {
  indices = [];

  for (let x = 0; x < img.width; x += IMG_SCAN_STEPS * 4) {
    for (let y = 0; y < img.height; y += IMG_SCAN_STEPS * 4) {
      let index = (x + y * img.width) * 4;

      let a = img.pixels[index + 3];
      if (a > 10) {
        indices.push(index);
      }
    }
  }
}

export function spawnParticles(particleColor, p) {
  particles = [];
  setupImg();

  maxSize = p.map(
    particleCount,
    MIN_PARTICLE_COUNT,
    MAX_PARTICLE_COUNT,
    MAX_PARTICLE_SIZE,
    MIN_PARTICLE_SIZE
  );

  if (indices.length === 0) {
    return;
  }

  for (let i = 0; i < particleCount; i++) {
    let max_attempts = 20;
    let attempts = 0;
    let newParticle = null;

    // Pick a random position from the active image and attempt to spawn a valid particle.
    while (newParticle == null) {
      let index = indices[p.int(p.random(indices.length))];

      let x = (index / 4) % img.width;
      let y = index / 4 / img.width;

      if (particles.length > 0) {
        let smallestSize = null;

        for (let i = 0; i < particles.length; i++) {
          let otherParticle = particles[i];
          let d = p.dist(x, y, otherParticle.target.x, otherParticle.target.y);
          let newSize = (d - otherParticle.size / 2) * 2;

          if (smallestSize == null || newSize < smallestSize) {
            smallestSize = newSize;
          }
        }

        if (smallestSize > 0) {
          newParticle = new Particle(
            img,
            x,
            y,
            p.min(smallestSize, maxSize) * 0.75,
            p.color(particleColor),
            p
          );
        }
      } else {
        newParticle = new Particle(
          img,
          x,
          y,
          maxSize,
          p.color(particleColor),
          p
        );
      }

      attempts += 1;
      if (attempts > max_attempts) {
        break;
      }
    }

    if (newParticle != null) {
      particles.push(newParticle);
    }
  }
}
