const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');


random.setSeed(random.getRandomSeed())
console.log(random.getSeed())

const settings = {
  suffix: random.getSeed(),
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  const colorCount = random.rangeFloor(1, 6);
  const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);

  const createGrid = () => {
    const points = [];
    const count = 40;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++){
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        radius = Math.abs(random.noise2D(u, v)) * 0.1;
        points.push({
          color: random.pick(palette),
          radius,
          rotate: random.noise2D(u, v),
          position: [ u, v ]
        });
      }
    }
    return points;
  }

  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 400;

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    points.forEach((data) => {
      
      const {
        position,
        radius,
        color,
        rotate
      } = data;

      const [ u, v ] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.save()
      context.fillStyle = color;
      context.font = `${radius * width}px "Helvetica"`
      context.translate(x, y)
      context.rotate(rotate)
      context.fillText('-', 0, 0)
      context.restore()
    });

  };
};

canvasSketch(sketch, settings);
