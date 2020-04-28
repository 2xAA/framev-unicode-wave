// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"node_modules/open-simplex-noise/lib/constants.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NORM_2D = 1.0 / 47.0;
exports.NORM_3D = 1.0 / 103.0;
exports.NORM_4D = 1.0 / 30.0;
exports.SQUISH_2D = (Math.sqrt(2 + 1) - 1) / 2;
exports.SQUISH_3D = (Math.sqrt(3 + 1) - 1) / 3;
exports.SQUISH_4D = (Math.sqrt(4 + 1) - 1) / 4;
exports.STRETCH_2D = (1 / Math.sqrt(2 + 1) - 1) / 2;
exports.STRETCH_3D = (1 / Math.sqrt(3 + 1) - 1) / 3;
exports.STRETCH_4D = (1 / Math.sqrt(4 + 1) - 1) / 4;
exports.base2D = [
    [1, 1, 0, 1, 0, 1, 0, 0, 0],
    [1, 1, 0, 1, 0, 1, 2, 1, 1]
];
exports.base3D = [
    [0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],
    [2, 1, 1, 0, 2, 1, 0, 1, 2, 0, 1, 1, 3, 1, 1, 1],
    [1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 2, 1, 1, 0, 2, 1, 0, 1, 2, 0, 1, 1]
];
exports.base4D = [
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [3, 1, 1, 1, 0, 3, 1, 1, 0, 1, 3, 1, 0, 1, 1, 3, 0, 1, 1, 1, 4, 1, 1, 1, 1],
    [
        1,
        1,
        0,
        0,
        0,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        0,
        0,
        0,
        1,
        2,
        1,
        1,
        0,
        0,
        2,
        1,
        0,
        1,
        0,
        2,
        1,
        0,
        0,
        1,
        2,
        0,
        1,
        1,
        0,
        2,
        0,
        1,
        0,
        1,
        2,
        0,
        0,
        1,
        1
    ],
    [
        3,
        1,
        1,
        1,
        0,
        3,
        1,
        1,
        0,
        1,
        3,
        1,
        0,
        1,
        1,
        3,
        0,
        1,
        1,
        1,
        2,
        1,
        1,
        0,
        0,
        2,
        1,
        0,
        1,
        0,
        2,
        1,
        0,
        0,
        1,
        2,
        0,
        1,
        1,
        0,
        2,
        0,
        1,
        0,
        1,
        2,
        0,
        0,
        1,
        1
    ]
];
exports.gradients2D = [
    5,
    2,
    2,
    5,
    -5,
    2,
    -2,
    5,
    5,
    -2,
    2,
    -5,
    -5,
    -2,
    -2,
    -5
];
exports.gradients3D = [
    -11,
    4,
    4,
    -4,
    11,
    4,
    -4,
    4,
    11,
    11,
    4,
    4,
    4,
    11,
    4,
    4,
    4,
    11,
    -11,
    -4,
    4,
    -4,
    -11,
    4,
    -4,
    -4,
    11,
    11,
    -4,
    4,
    4,
    -11,
    4,
    4,
    -4,
    11,
    -11,
    4,
    -4,
    -4,
    11,
    -4,
    -4,
    4,
    -11,
    11,
    4,
    -4,
    4,
    11,
    -4,
    4,
    4,
    -11,
    -11,
    -4,
    -4,
    -4,
    -11,
    -4,
    -4,
    -4,
    -11,
    11,
    -4,
    -4,
    4,
    -11,
    -4,
    4,
    -4,
    -11
];
exports.gradients4D = [
    3,
    1,
    1,
    1,
    1,
    3,
    1,
    1,
    1,
    1,
    3,
    1,
    1,
    1,
    1,
    3,
    -3,
    1,
    1,
    1,
    -1,
    3,
    1,
    1,
    -1,
    1,
    3,
    1,
    -1,
    1,
    1,
    3,
    3,
    -1,
    1,
    1,
    1,
    -3,
    1,
    1,
    1,
    -1,
    3,
    1,
    1,
    -1,
    1,
    3,
    -3,
    -1,
    1,
    1,
    -1,
    -3,
    1,
    1,
    -1,
    -1,
    3,
    1,
    -1,
    -1,
    1,
    3,
    3,
    1,
    -1,
    1,
    1,
    3,
    -1,
    1,
    1,
    1,
    -3,
    1,
    1,
    1,
    -1,
    3,
    -3,
    1,
    -1,
    1,
    -1,
    3,
    -1,
    1,
    -1,
    1,
    -3,
    1,
    -1,
    1,
    -1,
    3,
    3,
    -1,
    -1,
    1,
    1,
    -3,
    -1,
    1,
    1,
    -1,
    -3,
    1,
    1,
    -1,
    -1,
    3,
    -3,
    -1,
    -1,
    1,
    -1,
    -3,
    -1,
    1,
    -1,
    -1,
    -3,
    1,
    -1,
    -1,
    -1,
    3,
    3,
    1,
    1,
    -1,
    1,
    3,
    1,
    -1,
    1,
    1,
    3,
    -1,
    1,
    1,
    1,
    -3,
    -3,
    1,
    1,
    -1,
    -1,
    3,
    1,
    -1,
    -1,
    1,
    3,
    -1,
    -1,
    1,
    1,
    -3,
    3,
    -1,
    1,
    -1,
    1,
    -3,
    1,
    -1,
    1,
    -1,
    3,
    -1,
    1,
    -1,
    1,
    -3,
    -3,
    -1,
    1,
    -1,
    -1,
    -3,
    1,
    -1,
    -1,
    -1,
    3,
    -1,
    -1,
    -1,
    1,
    -3,
    3,
    1,
    -1,
    -1,
    1,
    3,
    -1,
    -1,
    1,
    1,
    -3,
    -1,
    1,
    1,
    -1,
    -3,
    -3,
    1,
    -1,
    -1,
    -1,
    3,
    -1,
    -1,
    -1,
    1,
    -3,
    -1,
    -1,
    1,
    -1,
    -3,
    3,
    -1,
    -1,
    -1,
    1,
    -3,
    -1,
    -1,
    1,
    -1,
    -3,
    -1,
    1,
    -1,
    -1,
    -3,
    -3,
    -1,
    -1,
    -1,
    -1,
    -3,
    -1,
    -1,
    -1,
    -1,
    -3,
    -1,
    -1,
    -1,
    -1,
    -3
];
exports.lookupPairs2D = [
    0,
    1,
    1,
    0,
    4,
    1,
    17,
    0,
    20,
    2,
    21,
    2,
    22,
    5,
    23,
    5,
    26,
    4,
    39,
    3,
    42,
    4,
    43,
    3
];
exports.lookupPairs3D = [
    0,
    2,
    1,
    1,
    2,
    2,
    5,
    1,
    6,
    0,
    7,
    0,
    32,
    2,
    34,
    2,
    129,
    1,
    133,
    1,
    160,
    5,
    161,
    5,
    518,
    0,
    519,
    0,
    546,
    4,
    550,
    4,
    645,
    3,
    647,
    3,
    672,
    5,
    673,
    5,
    674,
    4,
    677,
    3,
    678,
    4,
    679,
    3,
    680,
    13,
    681,
    13,
    682,
    12,
    685,
    14,
    686,
    12,
    687,
    14,
    712,
    20,
    714,
    18,
    809,
    21,
    813,
    23,
    840,
    20,
    841,
    21,
    1198,
    19,
    1199,
    22,
    1226,
    18,
    1230,
    19,
    1325,
    23,
    1327,
    22,
    1352,
    15,
    1353,
    17,
    1354,
    15,
    1357,
    17,
    1358,
    16,
    1359,
    16,
    1360,
    11,
    1361,
    10,
    1362,
    11,
    1365,
    10,
    1366,
    9,
    1367,
    9,
    1392,
    11,
    1394,
    11,
    1489,
    10,
    1493,
    10,
    1520,
    8,
    1521,
    8,
    1878,
    9,
    1879,
    9,
    1906,
    7,
    1910,
    7,
    2005,
    6,
    2007,
    6,
    2032,
    8,
    2033,
    8,
    2034,
    7,
    2037,
    6,
    2038,
    7,
    2039,
    6
];
exports.lookupPairs4D = [
    0,
    3,
    1,
    2,
    2,
    3,
    5,
    2,
    6,
    1,
    7,
    1,
    8,
    3,
    9,
    2,
    10,
    3,
    13,
    2,
    16,
    3,
    18,
    3,
    22,
    1,
    23,
    1,
    24,
    3,
    26,
    3,
    33,
    2,
    37,
    2,
    38,
    1,
    39,
    1,
    41,
    2,
    45,
    2,
    54,
    1,
    55,
    1,
    56,
    0,
    57,
    0,
    58,
    0,
    59,
    0,
    60,
    0,
    61,
    0,
    62,
    0,
    63,
    0,
    256,
    3,
    258,
    3,
    264,
    3,
    266,
    3,
    272,
    3,
    274,
    3,
    280,
    3,
    282,
    3,
    2049,
    2,
    2053,
    2,
    2057,
    2,
    2061,
    2,
    2081,
    2,
    2085,
    2,
    2089,
    2,
    2093,
    2,
    2304,
    9,
    2305,
    9,
    2312,
    9,
    2313,
    9,
    16390,
    1,
    16391,
    1,
    16406,
    1,
    16407,
    1,
    16422,
    1,
    16423,
    1,
    16438,
    1,
    16439,
    1,
    16642,
    8,
    16646,
    8,
    16658,
    8,
    16662,
    8,
    18437,
    6,
    18439,
    6,
    18469,
    6,
    18471,
    6,
    18688,
    9,
    18689,
    9,
    18690,
    8,
    18693,
    6,
    18694,
    8,
    18695,
    6,
    18696,
    9,
    18697,
    9,
    18706,
    8,
    18710,
    8,
    18725,
    6,
    18727,
    6,
    131128,
    0,
    131129,
    0,
    131130,
    0,
    131131,
    0,
    131132,
    0,
    131133,
    0,
    131134,
    0,
    131135,
    0,
    131352,
    7,
    131354,
    7,
    131384,
    7,
    131386,
    7,
    133161,
    5,
    133165,
    5,
    133177,
    5,
    133181,
    5,
    133376,
    9,
    133377,
    9,
    133384,
    9,
    133385,
    9,
    133400,
    7,
    133402,
    7,
    133417,
    5,
    133421,
    5,
    133432,
    7,
    133433,
    5,
    133434,
    7,
    133437,
    5,
    147510,
    4,
    147511,
    4,
    147518,
    4,
    147519,
    4,
    147714,
    8,
    147718,
    8,
    147730,
    8,
    147734,
    8,
    147736,
    7,
    147738,
    7,
    147766,
    4,
    147767,
    4,
    147768,
    7,
    147770,
    7,
    147774,
    4,
    147775,
    4,
    149509,
    6,
    149511,
    6,
    149541,
    6,
    149543,
    6,
    149545,
    5,
    149549,
    5,
    149558,
    4,
    149559,
    4,
    149561,
    5,
    149565,
    5,
    149566,
    4,
    149567,
    4,
    149760,
    9,
    149761,
    9,
    149762,
    8,
    149765,
    6,
    149766,
    8,
    149767,
    6,
    149768,
    9,
    149769,
    9,
    149778,
    8,
    149782,
    8,
    149784,
    7,
    149786,
    7,
    149797,
    6,
    149799,
    6,
    149801,
    5,
    149805,
    5,
    149814,
    4,
    149815,
    4,
    149816,
    7,
    149817,
    5,
    149818,
    7,
    149821,
    5,
    149822,
    4,
    149823,
    4,
    149824,
    37,
    149825,
    37,
    149826,
    36,
    149829,
    34,
    149830,
    36,
    149831,
    34,
    149832,
    37,
    149833,
    37,
    149842,
    36,
    149846,
    36,
    149848,
    35,
    149850,
    35,
    149861,
    34,
    149863,
    34,
    149865,
    33,
    149869,
    33,
    149878,
    32,
    149879,
    32,
    149880,
    35,
    149881,
    33,
    149882,
    35,
    149885,
    33,
    149886,
    32,
    149887,
    32,
    150080,
    49,
    150082,
    48,
    150088,
    49,
    150098,
    48,
    150104,
    47,
    150106,
    47,
    151873,
    46,
    151877,
    45,
    151881,
    46,
    151909,
    45,
    151913,
    44,
    151917,
    44,
    152128,
    49,
    152129,
    46,
    152136,
    49,
    152137,
    46,
    166214,
    43,
    166215,
    42,
    166230,
    43,
    166247,
    42,
    166262,
    41,
    166263,
    41,
    166466,
    48,
    166470,
    43,
    166482,
    48,
    166486,
    43,
    168261,
    45,
    168263,
    42,
    168293,
    45,
    168295,
    42,
    168512,
    31,
    168513,
    28,
    168514,
    31,
    168517,
    28,
    168518,
    25,
    168519,
    25,
    280952,
    40,
    280953,
    39,
    280954,
    40,
    280957,
    39,
    280958,
    38,
    280959,
    38,
    281176,
    47,
    281178,
    47,
    281208,
    40,
    281210,
    40,
    282985,
    44,
    282989,
    44,
    283001,
    39,
    283005,
    39,
    283208,
    30,
    283209,
    27,
    283224,
    30,
    283241,
    27,
    283256,
    22,
    283257,
    22,
    297334,
    41,
    297335,
    41,
    297342,
    38,
    297343,
    38,
    297554,
    29,
    297558,
    24,
    297562,
    29,
    297590,
    24,
    297594,
    21,
    297598,
    21,
    299365,
    26,
    299367,
    23,
    299373,
    26,
    299383,
    23,
    299389,
    20,
    299391,
    20,
    299584,
    31,
    299585,
    28,
    299586,
    31,
    299589,
    28,
    299590,
    25,
    299591,
    25,
    299592,
    30,
    299593,
    27,
    299602,
    29,
    299606,
    24,
    299608,
    30,
    299610,
    29,
    299621,
    26,
    299623,
    23,
    299625,
    27,
    299629,
    26,
    299638,
    24,
    299639,
    23,
    299640,
    22,
    299641,
    22,
    299642,
    21,
    299645,
    20,
    299646,
    21,
    299647,
    20,
    299648,
    61,
    299649,
    60,
    299650,
    61,
    299653,
    60,
    299654,
    59,
    299655,
    59,
    299656,
    58,
    299657,
    57,
    299666,
    55,
    299670,
    54,
    299672,
    58,
    299674,
    55,
    299685,
    52,
    299687,
    51,
    299689,
    57,
    299693,
    52,
    299702,
    54,
    299703,
    51,
    299704,
    56,
    299705,
    56,
    299706,
    53,
    299709,
    50,
    299710,
    53,
    299711,
    50,
    299904,
    61,
    299906,
    61,
    299912,
    58,
    299922,
    55,
    299928,
    58,
    299930,
    55,
    301697,
    60,
    301701,
    60,
    301705,
    57,
    301733,
    52,
    301737,
    57,
    301741,
    52,
    301952,
    79,
    301953,
    79,
    301960,
    76,
    301961,
    76,
    316038,
    59,
    316039,
    59,
    316054,
    54,
    316071,
    51,
    316086,
    54,
    316087,
    51,
    316290,
    78,
    316294,
    78,
    316306,
    73,
    316310,
    73,
    318085,
    77,
    318087,
    77,
    318117,
    70,
    318119,
    70,
    318336,
    79,
    318337,
    79,
    318338,
    78,
    318341,
    77,
    318342,
    78,
    318343,
    77,
    430776,
    56,
    430777,
    56,
    430778,
    53,
    430781,
    50,
    430782,
    53,
    430783,
    50,
    431000,
    75,
    431002,
    72,
    431032,
    75,
    431034,
    72,
    432809,
    74,
    432813,
    69,
    432825,
    74,
    432829,
    69,
    433032,
    76,
    433033,
    76,
    433048,
    75,
    433065,
    74,
    433080,
    75,
    433081,
    74,
    447158,
    71,
    447159,
    68,
    447166,
    71,
    447167,
    68,
    447378,
    73,
    447382,
    73,
    447386,
    72,
    447414,
    71,
    447418,
    72,
    447422,
    71,
    449189,
    70,
    449191,
    70,
    449197,
    69,
    449207,
    68,
    449213,
    69,
    449215,
    68,
    449408,
    67,
    449409,
    67,
    449410,
    66,
    449413,
    64,
    449414,
    66,
    449415,
    64,
    449416,
    67,
    449417,
    67,
    449426,
    66,
    449430,
    66,
    449432,
    65,
    449434,
    65,
    449445,
    64,
    449447,
    64,
    449449,
    63,
    449453,
    63,
    449462,
    62,
    449463,
    62,
    449464,
    65,
    449465,
    63,
    449466,
    65,
    449469,
    63,
    449470,
    62,
    449471,
    62,
    449472,
    19,
    449473,
    19,
    449474,
    18,
    449477,
    16,
    449478,
    18,
    449479,
    16,
    449480,
    19,
    449481,
    19,
    449490,
    18,
    449494,
    18,
    449496,
    17,
    449498,
    17,
    449509,
    16,
    449511,
    16,
    449513,
    15,
    449517,
    15,
    449526,
    14,
    449527,
    14,
    449528,
    17,
    449529,
    15,
    449530,
    17,
    449533,
    15,
    449534,
    14,
    449535,
    14,
    449728,
    19,
    449729,
    19,
    449730,
    18,
    449734,
    18,
    449736,
    19,
    449737,
    19,
    449746,
    18,
    449750,
    18,
    449752,
    17,
    449754,
    17,
    449784,
    17,
    449786,
    17,
    451520,
    19,
    451521,
    19,
    451525,
    16,
    451527,
    16,
    451528,
    19,
    451529,
    19,
    451557,
    16,
    451559,
    16,
    451561,
    15,
    451565,
    15,
    451577,
    15,
    451581,
    15,
    451776,
    19,
    451777,
    19,
    451784,
    19,
    451785,
    19,
    465858,
    18,
    465861,
    16,
    465862,
    18,
    465863,
    16,
    465874,
    18,
    465878,
    18,
    465893,
    16,
    465895,
    16,
    465910,
    14,
    465911,
    14,
    465918,
    14,
    465919,
    14,
    466114,
    18,
    466118,
    18,
    466130,
    18,
    466134,
    18,
    467909,
    16,
    467911,
    16,
    467941,
    16,
    467943,
    16,
    468160,
    13,
    468161,
    13,
    468162,
    13,
    468163,
    13,
    468164,
    13,
    468165,
    13,
    468166,
    13,
    468167,
    13,
    580568,
    17,
    580570,
    17,
    580585,
    15,
    580589,
    15,
    580598,
    14,
    580599,
    14,
    580600,
    17,
    580601,
    15,
    580602,
    17,
    580605,
    15,
    580606,
    14,
    580607,
    14,
    580824,
    17,
    580826,
    17,
    580856,
    17,
    580858,
    17,
    582633,
    15,
    582637,
    15,
    582649,
    15,
    582653,
    15,
    582856,
    12,
    582857,
    12,
    582872,
    12,
    582873,
    12,
    582888,
    12,
    582889,
    12,
    582904,
    12,
    582905,
    12,
    596982,
    14,
    596983,
    14,
    596990,
    14,
    596991,
    14,
    597202,
    11,
    597206,
    11,
    597210,
    11,
    597214,
    11,
    597234,
    11,
    597238,
    11,
    597242,
    11,
    597246,
    11,
    599013,
    10,
    599015,
    10,
    599021,
    10,
    599023,
    10,
    599029,
    10,
    599031,
    10,
    599037,
    10,
    599039,
    10,
    599232,
    13,
    599233,
    13,
    599234,
    13,
    599235,
    13,
    599236,
    13,
    599237,
    13,
    599238,
    13,
    599239,
    13,
    599240,
    12,
    599241,
    12,
    599250,
    11,
    599254,
    11,
    599256,
    12,
    599257,
    12,
    599258,
    11,
    599262,
    11,
    599269,
    10,
    599271,
    10,
    599272,
    12,
    599273,
    12,
    599277,
    10,
    599279,
    10,
    599282,
    11,
    599285,
    10,
    599286,
    11,
    599287,
    10,
    599288,
    12,
    599289,
    12,
    599290,
    11,
    599293,
    10,
    599294,
    11,
    599295,
    10
];
exports.p2D = [
    0,
    0,
    1,
    -1,
    0,
    0,
    -1,
    1,
    0,
    2,
    1,
    1,
    1,
    2,
    2,
    0,
    1,
    2,
    0,
    2,
    1,
    0,
    0,
    0
];
exports.p3D = [
    0,
    0,
    1,
    -1,
    0,
    0,
    1,
    0,
    -1,
    0,
    0,
    -1,
    1,
    0,
    0,
    0,
    1,
    -1,
    0,
    0,
    -1,
    0,
    1,
    0,
    0,
    -1,
    1,
    0,
    2,
    1,
    1,
    0,
    1,
    1,
    1,
    -1,
    0,
    2,
    1,
    0,
    1,
    1,
    1,
    -1,
    1,
    0,
    2,
    0,
    1,
    1,
    1,
    -1,
    1,
    1,
    1,
    3,
    2,
    1,
    0,
    3,
    1,
    2,
    0,
    1,
    3,
    2,
    0,
    1,
    3,
    1,
    0,
    2,
    1,
    3,
    0,
    2,
    1,
    3,
    0,
    1,
    2,
    1,
    1,
    1,
    0,
    0,
    2,
    2,
    0,
    0,
    1,
    1,
    0,
    1,
    0,
    2,
    0,
    2,
    0,
    1,
    1,
    0,
    0,
    1,
    2,
    0,
    0,
    2,
    2,
    0,
    0,
    0,
    0,
    1,
    1,
    -1,
    1,
    2,
    0,
    0,
    0,
    0,
    1,
    -1,
    1,
    1,
    2,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    -1,
    2,
    3,
    1,
    1,
    1,
    2,
    0,
    0,
    2,
    2,
    3,
    1,
    1,
    1,
    2,
    2,
    0,
    0,
    2,
    3,
    1,
    1,
    1,
    2,
    0,
    2,
    0,
    2,
    1,
    1,
    -1,
    1,
    2,
    0,
    0,
    2,
    2,
    1,
    1,
    -1,
    1,
    2,
    2,
    0,
    0,
    2,
    1,
    -1,
    1,
    1,
    2,
    0,
    0,
    2,
    2,
    1,
    -1,
    1,
    1,
    2,
    0,
    2,
    0,
    2,
    1,
    1,
    1,
    -1,
    2,
    2,
    0,
    0,
    2,
    1,
    1,
    1,
    -1,
    2,
    0,
    2,
    0
];
exports.p4D = [
    0,
    0,
    1,
    -1,
    0,
    0,
    0,
    1,
    0,
    -1,
    0,
    0,
    1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    1,
    0,
    0,
    0,
    0,
    1,
    -1,
    0,
    0,
    0,
    1,
    0,
    -1,
    0,
    0,
    -1,
    0,
    1,
    0,
    0,
    0,
    -1,
    1,
    0,
    0,
    0,
    0,
    1,
    -1,
    0,
    0,
    -1,
    0,
    0,
    1,
    0,
    0,
    -1,
    0,
    1,
    0,
    0,
    0,
    -1,
    1,
    0,
    2,
    1,
    1,
    0,
    0,
    1,
    1,
    1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1,
    0,
    2,
    1,
    0,
    1,
    0,
    1,
    1,
    -1,
    1,
    0,
    1,
    1,
    0,
    1,
    -1,
    0,
    2,
    0,
    1,
    1,
    0,
    1,
    -1,
    1,
    1,
    0,
    1,
    0,
    1,
    1,
    -1,
    0,
    2,
    1,
    0,
    0,
    1,
    1,
    1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1,
    1,
    0,
    2,
    0,
    1,
    0,
    1,
    1,
    -1,
    1,
    0,
    1,
    1,
    0,
    1,
    -1,
    1,
    0,
    2,
    0,
    0,
    1,
    1,
    1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1,
    1,
    1,
    1,
    4,
    2,
    1,
    1,
    0,
    4,
    1,
    2,
    1,
    0,
    4,
    1,
    1,
    2,
    0,
    1,
    4,
    2,
    1,
    0,
    1,
    4,
    1,
    2,
    0,
    1,
    4,
    1,
    1,
    0,
    2,
    1,
    4,
    2,
    0,
    1,
    1,
    4,
    1,
    0,
    2,
    1,
    4,
    1,
    0,
    1,
    2,
    1,
    4,
    0,
    2,
    1,
    1,
    4,
    0,
    1,
    2,
    1,
    4,
    0,
    1,
    1,
    2,
    1,
    2,
    1,
    1,
    0,
    0,
    3,
    2,
    1,
    0,
    0,
    3,
    1,
    2,
    0,
    0,
    1,
    2,
    1,
    0,
    1,
    0,
    3,
    2,
    0,
    1,
    0,
    3,
    1,
    0,
    2,
    0,
    1,
    2,
    0,
    1,
    1,
    0,
    3,
    0,
    2,
    1,
    0,
    3,
    0,
    1,
    2,
    0,
    1,
    2,
    1,
    0,
    0,
    1,
    3,
    2,
    0,
    0,
    1,
    3,
    1,
    0,
    0,
    2,
    1,
    2,
    0,
    1,
    0,
    1,
    3,
    0,
    2,
    0,
    1,
    3,
    0,
    1,
    0,
    2,
    1,
    2,
    0,
    0,
    1,
    1,
    3,
    0,
    0,
    2,
    1,
    3,
    0,
    0,
    1,
    2,
    2,
    3,
    1,
    1,
    1,
    0,
    2,
    1,
    1,
    1,
    -1,
    2,
    2,
    0,
    0,
    0,
    2,
    3,
    1,
    1,
    0,
    1,
    2,
    1,
    1,
    -1,
    1,
    2,
    2,
    0,
    0,
    0,
    2,
    3,
    1,
    0,
    1,
    1,
    2,
    1,
    -1,
    1,
    1,
    2,
    2,
    0,
    0,
    0,
    2,
    3,
    1,
    1,
    1,
    0,
    2,
    1,
    1,
    1,
    -1,
    2,
    0,
    2,
    0,
    0,
    2,
    3,
    1,
    1,
    0,
    1,
    2,
    1,
    1,
    -1,
    1,
    2,
    0,
    2,
    0,
    0,
    2,
    3,
    0,
    1,
    1,
    1,
    2,
    -1,
    1,
    1,
    1,
    2,
    0,
    2,
    0,
    0,
    2,
    3,
    1,
    1,
    1,
    0,
    2,
    1,
    1,
    1,
    -1,
    2,
    0,
    0,
    2,
    0,
    2,
    3,
    1,
    0,
    1,
    1,
    2,
    1,
    -1,
    1,
    1,
    2,
    0,
    0,
    2,
    0,
    2,
    3,
    0,
    1,
    1,
    1,
    2,
    -1,
    1,
    1,
    1,
    2,
    0,
    0,
    2,
    0,
    2,
    3,
    1,
    1,
    0,
    1,
    2,
    1,
    1,
    -1,
    1,
    2,
    0,
    0,
    0,
    2,
    2,
    3,
    1,
    0,
    1,
    1,
    2,
    1,
    -1,
    1,
    1,
    2,
    0,
    0,
    0,
    2,
    2,
    3,
    0,
    1,
    1,
    1,
    2,
    -1,
    1,
    1,
    1,
    2,
    0,
    0,
    0,
    2,
    2,
    1,
    1,
    1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1,
    0,
    0,
    0,
    0,
    0,
    2,
    1,
    1,
    -1,
    1,
    0,
    1,
    1,
    0,
    1,
    -1,
    0,
    0,
    0,
    0,
    0,
    2,
    1,
    -1,
    1,
    1,
    0,
    1,
    0,
    1,
    1,
    -1,
    0,
    0,
    0,
    0,
    0,
    2,
    1,
    1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1,
    1,
    0,
    0,
    0,
    0,
    0,
    2,
    1,
    -1,
    1,
    0,
    1,
    1,
    0,
    1,
    -1,
    1,
    0,
    0,
    0,
    0,
    0,
    2,
    1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    2,
    1,
    1,
    1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1,
    2,
    2,
    0,
    0,
    0,
    2,
    1,
    1,
    -1,
    1,
    0,
    1,
    1,
    0,
    1,
    -1,
    2,
    2,
    0,
    0,
    0,
    2,
    1,
    1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1,
    1,
    2,
    2,
    0,
    0,
    0,
    2,
    1,
    1,
    1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1,
    2,
    0,
    2,
    0,
    0,
    2,
    1,
    -1,
    1,
    1,
    0,
    1,
    0,
    1,
    1,
    -1,
    2,
    0,
    2,
    0,
    0,
    2,
    1,
    -1,
    1,
    0,
    1,
    1,
    0,
    1,
    -1,
    1,
    2,
    0,
    2,
    0,
    0,
    2,
    1,
    1,
    -1,
    1,
    0,
    1,
    1,
    0,
    1,
    -1,
    2,
    0,
    0,
    2,
    0,
    2,
    1,
    -1,
    1,
    1,
    0,
    1,
    0,
    1,
    1,
    -1,
    2,
    0,
    0,
    2,
    0,
    2,
    1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1,
    1,
    1,
    2,
    0,
    0,
    2,
    0,
    2,
    1,
    1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1,
    1,
    2,
    0,
    0,
    0,
    2,
    2,
    1,
    -1,
    1,
    0,
    1,
    1,
    0,
    1,
    -1,
    1,
    2,
    0,
    0,
    0,
    2,
    2,
    1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1,
    1,
    1,
    2,
    0,
    0,
    0,
    2,
    3,
    1,
    1,
    0,
    0,
    0,
    2,
    2,
    0,
    0,
    0,
    2,
    1,
    1,
    1,
    -1,
    3,
    1,
    0,
    1,
    0,
    0,
    2,
    0,
    2,
    0,
    0,
    2,
    1,
    1,
    1,
    -1,
    3,
    1,
    0,
    0,
    1,
    0,
    2,
    0,
    0,
    2,
    0,
    2,
    1,
    1,
    1,
    -1,
    3,
    1,
    1,
    0,
    0,
    0,
    2,
    2,
    0,
    0,
    0,
    2,
    1,
    1,
    -1,
    1,
    3,
    1,
    0,
    1,
    0,
    0,
    2,
    0,
    2,
    0,
    0,
    2,
    1,
    1,
    -1,
    1,
    3,
    1,
    0,
    0,
    0,
    1,
    2,
    0,
    0,
    0,
    2,
    2,
    1,
    1,
    -1,
    1,
    3,
    1,
    1,
    0,
    0,
    0,
    2,
    2,
    0,
    0,
    0,
    2,
    1,
    -1,
    1,
    1,
    3,
    1,
    0,
    0,
    1,
    0,
    2,
    0,
    0,
    2,
    0,
    2,
    1,
    -1,
    1,
    1,
    3,
    1,
    0,
    0,
    0,
    1,
    2,
    0,
    0,
    0,
    2,
    2,
    1,
    -1,
    1,
    1,
    3,
    1,
    0,
    1,
    0,
    0,
    2,
    0,
    2,
    0,
    0,
    2,
    -1,
    1,
    1,
    1,
    3,
    1,
    0,
    0,
    1,
    0,
    2,
    0,
    0,
    2,
    0,
    2,
    -1,
    1,
    1,
    1,
    3,
    1,
    0,
    0,
    0,
    1,
    2,
    0,
    0,
    0,
    2,
    2,
    -1,
    1,
    1,
    1,
    3,
    3,
    2,
    1,
    0,
    0,
    3,
    1,
    2,
    0,
    0,
    4,
    1,
    1,
    1,
    1,
    3,
    3,
    2,
    0,
    1,
    0,
    3,
    1,
    0,
    2,
    0,
    4,
    1,
    1,
    1,
    1,
    3,
    3,
    0,
    2,
    1,
    0,
    3,
    0,
    1,
    2,
    0,
    4,
    1,
    1,
    1,
    1,
    3,
    3,
    2,
    0,
    0,
    1,
    3,
    1,
    0,
    0,
    2,
    4,
    1,
    1,
    1,
    1,
    3,
    3,
    0,
    2,
    0,
    1,
    3,
    0,
    1,
    0,
    2,
    4,
    1,
    1,
    1,
    1,
    3,
    3,
    0,
    0,
    2,
    1,
    3,
    0,
    0,
    1,
    2,
    4,
    1,
    1,
    1,
    1,
    3,
    3,
    2,
    1,
    0,
    0,
    3,
    1,
    2,
    0,
    0,
    2,
    1,
    1,
    1,
    -1,
    3,
    3,
    2,
    0,
    1,
    0,
    3,
    1,
    0,
    2,
    0,
    2,
    1,
    1,
    1,
    -1,
    3,
    3,
    0,
    2,
    1,
    0,
    3,
    0,
    1,
    2,
    0,
    2,
    1,
    1,
    1,
    -1,
    3,
    3,
    2,
    1,
    0,
    0,
    3,
    1,
    2,
    0,
    0,
    2,
    1,
    1,
    -1,
    1,
    3,
    3,
    2,
    0,
    0,
    1,
    3,
    1,
    0,
    0,
    2,
    2,
    1,
    1,
    -1,
    1,
    3,
    3,
    0,
    2,
    0,
    1,
    3,
    0,
    1,
    0,
    2,
    2,
    1,
    1,
    -1,
    1,
    3,
    3,
    2,
    0,
    1,
    0,
    3,
    1,
    0,
    2,
    0,
    2,
    1,
    -1,
    1,
    1,
    3,
    3,
    2,
    0,
    0,
    1,
    3,
    1,
    0,
    0,
    2,
    2,
    1,
    -1,
    1,
    1,
    3,
    3,
    0,
    0,
    2,
    1,
    3,
    0,
    0,
    1,
    2,
    2,
    1,
    -1,
    1,
    1,
    3,
    3,
    0,
    2,
    1,
    0,
    3,
    0,
    1,
    2,
    0,
    2,
    -1,
    1,
    1,
    1,
    3,
    3,
    0,
    2,
    0,
    1,
    3,
    0,
    1,
    0,
    2,
    2,
    -1,
    1,
    1,
    1,
    3,
    3,
    0,
    0,
    2,
    1,
    3,
    0,
    0,
    1,
    2,
    2,
    -1,
    1,
    1,
    1
];

},{}],"node_modules/open-simplex-noise/lib/index.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var Contribution2 = /** @class */ (function () {
    function Contribution2(multiplier, xsb, ysb) {
        this.dx = -xsb - multiplier * constants_1.SQUISH_2D;
        this.dy = -ysb - multiplier * constants_1.SQUISH_2D;
        this.xsb = xsb;
        this.ysb = ysb;
    }
    return Contribution2;
}());
var Contribution3 = /** @class */ (function () {
    function Contribution3(multiplier, xsb, ysb, zsb) {
        this.dx = -xsb - multiplier * constants_1.SQUISH_3D;
        this.dy = -ysb - multiplier * constants_1.SQUISH_3D;
        this.dz = -zsb - multiplier * constants_1.SQUISH_3D;
        this.xsb = xsb;
        this.ysb = ysb;
        this.zsb = zsb;
    }
    return Contribution3;
}());
var Contribution4 = /** @class */ (function () {
    function Contribution4(multiplier, xsb, ysb, zsb, wsb) {
        this.dx = -xsb - multiplier * constants_1.SQUISH_4D;
        this.dy = -ysb - multiplier * constants_1.SQUISH_4D;
        this.dz = -zsb - multiplier * constants_1.SQUISH_4D;
        this.dw = -wsb - multiplier * constants_1.SQUISH_4D;
        this.xsb = xsb;
        this.ysb = ysb;
        this.zsb = zsb;
        this.wsb = wsb;
    }
    return Contribution4;
}());
function shuffleSeed(seed) {
    var newSeed = new Uint32Array(1);
    newSeed[0] = seed[0] * 1664525 + 1013904223;
    return newSeed;
}
var OpenSimplexNoise = /** @class */ (function () {
    function OpenSimplexNoise(clientSeed) {
        this.initialize();
        this.perm = new Uint8Array(256);
        this.perm2D = new Uint8Array(256);
        this.perm3D = new Uint8Array(256);
        this.perm4D = new Uint8Array(256);
        var source = new Uint8Array(256);
        for (var i = 0; i < 256; i++)
            source[i] = i;
        var seed = new Uint32Array(1);
        seed[0] = clientSeed;
        seed = shuffleSeed(shuffleSeed(shuffleSeed(seed)));
        for (var i = 255; i >= 0; i--) {
            seed = shuffleSeed(seed);
            var r = new Uint32Array(1);
            r[0] = (seed[0] + 31) % (i + 1);
            if (r[0] < 0)
                r[0] += i + 1;
            this.perm[i] = source[r[0]];
            this.perm2D[i] = this.perm[i] & 0x0e;
            this.perm3D[i] = (this.perm[i] % 24) * 3;
            this.perm4D[i] = this.perm[i] & 0xfc;
            source[r[0]] = source[i];
        }
    }
    OpenSimplexNoise.prototype.array2D = function (width, height) {
        var output = new Array(width);
        for (var x = 0; x < width; x++) {
            output[x] = new Array(height);
            for (var y = 0; y < height; y++) {
                output[x][y] = this.noise2D(x, y);
            }
        }
        return output;
    };
    OpenSimplexNoise.prototype.array3D = function (width, height, depth) {
        var output = new Array(width);
        for (var x = 0; x < width; x++) {
            output[x] = new Array(height);
            for (var y = 0; y < height; y++) {
                output[x][y] = new Array(depth);
                for (var z = 0; z < depth; z++) {
                    output[x][y][z] = this.noise3D(x, y, z);
                }
            }
        }
        return output;
    };
    OpenSimplexNoise.prototype.array4D = function (width, height, depth, wLength) {
        var output = new Array(width);
        for (var x = 0; x < width; x++) {
            output[x] = new Array(height);
            for (var y = 0; y < height; y++) {
                output[x][y] = new Array(depth);
                for (var z = 0; z < depth; z++) {
                    output[x][y][z] = new Array(wLength);
                    for (var w = 0; w < wLength; w++) {
                        output[x][y][z][w] = this.noise4D(x, y, z, w);
                    }
                }
            }
        }
        return output;
    };
    OpenSimplexNoise.prototype.noise2D = function (x, y) {
        var stretchOffset = (x + y) * constants_1.STRETCH_2D;
        var xs = x + stretchOffset;
        var ys = y + stretchOffset;
        var xsb = Math.floor(xs);
        var ysb = Math.floor(ys);
        var squishOffset = (xsb + ysb) * constants_1.SQUISH_2D;
        var dx0 = x - (xsb + squishOffset);
        var dy0 = y - (ysb + squishOffset);
        var xins = xs - xsb;
        var yins = ys - ysb;
        var inSum = xins + yins;
        var hash = (xins - yins + 1) |
            (inSum << 1) |
            ((inSum + yins) << 2) |
            ((inSum + xins) << 4);
        var value = 0;
        for (var c = this.lookup2D[hash]; c !== undefined; c = c.next) {
            var dx = dx0 + c.dx;
            var dy = dy0 + c.dy;
            var attn = 2 - dx * dx - dy * dy;
            if (attn > 0) {
                var px = xsb + c.xsb;
                var py = ysb + c.ysb;
                var indexPartA = this.perm[px & 0xff];
                var index = this.perm2D[(indexPartA + py) & 0xff];
                var valuePart = constants_1.gradients2D[index] * dx + constants_1.gradients2D[index + 1] * dy;
                value += attn * attn * attn * attn * valuePart;
            }
        }
        return value * constants_1.NORM_2D;
    };
    OpenSimplexNoise.prototype.noise3D = function (x, y, z) {
        var stretchOffset = (x + y + z) * constants_1.STRETCH_3D;
        var xs = x + stretchOffset;
        var ys = y + stretchOffset;
        var zs = z + stretchOffset;
        var xsb = Math.floor(xs);
        var ysb = Math.floor(ys);
        var zsb = Math.floor(zs);
        var squishOffset = (xsb + ysb + zsb) * constants_1.SQUISH_3D;
        var dx0 = x - (xsb + squishOffset);
        var dy0 = y - (ysb + squishOffset);
        var dz0 = z - (zsb + squishOffset);
        var xins = xs - xsb;
        var yins = ys - ysb;
        var zins = zs - zsb;
        var inSum = xins + yins + zins;
        var hash = (yins - zins + 1) |
            ((xins - yins + 1) << 1) |
            ((xins - zins + 1) << 2) |
            (inSum << 3) |
            ((inSum + zins) << 5) |
            ((inSum + yins) << 7) |
            ((inSum + xins) << 9);
        var value = 0;
        for (var c = this.lookup3D[hash]; c !== undefined; c = c.next) {
            var dx = dx0 + c.dx;
            var dy = dy0 + c.dy;
            var dz = dz0 + c.dz;
            var attn = 2 - dx * dx - dy * dy - dz * dz;
            if (attn > 0) {
                var px = xsb + c.xsb;
                var py = ysb + c.ysb;
                var pz = zsb + c.zsb;
                var indexPartA = this.perm[px & 0xff];
                var indexPartB = this.perm[(indexPartA + py) & 0xff];
                var index = this.perm3D[(indexPartB + pz) & 0xff];
                var valuePart = constants_1.gradients3D[index] * dx +
                    constants_1.gradients3D[index + 1] * dy +
                    constants_1.gradients3D[index + 2] * dz;
                value += attn * attn * attn * attn * valuePart;
            }
        }
        return value * constants_1.NORM_3D;
    };
    OpenSimplexNoise.prototype.noise4D = function (x, y, z, w) {
        var stretchOffset = (x + y + z + w) * constants_1.STRETCH_4D;
        var xs = x + stretchOffset;
        var ys = y + stretchOffset;
        var zs = z + stretchOffset;
        var ws = w + stretchOffset;
        var xsb = Math.floor(xs);
        var ysb = Math.floor(ys);
        var zsb = Math.floor(zs);
        var wsb = Math.floor(ws);
        var squishOffset = (xsb + ysb + zsb + wsb) * constants_1.SQUISH_4D;
        var dx0 = x - (xsb + squishOffset);
        var dy0 = y - (ysb + squishOffset);
        var dz0 = z - (zsb + squishOffset);
        var dw0 = w - (wsb + squishOffset);
        var xins = xs - xsb;
        var yins = ys - ysb;
        var zins = zs - zsb;
        var wins = ws - wsb;
        var inSum = xins + yins + zins + wins;
        var hash = (zins - wins + 1) |
            ((yins - zins + 1) << 1) |
            ((yins - wins + 1) << 2) |
            ((xins - yins + 1) << 3) |
            ((xins - zins + 1) << 4) |
            ((xins - wins + 1) << 5) |
            (inSum << 6) |
            ((inSum + wins) << 8) |
            ((inSum + zins) << 11) |
            ((inSum + yins) << 14) |
            ((inSum + xins) << 17);
        var value = 0;
        for (var c = this.lookup4D[hash]; c !== undefined; c = c.next) {
            var dx = dx0 + c.dx;
            var dy = dy0 + c.dy;
            var dz = dz0 + c.dz;
            var dw = dw0 + c.dw;
            var attn = 2 - dx * dx - dy * dy - dz * dz - dw * dw;
            if (attn > 0) {
                var px = xsb + c.xsb;
                var py = ysb + c.ysb;
                var pz = zsb + c.zsb;
                var pw = wsb + c.wsb;
                var indexPartA = this.perm[px & 0xff];
                var indexPartB = this.perm[(indexPartA + py) & 0xff];
                var indexPartC = this.perm[(indexPartB + pz) & 0xff];
                var index = this.perm4D[(indexPartC + pw) & 0xff];
                var valuePart = constants_1.gradients4D[index] * dx +
                    constants_1.gradients4D[index + 1] * dy +
                    constants_1.gradients4D[index + 2] * dz +
                    constants_1.gradients4D[index + 3] * dw;
                value += attn * attn * attn * attn * valuePart;
            }
        }
        return value * constants_1.NORM_4D;
    };
    OpenSimplexNoise.prototype.initialize = function () {
        var contributions2D = [];
        for (var i = 0; i < constants_1.p2D.length; i += 4) {
            var baseSet = constants_1.base2D[constants_1.p2D[i]];
            var previous = null;
            var current = null;
            for (var k = 0; k < baseSet.length; k += 3) {
                current = new Contribution2(baseSet[k], baseSet[k + 1], baseSet[k + 2]);
                if (previous === null)
                    contributions2D[i / 4] = current;
                else
                    previous.next = current;
                previous = current;
            }
            current.next = new Contribution2(constants_1.p2D[i + 1], constants_1.p2D[i + 2], constants_1.p2D[i + 3]);
        }
        this.lookup2D = [];
        for (var i = 0; i < constants_1.lookupPairs2D.length; i += 2) {
            this.lookup2D[constants_1.lookupPairs2D[i]] = contributions2D[constants_1.lookupPairs2D[i + 1]];
        }
        var contributions3D = [];
        for (var i = 0; i < constants_1.p3D.length; i += 9) {
            var baseSet = constants_1.base3D[constants_1.p3D[i]];
            var previous = null;
            var current = null;
            for (var k = 0; k < baseSet.length; k += 4) {
                current = new Contribution3(baseSet[k], baseSet[k + 1], baseSet[k + 2], baseSet[k + 3]);
                if (previous === null)
                    contributions3D[i / 9] = current;
                else
                    previous.next = current;
                previous = current;
            }
            current.next = new Contribution3(constants_1.p3D[i + 1], constants_1.p3D[i + 2], constants_1.p3D[i + 3], constants_1.p3D[i + 4]);
            current.next.next = new Contribution3(constants_1.p3D[i + 5], constants_1.p3D[i + 6], constants_1.p3D[i + 7], constants_1.p3D[i + 8]);
        }
        this.lookup3D = [];
        for (var i = 0; i < constants_1.lookupPairs3D.length; i += 2) {
            this.lookup3D[constants_1.lookupPairs3D[i]] = contributions3D[constants_1.lookupPairs3D[i + 1]];
        }
        var contributions4D = [];
        for (var i = 0; i < constants_1.p4D.length; i += 16) {
            var baseSet = constants_1.base4D[constants_1.p4D[i]];
            var previous = null;
            var current = null;
            for (var k = 0; k < baseSet.length; k += 5) {
                current = new Contribution4(baseSet[k], baseSet[k + 1], baseSet[k + 2], baseSet[k + 3], baseSet[k + 4]);
                if (previous === null)
                    contributions4D[i / 16] = current;
                else
                    previous.next = current;
                previous = current;
            }
            current.next = new Contribution4(constants_1.p4D[i + 1], constants_1.p4D[i + 2], constants_1.p4D[i + 3], constants_1.p4D[i + 4], constants_1.p4D[i + 5]);
            current.next.next = new Contribution4(constants_1.p4D[i + 6], constants_1.p4D[i + 7], constants_1.p4D[i + 8], constants_1.p4D[i + 9], constants_1.p4D[i + 10]);
            current.next.next.next = new Contribution4(constants_1.p4D[i + 11], constants_1.p4D[i + 12], constants_1.p4D[i + 13], constants_1.p4D[i + 14], constants_1.p4D[i + 15]);
        }
        this.lookup4D = [];
        for (var i = 0; i < constants_1.lookupPairs4D.length; i += 2) {
            this.lookup4D[constants_1.lookupPairs4D[i]] = contributions4D[constants_1.lookupPairs4D[i + 1]];
        }
    };
    return OpenSimplexNoise;
}());
exports.default = OpenSimplexNoise;

},{"./constants":"node_modules/open-simplex-noise/lib/constants.js"}],"node_modules/runes/index.js":[function(require,module,exports) {
'use strict';

const HIGH_SURROGATE_START = 0xd800;
const HIGH_SURROGATE_END = 0xdbff;
const LOW_SURROGATE_START = 0xdc00;
const REGIONAL_INDICATOR_START = 0x1f1e6;
const REGIONAL_INDICATOR_END = 0x1f1ff;
const FITZPATRICK_MODIFIER_START = 0x1f3fb;
const FITZPATRICK_MODIFIER_END = 0x1f3ff;
const VARIATION_MODIFIER_START = 0xfe00;
const VARIATION_MODIFIER_END = 0xfe0f;
const DIACRITICAL_MARKS_START = 0x20d0;
const DIACRITICAL_MARKS_END = 0x20ff;
const ZWJ = 0x200d;
const GRAPHEMS = [0x0308, // ( ◌̈ ) COMBINING DIAERESIS
0x0937, // ( ष ) DEVANAGARI LETTER SSA
0x0937, // ( ष ) DEVANAGARI LETTER SSA
0x093F, // ( ि ) DEVANAGARI VOWEL SIGN I
0x093F, // ( ि ) DEVANAGARI VOWEL SIGN I
0x0BA8, // ( ந ) TAMIL LETTER NA
0x0BBF, // ( ி ) TAMIL VOWEL SIGN I
0x0BCD, // ( ◌்) TAMIL SIGN VIRAMA
0x0E31, // ( ◌ั ) THAI CHARACTER MAI HAN-AKAT
0x0E33, // ( ำ ) THAI CHARACTER SARA AM
0x0E40, // ( เ ) THAI CHARACTER SARA E
0x0E49, // ( เ ) THAI CHARACTER MAI THO
0x1100, // ( ᄀ ) HANGUL CHOSEONG KIYEOK
0x1161, // ( ᅡ ) HANGUL JUNGSEONG A
0x11A8 // ( ᆨ ) HANGUL JONGSEONG KIYEOK
];

function runes(string) {
  if (typeof string !== 'string') {
    throw new Error('string cannot be undefined or null');
  }

  const result = [];
  let i = 0;
  let increment = 0;

  while (i < string.length) {
    increment += nextUnits(i + increment, string);

    if (isGraphem(string[i + increment])) {
      increment++;
    }

    if (isVariationSelector(string[i + increment])) {
      increment++;
    }

    if (isDiacriticalMark(string[i + increment])) {
      increment++;
    }

    if (isZeroWidthJoiner(string[i + increment])) {
      increment++;
      continue;
    }

    result.push(string.substring(i, i + increment));
    i += increment;
    increment = 0;
  }

  return result;
} // Decide how many code units make up the current character.
// BMP characters: 1 code unit
// Non-BMP characters (represented by surrogate pairs): 2 code units
// Emoji with skin-tone modifiers: 4 code units (2 code points)
// Country flags: 4 code units (2 code points)
// Variations: 2 code units


function nextUnits(i, string) {
  const current = string[i]; // If we don't have a value that is part of a surrogate pair, or we're at
  // the end, only take the value at i

  if (!isFirstOfSurrogatePair(current) || i === string.length - 1) {
    return 1;
  }

  const currentPair = current + string[i + 1];
  let nextPair = string.substring(i + 2, i + 5); // Country flags are comprised of two regional indicator symbols,
  // each represented by a surrogate pair.
  // See http://emojipedia.org/flags/
  // If both pairs are regional indicator symbols, take 4

  if (isRegionalIndicator(currentPair) && isRegionalIndicator(nextPair)) {
    return 4;
  } // If the next pair make a Fitzpatrick skin tone
  // modifier, take 4
  // See http://emojipedia.org/modifiers/
  // Technically, only some code points are meant to be
  // combined with the skin tone modifiers. This function
  // does not check the current pair to see if it is
  // one of them.


  if (isFitzpatrickModifier(nextPair)) {
    return 4;
  }

  return 2;
}

function isFirstOfSurrogatePair(string) {
  return string && betweenInclusive(string[0].charCodeAt(0), HIGH_SURROGATE_START, HIGH_SURROGATE_END);
}

function isRegionalIndicator(string) {
  return betweenInclusive(codePointFromSurrogatePair(string), REGIONAL_INDICATOR_START, REGIONAL_INDICATOR_END);
}

function isFitzpatrickModifier(string) {
  return betweenInclusive(codePointFromSurrogatePair(string), FITZPATRICK_MODIFIER_START, FITZPATRICK_MODIFIER_END);
}

function isVariationSelector(string) {
  return typeof string === 'string' && betweenInclusive(string.charCodeAt(0), VARIATION_MODIFIER_START, VARIATION_MODIFIER_END);
}

function isDiacriticalMark(string) {
  return typeof string === 'string' && betweenInclusive(string.charCodeAt(0), DIACRITICAL_MARKS_START, DIACRITICAL_MARKS_END);
}

function isGraphem(string) {
  return typeof string === 'string' && GRAPHEMS.indexOf(string.charCodeAt(0)) !== -1;
}

function isZeroWidthJoiner(string) {
  return typeof string === 'string' && string.charCodeAt(0) === ZWJ;
}

function codePointFromSurrogatePair(pair) {
  const highOffset = pair.charCodeAt(0) - HIGH_SURROGATE_START;
  const lowOffset = pair.charCodeAt(1) - LOW_SURROGATE_START;
  return (highOffset << 10) + lowOffset + 0x10000;
}

function betweenInclusive(value, lower, upper) {
  return value >= lower && value <= upper;
}

function substring(string, start, width) {
  const chars = runes(string);

  if (start === undefined) {
    return string;
  }

  if (start >= chars.length) {
    return '';
  }

  const rest = chars.length - start;
  const stringWidth = width === undefined ? rest : width;
  let endIndex = start + stringWidth;

  if (endIndex > start + rest) {
    endIndex = undefined;
  }

  return chars.slice(start, endIndex).join('');
}

module.exports = runes;
module.exports.substr = substring;
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");

var _openSimplexNoise = _interopRequireDefault(require("open-simplex-noise"));

var _runes = _interopRequireDefault(require("runes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const openSimplex = new _openSimplexNoise.default("week7" + Date.now());
const phrases = ["☜", "🌀🧶", "チップチューン", "🍂🍃🍁", "☻", "✌︎", "👽", "✐"];
const colors = ["#FF2600", "#00FA92", "#FFD479", "#FFFFFF"];
let text = phrases[Math.floor(Math.random() * phrases.length)];
let font = "IBM Plex Mono, monospace";
let splitText = true;
let letters = [];
let maxLetterWidth = 0;
let dpr = window.devicePixelRatio;
let backgroundColor = "#212121";
let textColor = colors[Math.floor(Math.random() * colors.length)];
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
const textCanvas = document.createElement("canvas");
const textContext = textCanvas.getContext("2d");

function drawText() {
  textContext.fillStyle = textColor;
  textContext.textBaseline = "middle";
  textContext.textAlign = "center";
  textContext.font = `${"normal"} ${128 * dpr}px ${font}`;
  maxLetterWidth = 0;

  if (splitText) {
    letters = (0, _runes.default)(text);
    letters.forEach(letter => {
      maxLetterWidth = Math.max(maxLetterWidth, textContext.measureText(letter).width);
    });
    textCanvas.width = maxLetterWidth * letters.length;
    textCanvas.height = maxLetterWidth * 3;
  } else {
    const textWidth = textContext.measureText(text).width;
    textCanvas.width = textWidth;
    textCanvas.height = textWidth * 1.38;
    maxLetterWidth = textWidth;
  }

  textContext.fillStyle = textColor;
  textContext.textBaseline = "middle";
  textContext.textAlign = "center";
  textContext.font = `${"normal"} ${128 * dpr}px ${font}`;

  if (splitText) {
    textContext.textBaseline = "middle";
    textContext.textAlign = "left";

    for (let i = 0; i < letters.length; ++i) {
      textContext.fillText(letters[i], i * maxLetterWidth, textCanvas.height / 2);
    }
  } else {
    textContext.fillText(text, textCanvas.width / 2, textCanvas.height / 2);
  }
}

function resize() {
  const {
    innerWidth,
    innerHeight
  } = window;
  dpr = window.devicePixelRatio;
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;
  context.fillStyle = backgroundColor;
  drawText();
}

resize();
document.body.appendChild(canvas);
window.addEventListener("resize", resize);
let raf;

function loop(delta) {
  raf = requestAnimationFrame(loop);
  const {
    width,
    height
  } = canvas;
  context.save();
  context.globalAlpha = 1;
  context.fillRect(0, 0, width, height);
  context.restore();
  const divisionWidth = width / maxLetterWidth;
  const divisionHeight = height / maxLetterWidth;

  if (maxLetterWidth < 1) {
    return;
  }

  let letterPosition = 0;

  for (let y = -1; y < divisionHeight + 1; y += 1) {
    for (let x = -1; x < divisionWidth + 1; x += 1) {
      const sinX = Math.sin(delta / 1000 + x / 5);
      const sinY = Math.cos(delta / 900 + y / 5);
      const x1 = maxLetterWidth * x;
      const y1 = maxLetterWidth * y;
      const scale = openSimplex.noise3D(x / 8, y / 8, delta / 2000); // const scale = perlin3.gen(x / 16, y / 16, frames / 80)

      context.save();
      context.translate(x1 + scale * sinX * maxLetterWidth, y1 + scale * sinY * maxLetterWidth);
      context.rotate(delta / 10000 + Math.PI * scale);
      context.scale(scale * 0.5 + 0.5, scale * 0.5 + 0.5);

      if (splitText) {
        context.drawImage(textCanvas, letterPosition * maxLetterWidth, 0, maxLetterWidth, textCanvas.height, -maxLetterWidth / 2, -textCanvas.height / 2, maxLetterWidth, textCanvas.height);
        letterPosition += 1;

        if (letterPosition > letters.length - 1) {
          letterPosition = 0;
        }
      } else {
        context.drawImage(textCanvas, -textCanvas.width / 2, -textCanvas.height / 2);
      }

      context.restore();
    }
  }
}

async function start() {
  resize();
  requestAnimationFrame(loop);
}

start();
},{"./styles.css":"src/styles.css","open-simplex-noise":"node_modules/open-simplex-noise/lib/index.js","runes":"node_modules/runes/index.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56482" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map