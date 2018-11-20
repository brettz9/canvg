const path = require('path');
const Promise = require('bluebird'), // eslint-disable-line no-shadow
  dataUriToBuffer = require('data-uri-to-buffer');
const PNGImage = Promise.promisifyAll(require('pngjs-image'));

async function getBuffersBrowser (file, canvasDataurl) {
  const canvasBuffer = dataUriToBuffer(canvasDataurl),
    expectedImg = await PNGImage.readImageAsync(
      path.resolve(`${__dirname}/expected/${file}.png`)
    );
  return {canvasBuffer, expectedImg};
}

module.exports = getBuffersBrowser;
