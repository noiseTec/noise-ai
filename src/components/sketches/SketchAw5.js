/* eslint-disable import/first */
import p from "p5";
window.p5 = p;
const p5 = require("p5/lib/addons/p5.sound");

export default function SketchAw5(p) {
  let intervals = [
    0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160,
    170, 180, 190, 200,
  ];
  let pluckers = [];

  class Plucker {
    constructor(x, id, nodes) {
      this.x = x;
      this.id = id;
      this.wamp = 0;
      this.damp = 0;
      this.amp = 1;
      this.nodes = nodes;
      this.osc = new p.constructor.Oscillator("sine");
      this.freq = 261.63 + (261.63 * intervals[this.id - 1]) / 12;
      this.playing = false;
    }
    show() {
      p.stroke(255 - 5 * this.wamp);
      p.strokeWeight(5);
      this.wamp += this.damp;
      this.damp -= this.wamp;
      let lastx = this.x;
      let lasty = 0;
      let steps = (this.nodes * 180) / p.height;
      for (let y = 0; y < p.height; y += 4) {
        let x = this.x + this.wamp * p.sin(steps * y);
        p.line(x, y, lastx, lasty);
        lastx = x;
        lasty = y;
      }
      if (this.playing) {
        p.osc.freq(this.freq, 0);
        p.osc.amp(this.amp, 0);
      } else {
        this.damp *= 0.95;
      }
    }
  }

  p.setup = () => {
    p.createCanvas(p.windowHeight, p.windowHeight);
    p.angleMode(p.DEGREES);
    for (let i = 1; i <= intervals.length; i++) {
      let x = -p.width / 40 + (i * p.width) / 20;
      pluckers.push(new Plucker(x, i, i));
    }
  };

  p.draw = () => {
    p.background("#080808");
    p.fill(0);
    p.noStroke();
    for (let pl of pluckers) {
      pl.show();
      if (
        (p.getItem("pCorX") * -1 + window.innerWidth < pl.x &&
          p.getItem("corX") * -1 + window.innerWidth > pl.x) ||
        (p.getItem("pCorX") * -1 + window.innerWidth > pl.x &&
          p.getItem("corX") * -1 + window.innerWidth < pl.x)
      ) {
        pl.wamp = p.width / 20;
      }
    }
  };
}
