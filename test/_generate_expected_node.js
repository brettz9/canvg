import canvg from '../src/canvg.js';

const path = require('path'),
  f = require('fs');
const Canvas = require('canvas'),
  Promise = require('bluebird'), // eslint-disable-line no-shadow
  pngjsImage = require('pngjs-image');

const fs = Promise.promisifyAll(f),
  PNGImage = Promise.promisifyAll(pngjsImage);

const [, , file, start = 0, end] = process.argv;

const basePath = `${__dirname}/../svgs/`;

(async () => {
const files = !file || file === 'all' ? await fs.readdir(basePath) : [file];

const fileNames = files.slice(start, end || files.length).map((fle) => {
  return path.resolve(`${basePath}${fle}`);
});

async function loadImageBuffers (svgbuffers) {
  let images;
  try {
    console.log('Loading image buffers...');
    images = await Promise.all(svgbuffers.map(([fileName, svgbuffer]) => {
      const svg = svgbuffer.toString('utf-8');

      let canvas;
      try {
        canvas = Canvas.createCanvas(800, 600);
      } catch (err) {
        console.error(`Error creating canvas for ${fileName}`, err);
        return undefined;
      }

      console.log(`Trying canvas for ${fileName}`);
      try {
        canvg(canvas, svg, {
          ignoreMouse: true,
          ignoreAnimation: true,
          xmldom: {
            errorHandler (/* level, msg */) { /* */ } // supress xmldom warnings
          }
        });
      } catch (err) {
        console.error(`Error in canvg with ${fileName}`, err);
        return undefined;
      }

      try {
        const canvasBuffer = canvas.toBuffer();
        return PNGImage.loadImageAsync(canvasBuffer).then((image) => [fileName, image]);
      } catch (err) {
        console.error('Error loading image buffer', err);
        return undefined;
      }
    }));
  } catch (err) {
    console.error('Error loading image', err);
  }
  console.log('Begin writing...');
  images.filter((i) => i).forEach(([fileName, image]) => {
    const expectedPath = `${__dirname}/expected/${path.basename(fileName)}.png`;
    console.log(`Writing: ${expectedPath}...`);
    image.writeImage(path.resolve(expectedPath));
  });
  console.log('Finished processing!');
}
try {
  console.log('Getting svg buffers...');
  const svgbuffers = await Promise.all(fileNames.map(async (fileName) => {
    if (!(await fs.exists(fileName))) {
      throw new Error(`${fileName} does not exist!`);
    }
    const svgbuffer = await fs.readFile(fileName);
    return [fileName, svgbuffer];
  }));

  await loadImageBuffers(svgbuffers);
} catch (err) {
  console.error(err);
}
})();
