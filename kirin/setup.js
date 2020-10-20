document.body.style.height = "100vh";
document.body.style.width = "100vw";
document.body.style.overflow = "hidden";
document.body.style.margin = "0";

let size = document.body.getBoundingClientRect();

document.body.appendChild(
  FD.create("canvas", {
    id: "mainFrame",

    height: size.height,
    width: size.width,
  })
);

window.addEventListener("resize", () => {
  size = document.body.getBoundingClientRect();
  const canvas = document.getElementById("mainFrame");

  canvas.height = size.height;
  canvas.width = size.width;
});

let x = 0;
let y = 0;
let step = 8;
let nextStep = 8;
let speed = 1;

Controls.add(
  Controls.createRange({
    min: 2,
    max: 6,
    text: "Step",
    value: 3,
    onChange: (e) => {
      nextStep = Math.pow(2, parseInt(e.target.value, 10));
    },
  })
);

Controls.add(
  Controls.createRange({
    min: 1,
    max: 6,
    text: "Speed",
    value: 1,
    onChange: (e) => {
      speed = parseInt(e.target.value, 10);
    },
  })
);

function draw() {
  if (step !== nextStep) {
    step = nextStep;
  }

  for (let i = 0; i < speed; i++) {
    const r = Math.floor(Math.random() * 4);
    const prevX = x;
    const prevY = y;

    Drawer.setStroke(Generator.getColor());

    switch (r) {
      case 3:
        y += step;
        break;
      case 2:
        x += step;
        break;
      case 1:
        y -= step;
        break;
      case 0:
        x -= step;
        break;
    }

    if (y > size.height) {
      y -= step;
    } else if (y < 0) {
      y += step;
    }

    if (x > size.width) {
      x -= step;
    } else if (x < 0) {
      x += step;
    }

    Drawer.addLine(prevX, prevY, x, y);
  }
}

Drawer.setCanvas(document.getElementById("mainFrame"));
Drawer.background("black");
Loop.addToEveryFrame(draw);
Loop.start();
