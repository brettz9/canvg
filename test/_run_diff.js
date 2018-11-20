const Promise = require('bluebird'), // eslint-disable-line no-shadow
  BlinkDiff = require('blink-diff');

/**
 * Compares two images with a given threshold.
 * If images differ above the threshold, output them to a diff folder.
 *
 * @param  {Buffer}   canvasBuffer     The canvas buffer
 * @param  {string}   expectedImg      The expected image
 * @param  {string}   imageOutputPath  The image output path
 * @param  {Float}   threshold        The threshold
 * @returns {Promise}
 */
function runDiff (canvasBuffer, expectedImg, imageOutputPath, threshold) {
  const diff = new BlinkDiff({
    imageA: canvasBuffer,
    imageB: expectedImg,

    thresholdType: BlinkDiff.THRESHOLD_PERCENT,
    threshold: threshold || 0.01, // threshold. 0.01 means 1%
    delta: 50, // Make comparison more tolerant

    outputMaskRed: 0,
    outputMaskBlue: 255, // Use blue for highlighting differences

    imageOutputPath,
    imageOutputLimit: BlinkDiff.OUTPUT_DIFFERENT
  });

  return new Promise((resolve, reject) => { // eslint-disable-line promise/avoid-new
    diff.run(function (error, result) {
      if (error) {
        reject(error);
      } else {
        const res = diff.hasPassed(result.code);
        // console.log('Found ' + result.differences + ' differences.');
        resolve({res, differences: result.differences});
      }
    });
  });
}

module.exports = runDiff;
