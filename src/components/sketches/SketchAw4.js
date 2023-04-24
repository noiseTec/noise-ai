export default function SketchAw4(p) {
  let num = 200;
  let mx = [];
  let my = [];
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
    mx[which] = p.getItem("corX");
    my[which] = p.getItem("corY");
    //num = speed;

    for (let i = 0; i < num; i++) {
      let index = (which + 25 + i) % num;
      p.ellipse(mx[index], my[index], i, i);
    }
  };
}
