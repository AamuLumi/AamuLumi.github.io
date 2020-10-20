/**
 * @type {{_canvas: HTMLCanvasElement, _context: RenderingContext}}
 */
const Drawer = {
  _canvas: null,
  _context: null,
};

/**
 * Set the main canvas
 * @param {HTMLCanvasElement} canvas
 */
Drawer.setCanvas = (canvas) => {
  Drawer._canvas = canvas;
  Drawer._context = canvas.getContext("2d");
};

Drawer.background = (color) => {
  Drawer._context.fillStyle = color;
  Drawer._context.fillRect(0, 0, Drawer._canvas.width, Drawer._canvas.height);
};

Drawer.setStroke = (color) => {
  Drawer._context.strokeStyle = color;
};

Drawer.addLine = (x, y, x2, y2) => {
  Drawer._context.beginPath();
  Drawer._context.moveTo(x, y);
  Drawer._context.lineTo(x2, y2);
  Drawer._context.closePath();
  Drawer._context.stroke();
};

Drawer.rect = () => {
  Drawer._context.fillStyle = "green";
  Drawer._context.fillRect(10, 10, 100, 100);
};
