import "./styles.css";
import OpenSimplexNoise from "open-simplex-noise";
import runes from "runes";
const openSimplex = new OpenSimplexNoise("week7" + Date.now());

const phrases = ["☜", "🌀🧶", "チップチューン", "🍂🍃🍁", "☻", "✌︎", "👽", "✐"];
const colors = ["#FF2600", "#00FA92", "#FFD479", "#FFFFFF"];

let text = phrases[Math.floor(Math.random() * phrases.length)];
let font = "IBM Plex Mono, monospace";
let splitText = true;
let letters = [];
let maxLetterWidth = 0;
let dpr = window.devicePixelRatio;

let backgroundColor = "#212121";
let textColor = colors[Math.floor(Math.random() * colors.length)];

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

const textCanvas = document.createElement("canvas");
const textContext = textCanvas.getContext("2d");

function drawText() {
  textContext.fillStyle = textColor;
  textContext.textBaseline = "middle";
  textContext.textAlign = "center";
  textContext.font = `${"normal"} ${128 * dpr}px ${font}`;

  maxLetterWidth = 0;

  if (splitText) {
    letters = runes(text);

    letters.forEach(letter => {
      maxLetterWidth = Math.max(
        maxLetterWidth,
        textContext.measureText(letter).width
      );
    });

    textCanvas.width = maxLetterWidth * letters.length;
    textCanvas.height = maxLetterWidth * 3;
  } else {
    const textWidth = textContext.measureText(text).width;
    textCanvas.width = textWidth;
    textCanvas.height = textWidth * 1.38;
    maxLetterWidth = textWidth;
  }

  textContext.fillStyle = textColor;
  textContext.textBaseline = "middle";
  textContext.textAlign = "center";
  textContext.font = `${"normal"} ${128 * dpr}px ${font}`;

  if (splitText) {
    textContext.textBaseline = "middle";
    textContext.textAlign = "left";
    for (let i = 0; i < letters.length; ++i) {
      textContext.fillText(
        letters[i],
        i * maxLetterWidth,
        textCanvas.height / 2
      );
    }
  } else {
    textContext.fillText(text, textCanvas.width / 2, textCanvas.height / 2);
  }
}

function resize() {
  const { innerWidth, innerHeight } = window;
  dpr = window.devicePixelRatio;

  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  context.fillStyle = backgroundColor;
  drawText();
}

resize();

document.body.appendChild(canvas);

window.addEventListener("resize", resize);

let raf;

function loop(delta) {
  raf = requestAnimationFrame(loop);

  const { width, height } = canvas;

  context.save();
  context.globalAlpha = 1;
  context.fillRect(0, 0, width, height);
  context.restore();

  const divisionWidth = width / maxLetterWidth;
  const divisionHeight = height / maxLetterWidth;

  if (maxLetterWidth < 1) {
    return;
  }

  let letterPosition = 0;

  for (let y = -1; y < divisionHeight + 1; y += 1) {
    for (let x = -1; x < divisionWidth + 1; x += 1) {
      const sinX = Math.sin(delta / 1000 + x / 5);
      const sinY = Math.cos(delta / 900 + y / 5);

      const x1 = maxLetterWidth * x;
      const y1 = maxLetterWidth * y;

      const scale = openSimplex.noise3D(x / 8, y / 8, delta / 2000);
      // const scale = perlin3.gen(x / 16, y / 16, frames / 80)

      context.save();
      context.translate(
        x1 + scale * sinX * maxLetterWidth,
        y1 + scale * sinY * maxLetterWidth
      );
      context.rotate(delta / 10000 + Math.PI * scale);
      context.scale(scale * 0.5 + 0.5, scale * 0.5 + 0.5);
      if (splitText) {
        context.drawImage(
          textCanvas,

          letterPosition * maxLetterWidth,
          0,
          maxLetterWidth,
          textCanvas.height,

          -maxLetterWidth / 2,
          -textCanvas.height / 2,
          maxLetterWidth,
          textCanvas.height
        );

        letterPosition += 1;

        if (letterPosition > letters.length - 1) {
          letterPosition = 0;
        }
      } else {
        context.drawImage(
          textCanvas,
          -textCanvas.width / 2,
          -textCanvas.height / 2
        );
      }
      context.restore();
    }
  }
}

async function start() {
  resize();
  requestAnimationFrame(loop);
}

start();
