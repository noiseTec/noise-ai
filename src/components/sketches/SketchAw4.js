export default function SketchAw4(p) {
  let num = 400;
  let mx = [];
  let my = [];
  let mpx = [];
  let mpy = [];
  let speeds = [];
  let width = window.innerWidth;
  let height = window.innerHeight;

  p.setup = () => {
    p.createCanvas(width, height);
    p.fill(255, 999);
  };

  p.draw = () => {
    p.background(0);

    let which = p.frameCount % num;
    mx[which] = p.mouseX;
    my[which] = p.mouseY;
    mpx[which] = p.pmouseX;
    mpy[which] = p.pmouseY;
    let speed = p.abs(p.mouseX - p.pmouseX) + p.abs(p.mouseY - p.pmouseY);

    //num = speed;

    for (let i = 0; i < num; i++) {
      let index = (which + 1 + i) % num;
      p.ellipse(mx[index], my[index], i, i);
    }
  };
}
