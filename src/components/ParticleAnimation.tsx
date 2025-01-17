import React, { useRef } from "react";
import Sketch from "react-p5";
import p5Types from "p5"; // Type definitions for p5.js

interface Particle {
  pos: p5Types.Vector;
  vel: p5Types.Vector;
  acc: p5Types.Vector;
  color: p5Types.Color;
  lastPos: p5Types.Vector;
  densityFactor: number;
  rotation: number;
  rotationVel: number;
  shapeType: "triangle" | "square" | "circle";
}

const ParticleAnimation: React.FC = () => {
  const particles = useRef<Particle[]>([]);
  const particleCount = 100;
  const particleSize = 12;
  const spacing = particleSize * 12;
  const gravity = useRef<p5Types.Vector | null>(null);
  const mousePrevX = useRef(0);
  const mousePrevY = useRef(0);

  const createParticle = (p5: p5Types, x: number, y: number): Particle => ({
    pos: p5.createVector(x, y),
    vel: p5.createVector(p5.random(-20, 20), p5.random(-20, 20)),
    acc: p5.createVector(0, 0),
    color: p5.color(255, 255, 255),
    lastPos: p5.createVector(x, y),
    densityFactor: 0,
    rotation: p5.random(p5.TWO_PI),
    rotationVel: p5.random(-0.1, 0.1),
    shapeType: p5.random(["triangle", "square", "circle"]) as "triangle" | "square" | "circle",
  });

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    if (particles.current.length > 0) return; // Prevent setup from running multiple times
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.frameRate(60);
    gravity.current = p5.createVector(0, 2.2);
  
    const availableWidth = p5.width * 0.95;
    const cols = Math.floor(availableWidth / spacing);
    const startX = (p5.width - cols * spacing) * 0.5;
    const startY = p5.height * 0.05;
  
    let count = 0;
    let row = 0;
    while (count < particleCount) {
      for (let col = 0; col < cols && count < particleCount; col++) {
        const x = startX + col * spacing + p5.random(-5, 5);
        const y = startY + row * spacing + p5.random(-5, 5);
        particles.current.push(createParticle(p5, x, y));
        count++;
      }
      row++;
    }
  };
  

  const draw = (p5: p5Types) => {
    p5.background(0);

    const dt = 1 / p5.frameRate();
    const g = gravity.current!;
    const grid: { [key: string]: number[] } = {};
    const gridSize = spacing;

    // Update and group particles into grid cells
    particles.current.forEach((particle, i) => {
      particle.lastPos.set(particle.pos);

      // Update position, velocity, and acceleration
      const gravityScale = p5.map(particle.densityFactor, 0, 5, 1, 0.7);
      particle.acc.add(g.copy().mult(4 * gravityScale));

      if (p5.mouseIsPressed) {
        const d = p5.dist(particle.pos.x, particle.pos.y, p5.mouseX, p5.mouseY);
        const maxDist = 250;
        if (d < maxDist) {
          const mouseVel = p5.createVector(p5.mouseX - mousePrevX.current, p5.mouseY - mousePrevY.current);
          const densityScale = p5.map(particle.densityFactor, 0, 5, 1, 0.85);
          const force = mouseVel.copy().mult(10 * densityScale);
          const strength = Math.pow(p5.map(d, 0, maxDist, 1, 0), 1.75);
          force.mult(strength);
          particle.acc.add(force);
          particle.rotationVel += mouseVel.mag() * 0.01 * p5.random(-1, 1);
        }
      }

      const dampingFactor = p5.map(particle.densityFactor, 0, 5, 1, 1);
      particle.vel.add(particle.acc.copy().mult(dt * 15.0 * dampingFactor));
      particle.pos.add(particle.vel.copy().mult(dt * 11.5));
      particle.acc.set(0, 0);

      // Handle boundaries
      const bounce = 0.45;
      const buffer = particleSize;
      if (particle.pos.x < buffer) {
        particle.pos.x = buffer;
        particle.vel.x = Math.abs(particle.vel.x) * bounce;
      } else if (particle.pos.x > p5.width - buffer) {
        particle.pos.x = p5.width - buffer;
        particle.vel.x = -Math.abs(particle.vel.x) * bounce;
      }

      if (particle.pos.y < buffer) {
        particle.pos.y = buffer;
        particle.vel.y = Math.abs(particle.vel.y) * bounce;
      } else if (particle.pos.y > p5.height - buffer) {
        particle.pos.y = p5.height - buffer;
        particle.vel.y = -Math.abs(particle.vel.y) * bounce;
        particle.acc.set(0, 0);
        particle.densityFactor = 0;
      }

      // Add particle to the grid
      const gridX = Math.floor(particle.pos.x / gridSize);
      const gridY = Math.floor(particle.pos.y / gridSize);
      const key = `${gridX},${gridY}`;
      if (!grid[key]) grid[key] = [];
      grid[key].push(i);
    });

    // Handle interactions between particles
    Object.keys(grid).forEach((key) => {
      const [gx, gy] = key.split(",").map(Number);
      const cell = grid[key];

      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const neighborKey = `${gx + dx},${gy + dy}`;
          if (grid[neighborKey]) {
            cell.forEach((i) => {
              grid[neighborKey].forEach((j) => {
                if (i < j) {
                  const a = particles.current[i];
                  const b = particles.current[j];
                  const d = p5.dist(a.pos.x, a.pos.y, b.pos.x, b.pos.y);
                  if (d < spacing) {
                    const force = p5Types.Vector.sub(a.pos, b.pos).normalize().mult((spacing - d) * 0.5);
                    a.pos.add(force);
                    b.pos.sub(force);
                  }
                }
              });
            });
          }
        }
      }
    });

    // Draw particles
    particles.current.forEach((particle) => {
      p5.push();
      p5.translate(particle.pos.x, particle.pos.y);
      p5.rotate(particle.rotation);
      p5.noStroke();
      p5.fill(particle.color);
      const size = particleSize;

      switch (particle.shapeType) {
        case "triangle":
          p5.triangle(-size / 2, size / 2, size / 2, size / 2, 0, -size / 2);
          break;
        case "square":
          p5.rectMode(p5.CENTER);
          p5.rect(0, 0, size, size);
          break;
        case "circle":
          p5.circle(0, 0, size);
          break;
      }

      p5.pop();
    });

    mousePrevX.current = p5.mouseX;
    mousePrevY.current = p5.mouseY;
  };

  const windowResized = (p5: p5Types) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default ParticleAnimation;
