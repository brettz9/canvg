import canvg from '../src/canvg.js';

const path = require('path'),
  f = require('fs');
const Canvas = require('canvas'),
  Promise = require('bluebird'), // eslint-disable-line no-shadow
  pngjsImage = require('pngjs-image');

const fs = Promise.promisifyAll(f),
  PNGImage = Promise.promisifyAll(pngjsImage);

async function getBuffersNode (file) {
  const svgbuffer = await fs.readFileAsync(
      path.resolve(`${__dirname}/../svgs/${file}`)
    ),
    svg = svgbuffer.toString('utf-8'),
    canvas = Canvas.createCanvas(800, 600);

  canvg(canvas, svg, {
    ignoreMouse: true,
    ignoreAnimation: true,
    xmldom: {
      errorHandler (/* level, msg */) { /* */ } // supress xmldom warnings
    }
  });
  const canvasBuffer = canvas.toBuffer();
  const expectedImg = await PNGImage.readImageAsync(
    path.resolve(`${__dirname}/expected/${file}.png`)
  );
  return {canvasBuffer, expectedImg};
}

module.exports = getBuffersNode;
