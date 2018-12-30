
/*
 * canvg.js - Javascript SVG parser and renderer on Canvas
 * version 2.0.0
 * MIT Licensed
 * Gabe Lerner (gabelerner@gmail.com)
 * https://github.com/canvg/canvg
 *
 */
 
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('rgbcolor')) :
  typeof define === 'function' && define.amd ? define(['rgbcolor'], factory) :
  (global.canvg = factory(global.RGBColor));
}(this, (function (RGBColor) { 'use strict';

  RGBColor = RGBColor && RGBColor.hasOwnProperty('default') ? RGBColor['default'] : RGBColor;

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  /**
  * StackBlur - a fast almost Gaussian Blur For Canvas
  *
  * In case you find this class useful - especially in commercial projects -
  * I am not totally unhappy for a small donation to my PayPal account
  * mario@quasimondo.de
  *
  * Or support me on flattr:
  * {@link https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript}
  * @module StackBlur
  * @version 0.5
  * @author Mario Klingemann
  * Contact: mario@quasimondo.com
  * Website: {@link http://www.quasimondo.com/StackBlurForCanvas/StackBlurDemo.html}
  * Twitter: @quasimondo
  *
  * @copyright (c) 2010 Mario Klingemann
  *
  * Permission is hereby granted, free of charge, to any person
  * obtaining a copy of this software and associated documentation
  * files (the "Software"), to deal in the Software without
  * restriction, including without limitation the rights to use,
  * copy, modify, merge, publish, distribute, sublicense, and/or sell
  * copies of the Software, and to permit persons to whom the
  * Software is furnished to do so, subject to the following
  * conditions:
  *
  * The above copyright notice and this permission notice shall be
  * included in all copies or substantial portions of the Software.
  *
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  * OTHER DEALINGS IN THE SOFTWARE.
  */
  const mulTable = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];
  const shgTable = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
  /**
   * @param {string|HTMLCanvasElement} canvas
   * @param {Integer} topX
   * @param {Integer} topY
   * @param {Integer} width
   * @param {Integer} height
   * @throws {Error}
   * @returns {ImageData} See {@link https://html.spec.whatwg.org/multipage/canvas.html#imagedata}
   */


  function getImageDataFromCanvas(canvas, topX, topY, width, height) {
    if (typeof canvas === 'string') {
      canvas = document.getElementById(canvas);
    }

    if (!canvas || !('getContext' in canvas)) {
      return;
    }

    const context = canvas.getContext('2d');

    try {
      return context.getImageData(topX, topY, width, height);
    } catch (e) {
      throw new Error('unable to access image data: ' + e);
    }
  }
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {Integer} topX
   * @param {Integer} topY
   * @param {Integer} width
   * @param {Integer} height
   * @param {Float} radius
   * @returns {undefined}
   */


  function processCanvasRGBA(canvas, topX, topY, width, height, radius) {
    if (isNaN(radius) || radius < 1) {
      return;
    }

    radius |= 0;
    let imageData = getImageDataFromCanvas(canvas, topX, topY, width, height);
    imageData = processImageDataRGBA(imageData, topX, topY, width, height, radius);
    canvas.getContext('2d').putImageData(imageData, topX, topY);
  }
  /**
   * @param {ImageData} imageData
   * @param {Integer} topX
   * @param {Integer} topY
   * @param {Integer} width
   * @param {Integer} height
   * @param {Float} radius
   * @returns {ImageData}
   */


  function processImageDataRGBA(imageData, topX, topY, width, height, radius) {
    const pixels = imageData.data;
    let x, y, i, p, yp, yi, yw, rSum, gSum, bSum, aSum, rOutSum, gOutSum, bOutSum, aOutSum, rInSum, gInSum, bInSum, aInSum, pr, pg, pb, pa, rbs;
    const div = radius + radius + 1; // const w4 = width << 2;

    const widthMinus1 = width - 1;
    const heightMinus1 = height - 1;
    const radiusPlus1 = radius + 1;
    const sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
    const stackStart = new BlurStack();
    let stack = stackStart;
    let stackEnd;

    for (i = 1; i < div; i++) {
      stack = stack.next = new BlurStack();

      if (i === radiusPlus1) {
        stackEnd = stack;
      }
    }

    stack.next = stackStart;
    let stackIn = null;
    let stackOut = null;
    yw = yi = 0;
    const mulSum = mulTable[radius];
    const shgSum = shgTable[radius];

    for (y = 0; y < height; y++) {
      rInSum = gInSum = bInSum = aInSum = rSum = gSum = bSum = aSum = 0;
      rOutSum = radiusPlus1 * (pr = pixels[yi]);
      gOutSum = radiusPlus1 * (pg = pixels[yi + 1]);
      bOutSum = radiusPlus1 * (pb = pixels[yi + 2]);
      aOutSum = radiusPlus1 * (pa = pixels[yi + 3]);
      rSum += sumFactor * pr;
      gSum += sumFactor * pg;
      bSum += sumFactor * pb;
      aSum += sumFactor * pa;
      stack = stackStart;

      for (i = 0; i < radiusPlus1; i++) {
        stack.r = pr;
        stack.g = pg;
        stack.b = pb;
        stack.a = pa;
        stack = stack.next;
      }

      for (i = 1; i < radiusPlus1; i++) {
        p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
        rSum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
        gSum += (stack.g = pg = pixels[p + 1]) * rbs;
        bSum += (stack.b = pb = pixels[p + 2]) * rbs;
        aSum += (stack.a = pa = pixels[p + 3]) * rbs;
        rInSum += pr;
        gInSum += pg;
        bInSum += pb;
        aInSum += pa;
        stack = stack.next;
      }

      stackIn = stackStart;
      stackOut = stackEnd;

      for (x = 0; x < width; x++) {
        pixels[yi + 3] = pa = aSum * mulSum >> shgSum;

        if (pa !== 0) {
          pa = 255 / pa;
          pixels[yi] = (rSum * mulSum >> shgSum) * pa;
          pixels[yi + 1] = (gSum * mulSum >> shgSum) * pa;
          pixels[yi + 2] = (bSum * mulSum >> shgSum) * pa;
        } else {
          pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
        }

        rSum -= rOutSum;
        gSum -= gOutSum;
        bSum -= bOutSum;
        aSum -= aOutSum;
        rOutSum -= stackIn.r;
        gOutSum -= stackIn.g;
        bOutSum -= stackIn.b;
        aOutSum -= stackIn.a;
        p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;
        rInSum += stackIn.r = pixels[p];
        gInSum += stackIn.g = pixels[p + 1];
        bInSum += stackIn.b = pixels[p + 2];
        aInSum += stackIn.a = pixels[p + 3];
        rSum += rInSum;
        gSum += gInSum;
        bSum += bInSum;
        aSum += aInSum;
        stackIn = stackIn.next;
        rOutSum += pr = stackOut.r;
        gOutSum += pg = stackOut.g;
        bOutSum += pb = stackOut.b;
        aOutSum += pa = stackOut.a;
        rInSum -= pr;
        gInSum -= pg;
        bInSum -= pb;
        aInSum -= pa;
        stackOut = stackOut.next;
        yi += 4;
      }

      yw += width;
    }

    for (x = 0; x < width; x++) {
      gInSum = bInSum = aInSum = rInSum = gSum = bSum = aSum = rSum = 0;
      yi = x << 2;
      rOutSum = radiusPlus1 * (pr = pixels[yi]);
      gOutSum = radiusPlus1 * (pg = pixels[yi + 1]);
      bOutSum = radiusPlus1 * (pb = pixels[yi + 2]);
      aOutSum = radiusPlus1 * (pa = pixels[yi + 3]);
      rSum += sumFactor * pr;
      gSum += sumFactor * pg;
      bSum += sumFactor * pb;
      aSum += sumFactor * pa;
      stack = stackStart;

      for (i = 0; i < radiusPlus1; i++) {
        stack.r = pr;
        stack.g = pg;
        stack.b = pb;
        stack.a = pa;
        stack = stack.next;
      }

      yp = width;

      for (i = 1; i <= radius; i++) {
        yi = yp + x << 2;
        rSum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
        gSum += (stack.g = pg = pixels[yi + 1]) * rbs;
        bSum += (stack.b = pb = pixels[yi + 2]) * rbs;
        aSum += (stack.a = pa = pixels[yi + 3]) * rbs;
        rInSum += pr;
        gInSum += pg;
        bInSum += pb;
        aInSum += pa;
        stack = stack.next;

        if (i < heightMinus1) {
          yp += width;
        }
      }

      yi = x;
      stackIn = stackStart;
      stackOut = stackEnd;

      for (y = 0; y < height; y++) {
        p = yi << 2;
        pixels[p + 3] = pa = aSum * mulSum >> shgSum;

        if (pa > 0) {
          pa = 255 / pa;
          pixels[p] = (rSum * mulSum >> shgSum) * pa;
          pixels[p + 1] = (gSum * mulSum >> shgSum) * pa;
          pixels[p + 2] = (bSum * mulSum >> shgSum) * pa;
        } else {
          pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
        }

        rSum -= rOutSum;
        gSum -= gOutSum;
        bSum -= bOutSum;
        aSum -= aOutSum;
        rOutSum -= stackIn.r;
        gOutSum -= stackIn.g;
        bOutSum -= stackIn.b;
        aOutSum -= stackIn.a;
        p = x + ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;
        rSum += rInSum += stackIn.r = pixels[p];
        gSum += gInSum += stackIn.g = pixels[p + 1];
        bSum += bInSum += stackIn.b = pixels[p + 2];
        aSum += aInSum += stackIn.a = pixels[p + 3];
        stackIn = stackIn.next;
        rOutSum += pr = stackOut.r;
        gOutSum += pg = stackOut.g;
        bOutSum += pb = stackOut.b;
        aOutSum += pa = stackOut.a;
        rInSum -= pr;
        gInSum -= pg;
        bInSum -= pb;
        aInSum -= pa;
        stackOut = stackOut.next;
        yi += width;
      }
    }

    return imageData;
  }
  /**
   *
   */


  class BlurStack {
    constructor() {
      this.r = 0;
      this.g = 0;
      this.b = 0;
      this.a = 0;
      this.next = null;
    }

  }

  var isNode = typeof module !== 'undefined' && module.exports && typeof window === 'undefined',
      nodeEnv = false;
  var windowEnv;

  {
    windowEnv = window;
    windowEnv.DOMParser = window.DOMParser;
  }

  var doc = windowEnv.document,
      defaultClientWidth = 800,
      defaultClientHeight = 600;

  function createCanvas(width, height) {
    var c;

    {
      c = doc.createElement('canvas');
      c.width = width;
      c.height = height;
    }

    return c;
  }

  function isNullish(v) {
    return v === null || v === undefined;
  } // canvg(target, s)
  // empty parameters: replace all 'svg' elements on page with 'canvas' elements
  // target: canvas element or the id of a canvas element
  // s: svg string, url to svg file, or xml document
  // opts: optional hash of options
  //       ignoreMouse: true => ignore mouse events
  //       ignoreAnimation: true => ignore animations
  //       ignoreDimensions: true => does not try to resize canvas
  //       ignoreClear: true => does not clear canvas
  //       offsetX: int => draws at a x offset
  //       offsetY: int => draws at a y offset
  //       scaleWidth: int => scales horizontally to width
  //       scaleHeight: int => scales vertically to height
  //       renderCallback: function => will call the function after the first render is completed
  //       enableRedraw: function => whether enable the redraw interval in node environment
  //       forceRedraw: function => will call the function on every frame, if it returns true, will redraw


  var canvg = function canvg(target, s, opts) {
    // no parameters
    if (isNullish(target) && isNullish(s) && isNullish(opts)) {
      var svgTags = doc.querySelectorAll('svg');

      for (var i = 0; i < svgTags.length; i++) {
        var svgTag = svgTags[i];
        var c = doc.createElement('canvas');

        if (typeof svgTag.clientWidth !== 'undefined' && typeof svgTag.clientHeight !== 'undefined') {
          c.width = svgTag.clientWidth;
          c.height = svgTag.clientHeight;
        } else {
          var rect = svgTag.getBoundingClientRect();
          c.width = rect.width;
          c.height = rect.height;
        }

        svgTag.parentNode.insertBefore(c, svgTag);
        svgTag.parentNode.removeChild(svgTag);
        var div = doc.createElement('div');
        div.appendChild(svgTag);
        canvg(c, div.innerHTML);
      }

      return;
    }

    var svg = build(opts || {});

    if (typeof target === 'string') {
      target = doc.getElementById(target);
    } // store class on canvas


    if (!isNullish(target.svg)) target.svg.stop(); // on i.e. 8 for flash canvas, we can't assign the property so check for it

    if (!(target.childNodes && target.childNodes.length === 1 && target.childNodes[0].nodeName === 'OBJECT')) target.svg = svg;
    var ctx = target.getContext('2d');

    if (typeof s.documentElement !== 'undefined') {
      // load from xml doc
      svg.loadXmlDoc(ctx, s);
    } else if (s.substr(0, 1) === '<') {
      // load from xml string
      svg.loadXml(ctx, s);
    } else {
      // load from url
      svg.load(ctx, s);
    }
  };

  var matchesSelector;

  {
    // see https://developer.mozilla.org/en-US/docs/Web/API/Element.matches
    if (typeof Element === 'undefined') ; else if (typeof Element.prototype.matches !== 'undefined') {
      matchesSelector = function matchesSelector(node, selector) {
        return node.matches(selector);
      };
    } else if (typeof Element.prototype.webkitMatchesSelector !== 'undefined') {
      matchesSelector = function matchesSelector(node, selector) {
        return node.webkitMatchesSelector(selector);
      };
    } else if (typeof Element.prototype.mozMatchesSelector !== 'undefined') {
      matchesSelector = function matchesSelector(node, selector) {
        return node.mozMatchesSelector(selector);
      };
    } else if (typeof Element.prototype.msMatchesSelector !== 'undefined') {
      matchesSelector = function matchesSelector(node, selector) {
        return node.msMatchesSelector(selector);
      };
    } else if (typeof Element.prototype.oMatchesSelector !== 'undefined') {
      matchesSelector = function matchesSelector(node, selector) {
        return node.oMatchesSelector(selector);
      };
    } else {
      // requires Sizzle: https://github.com/jquery/sizzle/wiki/Sizzle-Documentation
      // or jQuery: http://jquery.com/download/
      // or Zepto: http://zeptojs.com/#
      // without it, this is a ReferenceError
      if (typeof jQuery === 'function' || typeof Zepto === 'function') {
        matchesSelector = function matchesSelector(node, selector) {
          return $(node).is(selector);
        };
      }

      if (typeof matchesSelector === 'undefined' && typeof Sizzle !== 'undefined') {
        var _Sizzle = Sizzle;
        matchesSelector = _Sizzle.matchesSelector;
      }
    }
  } // slightly modified version of https://github.com/keeganstreet/specificity/blob/master/specificity.js


  var attributeRegex = /(\[(?:[\0-\\\^-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+\])/g;
  var idRegex = /(#(?:[\0-\x08\x0E-\x1F!-\*,\x2D\/-9;-=\?-Z\\-\}\x7F-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)/g;
  var classRegex = /(\.(?:[\0-\x08\x0E-\x1F!-\*,\x2D\/-9;-=\?-Z\\-\}\x7F-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)/g;
  var pseudoElementRegex = /(::(?:[\0-\x08\x0E-\x1F!-\*,\x2D\/-9;-=\?-Z\\-\}\x7F-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+|:fir[s\u017F]t\x2Dline|:fir[s\u017F]t\x2Dletter|:before|:after)/gi;
  var pseudoClassWithBracketsRegex = /(:[\x2D0-9A-Z_a-z\u017F\u212A]+\((?:[\0-\(\*-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*\))/gi;
  var pseudoClassRegex = /(:(?:[\0-\x08\x0E-\x1F!-\*,\x2D\/-9;-=\?-Z\\-\}\x7F-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)/g;
  var elementRegex = /((?:[\0-\x08\x0E-\x1F!-\*,\x2D\/-9;-=\?-Z\\-\}\x7F-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)/g;

  function getSelectorSpecificity(selector) {
    var typeCount = [0, 0, 0];

    var findMatch = function findMatch(regex, type) {
      var matches = selector.match(regex);

      if (isNullish(matches)) {
        return;
      }

      typeCount[type] += matches.length;
      selector = selector.replace(regex, ' ');
    };

    selector = selector.replace(/:not\(((?:[\0-\(\*-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)\)/g, '     $1 ');
    selector = selector.replace(/\{(?:[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*/gm, ' ');
    findMatch(attributeRegex, 1);
    findMatch(idRegex, 0);
    findMatch(classRegex, 1);
    findMatch(pseudoElementRegex, 2);
    findMatch(pseudoClassWithBracketsRegex, 1);
    findMatch(pseudoClassRegex, 1);
    selector = selector.replace(/[\t-\r \*\+>~\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]/g, ' ');
    selector = selector.replace(/[#\.]/g, ' ');
    findMatch(elementRegex, 2);
    return typeCount.join('');
  }

  function build(opts) {
    var svg = {
      opts: opts
    };
    svg.FRAMERATE = 30;
    svg.MAX_VIRTUAL_PIXELS = 30000;
    svg.rootEmSize = 12;
    svg.emSize = 12;

    svg.log = function ()
    /* msg */
    {
      /* */
    };

    if (svg.opts.log && typeof console !== 'undefined') {
      svg.log = function (msg) {
        console.log(msg);
      }; // eslint-disable-line no-console

    } // globals


    svg.init = function (ctx) {
      var uniqueId = 0;

      svg.UniqueId = function () {
        uniqueId++;
        return 'canvg' + uniqueId;
      };

      svg.Definitions = {};
      svg.Styles = {};
      svg.StylesSpecificity = {};
      svg.Animations = [];
      svg.Images = [];
      svg.ctx = ctx;
      svg.ViewPort = new function () {
        this.viewPorts = [];

        this.Clear = function () {
          this.viewPorts = [];
        };

        this.SetCurrent = function (width, height) {
          this.viewPorts.push({
            width: width,
            height: height
          });
        };

        this.RemoveCurrent = function () {
          this.viewPorts.pop();
        };

        this.Current = function () {
          return this.viewPorts[this.viewPorts.length - 1];
        };

        this.width = function () {
          return this.Current().width;
        };

        this.height = function () {
          return this.Current().height;
        };

        this.ComputeSize = function (d) {
          if (!isNullish(d) && typeof d === 'number') return d;
          if (d === 'x') return this.width();
          if (d === 'y') return this.height();
          return Math.sqrt(Math.pow(this.width(), 2) + Math.pow(this.height(), 2)) / Math.sqrt(2);
        };
      }();
    };

    svg.init(); // images loaded

    svg.ImagesLoaded = function () {
      for (var i = 0; i < svg.Images.length; i++) {
        if (!svg.Images[i].loaded) return false;
      }

      return true;
    }; // trim


    svg.trim = function (s) {
      return s.replace(/^[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+|[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+$/g, '');
    }; // compress non-ideographic spaces


    svg.compressSpaces = function (s) {
      return s.replace(/(?!\u3000)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+/gm, ' ');
    }; // ajax


    svg.ajax = function (url) {

      var AJAX;

      if (windowEnv.XMLHttpRequest) {
        AJAX = new windowEnv.XMLHttpRequest();
      } else {
        AJAX = new ActiveXObject('Microsoft.XMLHTTP');
      }

      if (AJAX) {
        AJAX.open('GET', url, false);
        AJAX.send(null);
        return AJAX.responseText;
      }

      return null;
    }; // parse xml


    svg.parseXml = function (xml) {
      if (typeof Windows !== 'undefined' && typeof Windows.Data !== 'undefined' && typeof Windows.Data.Xml !== 'undefined') {
        var xmlDoc = new Windows.Data.Xml.Dom.XmlDocument();
        var settings = new Windows.Data.Xml.Dom.XmlLoadSettings();
        settings.prohibitDtd = false;
        xmlDoc.loadXml(xml, settings);
        return xmlDoc;
      } else if (windowEnv.DOMParser) {
        var parser;

        try {
          parser = opts.xmldom ? new windowEnv.DOMParser(opts.xmldom) : new windowEnv.DOMParser();
          return parser.parseFromString(xml, 'image/svg+xml');
        } catch (e) {
          parser = opts.xmldom ? new windowEnv.DOMParser(opts.xmldom) : new windowEnv.DOMParser();
          return parser.parseFromString(xml, 'text/xml');
        }
      } else {
        xml = xml.replace(/<!DOCTYPE svg(?:[\0-=\?-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*>/, '');

        var _xmlDoc = new ActiveXObject('Microsoft.XMLDOM');

        _xmlDoc.async = 'false';

        _xmlDoc.loadXML(xml);

        return _xmlDoc;
      }
    };

    svg.Property = function (name, value) {
      this.name = name;
      this.value = value;
    };

    svg.Property.prototype.getValue = function () {
      return this.value;
    };

    svg.Property.prototype.hasValue = function () {
      return !isNullish(this.value) && this.value !== '';
    }; // return the numerical value of the property


    svg.Property.prototype.numValue = function () {
      if (!this.hasValue()) return 0;
      var n = parseFloat(this.value);

      if (String(this.value).endsWith('%')) {
        n /= 100.0;
      }

      return n;
    };

    svg.Property.prototype.valueOrDefault = function (def) {
      if (this.hasValue()) return this.value;
      return def;
    };

    svg.Property.prototype.numValueOrDefault = function (def) {
      if (this.hasValue()) return this.numValue();
      return parseFloat(def);
    }; // color extensions
    // augment the current color value with the opacity


    svg.Property.prototype.addOpacity = function (opacityProp) {
      var newValue = this.value;

      if (!isNullish(opacityProp.value) && opacityProp.value !== '' && typeof this.value === 'string') {
        // can only add opacity to colors, not patterns
        var color = new RGBColor(this.value);

        if (color.ok) {
          newValue = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + opacityProp.numValue() + ')';
        }
      }

      return new svg.Property(this.name, newValue);
    }; // definition extensions
    // get the definition from the definitions table


    svg.Property.prototype.getDefinition = function () {
      var name = this.value.match(/#((?:[\0-!#-&\(\*-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)/);

      if (name) {
        name = name[1];
      }

      if (!name) {
        name = this.value;
      }

      return svg.Definitions[name];
    };

    svg.Property.prototype.isUrlDefinition = function () {
      return this.value.indexOf('url(') === 0;
    };

    svg.Property.prototype.getFillStyleDefinition = function (e, opacityProp) {
      var def = this.getDefinition(); // gradient

      if (!isNullish(def) && def.createGradient) {
        return def.createGradient(svg.ctx, e, opacityProp);
      } // pattern


      if (!isNullish(def) && def.createPattern) {
        if (def.getHrefAttribute().hasValue()) {
          var pt = def.attribute('patternTransform');
          def = def.getHrefAttribute().getDefinition();

          if (pt.hasValue()) {
            def.attribute('patternTransform', true).value = pt.value;
          }
        }

        return def.createPattern(svg.ctx, e, opacityProp);
      }

      return null;
    }; // length extensions


    svg.Property.prototype.getDPI = function ()
    /* viewPort */
    {
      return 96.0; // TODO: compute?
    };

    svg.Property.prototype.getREM = function ()
    /* viewPort */
    {
      return svg.rootEmSize;
    };

    svg.Property.prototype.getEM = function ()
    /* viewPort */
    {
      return svg.emSize;
    };

    svg.Property.prototype.getUnits = function () {
      var s = String(this.value);
      return s.replace(/[\x2D\.0-9]/g, '');
    };

    svg.Property.prototype.isPixels = function () {
      if (!this.hasValue()) return false;
      var s = String(this.value);
      if (s.endsWith('px')) return true;
      if (s.match(/^[0-9]+$/)) return true;
      return false;
    }; // get the length as pixels


    svg.Property.prototype.toPixels = function (viewPort, processPercent) {
      if (!this.hasValue()) return 0;
      var s = String(this.value);
      if (s.endsWith('rem')) return this.numValue() * this.getREM(viewPort);
      if (s.endsWith('em')) return this.numValue() * this.getEM(viewPort);
      if (s.endsWith('ex')) return this.numValue() * this.getEM(viewPort) / 2.0;
      if (s.endsWith('px')) return this.numValue();
      if (s.endsWith('pt')) return this.numValue() * this.getDPI(viewPort) * (1.0 / 72.0);
      if (s.endsWith('pc')) return this.numValue() * 15;
      if (s.endsWith('cm')) return this.numValue() * this.getDPI(viewPort) / 2.54;
      if (s.endsWith('mm')) return this.numValue() * this.getDPI(viewPort) / 25.4;
      if (s.endsWith('in')) return this.numValue() * this.getDPI(viewPort);
      if (s.endsWith('%')) return this.numValue() * svg.ViewPort.ComputeSize(viewPort);
      var n = this.numValue();
      if (processPercent && n < 1.0) return n * svg.ViewPort.ComputeSize(viewPort);
      return n;
    }; // time extensions
    // get the time as milliseconds
    // https://svgwg.org/specs/animations/#ClockValueSyntax


    svg.Property.prototype.toMilliseconds = function () {
      if (!this.hasValue()) return 0;
      var s = String(this.value);
      if (s.endsWith('ms')) return this.numValue();
      return this.numValue() * 1000;
    }; // angle extensions
    // get the angle as radians


    svg.Property.prototype.toRadians = function () {
      if (!this.hasValue()) return 0;
      var s = String(this.value);
      if (s.endsWith('deg')) return this.numValue() * (Math.PI / 180.0);
      if (s.endsWith('grad')) return this.numValue() * (Math.PI / 200.0);
      if (s.endsWith('rad')) return this.numValue();
      return this.numValue() * (Math.PI / 180.0);
    }; // text extensions
    // get the text baseline


    var textBaselineMapping = {
      baseline: 'alphabetic',
      'before-edge': 'top',
      'text-before-edge': 'top',
      middle: 'middle',
      central: 'middle',
      'after-edge': 'bottom',
      'text-after-edge': 'bottom',
      ideographic: 'ideographic',
      alphabetic: 'alphabetic',
      hanging: 'hanging',
      mathematical: 'alphabetic'
    };

    svg.Property.prototype.toTextBaseline = function () {
      if (!this.hasValue()) return null;
      return textBaselineMapping[this.value];
    }; // fonts


    svg.Font = new function () {
      this.Styles = 'normal|italic|oblique|inherit';
      this.Variants = 'normal|small-caps|inherit';
      this.Weights = 'normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit';

      this.CreateFont = function (fontStyle, fontVariant, fontWeight, fontSize, fontFamily, inherit) {
        var f = !isNullish(inherit) ? this.Parse(inherit) : this.CreateFont('', '', '', '', '', svg.ctx.font);
        fontFamily = fontFamily || f.fontFamily;

        return {
          fontFamily: fontFamily,
          fontSize: fontSize || f.fontSize,
          fontStyle: fontStyle || f.fontStyle,
          fontWeight: fontWeight || f.fontWeight,
          fontVariant: fontVariant || f.fontVariant,
          toString: function toString() {
            return [this.fontStyle, this.fontVariant, this.fontWeight, this.fontSize, this.fontFamily].join(' ');
          }
        };
      };

      var that = this;

      this.Parse = function (s) {
        var f = {};
        var d = svg.trim(svg.compressSpaces(s || '')).split(' ');
        var set = {
          fontSize: false,
          fontStyle: false,
          fontWeight: false,
          fontVariant: false
        };
        var ff = '';

        for (var i = 0; i < d.length; i++) {
          if (!set.fontStyle && that.Styles.indexOf(d[i]) > -1) {
            if (d[i] !== 'inherit') f.fontStyle = d[i];
            set.fontStyle = true;
          } else if (!set.fontVariant && that.Variants.indexOf(d[i]) > -1) {
            if (d[i] !== 'inherit') f.fontVariant = d[i];
            set.fontStyle = set.fontVariant = true;
          } else if (!set.fontWeight && that.Weights.indexOf(d[i]) > -1) {
            if (d[i] !== 'inherit') f.fontWeight = d[i];
            set.fontStyle = set.fontVariant = set.fontWeight = true;
          } else if (!set.fontSize) {
            if (d[i] !== 'inherit') f.fontSize = d[i].split('/')[0];
            set.fontStyle = set.fontVariant = set.fontWeight = set.fontSize = true;
          } else {
            if (d[i] !== 'inherit') ff += d[i];
          }
        }

        if (ff !== '') f.fontFamily = ff;
        return f;
      };
    }(); // points and paths

    svg.ToNumberArray = function (s) {
      var a = (s || '').match(/\x2D?([0-9]+(\.[0-9]+)?|\.[0-9]+)(?=(?:[\0-\/:-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])|$)/gm) || []; // eslint-disable-line unicorn/no-unsafe-regex

      for (var i = 0; i < a.length; i++) {
        a[i] = parseFloat(a[i]);
      }

      return a;
    };

    svg.Point = function (x, y) {
      this.x = x;
      this.y = y;
    };

    svg.Point.prototype.angleTo = function (p) {
      return Math.atan2(p.y - this.y, p.x - this.x);
    };

    svg.Point.prototype.applyTransform = function (v) {
      var xp = this.x * v[0] + this.y * v[2] + v[4];
      var yp = this.x * v[1] + this.y * v[3] + v[5];
      this.x = xp;
      this.y = yp;
    };

    svg.CreatePoint = function (s) {
      var a = svg.ToNumberArray(s);
      return new svg.Point(a[0], a[1]);
    };

    svg.CreatePath = function (s) {
      var a = svg.ToNumberArray(s);
      var path = [];

      for (var i = 0; i < a.length; i += 2) {
        path.push(new svg.Point(a[i], a[i + 1]));
      }

      return path;
    }; // bounding box


    svg.BoundingBox = function (x1, y1, x2, y2) {
      // pass in initial points if you want
      this.x1 = Number.NaN;
      this.y1 = Number.NaN;
      this.x2 = Number.NaN;
      this.y2 = Number.NaN;

      this.x = function () {
        return this.x1;
      };

      this.y = function () {
        return this.y1;
      };

      this.width = function () {
        return this.x2 - this.x1;
      };

      this.height = function () {
        return this.y2 - this.y1;
      };

      this.addPoint = function (x, y) {
        if (!isNullish(x)) {
          if (isNaN(this.x1) || isNaN(this.x2)) {
            this.x1 = x;
            this.x2 = x;
          }

          if (x < this.x1) this.x1 = x;
          if (x > this.x2) this.x2 = x;
        }

        if (!isNullish(y)) {
          if (isNaN(this.y1) || isNaN(this.y2)) {
            this.y1 = y;
            this.y2 = y;
          }

          if (y < this.y1) this.y1 = y;
          if (y > this.y2) this.y2 = y;
        }
      };

      this.addX = function (x) {
        this.addPoint(x, null);
      };

      this.addY = function (y) {
        this.addPoint(null, y);
      };

      this.addBoundingBox = function (bb) {
        this.addPoint(bb.x1, bb.y1);
        this.addPoint(bb.x2, bb.y2);
      };

      this.addQuadraticCurve = function (p0x, p0y, p1x, p1y, p2x, p2y) {
        var cp1x = p0x + 2 / 3 * (p1x - p0x); // CP1 = QP0 + 2/3 *(QP1-QP0)

        var cp1y = p0y + 2 / 3 * (p1y - p0y); // CP1 = QP0 + 2/3 *(QP1-QP0)

        var cp2x = cp1x + 1 / 3 * (p2x - p0x); // CP2 = CP1 + 1/3 *(QP2-QP0)

        var cp2y = cp1y + 1 / 3 * (p2y - p0y); // CP2 = CP1 + 1/3 *(QP2-QP0)

        this.addBezierCurve(p0x, p0y, cp1x, cp2x, cp1y, cp2y, p2x, p2y);
      };

      this.addBezierCurve = function (p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y) {
        var _this = this;

        // from http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
        var p0 = [p0x, p0y],
            p1 = [p1x, p1y],
            p2 = [p2x, p2y],
            p3 = [p3x, p3y];
        this.addPoint(p0[0], p0[1]);
        this.addPoint(p3[0], p3[1]);

        var _loop = function _loop(i) {
          var f = function f(t) {
            return Math.pow(1 - t, 3) * p0[i] + 3 * Math.pow(1 - t, 2) * t * p1[i] + 3 * (1 - t) * Math.pow(t, 2) * p2[i] + Math.pow(t, 3) * p3[i];
          };

          var b = 6 * p0[i] - 12 * p1[i] + 6 * p2[i];
          var a = -3 * p0[i] + 9 * p1[i] - 9 * p2[i] + 3 * p3[i];
          var c = 3 * p1[i] - 3 * p0[i];

          if (a === 0) {
            if (b === 0) return "continue";
            var t = -c / b;

            if (t > 0 && t < 1) {
              if (i === 0) _this.addX(f(t));
              if (i === 1) _this.addY(f(t));
            }

            return "continue";
          }

          var b2ac = Math.pow(b, 2) - 4 * c * a;
          if (b2ac < 0) return "continue";
          var t1 = (-b + Math.sqrt(b2ac)) / (2 * a);

          if (t1 > 0 && t1 < 1) {
            if (i === 0) _this.addX(f(t1));
            if (i === 1) _this.addY(f(t1));
          }

          var t2 = (-b - Math.sqrt(b2ac)) / (2 * a);

          if (t2 > 0 && t2 < 1) {
            if (i === 0) _this.addX(f(t2));
            if (i === 1) _this.addY(f(t2));
          }
        };

        for (var i = 0; i <= 1; i++) {
          var _ret = _loop(i);

          if (_ret === "continue") continue;
        }
      };

      this.isPointInBox = function (x, y) {
        return this.x1 <= x && x <= this.x2 && this.y1 <= y && y <= this.y2;
      };

      this.addPoint(x1, y1);
      this.addPoint(x2, y2);
    }; // transforms


    svg.Transform = function (v) {
      var that = this;
      this.Type = {}; // translate

      this.Type.translate = function (s) {
        this.p = svg.CreatePoint(s);

        this.apply = function (ctx) {
          ctx.translate(this.p.x || 0.0, this.p.y || 0.0);
        };

        this.unapply = function (ctx) {
          ctx.translate(-1.0 * this.p.x || 0.0, -1.0 * this.p.y || 0.0);
        };

        this.applyToPoint = function (p) {
          p.applyTransform([1, 0, 0, 1, this.p.x || 0.0, this.p.y || 0.0]);
        };
      }; // rotate


      this.Type.rotate = function (s) {
        var a = svg.ToNumberArray(s);
        this.angle = new svg.Property('angle', a[0]);
        this.cx = a[1] || 0;
        this.cy = a[2] || 0;

        this.apply = function (ctx) {
          ctx.translate(this.cx, this.cy);
          ctx.rotate(this.angle.toRadians());
          ctx.translate(-this.cx, -this.cy);
        };

        this.unapply = function (ctx) {
          ctx.translate(this.cx, this.cy);
          ctx.rotate(-1.0 * this.angle.toRadians());
          ctx.translate(-this.cx, -this.cy);
        };

        this.applyToPoint = function (p) {
          var ar = this.angle.toRadians();
          p.applyTransform([1, 0, 0, 1, this.p.x || 0.0, this.p.y || 0.0]);
          p.applyTransform([Math.cos(ar), Math.sin(ar), -Math.sin(ar), Math.cos(ar), 0, 0]);
          p.applyTransform([1, 0, 0, 1, -this.p.x || 0.0, -this.p.y || 0.0]);
        };
      };

      this.Type.scale = function (s) {
        this.p = svg.CreatePoint(s);

        this.apply = function (ctx) {
          ctx.scale(this.p.x || 1.0, this.p.y || this.p.x || 1.0);
        };

        this.unapply = function (ctx) {
          ctx.scale(1.0 / this.p.x || 1.0, 1.0 / this.p.y || this.p.x || 1.0);
        };

        this.applyToPoint = function (p) {
          p.applyTransform([this.p.x || 0.0, 0, 0, this.p.y || 0.0, 0, 0]);
        };
      };

      this.Type.matrix = function (s) {
        this.m = svg.ToNumberArray(s);

        this.apply = function (ctx) {
          ctx.transform(this.m[0], this.m[1], this.m[2], this.m[3], this.m[4], this.m[5]);
        };

        this.unapply = function (ctx) {
          var a = this.m[0];
          var b = this.m[2];
          var c = this.m[4];
          var d = this.m[1];
          var e = this.m[3];
          var f = this.m[5];
          var g = 0.0;
          var h = 0.0;
          var i = 1.0;
          var det = 1 / (a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g));
          ctx.transform(det * (e * i - f * h), det * (f * g - d * i), det * (c * h - b * i), det * (a * i - c * g), det * (b * f - c * e), det * (c * d - a * f));
        };

        this.applyToPoint = function (p) {
          p.applyTransform(this.m);
        };
      };

      this.Type.SkewBase = function (s) {
        this.base = that.Type.matrix;
        this.base(s);
        this.angle = new svg.Property('angle', s);
      };

      this.Type.SkewBase.prototype = new this.Type.matrix();

      this.Type.skewX = function (s) {
        this.base = that.Type.SkewBase;
        this.base(s);
        this.m = [1, 0, Math.tan(this.angle.toRadians()), 1, 0, 0];
      };

      this.Type.skewX.prototype = new this.Type.SkewBase();

      this.Type.skewY = function (s) {
        this.base = that.Type.SkewBase;
        this.base(s);
        this.m = [1, Math.tan(this.angle.toRadians()), 0, 1, 0, 0];
      };

      this.Type.skewY.prototype = new this.Type.SkewBase();
      this.transforms = [];

      this.apply = function (ctx) {
        for (var i = 0; i < this.transforms.length; i++) {
          this.transforms[i].apply(ctx);
        }
      };

      this.unapply = function (ctx) {
        for (var i = this.transforms.length - 1; i >= 0; i--) {
          this.transforms[i].unapply(ctx);
        }
      }; // TODO: applyToPoint unused ... remove?


      this.applyToPoint = function (p) {
        for (var i = 0; i < this.transforms.length; i++) {
          this.transforms[i].applyToPoint(p);
        }
      };

      var data = svg.trim(svg.compressSpaces(v)).replace(/\)([A-Za-z])/g, ') $1').replace(/\)([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]?,[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]?)/g, ') ').split(/[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF](?=[a-z])/);

      for (var i = 0; i < data.length; i++) {
        if (data[i] === 'none') {
          continue;
        }

        var type = svg.trim(data[i].split('(')[0]);
        var s = data[i].split('(')[1].replace(')', '');
        var transformType = this.Type[type];

        if (typeof transformType !== 'undefined') {
          var transform = new transformType(s);
          transform.type = type;
          this.transforms.push(transform);
        }
      }
    }; // aspect ratio


    svg.AspectRatio = function (ctx, aspectRatio, width, desiredWidth, height, desiredHeight, minX, minY, refX, refY) {
      // aspect ratio - http://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute
      aspectRatio = svg.compressSpaces(aspectRatio);
      aspectRatio = aspectRatio.replace(/^defer[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]/, ''); // ignore defer

      var align = aspectRatio.split(' ')[0] || 'xMidYMid';
      var meetOrSlice = aspectRatio.split(' ')[1] || 'meet'; // calculate scale

      var scaleX = width / desiredWidth;
      var scaleY = height / desiredHeight;
      var scaleMin = Math.min(scaleX, scaleY);
      var scaleMax = Math.max(scaleX, scaleY);

      if (meetOrSlice === 'meet') {
        desiredWidth *= scaleMin;
        desiredHeight *= scaleMin;
      }

      if (meetOrSlice === 'slice') {
        desiredWidth *= scaleMax;
        desiredHeight *= scaleMax;
      }

      refX = new svg.Property('refX', refX);
      refY = new svg.Property('refY', refY);

      if (refX.hasValue() && refY.hasValue()) {
        ctx.translate(-scaleMin * refX.toPixels('x'), -scaleMin * refY.toPixels('y'));
      } else {
        // align
        if (align.startsWith('xMid') && (meetOrSlice === 'meet' && scaleMin === scaleY || meetOrSlice === 'slice' && scaleMax === scaleY)) ctx.translate(width / 2.0 - desiredWidth / 2.0, 0);
        if (align.endsWith('YMid') && (meetOrSlice === 'meet' && scaleMin === scaleX || meetOrSlice === 'slice' && scaleMax === scaleX)) ctx.translate(0, height / 2.0 - desiredHeight / 2.0);
        if (align.startsWith('xMax') && (meetOrSlice === 'meet' && scaleMin === scaleY || meetOrSlice === 'slice' && scaleMax === scaleY)) ctx.translate(width - desiredWidth, 0);
        if (align.endsWith('YMax') && (meetOrSlice === 'meet' && scaleMin === scaleX || meetOrSlice === 'slice' && scaleMax === scaleX)) ctx.translate(0, height - desiredHeight);
      } // scale


      if (align === 'none') ctx.scale(scaleX, scaleY);else if (meetOrSlice === 'meet') ctx.scale(scaleMin, scaleMin);else if (meetOrSlice === 'slice') ctx.scale(scaleMax, scaleMax); // translate

      ctx.translate(isNullish(minX) ? 0 : -minX, isNullish(minY) ? 0 : -minY);
    }; // elements


    svg.Element = {};
    svg.EmptyProperty = new svg.Property('EMPTY', '');

    svg.Element.ElementBase = function (node) {
      this.attributes = {};
      this.styles = {};
      this.stylesSpecificity = {};
      this.children = []; // get or create attribute

      this.attribute = function (name, createIfNotExists) {
        var a = this.attributes[name];
        if (!isNullish(a)) return a;

        if (createIfNotExists) {
          a = new svg.Property(name, '');
          this.attributes[name] = a;
        }

        return a || svg.EmptyProperty;
      };

      this.getHrefAttribute = function () {
        for (var a in this.attributes) {
          if (a === 'href' || a.endsWith(':href')) {
            return this.attributes[a];
          }
        }

        return svg.EmptyProperty;
      }; // get or create style, crawls up node tree


      this.style = function (name, createIfNotExists, skipAncestors) {
        var s = this.styles[name];
        if (!isNullish(s)) return s;
        var a = this.attribute(name);

        if (!isNullish(a) && a.hasValue()) {
          this.styles[name] = a; // move up to me to cache

          return a;
        }

        if (!skipAncestors) {
          var p = this.parent;

          if (!isNullish(p)) {
            var ps = p.style(name);

            if (!isNullish(ps) && ps.hasValue()) {
              return ps;
            }
          }
        }

        if (createIfNotExists) {
          s = new svg.Property(name, '');
          this.styles[name] = s;
        }

        return s || svg.EmptyProperty;
      }; // base render


      this.render = function (ctx) {
        // don't render display=none
        if (this.style('display').value === 'none') return; // don't render visibility=hidden

        if (this.style('visibility').value === 'hidden') return;
        ctx.save();

        if (this.style('mask').hasValue()) {
          // mask
          var mask = this.style('mask').getDefinition();
          if (!isNullish(mask)) mask.apply(ctx, this);
        } else if (this.style('filter').hasValue()) {
          // filter
          var filter = this.style('filter').getDefinition();
          if (!isNullish(filter)) filter.apply(ctx, this);
        } else {
          this.setContext(ctx);
          this.renderChildren(ctx);
          this.clearContext(ctx);
        }

        ctx.restore();
      }; // base set context


      this.setContext = function ()
      /* ctx */
      {// OVERRIDE ME!
      }; // base clear context


      this.clearContext = function ()
      /* ctx */
      {// OVERRIDE ME!
      }; // base render children


      this.renderChildren = function (ctx) {
        for (var i = 0; i < this.children.length; i++) {
          this.children[i].render(ctx);
        }
      };

      this.addChild = function (childNode, create) {
        var child = childNode;
        if (create) child = svg.CreateElement(childNode);
        child.parent = this;

        if (child.type !== 'title') {
          this.children.push(child);
        }
      };

      this.addStylesFromStyleDefinition = function () {
        // add styles
        for (var selector in svg.Styles) {
          if (selector[0] !== '@' && matchesSelector(node, selector)) {
            var styles = svg.Styles[selector];
            var specificity = svg.StylesSpecificity[selector];

            if (!isNullish(styles)) {
              for (var name in styles) {
                if ({}.hasOwnProperty.call(styles, name)) {
                  var existingSpecificity = this.stylesSpecificity[name];

                  if (typeof existingSpecificity === 'undefined') {
                    existingSpecificity = '000';
                  }

                  if (specificity >= existingSpecificity) {
                    this.styles[name] = styles[name];
                    this.stylesSpecificity[name] = specificity;
                  }
                }
              }
            }
          }
        }
      }; // Microsoft Edge fix


      var allUppercase = new RegExp('^[A-Z-]+$', 'u');

      var normalizeAttributeName = function normalizeAttributeName(name) {
        if (allUppercase.test(name)) {
          return name.toLowerCase();
        }

        return name;
      };

      if (!isNullish(node) && node.nodeType === 1) {
        // ELEMENT_NODE
        // add attributes
        for (var i = 0; i < node.attributes.length; i++) {
          var attribute = node.attributes[i];
          var nodeName = normalizeAttributeName(attribute.nodeName);
          this.attributes[nodeName] = new svg.Property(nodeName, attribute.value);
        }

        this.addStylesFromStyleDefinition(); // add inline styles

        if (this.attribute('style').hasValue()) {
          var styles = this.attribute('style').value.split(';');

          for (var _i = 0; _i < styles.length; _i++) {
            if (svg.trim(styles[_i]) !== '') {
              var style = styles[_i].split(':');

              var name = svg.trim(style[0]);
              var value = svg.trim(style[1]);
              this.styles[name] = new svg.Property(name, value);
            }
          }
        } // add id


        if (this.attribute('id').hasValue()) {
          if (isNullish(svg.Definitions[this.attribute('id').value])) {
            svg.Definitions[this.attribute('id').value] = this;
          }
        } // add children


        for (var _i2 = 0; _i2 < node.childNodes.length; _i2++) {
          var childNode = node.childNodes[_i2];
          if (childNode.nodeType === 1) this.addChild(childNode, true); // ELEMENT_NODE

          if (this.captureTextNodes && (childNode.nodeType === 3 || childNode.nodeType === 4)) {
            var text = childNode.value || childNode.text || childNode.textContent || '';

            if (svg.compressSpaces(text) !== '') {
              this.addChild(new svg.Element.tspan(childNode), false); // TEXT_NODE
            }
          }
        }
      }
    };

    svg.Element.RenderedElementBase = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.calculateOpacity = function () {
        var opacity = 1.0;
        var el = this;

        while (!isNullish(el)) {
          var opacityStyle = el.style('opacity', false, true); // no ancestors on style call

          if (opacityStyle.hasValue()) {
            opacity *= opacityStyle.numValue();
          }

          el = el.parent;
        }

        return opacity;
      };

      this.setContext = function (ctx, fromMeasure) {
        if (!fromMeasure) {
          // causes stack overflow when measuring text with gradients
          // fill
          if (this.style('fill').isUrlDefinition()) {
            var fs = this.style('fill').getFillStyleDefinition(this, this.style('fill-opacity'));
            if (!isNullish(fs)) ctx.fillStyle = fs;
          } else if (this.style('fill').hasValue()) {
            var fillStyle = this.style('fill');
            if (fillStyle.value === 'currentColor') fillStyle.value = this.style('color').value;
            if (fillStyle.value !== 'inherit') ctx.fillStyle = fillStyle.value === 'none' ? 'rgba(0,0,0,0)' : fillStyle.value;
          }

          if (this.style('fill-opacity').hasValue()) {
            var _fillStyle = new svg.Property('fill', ctx.fillStyle);

            _fillStyle = _fillStyle.addOpacity(this.style('fill-opacity'));
            ctx.fillStyle = _fillStyle.value;
          } // stroke


          if (this.style('stroke').isUrlDefinition()) {
            var _fs = this.style('stroke').getFillStyleDefinition(this, this.style('stroke-opacity'));

            if (!isNullish(_fs)) ctx.strokeStyle = _fs;
          } else if (this.style('stroke').hasValue()) {
            var strokeStyle = this.style('stroke');
            if (strokeStyle.value === 'currentColor') strokeStyle.value = this.style('color').value;
            if (strokeStyle.value !== 'inherit') ctx.strokeStyle = strokeStyle.value === 'none' ? 'rgba(0,0,0,0)' : strokeStyle.value;
          }

          if (this.style('stroke-opacity').hasValue()) {
            var _strokeStyle = new svg.Property('stroke', ctx.strokeStyle);

            _strokeStyle = _strokeStyle.addOpacity(this.style('stroke-opacity'));
            ctx.strokeStyle = _strokeStyle.value;
          }

          if (this.style('stroke-width').hasValue()) {
            var newLineWidth = this.style('stroke-width').toPixels();
            ctx.lineWidth = newLineWidth === 0 ? 0.001 : newLineWidth; // browsers don't respect 0
          }

          if (this.style('stroke-linecap').hasValue()) ctx.lineCap = this.style('stroke-linecap').value;
          if (this.style('stroke-linejoin').hasValue()) ctx.lineJoin = this.style('stroke-linejoin').value;
          if (this.style('stroke-miterlimit').hasValue()) ctx.miterLimit = this.style('stroke-miterlimit').value;
          if (this.style('paint-order').hasValue()) ctx.paintOrder = this.style('paint-order').value;

          if (this.style('stroke-dasharray').hasValue() && this.style('stroke-dasharray').value !== 'none') {
            var gaps = svg.ToNumberArray(this.style('stroke-dasharray').value);

            if (typeof ctx.setLineDash !== 'undefined') {
              ctx.setLineDash(gaps);
            } else if (typeof ctx.webkitLineDash !== 'undefined') {
              ctx.webkitLineDash = gaps;
            } else if (typeof ctx.mozDash !== 'undefined' && !(gaps.length === 1 && gaps[0] === 0)) {
              ctx.mozDash = gaps;
            }

            var offset = this.style('stroke-dashoffset').toPixels();

            if (typeof ctx.lineDashOffset !== 'undefined') {
              ctx.lineDashOffset = offset;
            } else if (typeof ctx.webkitLineDashOffset !== 'undefined') {
              ctx.webkitLineDashOffset = offset;
            } else if (typeof ctx.mozDashOffset !== 'undefined') {
              ctx.mozDashOffset = offset;
            }
          }
        } // font


        if (typeof ctx.font !== 'undefined') {
          ctx.font = svg.Font.CreateFont(this.style('font-style').value, this.style('font-variant').value, this.style('font-weight').value, this.style('font-size').hasValue() ? this.style('font-size').toPixels() + 'px' : '', this.style('font-family').value).toString(); // update em size if needed

          var currentFontSize = this.style('font-size', false, false);

          if (currentFontSize.isPixels()) {
            svg.emSize = currentFontSize.toPixels();
          }
        } // transform


        if (this.style('transform', false, true).hasValue()) {
          var transform = new svg.Transform(this.style('transform', false, true).value);
          transform.apply(ctx);
        } // clip


        if (this.style('clip-path', false, true).hasValue()) {
          var clip = this.style('clip-path', false, true).getDefinition();
          if (!isNullish(clip)) clip.apply(ctx);
        } // opacity


        ctx.globalAlpha = this.calculateOpacity();
      };
    };

    svg.Element.RenderedElementBase.prototype = new svg.Element.ElementBase();

    svg.Element.PathElementBase = function (node) {
      this.base = svg.Element.RenderedElementBase;
      this.base(node);

      this.path = function (ctx) {
        if (!isNullish(ctx)) ctx.beginPath();
        return new svg.BoundingBox();
      };

      this.renderChildren = function (ctx) {
        this.path(ctx);
        svg.Mouse.checkPath(this, ctx);

        if (ctx.fillStyle !== '') {
          if (this.style('fill-rule').valueOrDefault('inherit') !== 'inherit') {
            ctx.fill(this.style('fill-rule').value);
          } else {
            ctx.fill();
          }
        }

        if (ctx.strokeStyle !== '') ctx.stroke();
        var markers = this.getMarkers();

        if (!isNullish(markers)) {
          if (this.style('marker-start').isUrlDefinition()) {
            var marker = this.style('marker-start').getDefinition();
            marker.render(ctx, markers[0][0], markers[0][1]);
          }

          if (this.style('marker-mid').isUrlDefinition()) {
            var _marker = this.style('marker-mid').getDefinition();

            for (var i = 1; i < markers.length - 1; i++) {
              _marker.render(ctx, markers[i][0], markers[i][1]);
            }
          }

          if (this.style('marker-end').isUrlDefinition()) {
            var _marker2 = this.style('marker-end').getDefinition();

            _marker2.render(ctx, markers[markers.length - 1][0], markers[markers.length - 1][1]);
          }
        }
      };

      this.getBoundingBox = function () {
        return this.path();
      };

      this.getMarkers = function () {
        return null;
      };
    };

    svg.Element.PathElementBase.prototype = new svg.Element.RenderedElementBase();

    svg.SetDefaults = function (ctx) {
      // initial values and defaults
      ctx.strokeStyle = 'rgba(0,0,0,0)';
      ctx.lineCap = 'butt';
      ctx.lineJoin = 'miter';
      ctx.miterLimit = 4;
    }; // svg element


    svg.Element.svg = function (node) {
      this.base = svg.Element.RenderedElementBase;
      this.base(node);
      this.baseClearContext = this.clearContext;

      this.clearContext = function (ctx) {
        this.baseClearContext(ctx);
        svg.ViewPort.RemoveCurrent();
      };

      this.baseSetContext = this.setContext;

      this.setContext = function (ctx) {
        svg.SetDefaults(ctx);

        if (ctx.canvas.style && typeof ctx.font !== 'undefined' && typeof windowEnv.getComputedStyle !== 'undefined') {
          ctx.font = windowEnv.getComputedStyle(ctx.canvas).getPropertyValue('font');
          var fontSize = new svg.Property('fontSize', svg.Font.Parse(ctx.font).fontSize);
          if (fontSize.hasValue()) svg.rootEmSize = svg.emSize = fontSize.toPixels('y');
        }

        this.baseSetContext(ctx); // create new view port

        if (!this.attribute('x').hasValue()) this.attribute('x', true).value = 0;
        if (!this.attribute('y').hasValue()) this.attribute('y', true).value = 0;
        ctx.translate(this.attribute('x').toPixels('x'), this.attribute('y').toPixels('y'));
        var width = svg.ViewPort.width();
        var height = svg.ViewPort.height();
        if (!this.attribute('width').hasValue()) this.attribute('width', true).value = '100%';
        if (!this.attribute('height').hasValue()) this.attribute('height', true).value = '100%';

        if (typeof this.root === 'undefined') {
          width = this.attribute('width').toPixels('x');
          height = this.attribute('height').toPixels('y');
          var x = 0;
          var y = 0;

          if (this.attribute('refX').hasValue() && this.attribute('refY').hasValue()) {
            x = -this.attribute('refX').toPixels('x');
            y = -this.attribute('refY').toPixels('y');
          }

          if (this.attribute('overflow').valueOrDefault('hidden') !== 'visible') {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(width, y);
            ctx.lineTo(width, height);
            ctx.lineTo(x, height);
            ctx.closePath();
            ctx.clip();
          }
        }

        svg.ViewPort.SetCurrent(width, height); // viewbox

        if (this.attribute('viewBox').hasValue()) {
          var viewBox = svg.ToNumberArray(this.attribute('viewBox').value);
          var minX = viewBox[0];
          var minY = viewBox[1];
          width = viewBox[2];
          height = viewBox[3];
          svg.AspectRatio(ctx, this.attribute('preserveAspectRatio').value, svg.ViewPort.width(), width, svg.ViewPort.height(), height, minX, minY, this.attribute('refX').value, this.attribute('refY').value);
          svg.ViewPort.RemoveCurrent();
          svg.ViewPort.SetCurrent(viewBox[2], viewBox[3]);
        }
      };
    };

    svg.Element.svg.prototype = new svg.Element.RenderedElementBase(); // rect element

    svg.Element.rect = function (node) {
      this.base = svg.Element.PathElementBase;
      this.base(node);

      this.path = function (ctx) {
        var x = this.attribute('x').toPixels('x');
        var y = this.attribute('y').toPixels('y');
        var width = this.attribute('width').toPixels('x');
        var height = this.attribute('height').toPixels('y');
        var rx = this.attribute('rx').toPixels('x');
        var ry = this.attribute('ry').toPixels('y');
        if (this.attribute('rx').hasValue() && !this.attribute('ry').hasValue()) ry = rx;
        if (this.attribute('ry').hasValue() && !this.attribute('rx').hasValue()) rx = ry;
        rx = Math.min(rx, width / 2.0);
        ry = Math.min(ry, height / 2.0);

        if (!isNullish(ctx)) {
          var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
          ctx.beginPath(); // always start the path so we don't fill prior paths

          if (height > 0 && width > 0) {
            ctx.moveTo(x + rx, y);
            ctx.lineTo(x + width - rx, y);
            ctx.bezierCurveTo(x + width - rx + KAPPA * rx, y, x + width, y + ry - KAPPA * ry, x + width, y + ry);
            ctx.lineTo(x + width, y + height - ry);
            ctx.bezierCurveTo(x + width, y + height - ry + KAPPA * ry, x + width - rx + KAPPA * rx, y + height, x + width - rx, y + height);
            ctx.lineTo(x + rx, y + height);
            ctx.bezierCurveTo(x + rx - KAPPA * rx, y + height, x, y + height - ry + KAPPA * ry, x, y + height - ry);
            ctx.lineTo(x, y + ry);
            ctx.bezierCurveTo(x, y + ry - KAPPA * ry, x + rx - KAPPA * rx, y, x + rx, y);
            ctx.closePath();
          }
        }

        return new svg.BoundingBox(x, y, x + width, y + height);
      };
    };

    svg.Element.rect.prototype = new svg.Element.PathElementBase(); // circle element

    svg.Element.circle = function (node) {
      this.base = svg.Element.PathElementBase;
      this.base(node);

      this.path = function (ctx) {
        var cx = this.attribute('cx').toPixels('x');
        var cy = this.attribute('cy').toPixels('y');
        var r = this.attribute('r').toPixels();

        if (!isNullish(ctx) && r > 0) {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2, false);
          ctx.closePath();
        }

        return new svg.BoundingBox(cx - r, cy - r, cx + r, cy + r);
      };
    };

    svg.Element.circle.prototype = new svg.Element.PathElementBase(); // ellipse element

    svg.Element.ellipse = function (node) {
      this.base = svg.Element.PathElementBase;
      this.base(node);

      this.path = function (ctx) {
        var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
        var rx = this.attribute('rx').toPixels('x');
        var ry = this.attribute('ry').toPixels('y');
        var cx = this.attribute('cx').toPixels('x');
        var cy = this.attribute('cy').toPixels('y');

        if (!isNullish(ctx)) {
          ctx.beginPath();
          ctx.moveTo(cx + rx, cy);
          ctx.bezierCurveTo(cx + rx, cy + KAPPA * ry, cx + KAPPA * rx, cy + ry, cx, cy + ry);
          ctx.bezierCurveTo(cx - KAPPA * rx, cy + ry, cx - rx, cy + KAPPA * ry, cx - rx, cy);
          ctx.bezierCurveTo(cx - rx, cy - KAPPA * ry, cx - KAPPA * rx, cy - ry, cx, cy - ry);
          ctx.bezierCurveTo(cx + KAPPA * rx, cy - ry, cx + rx, cy - KAPPA * ry, cx + rx, cy);
          ctx.closePath();
        }

        return new svg.BoundingBox(cx - rx, cy - ry, cx + rx, cy + ry);
      };
    };

    svg.Element.ellipse.prototype = new svg.Element.PathElementBase(); // line element

    svg.Element.line = function (node) {
      this.base = svg.Element.PathElementBase;
      this.base(node);

      this.getPoints = function () {
        return [new svg.Point(this.attribute('x1').toPixels('x'), this.attribute('y1').toPixels('y')), new svg.Point(this.attribute('x2').toPixels('x'), this.attribute('y2').toPixels('y'))];
      };

      this.path = function (ctx) {
        var points = this.getPoints();

        if (!isNullish(ctx)) {
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          ctx.lineTo(points[1].x, points[1].y);
        }

        return new svg.BoundingBox(points[0].x, points[0].y, points[1].x, points[1].y);
      };

      this.getMarkers = function () {
        var points = this.getPoints();
        var a = points[0].angleTo(points[1]);
        return [[points[0], a], [points[1], a]];
      };
    };

    svg.Element.line.prototype = new svg.Element.PathElementBase(); // polyline element

    svg.Element.polyline = function (node) {
      this.base = svg.Element.PathElementBase;
      this.base(node);
      this.points = svg.CreatePath(this.attribute('points').value);

      this.path = function (ctx) {
        var bb = new svg.BoundingBox(this.points[0].x, this.points[0].y);

        if (!isNullish(ctx)) {
          ctx.beginPath();
          ctx.moveTo(this.points[0].x, this.points[0].y);
        }

        for (var i = 1; i < this.points.length; i++) {
          bb.addPoint(this.points[i].x, this.points[i].y);
          if (!isNullish(ctx)) ctx.lineTo(this.points[i].x, this.points[i].y);
        }

        return bb;
      };

      this.getMarkers = function () {
        var markers = [];

        for (var i = 0; i < this.points.length - 1; i++) {
          markers.push([this.points[i], this.points[i].angleTo(this.points[i + 1])]);
        }

        if (markers.length > 0) {
          markers.push([this.points[this.points.length - 1], markers[markers.length - 1][1]]);
        }

        return markers;
      };
    };

    svg.Element.polyline.prototype = new svg.Element.PathElementBase(); // polygon element

    svg.Element.polygon = function (node) {
      this.base = svg.Element.polyline;
      this.base(node);
      this.basePath = this.path;

      this.path = function (ctx) {
        var bb = this.basePath(ctx);

        if (!isNullish(ctx)) {
          ctx.lineTo(this.points[0].x, this.points[0].y);
          ctx.closePath();
        }

        return bb;
      };
    };

    svg.Element.polygon.prototype = new svg.Element.polyline(); // path element

    svg.Element.path = function (node) {
      this.base = svg.Element.PathElementBase;
      this.base(node);
      var d = this.attribute('d').value; // TODO: convert to real lexer based on http://www.w3.org/TR/SVG11/paths.html#PathDataBNF

      d = d.replace(/,/gm, ' '); // get rid of all commas
      // As the end of a match can also be the start of the next match, we need to run this replace twice.

      for (var i = 0; i < 2; i++) {
        d = d.replace(/([ACHLMQSTVZachlmqstvz])((?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/gm, '$1 $2'); // suffix commands with spaces
      }

      d = d.replace(/((?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))([ACHLMQSTVZachlmqstvz])/gm, '$1 $2'); // prefix commands with spaces

      d = d.replace(/([0-9])([\+\x2D])/gm, '$1 $2'); // separate digits on +- signs
      // Again, we need to run this twice to find all occurances

      for (var _i3 = 0; _i3 < 2; _i3++) {
        d = d.replace(/(\.[0-9]*)(\.)/gm, '$1 $2'); // separate digits when they start with a comma
      }

      d = d.replace(/([Aa]([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+[0-9]+)(?:[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+[0-9]+)(?:[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+[0-9]+))[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+([01])[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([01])/gm, '$1 $3 $4 '); // shorthand elliptical arc path syntax

      d = svg.compressSpaces(d); // compress multiple spaces

      d = svg.trim(d);
      this.PathParser = new function (d2) {
        this.tokens = d2.split(' ');

        this.reset = function () {
          this.i = -1;
          this.command = '';
          this.previousCommand = '';
          this.start = new svg.Point(0, 0);
          this.control = new svg.Point(0, 0);
          this.current = new svg.Point(0, 0);
          this.points = [];
          this.angles = [];
        };

        this.isEnd = function () {
          return this.i >= this.tokens.length - 1;
        };

        this.isCommandOrEnd = function () {
          if (this.isEnd()) return true;
          return !isNullish(this.tokens[this.i + 1].match(/^[A-Za-z]$/));
        };

        this.isRelativeCommand = function () {
          switch (this.command) {
            case 'm':
            case 'l':
            case 'h':
            case 'v':
            case 'c':
            case 's':
            case 'q':
            case 't':
            case 'a':
            case 'z':
              return true;
          }

          return false;
        };

        this.getToken = function () {
          this.i++;
          return this.tokens[this.i];
        };

        this.getScalar = function () {
          return parseFloat(this.getToken());
        };

        this.nextCommand = function () {
          this.previousCommand = this.command;
          this.command = this.getToken();
        };

        this.getPoint = function () {
          var p = new svg.Point(this.getScalar(), this.getScalar());
          return this.makeAbsolute(p);
        };

        this.getAsControlPoint = function () {
          var p = this.getPoint();
          this.control = p;
          return p;
        };

        this.getAsCurrentPoint = function () {
          var p = this.getPoint();
          this.current = p;
          return p;
        };

        this.getReflectedControlPoint = function () {
          if (this.previousCommand.toLowerCase() !== 'c' && this.previousCommand.toLowerCase() !== 's' && this.previousCommand.toLowerCase() !== 'q' && this.previousCommand.toLowerCase() !== 't') {
            return this.current;
          } // reflect point


          var p = new svg.Point(2 * this.current.x - this.control.x, 2 * this.current.y - this.control.y);
          return p;
        };

        this.makeAbsolute = function (p) {
          if (this.isRelativeCommand()) {
            p.x += this.current.x;
            p.y += this.current.y;
          }

          return p;
        };

        this.addMarker = function (p, from, priorTo) {
          // if the last angle isn't filled in because we didn't have this point yet ...
          if (!isNullish(priorTo) && this.angles.length > 0 && isNullish(this.angles[this.angles.length - 1])) {
            this.angles[this.angles.length - 1] = this.points[this.points.length - 1].angleTo(priorTo);
          }

          this.addMarkerAngle(p, isNullish(from) ? null : from.angleTo(p));
        };

        this.addMarkerAngle = function (p, a) {
          this.points.push(p);
          this.angles.push(a);
        };

        this.getMarkerPoints = function () {
          return this.points;
        };

        this.getMarkerAngles = function () {
          for (var _i4 = 0; _i4 < this.angles.length; _i4++) {
            if (isNullish(this.angles[_i4])) {
              for (var j = _i4 + 1; j < this.angles.length; j++) {
                if (!isNullish(this.angles[j])) {
                  this.angles[_i4] = this.angles[j];
                  break;
                }
              }
            }
          }

          return this.angles;
        };
      }(d);

      this.path = function (ctx) {
        var pp = this.PathParser;
        pp.reset();
        var bb = new svg.BoundingBox();
        if (!isNullish(ctx)) ctx.beginPath();

        while (!pp.isEnd()) {
          pp.nextCommand();

          switch (pp.command) {
            case 'M':
            case 'm':
              {
                var p = pp.getAsCurrentPoint();
                pp.addMarker(p);
                bb.addPoint(p.x, p.y);
                if (!isNullish(ctx)) ctx.moveTo(p.x, p.y);
                pp.start = pp.current;

                while (!pp.isCommandOrEnd()) {
                  var pt = pp.getAsCurrentPoint();
                  pp.addMarker(pt, pp.start);
                  bb.addPoint(pt.x, pt.y);
                  if (!isNullish(ctx)) ctx.lineTo(pt.x, pt.y);
                }

                break;
              }

            case 'L':
            case 'l':
              {
                while (!pp.isCommandOrEnd()) {
                  var c = pp.current;

                  var _p = pp.getAsCurrentPoint();

                  pp.addMarker(_p, c);
                  bb.addPoint(_p.x, _p.y);
                  if (!isNullish(ctx)) ctx.lineTo(_p.x, _p.y);
                }

                break;
              }

            case 'H':
            case 'h':
              while (!pp.isCommandOrEnd()) {
                var newP = new svg.Point((pp.isRelativeCommand() ? pp.current.x : 0) + pp.getScalar(), pp.current.y);
                pp.addMarker(newP, pp.current);
                pp.current = newP;
                bb.addPoint(pp.current.x, pp.current.y);
                if (!isNullish(ctx)) ctx.lineTo(pp.current.x, pp.current.y);
              }

              break;

            case 'V':
            case 'v':
              while (!pp.isCommandOrEnd()) {
                var _newP = new svg.Point(pp.current.x, (pp.isRelativeCommand() ? pp.current.y : 0) + pp.getScalar());

                pp.addMarker(_newP, pp.current);
                pp.current = _newP;
                bb.addPoint(pp.current.x, pp.current.y);
                if (!isNullish(ctx)) ctx.lineTo(pp.current.x, pp.current.y);
              }

              break;

            case 'C':
            case 'c':
              while (!pp.isCommandOrEnd()) {
                var curr = pp.current;
                var p1 = pp.getPoint();
                var cntrl = pp.getAsControlPoint();
                var cp = pp.getAsCurrentPoint();
                pp.addMarker(cp, cntrl, p1);
                bb.addBezierCurve(curr.x, curr.y, p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
                if (!isNullish(ctx)) ctx.bezierCurveTo(p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
              }

              break;

            case 'S':
            case 's':
              while (!pp.isCommandOrEnd()) {
                var _curr = pp.current;

                var _p2 = pp.getReflectedControlPoint();

                var _cntrl = pp.getAsControlPoint();

                var _cp = pp.getAsCurrentPoint();

                pp.addMarker(_cp, _cntrl, _p2);
                bb.addBezierCurve(_curr.x, _curr.y, _p2.x, _p2.y, _cntrl.x, _cntrl.y, _cp.x, _cp.y);
                if (!isNullish(ctx)) ctx.bezierCurveTo(_p2.x, _p2.y, _cntrl.x, _cntrl.y, _cp.x, _cp.y);
              }

              break;

            case 'Q':
            case 'q':
              while (!pp.isCommandOrEnd()) {
                var _curr2 = pp.current;

                var _cntrl2 = pp.getAsControlPoint();

                var _cp2 = pp.getAsCurrentPoint();

                pp.addMarker(_cp2, _cntrl2, _cntrl2);
                bb.addQuadraticCurve(_curr2.x, _curr2.y, _cntrl2.x, _cntrl2.y, _cp2.x, _cp2.y);
                if (!isNullish(ctx)) ctx.quadraticCurveTo(_cntrl2.x, _cntrl2.y, _cp2.x, _cp2.y);
              }

              break;

            case 'T':
            case 't':
              while (!pp.isCommandOrEnd()) {
                var _curr3 = pp.current;

                var _cntrl3 = pp.getReflectedControlPoint();

                pp.control = _cntrl3;

                var _cp3 = pp.getAsCurrentPoint();

                pp.addMarker(_cp3, _cntrl3, _cntrl3);
                bb.addQuadraticCurve(_curr3.x, _curr3.y, _cntrl3.x, _cntrl3.y, _cp3.x, _cp3.y);
                if (!isNullish(ctx)) ctx.quadraticCurveTo(_cntrl3.x, _cntrl3.y, _cp3.x, _cp3.y);
              }

              break;

            case 'A':
            case 'a':
              var _loop2 = function _loop2() {
                var curr = pp.current;
                var rx = pp.getScalar();
                var ry = pp.getScalar();
                var xAxisRotation = pp.getScalar() * (Math.PI / 180.0);
                var largeArcFlag = pp.getScalar();
                var sweepFlag = pp.getScalar();
                var cp = pp.getAsCurrentPoint(); // Conversion from endpoint to center parameterization
                // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
                // x1', y1'

                var currp = new svg.Point(Math.cos(xAxisRotation) * (curr.x - cp.x) / 2.0 + Math.sin(xAxisRotation) * (curr.y - cp.y) / 2.0, -Math.sin(xAxisRotation) * (curr.x - cp.x) / 2.0 + Math.cos(xAxisRotation) * (curr.y - cp.y) / 2.0); // adjust radii

                var l = Math.pow(currp.x, 2) / Math.pow(rx, 2) + Math.pow(currp.y, 2) / Math.pow(ry, 2);

                if (l > 1) {
                  rx *= Math.sqrt(l);
                  ry *= Math.sqrt(l);
                } // cx', cy'


                var s = (largeArcFlag === sweepFlag ? -1 : 1) * Math.sqrt((Math.pow(rx, 2) * Math.pow(ry, 2) - Math.pow(rx, 2) * Math.pow(currp.y, 2) - Math.pow(ry, 2) * Math.pow(currp.x, 2)) / (Math.pow(rx, 2) * Math.pow(currp.y, 2) + Math.pow(ry, 2) * Math.pow(currp.x, 2)));
                if (isNaN(s)) s = 0;
                var cpp = new svg.Point(s * rx * currp.y / ry, s * -ry * currp.x / rx); // cx, cy

                var centp = new svg.Point((curr.x + cp.x) / 2.0 + Math.cos(xAxisRotation) * cpp.x - Math.sin(xAxisRotation) * cpp.y, (curr.y + cp.y) / 2.0 + Math.sin(xAxisRotation) * cpp.x + Math.cos(xAxisRotation) * cpp.y); // vector magnitude

                var m = function m(v) {
                  return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
                }; // ratio between two vectors


                var r = function r(u, v) {
                  return (u[0] * v[0] + u[1] * v[1]) / (m(u) * m(v));
                }; // angle between two vectors


                var a = function a(u, v) {
                  return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(r(u, v));
                }; // initial angle


                var a1 = a([1, 0], [(currp.x - cpp.x) / rx, (currp.y - cpp.y) / ry]); // angle delta

                var u = [(currp.x - cpp.x) / rx, (currp.y - cpp.y) / ry];
                var v = [(-currp.x - cpp.x) / rx, (-currp.y - cpp.y) / ry];
                var ad = a(u, v);
                if (r(u, v) <= -1) ad = Math.PI;
                if (r(u, v) >= 1) ad = 0; // for markers

                var dir = 1 - sweepFlag ? 1.0 : -1.0;
                var ah = a1 + dir * (ad / 2.0);
                var halfWay = new svg.Point(centp.x + rx * Math.cos(ah), centp.y + ry * Math.sin(ah));
                pp.addMarkerAngle(halfWay, ah - dir * Math.PI / 2);
                pp.addMarkerAngle(cp, ah - dir * Math.PI);
                bb.addPoint(cp.x, cp.y); // TODO: this is too naive, make it better

                if (!isNullish(ctx) && !isNaN(a1) && !isNaN(ad)) {
                  var r2 = rx > ry ? rx : ry;
                  var sx = rx > ry ? 1 : rx / ry;
                  var sy = rx > ry ? ry / rx : 1;
                  ctx.translate(centp.x, centp.y);
                  ctx.rotate(xAxisRotation);
                  ctx.scale(sx, sy);
                  ctx.arc(0, 0, r2, a1, a1 + ad, 1 - sweepFlag);
                  ctx.scale(1 / sx, 1 / sy);
                  ctx.rotate(-xAxisRotation);
                  ctx.translate(-centp.x, -centp.y);
                }
              };

              while (!pp.isCommandOrEnd()) {
                _loop2();
              }

              break;

            case 'Z':
            case 'z':
              if (!isNullish(ctx)) {
                // only close path if it is not a straight line
                if (bb.x1 !== bb.x2 && bb.y1 !== bb.y2) {
                  ctx.closePath();
                }
              }

              pp.current = pp.start;
          }
        }

        return bb;
      };

      this.getMarkers = function () {
        var points = this.PathParser.getMarkerPoints();
        var angles = this.PathParser.getMarkerAngles();
        var markers = [];

        for (var _i5 = 0; _i5 < points.length; _i5++) {
          markers.push([points[_i5], angles[_i5]]);
        }

        return markers;
      };
    };

    svg.Element.path.prototype = new svg.Element.PathElementBase(); // pattern element

    svg.Element.pattern = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.createPattern = function (ctx, element, parentOpacityProp) {
        var width = this.attribute('width').toPixels('x', true);
        var height = this.attribute('height').toPixels('y', true); // render me using a temporary svg element

        var tempSvg = new svg.Element.svg();
        tempSvg.attributes.viewBox = new svg.Property('viewBox', this.attribute('viewBox').value);
        tempSvg.attributes.width = new svg.Property('width', width + 'px');
        tempSvg.attributes.height = new svg.Property('height', height + 'px');
        tempSvg.attributes.transform = new svg.Property('transform', this.attribute('patternTransform').value);
        tempSvg.children = this.children;
        var c = createCanvas(width, height);
        var cctx = c.getContext('2d');

        if (this.attribute('x').hasValue() && this.attribute('y').hasValue()) {
          cctx.translate(this.attribute('x').toPixels('x', true), this.attribute('y').toPixels('y', true));
        }

        if (parentOpacityProp.hasValue()) {
          this.styles['fill-opacity'] = parentOpacityProp;
        } else {
          delete this.styles['fill-opacity'];
        } // render 3x3 grid so when we transform there's no white space on edges


        for (var x = -1; x <= 1; x++) {
          for (var y = -1; y <= 1; y++) {
            cctx.save();
            tempSvg.attributes.x = new svg.Property('x', x * c.width);
            tempSvg.attributes.y = new svg.Property('y', y * c.height);
            tempSvg.render(cctx);
            cctx.restore();
          }
        }

        var pattern = ctx.createPattern(c, 'repeat');
        return pattern;
      };
    };

    svg.Element.pattern.prototype = new svg.Element.ElementBase(); // marker element

    svg.Element.marker = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);
      this.baseRender = this.render;

      this.render = function (ctx, point, angle) {
        if (!point) {
          return;
        }

        ctx.translate(point.x, point.y);
        if (this.attribute('orient').valueOrDefault('auto') === 'auto') ctx.rotate(angle);
        if (this.attribute('markerUnits').valueOrDefault('strokeWidth') === 'strokeWidth') ctx.scale(ctx.lineWidth, ctx.lineWidth);
        ctx.save(); // render me using a temporary svg element

        var tempSvg = new svg.Element.svg();
        tempSvg.attributes.viewBox = new svg.Property('viewBox', this.attribute('viewBox').value);
        tempSvg.attributes.refX = new svg.Property('refX', this.attribute('refX').value);
        tempSvg.attributes.refY = new svg.Property('refY', this.attribute('refY').value);
        tempSvg.attributes.width = new svg.Property('width', this.attribute('markerWidth').value);
        tempSvg.attributes.height = new svg.Property('height', this.attribute('markerHeight').value);
        tempSvg.attributes.fill = new svg.Property('fill', this.attribute('fill').valueOrDefault('black'));
        tempSvg.attributes.stroke = new svg.Property('stroke', this.attribute('stroke').valueOrDefault('none'));
        tempSvg.children = this.children;
        tempSvg.render(ctx);
        ctx.restore();
        if (this.attribute('markerUnits').valueOrDefault('strokeWidth') === 'strokeWidth') ctx.scale(1 / ctx.lineWidth, 1 / ctx.lineWidth);
        if (this.attribute('orient').valueOrDefault('auto') === 'auto') ctx.rotate(-angle);
        ctx.translate(-point.x, -point.y);
      };
    };

    svg.Element.marker.prototype = new svg.Element.ElementBase(); // definitions element

    svg.Element.defs = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.render = function ()
      /* ctx */
      {// NOOP
      };
    };

    svg.Element.defs.prototype = new svg.Element.ElementBase(); // base for gradients

    svg.Element.GradientBase = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);
      this.stops = [];

      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        if (child.type === 'stop') this.stops.push(child);
      }

      this.getGradient = function () {// OVERRIDE ME!
      };

      this.gradientUnits = function () {
        return this.attribute('gradientUnits').valueOrDefault('objectBoundingBox');
      };

      this.attributesToInherit = ['gradientUnits'];

      this.inheritStopContainer = function (stopsContainer) {
        for (var _i6 = 0; _i6 < this.attributesToInherit.length; _i6++) {
          var attributeToInherit = this.attributesToInherit[_i6];

          if (!this.attribute(attributeToInherit).hasValue() && stopsContainer.attribute(attributeToInherit).hasValue()) {
            this.attribute(attributeToInherit, true).value = stopsContainer.attribute(attributeToInherit).value;
          }
        }
      };

      this.createGradient = function (ctx, element, parentOpacityProp) {
        var stopsContainer = this;

        if (this.getHrefAttribute().hasValue()) {
          stopsContainer = this.getHrefAttribute().getDefinition();
          this.inheritStopContainer(stopsContainer);
        }

        var addParentOpacity = function addParentOpacity(color) {
          if (parentOpacityProp.hasValue()) {
            var p = new svg.Property('color', color);
            return p.addOpacity(parentOpacityProp).value;
          }

          return color;
        };

        var g = this.getGradient(ctx, element);
        if (isNullish(g)) return addParentOpacity(stopsContainer.stops[stopsContainer.stops.length - 1].color);

        for (var _i7 = 0; _i7 < stopsContainer.stops.length; _i7++) {
          g.addColorStop(stopsContainer.stops[_i7].offset, addParentOpacity(stopsContainer.stops[_i7].color));
        }

        if (this.attribute('gradientTransform').hasValue()) {
          // render as transformed pattern on temporary canvas
          var rootView = svg.ViewPort.viewPorts[0];
          var rect = new svg.Element.rect();
          rect.attributes.x = new svg.Property('x', -svg.MAX_VIRTUAL_PIXELS / 3.0);
          rect.attributes.y = new svg.Property('y', -svg.MAX_VIRTUAL_PIXELS / 3.0);
          rect.attributes.width = new svg.Property('width', svg.MAX_VIRTUAL_PIXELS);
          rect.attributes.height = new svg.Property('height', svg.MAX_VIRTUAL_PIXELS);
          var group = new svg.Element.g();
          group.attributes.transform = new svg.Property('transform', this.attribute('gradientTransform').value);
          group.children = [rect];
          var tempSvg = new svg.Element.svg();
          tempSvg.attributes.x = new svg.Property('x', 0);
          tempSvg.attributes.y = new svg.Property('y', 0);
          tempSvg.attributes.width = new svg.Property('width', rootView.width);
          tempSvg.attributes.height = new svg.Property('height', rootView.height);
          tempSvg.children = [group];
          var c = createCanvas(rootView.width, rootView.height);
          var tempCtx = c.getContext('2d');
          tempCtx.fillStyle = g;
          tempSvg.render(tempCtx);
          return tempCtx.createPattern(c, 'no-repeat');
        }

        return g;
      };
    };

    svg.Element.GradientBase.prototype = new svg.Element.ElementBase(); // linear gradient element

    svg.Element.linearGradient = function (node) {
      this.base = svg.Element.GradientBase;
      this.base(node);
      this.attributesToInherit.push('x1');
      this.attributesToInherit.push('y1');
      this.attributesToInherit.push('x2');
      this.attributesToInherit.push('y2');

      this.getGradient = function (ctx, element) {
        var bb = this.gradientUnits() === 'objectBoundingBox' ? element.getBoundingBox(ctx) : null;

        if (!this.attribute('x1').hasValue() && !this.attribute('y1').hasValue() && !this.attribute('x2').hasValue() && !this.attribute('y2').hasValue()) {
          this.attribute('x1', true).value = 0;
          this.attribute('y1', true).value = 0;
          this.attribute('x2', true).value = 1;
          this.attribute('y2', true).value = 0;
        }

        var x1 = this.gradientUnits() === 'objectBoundingBox' ? bb.x() + bb.width() * this.attribute('x1').numValue() : this.attribute('x1').toPixels('x');
        var y1 = this.gradientUnits() === 'objectBoundingBox' ? bb.y() + bb.height() * this.attribute('y1').numValue() : this.attribute('y1').toPixels('y');
        var x2 = this.gradientUnits() === 'objectBoundingBox' ? bb.x() + bb.width() * this.attribute('x2').numValue() : this.attribute('x2').toPixels('x');
        var y2 = this.gradientUnits() === 'objectBoundingBox' ? bb.y() + bb.height() * this.attribute('y2').numValue() : this.attribute('y2').toPixels('y');
        if (x1 === x2 && y1 === y2) return null;
        return ctx.createLinearGradient(x1, y1, x2, y2);
      };
    };

    svg.Element.linearGradient.prototype = new svg.Element.GradientBase(); // radial gradient element

    svg.Element.radialGradient = function (node) {
      this.base = svg.Element.GradientBase;
      this.base(node);
      this.attributesToInherit.push('cx');
      this.attributesToInherit.push('cy');
      this.attributesToInherit.push('r');
      this.attributesToInherit.push('fx');
      this.attributesToInherit.push('fy');
      this.attributesToInherit.push('fr');

      this.getGradient = function (ctx, element) {
        var bb = element.getBoundingBox(ctx);
        if (!this.attribute('cx').hasValue()) this.attribute('cx', true).value = '50%';
        if (!this.attribute('cy').hasValue()) this.attribute('cy', true).value = '50%';
        if (!this.attribute('r').hasValue()) this.attribute('r', true).value = '50%';
        var cx = this.gradientUnits() === 'objectBoundingBox' ? bb.x() + bb.width() * this.attribute('cx').numValue() : this.attribute('cx').toPixels('x');
        var cy = this.gradientUnits() === 'objectBoundingBox' ? bb.y() + bb.height() * this.attribute('cy').numValue() : this.attribute('cy').toPixels('y');
        var fx = cx;
        var fy = cy;

        if (this.attribute('fx').hasValue()) {
          fx = this.gradientUnits() === 'objectBoundingBox' ? bb.x() + bb.width() * this.attribute('fx').numValue() : this.attribute('fx').toPixels('x');
        }

        if (this.attribute('fy').hasValue()) {
          fy = this.gradientUnits() === 'objectBoundingBox' ? bb.y() + bb.height() * this.attribute('fy').numValue() : this.attribute('fy').toPixels('y');
        }

        var r = this.gradientUnits() === 'objectBoundingBox' ? (bb.width() + bb.height()) / 2.0 * this.attribute('r').numValue() : this.attribute('r').toPixels();
        var fr = this.attribute('fr').toPixels();
        return ctx.createRadialGradient(fx, fy, fr, cx, cy, r);
      };
    };

    svg.Element.radialGradient.prototype = new svg.Element.GradientBase(); // gradient stop element

    svg.Element.stop = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);
      this.offset = this.attribute('offset').numValue();
      if (this.offset < 0) this.offset = 0;
      if (this.offset > 1) this.offset = 1;
      var stopColor = this.style('stop-color', true);
      if (stopColor.value === '') stopColor.value = '#000';
      if (this.style('stop-opacity').hasValue()) stopColor = stopColor.addOpacity(this.style('stop-opacity'));
      this.color = stopColor.value;
    };

    svg.Element.stop.prototype = new svg.Element.ElementBase(); // animation base element

    svg.Element.AnimateBase = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);
      svg.Animations.push(this);
      this.duration = 0.0;
      this.begin = this.attribute('begin').toMilliseconds();
      this.maxDuration = this.begin + this.attribute('dur').toMilliseconds();

      this.getProperty = function () {
        var attributeType = this.attribute('attributeType').value;
        var attributeName = this.attribute('attributeName').value;

        if (attributeType === 'CSS') {
          return this.parent.style(attributeName, true);
        }

        return this.parent.attribute(attributeName, true);
      };

      this.initialValue = null;
      this.initialUnits = '';
      this.removed = false;

      this.calcValue = function () {
        // OVERRIDE ME!
        return '';
      };

      this.update = function (delta) {
        // set initial value
        if (isNullish(this.initialValue)) {
          this.initialValue = this.getProperty().value;
          this.initialUnits = this.getProperty().getUnits();
        } // if we're past the end time


        if (this.duration > this.maxDuration) {
          // loop for indefinitely repeating animations
          if (this.attribute('repeatCount').value === 'indefinite' || this.attribute('repeatDur').value === 'indefinite') {
            this.duration = 0.0;
          } else if (this.attribute('fill').valueOrDefault('remove') === 'freeze' && !this.frozen) {
            this.frozen = true;
            this.parent.animationFrozen = true;
            this.parent.animationFrozenValue = this.getProperty().value;
          } else if (this.attribute('fill').valueOrDefault('remove') === 'remove' && !this.removed) {
            this.removed = true;
            this.getProperty().value = this.parent.animationFrozen ? this.parent.animationFrozenValue : this.initialValue;
            return true;
          }

          return false;
        }

        this.duration = this.duration + delta; // if we're past the begin time

        var updated = false;

        if (this.begin < this.duration) {
          var newValue = this.calcValue(); // tween

          if (this.attribute('type').hasValue()) {
            // for transform, etc.
            var type = this.attribute('type').value;
            newValue = type + '(' + newValue + ')';
          }

          this.getProperty().value = newValue;
          updated = true;
        }

        return updated;
      };

      this.from = this.attribute('from');
      this.to = this.attribute('to');
      this.values = this.attribute('values');
      if (this.values.hasValue()) this.values.value = this.values.value.split(';'); // fraction of duration we've covered

      this.progress = function () {
        var ret = {
          progress: (this.duration - this.begin) / (this.maxDuration - this.begin)
        };

        if (this.values.hasValue()) {
          var p = ret.progress * (this.values.value.length - 1);
          var lb = Math.floor(p),
              ub = Math.ceil(p);
          ret.from = new svg.Property('from', parseFloat(this.values.value[lb]));
          ret.to = new svg.Property('to', parseFloat(this.values.value[ub]));
          ret.progress = (p - lb) / (ub - lb);
        } else {
          ret.from = this.from;
          ret.to = this.to;
        }

        return ret;
      };
    };

    svg.Element.AnimateBase.prototype = new svg.Element.ElementBase(); // animate element

    svg.Element.animate = function (node) {
      this.base = svg.Element.AnimateBase;
      this.base(node);

      this.calcValue = function () {
        var p = this.progress(); // tween value linearly

        var newValue = p.from.numValue() + (p.to.numValue() - p.from.numValue()) * p.progress;

        if (this.initialUnits === '%') {
          newValue *= 100.0; // numValue() returns 0-1 whereas properties are 0-100
        }

        return newValue + this.initialUnits;
      };
    };

    svg.Element.animate.prototype = new svg.Element.AnimateBase(); // animate color element

    svg.Element.animateColor = function (node) {
      this.base = svg.Element.AnimateBase;
      this.base(node);

      this.calcValue = function () {
        var p = this.progress();
        var from = new RGBColor(p.from.value);
        var to = new RGBColor(p.to.value);

        if (from.ok && to.ok) {
          // tween color linearly
          var r = from.r + (to.r - from.r) * p.progress;
          var g = from.g + (to.g - from.g) * p.progress;
          var b = from.b + (to.b - from.b) * p.progress;
          return 'rgb(' + parseInt(r) + ',' + parseInt(g) + ',' + parseInt(b) + ')';
        }

        return this.attribute('from').value;
      };
    };

    svg.Element.animateColor.prototype = new svg.Element.AnimateBase(); // animate transform element

    svg.Element.animateTransform = function (node) {
      this.base = svg.Element.AnimateBase;
      this.base(node);

      this.calcValue = function () {
        var p = this.progress(); // tween value linearly

        var from = svg.ToNumberArray(p.from.value);
        var to = svg.ToNumberArray(p.to.value);
        var newValue = '';

        for (var i = 0; i < from.length; i++) {
          newValue += from[i] + (to[i] - from[i]) * p.progress + ' ';
        }

        return newValue;
      };
    };

    svg.Element.animateTransform.prototype = new svg.Element.animate(); // font element

    svg.Element.font = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);
      this.horizAdvX = this.attribute('horiz-adv-x').numValue();
      this.isRTL = false;
      this.isArabic = false;
      this.fontFace = null;
      this.missingGlyph = null;
      this.glyphs = [];

      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];

        if (child.type === 'font-face') {
          this.fontFace = child;

          if (child.style('font-family').hasValue()) {
            svg.Definitions[child.style('font-family').value] = this;
          }
        } else if (child.type === 'missing-glyph') this.missingGlyph = child;else if (child.type === 'glyph') {
          if (child.arabicForm !== '') {
            this.isRTL = true;
            this.isArabic = true;
            if (typeof this.glyphs[child.unicode] === 'undefined') this.glyphs[child.unicode] = [];
            this.glyphs[child.unicode][child.arabicForm] = child;
          } else {
            this.glyphs[child.unicode] = child;
          }
        }
      }

      this.render = function ()
      /* ctx */
      {// NO RENDER
      };
    };

    svg.Element.font.prototype = new svg.Element.ElementBase(); // font-face element

    svg.Element.fontface = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);
      this.ascent = this.attribute('ascent').value;
      this.descent = this.attribute('descent').value;
      this.unitsPerEm = this.attribute('units-per-em').numValue();
    };

    svg.Element.fontface.prototype = new svg.Element.ElementBase(); // missing-glyph element

    svg.Element.missingglyph = function (node) {
      this.base = svg.Element.path;
      this.base(node);
      this.horizAdvX = 0;
    };

    svg.Element.missingglyph.prototype = new svg.Element.path(); // glyph element

    svg.Element.glyph = function (node) {
      this.base = svg.Element.path;
      this.base(node);
      this.horizAdvX = this.attribute('horiz-adv-x').numValue();
      this.unicode = this.attribute('unicode').value;
      this.arabicForm = this.attribute('arabic-form').value;
    };

    svg.Element.glyph.prototype = new svg.Element.path(); // text element

    svg.Element.text = function (node) {
      this.captureTextNodes = true;
      this.base = svg.Element.RenderedElementBase;
      this.base(node);
      this.baseSetContext = this.setContext;

      this.setContext = function (ctx) {
        this.baseSetContext(ctx);
        var textBaseline = this.style('dominant-baseline').toTextBaseline();
        if (isNullish(textBaseline)) textBaseline = this.style('alignment-baseline').toTextBaseline();
        if (!isNullish(textBaseline)) ctx.textBaseline = textBaseline;
      };

      this.initializeCoordinates = function (ctx) {
        this.x = this.attribute('x').toPixels('x');
        this.y = this.attribute('y').toPixels('y');
        if (this.attribute('dx').hasValue()) this.x += this.attribute('dx').toPixels('x');
        if (this.attribute('dy').hasValue()) this.y += this.attribute('dy').toPixels('y');
        this.x += this.getAnchorDelta(ctx, this, 0);
      };

      this.getBoundingBox = function (ctx) {
        this.initializeCoordinates(ctx);
        var bb = null;

        for (var i = 0; i < this.children.length; i++) {
          var childBB = this.getChildBoundingBox(ctx, this, this, i);
          if (isNullish(bb)) bb = childBB;else bb.addBoundingBox(childBB);
        }

        return bb;
      };

      this.renderChildren = function (ctx) {
        this.initializeCoordinates(ctx);

        for (var i = 0; i < this.children.length; i++) {
          this.renderChild(ctx, this, this, i);
        }

        svg.Mouse.checkBoundingBox(this, this.getBoundingBox(ctx));
      };

      this.getAnchorDelta = function (ctx, parent, startI) {
        var textAnchor = this.style('text-anchor').valueOrDefault('start');

        if (textAnchor !== 'start') {
          var width = 0;

          for (var i = startI; i < parent.children.length; i++) {
            var child = parent.children[i];
            if (i > startI && child.attribute('x').hasValue()) break; // new group

            width += child.measureTextRecursive(ctx);
          }

          return -1 * (textAnchor === 'end' ? width : width / 2.0);
        }

        return 0;
      };

      this.adjustChildCoordinates = function (ctx, textParent, parent, i) {
        var child = parent.children[i];

        if (typeof child.measureText !== 'function') {
          return child;
        }

        if (child.attribute('x').hasValue()) {
          child.x = child.attribute('x').toPixels('x') + textParent.getAnchorDelta(ctx, parent, i); // local text-anchor

          var textAnchor = child.attribute('text-anchor').valueOrDefault('start');

          if (textAnchor !== 'start') {
            var width = child.measureTextRecursive(ctx);
            child.x += -1 * (textAnchor === 'end' ? width : width / 2.0);
          }

          if (child.attribute('dx').hasValue()) child.x += child.attribute('dx').toPixels('x');
        } else {
          if (child.attribute('dx').hasValue()) textParent.x += child.attribute('dx').toPixels('x');
          child.x = textParent.x;
        }

        textParent.x = child.x + child.measureText(ctx);

        if (child.attribute('y').hasValue()) {
          child.y = child.attribute('y').toPixels('y');
          if (child.attribute('dy').hasValue()) child.y += child.attribute('dy').toPixels('y');
        } else {
          if (child.attribute('dy').hasValue()) textParent.y += child.attribute('dy').toPixels('y');
          child.y = textParent.y;
        }

        textParent.y = child.y;
        return child;
      };

      this.getChildBoundingBox = function (ctx, textParent, parent, i) {
        var child = this.adjustChildCoordinates(ctx, textParent, parent, i);
        var bb = child.getBoundingBox(ctx);

        for (var j = 0; j < child.children.length; j++) {
          var childBB = textParent.getChildBoundingBox(ctx, textParent, child, j);
          bb.addBoundingBox(childBB);
        }

        return bb;
      };

      this.renderChild = function (ctx, textParent, parent, i) {
        var child = this.adjustChildCoordinates(ctx, textParent, parent, i);
        child.render(ctx);

        for (var j = 0; j < child.children.length; j++) {
          textParent.renderChild(ctx, textParent, child, j);
        }
      };
    };

    svg.Element.text.prototype = new svg.Element.RenderedElementBase(); // text base

    svg.Element.TextElementBase = function (node) {
      this.base = svg.Element.RenderedElementBase;
      this.base(node);

      this.getGlyph = function (font, text, i) {
        var c = text[i];
        var glyph = null;

        if (font.isArabic) {
          var arabicForm = 'isolated';
          if ((i === 0 || text[i - 1] === ' ') && i < text.length - 2 && text[i + 1] !== ' ') arabicForm = 'terminal';
          if (i > 0 && text[i - 1] !== ' ' && i < text.length - 2 && text[i + 1] !== ' ') arabicForm = 'medial';
          if (i > 0 && text[i - 1] !== ' ' && (i === text.length - 1 || text[i + 1] === ' ')) arabicForm = 'initial';

          if (typeof font.glyphs[c] !== 'undefined') {
            glyph = font.glyphs[c][arabicForm];
            if (isNullish(glyph) && font.glyphs[c].type === 'glyph') glyph = font.glyphs[c];
          }
        } else {
          glyph = font.glyphs[c];
        }

        if (isNullish(glyph)) glyph = font.missingGlyph;
        return glyph;
      };

      this.renderChildren = function (ctx) {
        var customFont = this.parent.style('font-family').getDefinition();

        if (!isNullish(customFont)) {
          var fontSize = this.parent.style('font-size').numValueOrDefault(svg.Font.Parse(svg.ctx.font).fontSize);
          var fontStyle = this.parent.style('font-style').valueOrDefault(svg.Font.Parse(svg.ctx.font).fontStyle);
          var text = this.getText();
          if (customFont.isRTL) text = text.split('').reverse().join('');
          var dx = svg.ToNumberArray(this.parent.attribute('dx').value);

          for (var i = 0; i < text.length; i++) {
            var glyph = this.getGlyph(customFont, text, i);
            var scale = fontSize / customFont.fontFace.unitsPerEm;
            ctx.translate(this.x, this.y);
            ctx.scale(scale, -scale);
            var lw = ctx.lineWidth;
            ctx.lineWidth = ctx.lineWidth * customFont.fontFace.unitsPerEm / fontSize;
            if (fontStyle === 'italic') ctx.transform(1, 0, 0.4, 1, 0, 0);
            glyph.render(ctx);
            if (fontStyle === 'italic') ctx.transform(1, 0, -0.4, 1, 0, 0);
            ctx.lineWidth = lw;
            ctx.scale(1 / scale, -1 / scale);
            ctx.translate(-this.x, -this.y);
            this.x += fontSize * (glyph.horizAdvX || customFont.horizAdvX) / customFont.fontFace.unitsPerEm;

            if (typeof dx[i] !== 'undefined' && !isNaN(dx[i])) {
              this.x += dx[i];
            }
          }

          return;
        }

        if (ctx.paintOrder === 'stroke') {
          if (ctx.strokeStyle !== '') ctx.strokeText(svg.compressSpaces(this.getText()), this.x, this.y);
          if (ctx.fillStyle !== '') ctx.fillText(svg.compressSpaces(this.getText()), this.x, this.y);
        } else {
          if (ctx.fillStyle !== '') ctx.fillText(svg.compressSpaces(this.getText()), this.x, this.y);
          if (ctx.strokeStyle !== '') ctx.strokeText(svg.compressSpaces(this.getText()), this.x, this.y);
        }
      };

      this.getText = function () {// OVERRIDE ME
      };

      this.measureTextRecursive = function (ctx) {
        var width = this.measureText(ctx);

        for (var i = 0; i < this.children.length; i++) {
          width += this.children[i].measureTextRecursive(ctx);
        }

        return width;
      };

      this.measureText = function (ctx) {
        var customFont = this.parent.style('font-family').getDefinition();

        if (!isNullish(customFont)) {
          var fontSize = this.parent.style('font-size').numValueOrDefault(svg.Font.Parse(svg.ctx.font).fontSize);
          var measure = 0;
          var text = this.getText();
          if (customFont.isRTL) text = text.split('').reverse().join('');
          var dx = svg.ToNumberArray(this.parent.attribute('dx').value);

          for (var i = 0; i < text.length; i++) {
            var glyph = this.getGlyph(customFont, text, i);
            measure += (glyph.horizAdvX || customFont.horizAdvX) * fontSize / customFont.fontFace.unitsPerEm;

            if (typeof dx[i] !== 'undefined' && !isNaN(dx[i])) {
              measure += dx[i];
            }
          }

          return measure;
        }

        var textToMeasure = svg.compressSpaces(this.getText());
        if (!ctx.measureText) return textToMeasure.length * 10;
        ctx.save();
        this.setContext(ctx, true);

        var _ctx$measureText = ctx.measureText(textToMeasure),
            width = _ctx$measureText.width;

        ctx.restore();
        return width;
      };

      this.getBoundingBox = function (ctx) {
        var fontSize = this.parent.style('font-size').numValueOrDefault(svg.Font.Parse(svg.ctx.font).fontSize);
        return new svg.BoundingBox(this.x, this.y - fontSize, this.x + this.measureText(ctx), this.y);
      };
    };

    svg.Element.TextElementBase.prototype = new svg.Element.RenderedElementBase(); // tspan

    svg.Element.tspan = function (node) {
      this.captureTextNodes = true;
      this.base = svg.Element.TextElementBase;
      this.base(node);
      this.text = svg.compressSpaces(node.value || node.text || node.textContent || '');

      this.getText = function () {
        // if this node has children, then they own the text
        if (this.children.length > 0) {
          return '';
        }

        return this.text;
      };
    };

    svg.Element.tspan.prototype = new svg.Element.TextElementBase(); // tref

    svg.Element.tref = function (node) {
      this.base = svg.Element.TextElementBase;
      this.base(node);

      this.getText = function () {
        var element = this.getHrefAttribute().getDefinition();
        if (!isNullish(element)) return element.children[0].getText();
        return undefined;
      };
    };

    svg.Element.tref.prototype = new svg.Element.TextElementBase(); // a element

    svg.Element.a = function (node) {
      this.base = svg.Element.TextElementBase;
      this.base(node);
      this.hasText = node.childNodes.length > 0;

      for (var i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i].nodeType !== 3) this.hasText = false;
      } // this might contain text


      this.text = this.hasText ? node.childNodes[0].value || node.childNodes[0].data : '';

      this.getText = function () {
        return this.text;
      };

      this.baseRenderChildren = this.renderChildren;

      this.renderChildren = function (ctx) {
        if (this.hasText) {
          // render as text element
          this.baseRenderChildren(ctx);
          var fontSize = new svg.Property('fontSize', svg.Font.Parse(svg.ctx.font).fontSize);
          svg.Mouse.checkBoundingBox(this, new svg.BoundingBox(this.x, this.y - fontSize.toPixels('y'), this.x + this.measureText(ctx), this.y));
        } else if (this.children.length > 0) {
          // render as temporary group
          var g = new svg.Element.g();
          g.children = this.children;
          g.parent = this;
          g.render(ctx);
        }
      };

      this.addEventListener('click', function () {
        windowEnv.open(this.getHrefAttribute().value);
      });
      this.addEventListener('mousemove', function () {
        svg.ctx.canvas.style.cursor = 'pointer';
      });
    };

    svg.Element.a.prototype = new svg.Element.TextElementBase(); // image element

    svg.Element.image = function (node) {
      this.base = svg.Element.RenderedElementBase;
      this.base(node);
      var href = this.getHrefAttribute().value;

      if (href === '') {
        return;
      }

      var isSvg = href.match(/\.svg$/);
      svg.Images.push(this);
      this.loaded = false;

      if (!isSvg) {
        this.img = doc.createElement('img');

        if (svg.opts.useCORS) {
          this.img.crossOrigin = 'Anonymous';
        }

        var that = this;
        this.img.addEventListener('load', function () {
          that.loaded = true;
        });
        this.img.addEventListener('error', function () {
          svg.log('ERROR: image "' + href + '" not found');
          that.loaded = true;
        });
        this.img.src = href;
      } else {
        this.img = svg.ajax(href);
        this.loaded = true;
      }

      this.renderChildren = function (ctx) {
        var x = this.attribute('x').toPixels('x');
        var y = this.attribute('y').toPixels('y');
        var width = this.attribute('width').toPixels('x');
        var height = this.attribute('height').toPixels('y');
        if (width === 0 || height === 0) return;
        ctx.save();

        if (isSvg) {
          ctx.drawSvg(this.img, x, y, width, height);
        } else {
          ctx.translate(x, y);
          svg.AspectRatio(ctx, this.attribute('preserveAspectRatio').value, width, this.img.width, height, this.img.height, 0, 0);

          if (self.loaded) {
            if (this.img.complete === undefined || this.img.complete) {
              ctx.drawImage(this.img, 0, 0);
            }
          }
        }

        ctx.restore();
      };

      this.getBoundingBox = function () {
        var x = this.attribute('x').toPixels('x');
        var y = this.attribute('y').toPixels('y');
        var width = this.attribute('width').toPixels('x');
        var height = this.attribute('height').toPixels('y');
        return new svg.BoundingBox(x, y, x + width, y + height);
      };
    };

    svg.Element.image.prototype = new svg.Element.RenderedElementBase(); // group element

    svg.Element.g = function (node) {
      this.base = svg.Element.RenderedElementBase;
      this.base(node);

      this.getBoundingBox = function (ctx) {
        var bb = new svg.BoundingBox();

        for (var i = 0; i < this.children.length; i++) {
          bb.addBoundingBox(this.children[i].getBoundingBox(ctx));
        }

        return bb;
      };
    };

    svg.Element.g.prototype = new svg.Element.RenderedElementBase(); // symbol element

    svg.Element.symbol = function (node) {
      this.base = svg.Element.RenderedElementBase;
      this.base(node);

      this.render = function ()
      /* ctx */
      {// NO RENDER
      };
    };

    svg.Element.symbol.prototype = new svg.Element.RenderedElementBase();

    svg.ParseExternalUrl = function (url) {
      var _ref = url.match(/url\(('((?:[\0-&\(-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)'|"((?:[\0-!#-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)"|((?:[\0-!#-&\(\*-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+))\)/) || [],
          _ref2 = _slicedToArray(_ref, 5),
          singleQuotes = _ref2[2],
          doubleQuotes = _ref2[3],
          noQuotes = _ref2[4];

      return singleQuotes || doubleQuotes || noQuotes;
    }; // style element


    svg.Element.style = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node); // text, or spaces then CDATA

      var css = '';

      for (var i = 0; i < node.childNodes.length; i++) {
        css += node.childNodes[i].data;
      }

      css = css.replace(/(\/\*((?:[\0-\)\+-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])|[\n\r]|(\*+((?:[\0-\)\+-\.0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])|[\n\r])))*\*+\/)|(^[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\/\/(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)/gm, ''); // remove comments

      css = svg.compressSpaces(css); // replace whitespace

      var cssDefs = css.split('}');

      for (var _i8 = 0; _i8 < cssDefs.length; _i8++) {
        if (svg.trim(cssDefs[_i8]) !== '') {
          var cssDef = cssDefs[_i8].split('{');

          var cssClasses = cssDef[0].split(',');
          var cssProps = cssDef[1].split(';');

          for (var j = 0; j < cssClasses.length; j++) {
            var cssClass = svg.trim(cssClasses[j]);

            if (cssClass !== '') {
              var props = svg.Styles[cssClass] || {};

              for (var k = 0; k < cssProps.length; k++) {
                var prop = cssProps[k].indexOf(':');
                var name = cssProps[k].substr(0, prop);
                var value = cssProps[k].substr(prop + 1, cssProps[k].length - prop);

                if (!isNullish(name) && !isNullish(value)) {
                  props[svg.trim(name)] = new svg.Property(svg.trim(name), svg.trim(value));
                }
              }

              svg.Styles[cssClass] = props;
              svg.StylesSpecificity[cssClass] = getSelectorSpecificity(cssClass);

              if (cssClass === '@font-face' && !nodeEnv) {
                var fontFamily = props['font-family'].value.replace(/"/g, '');
                var srcs = props.src.value.split(',');

                for (var s = 0; s < srcs.length; s++) {
                  if (srcs[s].indexOf('format("svg")') > 0) {
                    var url = svg.ParseExternalUrl(srcs[s]);

                    if (url) {
                      var docum = svg.parseXml(svg.ajax(url));
                      var fonts = docum.getElementsByTagName('font');

                      for (var f = 0; f < fonts.length; f++) {
                        var font = svg.CreateElement(fonts[f]);
                        svg.Definitions[fontFamily] = font;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    svg.Element.style.prototype = new svg.Element.ElementBase(); // use element

    svg.Element.use = function (node) {
      this.base = svg.Element.RenderedElementBase;
      this.base(node);
      this.baseSetContext = this.setContext;

      this.setContext = function (ctx) {
        this.baseSetContext(ctx);
        if (this.attribute('x').hasValue()) ctx.translate(this.attribute('x').toPixels('x'), 0);
        if (this.attribute('y').hasValue()) ctx.translate(0, this.attribute('y').toPixels('y'));
      };

      var element = this.getHrefAttribute().getDefinition();

      this.path = function (ctx) {
        if (!isNullish(element)) element.path(ctx);
      };

      this.elementTransform = function () {
        if (!isNullish(element) && element.style('transform', false, true).hasValue()) {
          return new svg.Transform(element.style('transform', false, true).value);
        }

        return undefined;
      };

      this.getBoundingBox = function (ctx) {
        if (!isNullish(element)) return element.getBoundingBox(ctx);
        return undefined;
      };

      this.renderChildren = function (ctx) {
        if (!isNullish(element)) {
          var tempSvg = element;

          if (element.type === 'symbol') {
            // render me using a temporary svg element in symbol cases (http://www.w3.org/TR/SVG/struct.html#UseElement)
            tempSvg = new svg.Element.svg();
            tempSvg.type = 'svg';
            tempSvg.attributes.viewBox = new svg.Property('viewBox', element.attribute('viewBox').value);
            tempSvg.attributes.preserveAspectRatio = new svg.Property('preserveAspectRatio', element.attribute('preserveAspectRatio').value);
            tempSvg.attributes.overflow = new svg.Property('overflow', element.attribute('overflow').value);
            tempSvg.children = element.children;
          }

          if (tempSvg.type === 'svg') {
            // if symbol or svg, inherit width/height from me
            if (this.attribute('width').hasValue()) tempSvg.attributes.width = new svg.Property('width', this.attribute('width').value);
            if (this.attribute('height').hasValue()) tempSvg.attributes.height = new svg.Property('height', this.attribute('height').value);
          }

          var oldParent = tempSvg.parent;
          tempSvg.parent = null;
          tempSvg.render(ctx);
          tempSvg.parent = oldParent;
        }
      };
    };

    svg.Element.use.prototype = new svg.Element.RenderedElementBase(); // mask element

    svg.Element.mask = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.apply = function (ctx, element) {
        // render as temp svg
        var x = this.attribute('x').toPixels('x');
        var y = this.attribute('y').toPixels('y');
        var width = this.attribute('width').toPixels('x');
        var height = this.attribute('height').toPixels('y');

        if (width === 0 && height === 0) {
          var bb = new svg.BoundingBox();

          for (var i = 0; i < this.children.length; i++) {
            bb.addBoundingBox(this.children[i].getBoundingBox(ctx));
          }

          x = Math.floor(bb.x1);
          y = Math.floor(bb.y1);
          width = Math.floor(bb.width());
          height = Math.floor(bb.height());
        } // temporarily remove mask to avoid recursion


        var mask = element.style('mask').value;
        element.style('mask').value = '';
        var cMask = createCanvas(x + width, y + height);
        var maskCtx = cMask.getContext('2d');
        svg.SetDefaults(maskCtx);
        this.renderChildren(maskCtx); // convert mask to alpha with a fake node
        // TODO: refactor out apply from feColorMatrix

        var cm = new svg.Element.feColorMatrix({
          nodeType: 1,
          childNodes: [],
          attributes: [{
            nodeName: 'type',
            value: 'luminanceToAlpha'
          }, {
            nodeName: 'includeOpacity',
            value: 'true'
          }]
        });
        cm.apply(maskCtx, 0, 0, x + width, y + height);
        var c = createCanvas(x + width, y + height);
        var tempCtx = c.getContext('2d');
        svg.SetDefaults(tempCtx);
        element.render(tempCtx);
        tempCtx.globalCompositeOperation = 'destination-in';
        tempCtx.fillStyle = maskCtx.createPattern(cMask, 'no-repeat');
        tempCtx.fillRect(0, 0, x + width, y + height);
        ctx.fillStyle = tempCtx.createPattern(c, 'no-repeat');
        ctx.fillRect(0, 0, x + width, y + height); // reassign mask

        element.style('mask').value = mask;
      };

      this.render = function ()
      /* ctx */
      {// NO RENDER
      };
    };

    svg.Element.mask.prototype = new svg.Element.ElementBase(); // clip element

    svg.Element.clipPath = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.apply = function (ctx) {
        var hasContext2D = typeof CanvasRenderingContext2D !== 'undefined';
        var oldBeginPath = ctx.beginPath;
        var oldClosePath = ctx.closePath;

        if (hasContext2D) {
          CanvasRenderingContext2D.prototype.beginPath = function () {
            /* */
          };

          CanvasRenderingContext2D.prototype.closePath = function () {
            /* */
          };
        }

        oldBeginPath.call(ctx);

        for (var i = 0; i < this.children.length; i++) {
          var child = this.children[i];

          if (typeof child.path !== 'undefined') {
            var transform = typeof child.elementTransform !== 'undefined' && child.elementTransform(); // handle <use />

            if (!transform && child.style('transform', false, true).hasValue()) {
              transform = new svg.Transform(child.style('transform', false, true).value);
            }

            if (transform) {
              transform.apply(ctx);
            }

            child.path(ctx);

            if (hasContext2D) {
              CanvasRenderingContext2D.prototype.closePath = oldClosePath;
            }

            if (transform) {
              transform.unapply(ctx);
            }
          }
        }

        oldClosePath.call(ctx);
        ctx.clip();

        if (hasContext2D) {
          CanvasRenderingContext2D.prototype.beginPath = oldBeginPath;
          CanvasRenderingContext2D.prototype.closePath = oldClosePath;
        }
      };

      this.render = function ()
      /* ctx */
      {// NO RENDER
      };
    };

    svg.Element.clipPath.prototype = new svg.Element.ElementBase(); // filters

    svg.Element.filter = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.apply = function (ctx, element) {
        // render as temp svg
        var bb = element.getBoundingBox(ctx);
        var x = Math.floor(bb.x1);
        var y = Math.floor(bb.y1);
        var width = Math.floor(bb.width());
        var height = Math.floor(bb.height()); // temporarily remove filter to avoid recursion

        var filter = element.style('filter').value;
        element.style('filter').value = '';
        var px = 0,
            py = 0;

        for (var i = 0; i < this.children.length; i++) {
          var efd = this.children[i].extraFilterDistance || 0;
          px = Math.max(px, efd);
          py = Math.max(py, efd);
        }

        var c = createCanvas(width + 2 * px, height + 2 * py);
        var tempCtx = c.getContext('2d');
        svg.SetDefaults(tempCtx);
        tempCtx.translate(-x + px, -y + py);
        element.render(tempCtx); // apply filters

        for (var _i9 = 0; _i9 < this.children.length; _i9++) {
          if (typeof this.children[_i9].apply === 'function') {
            this.children[_i9].apply(tempCtx, 0, 0, width + 2 * px, height + 2 * py);
          }
        } // render on me


        ctx.drawImage(c, 0, 0, width + 2 * px, height + 2 * py, x - px, y - py, width + 2 * px, height + 2 * py); // reassign filter

        element.style('filter', true).value = filter;
      };

      this.render = function ()
      /* ctx */
      {// NO RENDER
      };
    };

    svg.Element.filter.prototype = new svg.Element.ElementBase();

    svg.Element.feDropShadow = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);
      this.addStylesFromStyleDefinition();

      this.apply = function ()
      /* ctx, x, y, width, height */
      {// TODO: implement
      };
    };

    svg.Element.feDropShadow.prototype = new svg.Element.ElementBase();

    svg.Element.feMorphology = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.apply = function ()
      /* ctx, x, y, width, height */
      {// TODO: implement
      };
    };

    svg.Element.feMorphology.prototype = new svg.Element.ElementBase();

    svg.Element.feComposite = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.apply = function ()
      /* ctx, x, y, width, height */
      {// TODO: implement
      };
    };

    svg.Element.feComposite.prototype = new svg.Element.ElementBase();

    svg.Element.feColorMatrix = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);
      var matrix = svg.ToNumberArray(this.attribute('values').value);

      switch (this.attribute('type').valueOrDefault('matrix')) {
        // http://www.w3.org/TR/SVG/filters.html#feColorMatrixElement
        case 'saturate':
          {
            var s = matrix[0];
            matrix = [0.213 + 0.787 * s, 0.715 - 0.715 * s, 0.072 - 0.072 * s, 0, 0, 0.213 - 0.213 * s, 0.715 + 0.285 * s, 0.072 - 0.072 * s, 0, 0, 0.213 - 0.213 * s, 0.715 - 0.715 * s, 0.072 + 0.928 * s, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
            break;
          }

        case 'hueRotate':
          {
            var a = matrix[0] * Math.PI / 180.0;

            var c = function c(m1, m2, m3) {
              return m1 + Math.cos(a) * m2 + Math.sin(a) * m3;
            };

            matrix = [c(0.213, 0.787, -0.213), c(0.715, -0.715, -0.715), c(0.072, -0.072, 0.928), 0, 0, c(0.213, -0.213, 0.143), c(0.715, 0.285, 0.140), c(0.072, -0.072, -0.283), 0, 0, c(0.213, -0.213, -0.787), c(0.715, -0.715, 0.715), c(0.072, 0.928, 0.072), 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
            break;
          }

        case 'luminanceToAlpha':
          matrix = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2125, 0.7154, 0.0721, 0, 0, 0, 0, 0, 0, 1];
          break;
      }

      function imGet(img, x, y, width, height, rgba) {
        return img[y * width * 4 + x * 4 + rgba];
      }

      function imSet(img, x, y, width, height, rgba, val) {
        img[y * width * 4 + x * 4 + rgba] = val;
      }

      function m(i, v) {
        var mi = matrix[i];
        return mi * (mi < 0 ? v - 255 : v);
      }

      var includeOpacity = this.attribute('includeOpacity').hasValue();

      this.apply = function (ctx, x, y, width, height) {
        // assuming x==0 && y==0 for now
        var srcData = ctx.getImageData(0, 0, width, height);

        for (var _y = 0; _y < height; _y++) {
          // eslint-disable-line no-shadow
          for (var _x = 0; _x < width; _x++) {
            // eslint-disable-line no-shadow
            var r = imGet(srcData.data, _x, _y, width, height, 0);
            var g = imGet(srcData.data, _x, _y, width, height, 1);
            var b = imGet(srcData.data, _x, _y, width, height, 2);

            var _a = imGet(srcData.data, _x, _y, width, height, 3);

            var nr = m(0, r) + m(1, g) + m(2, b) + m(3, _a) + m(4, 1);
            var ng = m(5, r) + m(6, g) + m(7, b) + m(8, _a) + m(9, 1);
            var nb = m(10, r) + m(11, g) + m(12, b) + m(13, _a) + m(14, 1);
            var na = m(15, r) + m(16, g) + m(17, b) + m(18, _a) + m(19, 1);

            if (includeOpacity) {
              nr = ng = nb = 0;
              na *= _a / 255;
            }

            imSet(srcData.data, _x, _y, width, height, 0, nr);
            imSet(srcData.data, _x, _y, width, height, 1, ng);
            imSet(srcData.data, _x, _y, width, height, 2, nb);
            imSet(srcData.data, _x, _y, width, height, 3, na);
          }
        }

        ctx.clearRect(0, 0, width, height);
        ctx.putImageData(srcData, 0, 0);
      };
    };

    svg.Element.feColorMatrix.prototype = new svg.Element.ElementBase();

    svg.Element.feGaussianBlur = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);
      this.blurRadius = Math.floor(this.attribute('stdDeviation').numValue());
      this.extraFilterDistance = this.blurRadius;

      this.apply = function (ctx, x, y, width, height) {
        // StackBlur requires canvas be on document
        ctx.canvas.id = svg.UniqueId();

        {
          ctx.canvas.style.display = 'none';
          doc.body.appendChild(ctx.canvas);
        }

        processCanvasRGBA(ctx.canvas, x, y, width, height, this.blurRadius);

        {
          doc.body.removeChild(ctx.canvas);
        }
      };
    };

    svg.Element.feGaussianBlur.prototype = new svg.Element.ElementBase(); // title element, do nothing

    svg.Element.title = function ()
    /* node */
    {
      /* */
    };

    svg.Element.title.prototype = new svg.Element.ElementBase(); // desc element, do nothing

    svg.Element.desc = function ()
    /* node */
    {
      /* */
    };

    svg.Element.desc.prototype = new svg.Element.ElementBase();

    svg.Element.MISSING = function (node) {
      svg.log('ERROR: Element \'' + node.nodeName + '\' not yet implemented.');
    };

    svg.Element.MISSING.prototype = new svg.Element.ElementBase(); // element factory

    svg.CreateElement = function (node) {
      var className = node.nodeName.replace(/^(?:[\0-9;-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+:/, ''); // remove namespace

      className = className.replace(/\x2D/g, ''); // remove dashes

      var e = null;

      if (typeof svg.Element[className] !== 'undefined') {
        e = new svg.Element[className](node);
      } else {
        e = new svg.Element.MISSING(node);
      }

      e.type = node.nodeName;
      return e;
    }; // load from url


    svg.load = function (ctx, url) {
      svg.loadXml(ctx, svg.ajax(url));
    }; // load from xml


    svg.loadXml = function (ctx, xml) {
      svg.loadXmlDoc(ctx, svg.parseXml(xml));
    };

    svg.loadXmlDoc = function (ctx, dom) {
      svg.init(ctx);

      var mapXY = function mapXY(p) {
        var e = ctx.canvas;

        while (e) {
          p.x -= e.offsetLeft;
          p.y -= e.offsetTop;
          e = e.offsetParent;
        }

        if (windowEnv.scrollX) p.x += windowEnv.scrollX;
        if (windowEnv.scrollY) p.y += windowEnv.scrollY;
        return p;
      }; // bind mouse


      if (!svg.opts.ignoreMouse) {
        ctx.canvas.addEventListener('click', function (e) {
          var p = mapXY(new svg.Point(!isNullish(e) ? e.clientX : event.clientX, !isNullish(e) ? e.clientY : event.clientY)); // eslint-disable-line no-restricted-globals

          svg.Mouse.onclick(p.x, p.y);
        });
        ctx.canvas.addEventListener('mousemove', function (e) {
          var p = mapXY(new svg.Point(!isNullish(e) ? e.clientX : event.clientX, !isNullish(e) ? e.clientY : event.clientY)); // eslint-disable-line no-restricted-globals

          svg.Mouse.onmousemove(p.x, p.y);
        });
      }

      var e = svg.CreateElement(dom.documentElement);
      e.root = true;
      e.addStylesFromStyleDefinition(); // render loop

      var isFirstRender = true;

      var draw = function draw() {
        svg.ViewPort.Clear();

        if (ctx.canvas.parentNode) {
          svg.ViewPort.SetCurrent(ctx.canvas.parentNode.clientWidth, ctx.canvas.parentNode.clientHeight);
        } else {
          svg.ViewPort.SetCurrent(defaultClientWidth, defaultClientHeight);
        }

        if (svg.opts.ignoreDimensions !== true && (isFirstRender || isNullish(svg.opts.scaleWidth) && isNullish(svg.opts.scaleHeight))) {
          // set canvas size
          if (e.style('width').hasValue()) {
            ctx.canvas.width = e.style('width').toPixels('x');

            if (ctx.canvas.style) {
              ctx.canvas.style.width = ctx.canvas.width + 'px';
            }
          }

          if (e.style('height').hasValue()) {
            ctx.canvas.height = e.style('height').toPixels('y');

            if (ctx.canvas.style) {
              ctx.canvas.style.height = ctx.canvas.height + 'px';
            }
          }
        }

        var cWidth = ctx.canvas.clientWidth || ctx.canvas.width;
        var cHeight = ctx.canvas.clientHeight || ctx.canvas.height;

        if (svg.opts.ignoreDimensions && e.style('width').hasValue() && e.style('height').hasValue()) {
          cWidth = e.style('width').toPixels('x');
          cHeight = e.style('height').toPixels('y');
        }

        svg.ViewPort.SetCurrent(cWidth, cHeight);
        if (!isNullish(svg.opts.offsetX)) e.attribute('x', true).value = svg.opts.offsetX;
        if (!isNullish(svg.opts.offsetY)) e.attribute('y', true).value = svg.opts.offsetY;

        if (!isNullish(svg.opts.scaleWidth) || !isNullish(svg.opts.scaleHeight)) {
          var xRatio = null,
              yRatio = null;
          var viewBox = svg.ToNumberArray(e.attribute('viewBox').value);

          if (!isNullish(svg.opts.scaleWidth)) {
            if (e.attribute('width').hasValue()) xRatio = e.attribute('width').toPixels('x') / svg.opts.scaleWidth;else if (!isNaN(viewBox[2])) xRatio = viewBox[2] / svg.opts.scaleWidth;
          }

          if (!isNullish(svg.opts.scaleHeight)) {
            if (e.attribute('height').hasValue()) yRatio = e.attribute('height').toPixels('y') / svg.opts.scaleHeight;else if (!isNaN(viewBox[3])) yRatio = viewBox[3] / svg.opts.scaleHeight;
          }

          if (isNullish(xRatio)) {
            xRatio = yRatio;
          }

          if (isNullish(yRatio)) {
            yRatio = xRatio;
          }

          e.attribute('width', true).value = svg.opts.scaleWidth;
          e.attribute('height', true).value = svg.opts.scaleHeight;
          e.style('transform', true, true).value += ' scale(' + 1.0 / xRatio + ',' + 1.0 / yRatio + ')';
        } // clear and render


        if (!svg.opts.ignoreClear) {
          ctx.clearRect(0, 0, cWidth, cHeight);
        }

        e.render(ctx);

        if (isFirstRender) {
          isFirstRender = false;
          if (typeof svg.opts.renderCallback === 'function') svg.opts.renderCallback(dom);
        }
      };

      var waitingForImages = true;

      if (svg.ImagesLoaded()) {
        waitingForImages = false;
        draw();
      }

      {
        // In Node, in the most cases, we don't need the animation listener.
        svg.intervalID = setInterval(function () {
          var needUpdate = false;

          if (waitingForImages && svg.ImagesLoaded()) {
            waitingForImages = false;
            needUpdate = true;
          } // need update from mouse events?


          if (!svg.opts.ignoreMouse) {
            needUpdate = needUpdate || svg.Mouse.hasEvents();
          } // need update from animations?


          if (!svg.opts.ignoreAnimation) {
            for (var i = 0; i < svg.Animations.length; i++) {
              var needAnimationUpdate = svg.Animations[i].update(1000 / svg.FRAMERATE);
              needUpdate = needUpdate || needAnimationUpdate;
            }
          } // need update from redraw?


          if (typeof svg.opts.forceRedraw === 'function') {
            if (svg.opts.forceRedraw()) needUpdate = true;
          } // render if needed


          if (needUpdate) {
            draw();
            svg.Mouse.runEvents(); // run and clear our events
          }
        }, 1000 / svg.FRAMERATE);
      }
    };

    svg.stop = function () {
      if (svg.intervalID) {
        clearInterval(svg.intervalID);
      }
    };

    svg.Mouse = new function () {
      this.events = [];

      this.hasEvents = function () {
        return this.events.length !== 0;
      };

      this.addEventListener('click', function (x, y) {
        this.events.push({
          type: 'onclick',
          x: x,
          y: y,
          run: function run(e) {
            if (e.onclick) e.onclick();
          }
        });
      });
      this.addEventListener('mousemove', function (x, y) {
        this.events.push({
          type: 'onmousemove',
          x: x,
          y: y,
          run: function run(e) {
            if (e.onmousemove) e.onmousemove();
          }
        });
      });
      this.eventElements = [];

      this.checkPath = function (element, ctx) {
        for (var i = 0; i < this.events.length; i++) {
          var e = this.events[i];
          if (ctx.isPointInPath && ctx.isPointInPath(e.x, e.y)) this.eventElements[i] = element;
        }
      };

      this.checkBoundingBox = function (element, bb) {
        if (!bb) {
          return;
        }

        for (var i = 0; i < this.events.length; i++) {
          var e = this.events[i];
          if (bb.isPointInBox(e.x, e.y)) this.eventElements[i] = element;
        }
      };

      this.runEvents = function () {
        svg.ctx.canvas.style.cursor = '';

        for (var i = 0; i < this.events.length; i++) {
          var e = this.events[i];
          var element = this.eventElements[i];

          while (element) {
            e.run(element);
            element = element.parent;
          }
        } // done running, clear


        this.events = [];
        this.eventElements = [];
      };
    }();
    return svg;
  }

  if (typeof CanvasRenderingContext2D !== 'undefined') {
    CanvasRenderingContext2D.prototype.drawSvg = function (s, dx, dy, dw, dh, opts) {
      var cOpts = {
        ignoreMouse: true,
        ignoreAnimation: true,
        ignoreDimensions: true,
        ignoreClear: true,
        offsetX: dx,
        offsetY: dy,
        scaleWidth: dw,
        scaleHeight: dh
      };

      for (var prop in opts) {
        if ({}.hasOwnProperty.call(opts, prop)) {
          cOpts[prop] = opts[prop];
        }
      }

      canvg(this.canvas, s, cOpts);
    };
  } // for tests


  canvg._build = build;

  return canvg;

})));
