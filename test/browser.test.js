const fs = require('fs'),
  path = require('path');
const puppeteer = require('puppeteer'),
  test = require('ava');

const initServer = require(path.resolve(`${__dirname}/_server.js`)),
  openPage = require(path.resolve(`${__dirname}/_openpage.js`)),
  createDirs = require(path.resolve(`${__dirname}/_create_dirs.js`)),
  runDiff = require(path.resolve(`${__dirname}/_run_diff.js`)),
  getBuffersBrowser = require(path.resolve(
    `${__dirname}/_get_buffers_browser.js`
  )),
  svgs = require(path.resolve(`${__dirname}/_svgs.js`));

function launchBrowser () {
  return puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
}

const port = 3126,
  server = initServer(port),
  diffFolder = path.resolve(`${__dirname}/diff_browser`),
  actualFolder = path.resolve(`${__dirname}/actual_browser`);

let browser;
test.before(async (/* t */) => {
  await createDirs(actualFolder, diffFolder);
  await server.ready.promise();
  browser = await launchBrowser();
});

const testFile = (file, group) => {
  const description = svgs[group][file],
    actualPath = path.resolve(`${actualFolder}/${group}_${file}.png`);
  let actualFile;

  test.serial(`comparing results for ${file} (${description})`, async (t) => {
    try {
      const canvasDataurl = await openPage(browser, file, t, port);
      const {canvasBuffer, expectedImg} = await getBuffersBrowser(file, canvasDataurl);
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

test.after(async (t) => {
  server.close();
  await browser.close();
  t.log('closed puppeteer');
});
