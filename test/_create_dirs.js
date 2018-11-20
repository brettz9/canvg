const path = require('path'),
  f = require('fs');
const Promise = require('bluebird'), // eslint-disable-line no-shadow
  mkdirp = require('mkdirp');

const mkdirAsync = Promise.promisify(mkdirp),
  fs = Promise.promisifyAll(f);
/**
 * Create folders for actual generates files and diff between
 * then and expected result.
 *
 * @param  {string}   folderActual  The folder for actual generated images
 * @param  {string}   folderDiff    The folder for differences
 * @param  {string}   group
 * @returns {Promise}  { description_of_the_return_value }
 */
async function createDirs (folderActual, folderDiff, group) {
  const oldUmask = process.umask(0);

  await mkdirAsync(folderActual);
  await mkdirAsync(folderDiff);
  process.umask(oldUmask);

  const actualFiles = await fs.readdirAsync(folderActual);
  const diffFiles = await fs.readdirAsync(folderDiff);

  const removalActualFiles = actualFiles.map((file) => {
    if (!group || file.indexOf(group) === 0) {
      return fs
        .unlinkAsync(path.resolve(`${folderActual}/${file}`))
        .catch((/* err */) => { /* */ });
    }
    return undefined;
  });
  const removalDiffFiles = diffFiles.map((file) => {
    if (!group || file.indexOf(group) === 0) {
      return fs
        .unlinkAsync(path.resolve(`${folderDiff}/${file}`))
        .catch((/* err */) => { /* */ });
    }
    return undefined;
  });

  await Promise.all(removalActualFiles);
  await Promise.all(removalDiffFiles);
}

module.exports = createDirs;
