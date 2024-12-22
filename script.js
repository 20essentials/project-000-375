const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let $width = (canvas.width = window.innerWidth);
let $heigt = (canvas.height = window.innerHeight);
let columns = ~~($width / 24);
let rows = ~~($width / 24);
let saverTO = null;

const resizeCanvas = () => {
  $width = canvas.width = window.innerWidth;
  $heigt = canvas.height = window.innerHeight;
  columns = ~~($width / 24);
  rows = ~~($heigt / 24);
};
const COLOR = ['#f00', '#0f0'];
let contador = 0;

const drawCanvas = () => {
  resizeCanvas();
  ctx.fillRect(0, 0, $width, $heigt);
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, $width, $heigt);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      ctx.lineWidth = 2;

      const decorateEven = (color0, color1) => {
        if (col % 2 === 0) {
          if (row % 2 === 0) {
            ctx.strokeStyle = color0;
          } else {
            ctx.strokeStyle = color1;
          }
        }
        if (col % 2 === 1) {
          if (row % 2 === 0) {
            ctx.strokeStyle = color1;
          } else {
            ctx.strokeStyle = color0;
          }
        }
      };

      if (contador % 2 === 0) {
        decorateEven(COLOR[0], COLOR[1]);
      } else if (contador % 2 === 1) {
        decorateEven(COLOR[1], COLOR[0]);
      }

      ctx.beginPath();
      ctx.arc(12.5 + col * 25, 12.5 + row * 25, 10, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  contador++;
  saverTO = setTimeout(() => drawCanvas(), 2000);
};

document.addEventListener('DOMContentLoaded', _ => {
  drawCanvas();

  window.addEventListener('resize', () => {
    resizeCanvas();
    if (saverTO) {
      clearTimeout(saverTO);
      drawCanvas();
    }
  });
});
