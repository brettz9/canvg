const path = require('path'),
  f = require('fs');
const Promise = require('bluebird'), // eslint-disable-line no-shadow
  test = require('ava');

const createDirs = require(path.resolve(`${__dirname}/_create_dirs.js`)),
  runDiff = require(path.resolve(`${__dirname}/_run_diff.js`)),
  getBuffersNode = require(path.resolve(`${__dirname}/_get_buffers_node.js`)),
  svgs = require(path.resolve(`${__dirname}/_svgs.js`));

const fs = Promise.promisifyAll(f);

const actualFolder = path.resolve(`${__dirname}/actual_node`),
  diffFolder = path.resolve(`${__dirname}/diff_node`);

test.before(async (/* t */) => {
  await createDirs(actualFolder, diffFolder);
});

const testFile = (file, group) => {
  const description = svgs[group][file],
    actualPath = path.resolve(`${actualFolder}/${group}_${file}.png`);
  let actualFile;
  test(`comparing results for ${file} (${description})`, async (t) => {
    try {
      const {canvasBuffer, expectedImg} = await getBuffersNode(file);
      actualFile = canvasBuffer;
      const {res, differences} = await runDiff(
        canvasBuffer,
        expectedImg,
        `${diffFolder}/${group}_${file}.png`,
        0.03
      );
      if (!res) {
        await fs.writeFileAsync(actualPath, actualFile);
        if (group === 'broken') {
          t.log(`skip broken ${file}`);
          t.truthy.skip(`skip broken ${file}`);
        } else {
          t.fail(
            `${file}.png has ${differences} differences with compared file`
          );
        }
      } else {
        t.truthy(res);
      }
    } catch (err) {
      await fs.writeFileAsync(actualPath, actualFile);
      t.log(err);
      t.fail(err.message);
    }
  });
};

Object.keys(svgs.broken).forEach((file) => {
  testFile(file, 'broken');
});

Object.keys(svgs.passing).forEach((file) => {
  testFile(file, 'passing');
});
