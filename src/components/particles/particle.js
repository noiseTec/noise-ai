import p5 from "p5"

const MIN_FORCE = 0.75;
const MAX_FORCE = 0.95;
const REPULSION_RADIUS = 125;
const REPULSION_STRENGTH = 0.325;

let mouse = "";
var img;

export function Particle(_x, _y, _size, _color, p) {
	this.pos = new p5.Vector(img.width / 2, img.height / 2);
  	this.vel = new p5.Vector(0, 0);
  	this.acc = new p5.Vector(0, 0);
	this.target = new p5.Vector(_x, _y);
	this.size = _size;
	this.mapped_angle = p.map(_x, 0, img.width, -180, 180) + p.map(_y, 0, img.height, -180, 180);
	this.color = _color;
	this.maxForce = p.random(MIN_FORCE, MAX_FORCE);

	this.goToTarget = function() {
    let steer = new p5.Vector(this.target.x, this.target.y);
		
    let distance = p.dist(this.pos.x, this.pos.y, this.target.x, this.target.y);
		if (distance > 0.5) {
			let distThreshold = 20;
			steer.sub(this.pos);
			steer.normalize();
			steer.mult(p.map(p.min(distance, distThreshold), 0, distThreshold, 0, this.maxForce));
			this.acc.add(steer);
		}
	}
	
	this.avoidMouse = function() {
			let mx = mouse.mouseX;
			let my = mouse.mouseY;
			
			 let mouseDistance = p.dist(this.pos.x, this.pos.y, mx, my);
			
			if (mouseDistance < REPULSION_RADIUS) {
				let repulse = new p5.Vector(this.pos.x, this.pos.y);
				repulse.sub(mx, my);
				repulse.mult(p.map(mouseDistance, REPULSION_RADIUS, 0, 0, REPULSION_STRENGTH));
				this.acc.add(repulse);
			}
		
	}
	
	this.move = function() {
		this.goToTarget();
		
		this.avoidMouse();
		
    this.vel.mult(0.95);
    
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
	}
}