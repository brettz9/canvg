/* eslint-env node */
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import {terser} from 'rollup-plugin-terser';
import pkgConfig from './package.json';

const isNode = process.env.IS_NODE === '1'; // eslint-disable-line no-process-env
const isES = process.env.IS_ES === '1'; // eslint-disable-line no-process-env
const isMin = process.env.IS_MIN === '1'; // eslint-disable-line no-process-env

const globals = {rgbcolor: 'RGBColor', canvas: 'Canvas'};
let external = ['rgbcolor', 'canvas']; // eslint-disable-line no-shadow

const plugins = [
  replace({
    'nodeEnv = isNode': isNode ? 'nodeEnv = true' : 'nodeEnv = false'
  }),
  commonjs(),
  resolve(),
  json(),
  babel()
];
if (isMin) {
  plugins.push(terser());
}

if (isNode) {
  external = external.concat(['xmldom', 'jsdom']);
  globals.xmldom = 'xmldom';
  globals.jsdom = 'jsdom';
}

const input = './src/canvg.js',
  output = {
    file: isNode ? './dist/node/canvg.js' : `./dist/browser/canvg${isES ? '-es' : ''}${isMin ? '.min' : ''}.js`,
    format: isES ? 'es' : 'umd',
    exports: 'default',
    name: 'canvg',

    globals,
    banner: `
/*
 * canvg.js - Javascript SVG parser and renderer on Canvas
 * version ${pkgConfig.version}
 * MIT Licensed
 * Gabe Lerner (gabelerner@gmail.com)
 * https://github.com/canvg/canvg
 *
 */
 `,
    extend: false
  };

export default {
  input,
  plugins,
  output,
  external
};
