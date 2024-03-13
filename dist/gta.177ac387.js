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
})({"js/car/car.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var currentPage = document.body.dataset.page;
var Car = exports.default = /*#__PURE__*/function () {
  function Car() {
    _classCallCheck(this, Car);
    if (currentPage !== 'bar_interior' && currentPage !== 'casino_interior') {
      this.element = document.createElement('div');
      this.element.classList.add('car');
      this.element.id = 'car';
      this.element.style.position = 'absolute';
      this.element.style.width = '150px';
      this.element.style.height = '70px';
      this.speed = 3;
      this.angle = 0; // Initial angle in radians
      this.isDriftingLeft = false; // Flag to indicate if the car is drifting left
      this.isDriftingRight = false; // Flag to indicate if the car is drifting right
      this.currentArrowKey = null; // Currently pressed arrow key
      document.body.appendChild(this.element);

      // Event listeners for keydown and keyup events
      document.addEventListener('keydown', this.handleKeyDown.bind(this));
      document.addEventListener('keyup', this.handleKeyUp.bind(this));
    }
  }
  _createClass(Car, [{
    key: "setPosition",
    value: function setPosition(x, y) {
      var spawnAngle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      if (this.element) {
        // Check if the element exists before setting its style
        this.element.style.left = "".concat(x, "px");
        this.element.style.top = "".concat(y, "px");
        this.setAngle(spawnAngle);
      }
    }
  }, {
    key: "setAngle",
    value: function setAngle(newAngle) {
      if (this.element) {
        // Check if the element exists before setting its style
        this.angle = newAngle;
        this.element.style.transform = "rotate(".concat(this.angle, "deg)");
      }
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      switch (event.key) {
        case ' ':
          // Spacebar is pressed, enable drifting
          this.isDrifting = true;
          break;
        case 'ArrowLeft':
          // Turning left
          this.isTurningLeft = true;
          break;
        case 'ArrowRight':
          // Turning right
          this.isTurningRight = true;
          break;
      }
    }
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(event) {
      switch (event.key) {
        case ' ':
          // Spacebar is released, disable drifting
          this.isDrifting = false;
          break;
        case 'ArrowLeft':
          // Stop turning left
          this.isTurningLeft = false;
          break;
        case 'ArrowRight':
          // Stop turning right
          this.isTurningRight = false;
          break;
      }
    }
  }, {
    key: "move",
    value: function move() {
      // Convert angle to radians
      var angleInRadians = this.angle * (Math.PI / 180);

      // Calculate lateral movement based on angle for drifting effect
      var lateralMovement = this.isDrifting ? 0.05 * (this.isTurningLeft ? -1 : 1) : 0;

      // Gradually adjust the angle for drifting
      var driftFactor = 25; // Adjust as needed
      this.angle += lateralMovement * driftFactor;

      // Calculate new position based on angle
      var newX = this.element.offsetLeft + this.speed * Math.cos(angleInRadians);
      var newY = this.element.offsetTop + this.speed * Math.sin(angleInRadians);

      // Check if the new position is within the window boundaries
      if (newX >= 0 && newY >= 0 && newX + this.element.offsetWidth <= window.innerWidth && newY + this.element.offsetHeight <= window.innerHeight) {
        this.element.style.left = "".concat(newX, "px");
        this.element.style.top = "".concat(newY, "px");
        this.element.style.transform = "rotate(".concat(this.angle, "deg)");
      }
    }
  }, {
    key: "update",
    value: function update() {
      // Update the car's position based on its angle and drifting state
      this.move();
    }
  }]);
  return Car;
}();
},{}],"js/class/buildings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
//‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
//         Building               //
//________________________________//
var Building = exports.default = /*#__PURE__*/function () {
  function Building(id, x, y, width, height) {
    _classCallCheck(this, Building);
    this.id = id;
    this.element = document.createElement('div');
    this.element.classList.add('building');
    this.element.id = id;
    this.element.style.position = 'absolute';
    this.element.style.left = "".concat(x, "px");
    this.element.style.top = "".concat(y, "px");
    this.element.style.width = "".concat(width, "px");
    this.element.style.height = "".concat(height, "px");
    // this.element.style.backgroundColor = 'brown';

    this.overlay = document.createElement('div');
    this.overlay.classList.add('overlay');
    this.element.appendChild(this.overlay);
    document.body.appendChild(this.element);
  }
  _createClass(Building, [{
    key: "getBoundingClientRect",
    value: function getBoundingClientRect() {
      return this.element.getBoundingClientRect();
    }
  }]);
  return Building;
}();
},{}],"js/building/create_buildings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _buildings = _interopRequireDefault(require("../class/buildings.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var currentPage = document.body.dataset.page;
var buildings = createBuildings(currentPage);
var player = document.getElementById('player'); // Assuming you have a player element with id 'player'

//declare building size + locations here
function createBuildings(page) {
  switch (page) {
    case 'home':
      return [new _buildings.default('building1', 100, 100, 100, 150), new _buildings.default('building2', 300, 200, 120, 180)
      // Add more buildings for the 'home' page as needed
      ];
    case 'bar_interior':
      return [new _buildings.default('bar-door', 0, 300, 15, 80), new _buildings.default('pool-table', 1000, 150, 250, 174), new _buildings.default('casino-chairs', 850, 400, 106 * 1.9, 97 * 1.9), new _buildings.default('casino-chairs', 550, 550, 106 * 1.9, 97 * 1.9), new _buildings.default('casino-chairs', 550, 200, 106 * 1.9, 97 * 1.9), new _buildings.default('casino-chairs', 250, 450, 106 * 1.9, 97 * 1.9)];
    case 'casino_interior':
      return [new _buildings.default('casino-door', 0, 300, 15, 80), new _buildings.default('poker-table', 250, 120, 320, 174), new _buildings.default('blackjack-table', 600, 300, 240 * .75, 160 * .75),
      // new Building('dice-table', 
      // 300, 260, 120, 80),

      new _buildings.default('roulette-table', 300, 520, 340, 174), new _buildings.default('casino-bar', 810, 0, 450, 80), new _buildings.default('bar-right', 1260, 0, 100, 100), new _buildings.default('casino-chairs', 950, 400, 106 * 1.9, 97 * 1.9), new _buildings.default('slot-machine', 650, 0, 80, 80)

      // Add more buildings for the 'home' page as needed
      ];
    case 'interior':
      return [new _buildings.default('toll_1b'),
      //toll 1_b

      new _buildings.default('building3', 180, 180, 77.3 * 2.5, 132.14 * 2.5),
      //gas
      // new Building('gas_dumpster', 160, 300, 50, 80), //

      new _buildings.default('building4', 400, 180, 244 * 1.5, 206 * 1.5),
      //bar
      new _buildings.default('bar_parking', 740, 180, 120, 200),
      //bar
      new _buildings.default('bar_carpet_outside', 500, 160, 120, 20),
      //bar

      new _buildings.default('building6', 1000, 500, 600, 1000) //casino
      // new Building('building5', 1300, 180, 300, 200) //pot shop
      ];
    case 'interior_2':
      return [new _buildings.default('casino_right', 0, 500, 600, 1000), new _buildings.default('pot_right', 0, 180, 300, 200), new _buildings.default('toll_2a'),
      // to T1B
      new _buildings.default('toll_2b') // to T3A
      ];
    case 'interior_3':
      return [new _buildings.default('home', 700, 200, 220, 320),
      //casino
      new _buildings.default('garden', 600, 200, 100, 320),
      //casino

      new _buildings.default('toll_3a') // to T2B
      ];
    default:
      return [];
    // Default to an empty array if no specific buildings are defined
  }
}
var _default = exports.default = buildings;
},{"../class/buildings.js":"js/class/buildings.js"}],"js/combat/bullet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reload_note = exports.default = exports.bullets = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// bullets.js
var bullets = exports.bullets = [];
var reload_note = exports.reload_note = document.querySelector('.reloadText');
var Bullet = exports.default = /*#__PURE__*/function () {
  function Bullet(x, y, speed, direction, lifespan) {
    _classCallCheck(this, Bullet);
    this.element = document.createElement('div');
    this.element.className = 'bullet';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.direction = direction;
    this.lifespan = lifespan;
    this.fireRate = 20;
    document.body.appendChild(this.element);
  }
  _createClass(Bullet, [{
    key: "update",
    value: function update() {
      this.x += this.speed * this.direction.x;
      this.y += this.speed * this.direction.y;
      this.element.style.transform = "translate(".concat(this.x, "px, ").concat(this.y, "px)");
      this.lifespan--;
      if (this.lifespan <= 0) {
        this.remove();
      }
    }
  }, {
    key: "remove",
    value: function remove() {
      // Remove the bullet from the DOM and bullets array
      this.element.remove();
      var index = bullets.indexOf(this);
      if (index !== -1) {
        bullets.splice(index, 1);
      }
    }
  }]);
  return Bullet;
}();
},{}],"js/class/player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _car = _interopRequireDefault(require("../car/car.js"));
var _create_buildings = _interopRequireDefault(require("../building/create_buildings.js"));
var _bullet = require("../combat/bullet.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// import Enemy from './enemy.js';
//‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
//            Player              //
//________________________________//
var Player = exports.default = /*#__PURE__*/function () {
  function Player(currentPage) {
    var _this = this;
    _classCallCheck(this, Player);
    this.car = new _car.default();
    this.element = document.getElementById('player');
    // if(currentPage==='interior'){
    this.car.setPosition(740, 240, 90);
    // this.setPosition(100, 300);
    // this.enemies = [];
    this.x = 0;
    this.y = 0;
    this.speed = 10;
    this.inCar = false;
    this.size = 20;
    this.bulletsShot = 0;
    this.maxBullets = 50;
    this.isReloading = false;
    this.update();
    this.updateBulletsDisplay();

    // // Retrieve stored player position or set default position
    // const storedPosition = localStorage.getItem('playerPosition');
    // if (storedPosition) {
    //     const playerPosition = JSON.parse(storedPosition);
    //     this.spawn(playerPosition.x, playerPosition.y, playerPosition.angle);
    // } else {
    //     this.spawn(680, 240, 90); // Default spawn position
    // }

    this.carPositionChangeListener = function () {
      // Update the player's position to match the car's position
      if (_this.isInCar) {
        var carRect = _this.car.element.getBoundingClientRect();
        _this.x = carRect.left;
        _this.y = carRect.top;
        _this.update();
      }
    };
    //car position listener
    document.addEventListener('carPositionChange', this.carPositionChangeListener);
    this.pixelSpawnIntervalId = null; //for smoking joint (j)
    document.addEventListener('keydown', function (event) {
      if (event.key === 'j') {
        _this.startPixelSpawning(); //start spawning pixels when user
        //presses 'j'
      }
    });
  }

  // getPosition() {
  //     return {
  //         x: this.x,
  //         y: this.y,
  //         angle: this.angle
  //     };
  // }

  // spawn(x, y, angle) {
  //     this.x = x;
  //     this.y = y;
  //     this.angle = angle;

  //     this.update();
  // }

  //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\\
  //                         \\
  //       Eat NPC Logic       \\
  //                             \\
  //_______________________________\\
  _createClass(Player, [{
    key: "eatEnemy",
    value: function eatEnemy() {
      // Increase player's size and speed when an enemy is eaten
      this.size += 5; //how much #player grows when 1 NPC is eaten
      this.speed += 0.1; //how much speed is added when 1 NPC is eaten

      //apply the size to the html elements
      this.element.style.height = "".concat(this.size, "px");
      this.element.style.width = "".concat(this.size, "px");

      // console.log(`Player size: ${this.size}, Player speed: ${this.speed}`);
    }

    //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\\
    //                         \\
    //        Smoke Joint        \\
    //                             \\
    //_______________________________\\

    //start smoke spawn
  }, {
    key: "startPixelSpawning",
    value: function startPixelSpawning() {
      var _this2 = this;
      // Clear any existing interval
      this.stopPixelSpawning();

      // Set the interval to spawn pixels every 100 milliseconds (adjust as needed)
      this.pixelSpawnIntervalId = setInterval(function () {
        _this2.spawnPixel();
      }, 100);

      // Stop spawning pixels after 5 seconds (adjust as needed)
      setTimeout(function () {
        _this2.stopPixelSpawning();
      }, 3500);
    }

    // stop smoke spawn
  }, {
    key: "stopPixelSpawning",
    value: function stopPixelSpawning() {
      clearInterval(this.pixelSpawnIntervalId);
    }

    // spawn smoke
  }, {
    key: "spawnPixel",
    value: function spawnPixel() {
      var pixel = document.createElement('div');
      pixel.classList.add('pixel'); // You can style this class in your CSS
      pixel.style.position = 'absolute';
      pixel.style.width = '5px';
      pixel.style.height = '5px';
      pixel.style.backgroundColor = 'white';
      pixel.style.left = "".concat(this.x, "px"); // Adjust as needed
      pixel.style.top = "".concat(this.y, "px"); // Adjust as needed

      // Set the position relative to the player's current position
      var playerRect = this.element.getBoundingClientRect();
      pixel.style.left = "".concat(playerRect.left, "px");
      pixel.style.top = "".concat(playerRect.top, "px");
      document.body.appendChild(pixel);

      // Remove the pixel after 1 second
      setTimeout(function () {
        pixel.remove();
      }, 1000);
    }

    //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\\
    //                         \\
    //       Gun + Bullets       \\
    //                             \\
    //_______________________________\\
  }, {
    key: "updateBulletsDisplay",
    value: function updateBulletsDisplay() {
      document.getElementById('bulletsCount').textContent = this.bulletsCount;
    }
  }, {
    key: "shootBullet",
    value: function shootBullet(event) {
      var _this3 = this;
      // Create a new bullet element
      var bullet = document.createElement('div');
      bullet.className = 'bullet';
      document.body.appendChild(bullet);
      if (this.isReloading) {
        console.log('RELOAD YOUR GUN');
        _bullet.reload_note.style.display = "block";
        return;
      }

      //increment bullets shot (10 in a clip) set in player constructor
      this.bulletsShot++;

      // Check if the player needs to reload
      if (this.bulletsShot >= this.maxBullets) {
        this.startReloading();
      }

      // Update the bullets count and display
      this.bulletsCount = this.maxBullets - this.bulletsShot;
      this.updateBulletsDisplay();

      // Add an event listener for the "R" key to finish reloading
      var reloadListener = function reloadListener(event) {
        if (event.key === 'R' || event.key === 'r') {
          _this3.bulletsShot = 0; //reset bullet count on reload
          _this3.isReloading = false; //sets flag to false to finish reload
          // console.log('Reloaded');
          // Remove the event listener
          document.removeEventListener('keydown', reloadListener);
          /* The event listener is removed after reload, so player
          can't abuse it by spamming it/ holding it down        */
        }

        // once:true makes the event only happen once, and then the listener is removed
        document.addEventListener('keydown', reloadListener, {
          once: true
        });
      };

      // Set the initial position of the bullet to the middle of the player's div
      var playerRect = this.element.getBoundingClientRect();
      bullet.style.left = "".concat(playerRect.left + playerRect.width / 2, "px");
      bullet.style.top = "".concat(playerRect.top + playerRect.height / 2, "px");

      // Calculate the angle between the player and the mouse click
      // Calculate the angle between the player and the mouse click
      var angle = Math.atan2(event.clientY - (playerRect.top + playerRect.height / 2), event.clientX - (playerRect.left + playerRect.width / 2));
      // Set the initial speed of the bullet
      var bulletSpeed = 10;

      // Move the bullet in the direction of the mouse click
      var bulletMove = function bulletMove() {
        var bulletRect = bullet.getBoundingClientRect();

        // Calculate the distance between the player's center and the mouse cursor
        var deltaX = event.clientX - (playerRect.left + playerRect.width / 2);
        var deltaY = event.clientY - (playerRect.top + playerRect.height / 2);

        // Normalize the distance to get a unit vector
        var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        var normalizedDeltaX = deltaX / distance;
        var normalizedDeltaY = deltaY / distance;

        // Update bullet position based on normalized direction and speed
        bullet.style.left = "".concat(bulletRect.left + bulletSpeed * normalizedDeltaX, "px");
        bullet.style.top = "".concat(bulletRect.top + bulletSpeed * normalizedDeltaY, "px");

        // Check if the bullet is still within the window
        if (bulletRect.left < window.innerWidth && bulletRect.right > 0 && bulletRect.top < window.innerHeight && bulletRect.bottom > 0) {
          // Continue moving the bullet
          requestAnimationFrame(bulletMove);
        } else {
          // Remove the bullet when it goes out of bounds
          bullet.remove();
        }
      };

      // Start moving the bullet
      requestAnimationFrame(bulletMove);
    }
  }, {
    key: "startReloading",
    value: function startReloading() {
      var _this4 = this;
      // Set isReloading to true
      this.isReloading = true;

      // Add an event listener for the "R" key to finish reloading
      var reloadListener = function reloadListener(event) {
        if (event.key === 'R' || event.key === 'r') {
          // Reset bulletsShot count and set isReloading to false
          _this4.bulletsShot = 0;
          _this4.isReloading = false;

          // Reset bullets count to full and update display
          _this4.bulletsCount = _this4.maxBullets; //this number is set in player constructor
          _this4.updateBulletsDisplay();
          console.log('Reload complete. Ready to shoot!');
          _bullet.reload_note.style.display = "none";

          // Remove the event listener
          document.removeEventListener('keydown', reloadListener);
        }
      };
      document.addEventListener('keydown', reloadListener, {
        once: true
      });
    }
  }, {
    key: "toggleCar",
    value:
    //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\\
    //                       \\
    //        Car Logic        \\
    //                           \\
    //_____________________________\\

    function toggleCar() {
      // Toggle the inCar property
      this.inCar = !this.inCar;

      // Add logic here to handle the visual changes or other actions when entering/exiting the car
      if (this.inCar) {
        console.log('Entering the car');
        // Add visual changes or other actions when entering the car
        this.element.style.display = 'none'; // Hide the player when in the car
      } else {
        console.log('Exiting the car');
        // Add visual changes or other actions when exiting the car
        this.element.style.display = 'block'; // Show the player when exiting the car
      }
    }
  }, {
    key: "update",
    value: function update() {
      if (this.inCar) {
        // Update the player's position to match the car's position
        var carRect = this.car.element.getBoundingClientRect();
        this.x = carRect.left;
        this.y = carRect.top;
        this.car.update(); // Call the update method of the car
      }
      this.element.style.transform = "translate(".concat(this.x, "px, ").concat(this.y, "px)");
    }

    //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\\
    //                       \\
    //     Player Logic        \\
    //                           \\
    //_____________________________\\
  }, {
    key: "move",
    value: function move(directionX, directionY) {
      if (this.inCar) {
        // Move the car
        this.car.move(directionX, directionY);
        this.car.update();
      } else {
        // Calculate the new position based on the direction
        this.x += this.speed * directionX;
        this.y += this.speed * directionY;

        // Check for collisions
        this.checkCollision();
      }

      // Update the player's position
      this.update();
    }
  }, {
    key: "teleportToRoom",
    value: function teleportToRoom(buildingId) {
      switch (buildingId) {
        case 'building4':
          console.log('Entering the bar');
          this.navigateToRoom('../rooms/bar.html');
          break;
        case 'building6':
          console.log('Entering the casino');
          this.navigateToRoom('../rooms/casino.html');
          break;
        case 'building2':
          console.log('Teleporting to Room 2');
          this.navigateToRoom('../interior.html');
          break;
        case 'door':
          console.log('Teleporting through the door');
          this.navigateToRoom('../interior.html');
          break;
        case 'bar-door':
        case 'casino-door':
          console.log('Teleporting outside');
          this.navigateToRoom('../interior.html');
          break;
        case 'blackjack-table':
          console.log('Starting Blackjack');
          this.navigateToRoom('games/blackjack.html');
          break;
        case 'poker-table':
          console.log('Starting Roulette');
          this.navigateToRoom('games/roulette.html');
          break;
        case 'roulette-table':
          console.log('Starting Poker');
          this.navigateToRoom('games/poker.html');
          break;
        case 'slot-machine':
          console.log('Starting Slots');
          this.navigateToRoom('games/slots.html');
          break;
        case 'toll_1b':
          console.log('T1B -> T2A');
          this.navigateToRoom('interior_2.html');
          break;
        case 'toll_2a':
          console.log('T2A -> T1B');
          this.navigateToRoom('interior.html');
          break;
        case 'toll_2b':
        case 'toll_3a':
          console.log('T2A -> T1B');
          this.navigateToRoom('interior_3.html');
          break;
        default:
          console.log("Unknown buildingId: ".concat(buildingId));
          break;
      }
    }
  }, {
    key: "navigateToRoom",
    value: function navigateToRoom(roomPath) {
      window.location.href = roomPath;
    }

    //‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\\
    //                       \\
    //   BUILDING COLLISION    \\
    //   + set teleport in here  \\
    //                             \\
    //_______________________________\\
  }, {
    key: "checkCollision",
    value: function checkCollision() {
      // define player collision box
      var playerRect = this.element.getBoundingClientRect();

      // buildings collision logic
      var _iterator = _createForOfIteratorHelper(_create_buildings.default),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var building = _step.value;
          // define each building with a collision box
          var buildingRect = building.getBoundingClientRect();
          if (playerRect.left < buildingRect.right && playerRect.right > buildingRect.left && playerRect.top < buildingRect.bottom && playerRect.bottom > buildingRect.top) {
            // Room 1
            if (building.id === 'building2') {
              this.teleportToRoom(building.id);
            } // Room 2 enter

            // Room 2
            if (building.id === 'building4') {
              this.teleportToRoom(building.id);
            } //bar enter
            if (building.id === 'bar-door') {
              this.teleportToRoom(building.id);
            } // bar exit
            if (building.id === 'building6') {
              this.teleportToRoom(building.id);
            } // casino enter
            if (building.id === 'casino-door') {
              this.teleportToRoom(building.id);
            } // casino exit
            if (building.id === 'blackjack-table') {
              this.teleportToRoom(building.id);
            } // blackjack start
            if (building.id === 'slot-machine') {
              this.teleportToRoom(building.id);
            } // blackjack start
            if (building.id === 'poker-table') {
              this.teleportToRoom(building.id);
            } // blackjack start
            if (building.id === 'roulette-table') {
              this.teleportToRoom(building.id);
            } // blackjack start

            //toll ports
            if (building.id === 'toll_1b') {
              this.teleportToRoom(building.id);
            } // blackjack start
            if (building.id === 'toll_2a') {
              this.teleportToRoom(building.id);
            } // blackjack start
            if (building.id === 'toll_2b') {
              this.teleportToRoom(building.id);
            } // blackjack start
            if (building.id === 'toll_3a') {
              this.teleportToRoom(building.id);
            } // blackjack start

            // console.log(`Player collided with building ${building.id}`);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);
  return Player;
}();
},{"../car/car.js":"js/car/car.js","../building/create_buildings.js":"js/building/create_buildings.js","../combat/bullet.js":"js/combat/bullet.js"}],"js/class/enemy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
//‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
//             Enemy              //
//________________________________//
var Enemy = exports.default = /*#__PURE__*/function () {
  function Enemy() {
    _classCallCheck(this, Enemy);
    this.element = document.createElement('div');
    this.element.className = 'enemy';
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.speed = 1;
    this.direction = {
      x: 1,
      y: 1
    };
    document.body.appendChild(this.element);
  }
  _createClass(Enemy, [{
    key: "stop",
    value: function stop() {
      //make them stop when yoy hit them with your car
      this.speed = 0;
    }
  }, {
    key: "remove",
    value: function remove() {
      // Remove the enemy element from the DOM
      if (this.element && this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
    }
  }, {
    key: "update",
    value: function update() {
      // Move randomly
      if (Math.random() < 0.02) {
        this.direction.x = Math.random() > 0.3 ? 1 : -1;
      }
      if (Math.random() < 0.02) {
        this.direction.y = Math.random() > 0.3 ? 1 : -1;
      }
      this.x += this.speed * this.direction.x;
      this.y += this.speed * this.direction.y;

      // Wrap around screen
      if (this.x < 0) this.x = window.innerWidth;
      if (this.x > window.innerWidth) this.x = 0;
      if (this.y < 0) this.y = window.innerHeight;
      if (this.y > window.innerHeight) this.y = 0;
      this.element.style.transform = "translate(".concat(this.x, "px, ").concat(this.y, "px)");
    }
  }]);
  return Enemy;
}();
},{}],"js/car/npc_car.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _car = _interopRequireDefault(require("./car.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var currentPage = document.body.dataset.page;

// NPC CARS
var NpcCar = exports.default = /*#__PURE__*/function (_Car) {
  _inherits(NpcCar, _Car);
  function NpcCar(initialX, initialY) {
    var _this;
    _classCallCheck(this, NpcCar);
    _this = _callSuper(this, NpcCar);
    if (currentPage !== 'bar_interior' && currentPage !== 'casino_interior') {
      console.log('constructor called in NpcCar');
      _this.speed = 2;
      _this.element.id = "npcCar";
      _this.element.style.left = "".concat(initialX, "px");
      _this.element.style.top = "".concat(initialY, "px");
      _this.element.classList.add('npcCar');
    } else {
      // If it's the wrong page, set the element to null to prevent further operations
      _this.element = null;
    }
    return _this;
  }
  _createClass(NpcCar, [{
    key: "getCollisionRect",
    value: function getCollisionRect() {
      if (this.element) {
        // Ensure the element exists before getting its bounding box
        return this.element.getBoundingClientRect();
      }
      return null;
    }

    // Override the update() method so the car moves forward
  }, {
    key: "update",
    value: function update() {
      if (this.element) {
        // Ensure the element exists before updating its position
        // Calculate new position based on the current angle
        var newX = this.element.offsetLeft + this.speed;

        // Check if the new position is within the window boundaries
        if (newX + this.element.offsetWidth <= window.innerWidth) {
          this.element.style.left = "".concat(newX, "px");
        } else {
          // Reset position to the left of the screen when it goes off-screen
          this.element.style.left = "0px";
        }
      }
    }
  }]);
  return NpcCar;
}(_car.default);
},{"./car.js":"js/car/car.js"}],"js/car/npc_car_manager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNpcCar = void 0;
var _npc_car = _interopRequireDefault(require("./npc_car.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var createNpcCar = exports.createNpcCar = function createNpcCar(initialX, initialY) {
  return new _npc_car.default(initialX, initialY);
};
},{"./npc_car.js":"js/car/npc_car.js"}],"js/animations/player_animations.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keysPressed = void 0;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var keysPressed = exports.keysPressed = {};
//‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
//         ANIMATIONS            //
//________________________________//
// Define SVG frames for walking in different directions
var svgFramesUp = [document.getElementById('mainPlayerWalkUpF1'), document.getElementById('mainPlayerWalkUpF2'), document.getElementById('mainPlayerWalkUpF3')];
var svgFramesDown = [document.getElementById('mainPlayerWalkDownF1'), document.getElementById('mainPlayerWalkDownF2'), document.getElementById('mainPlayerWalkDownF3')];
var svgFramesLeft = [document.getElementById('mainPlayerWalkLeftF1'), document.getElementById('mainPlayerWalkLeftF2'), document.getElementById('mainPlayerWalkLeftF3')];
var svgFramesRight = [document.getElementById('mainPlayerWalkRightF1'), document.getElementById('mainPlayerWalkRightF2'), document.getElementById('mainPlayerWalkRightF3')];

// Define SVG frame for shooting
var svgFrameShooting = document.getElementById('mainPlayerShoot');
var currentFrames = [svgFramesDown[0]]; // Initial direction frame (walking down)
var currentIndex = 0;
var isWalking = false;
var isShooting = false;
var animationTimeout;
var opacityTrigger = true;
if (opacityTrigger === true) {
  resetOpacity();
  // Set the opacity of the first frame in playerWalkDown to 1
  if (svgFramesDown[0]) {
    svgFramesDown[0].style.opacity = 1;
  }
}
function startAnimation(frames) {
  resetOpacity();
  isWalking = true;
  currentFrames = frames;
  animateFrames();
}
function startShootingAnimation() {
  resetOpacity();
  isShooting = true;
  currentFrames = [svgFrameShooting];
  animateFrames();
}
function stopAnimation() {
  isWalking = false;
  isShooting = false;
  currentIndex = 0;
  clearTimeout(animationTimeout);
}
function resetOpacity() {
  // Reset the opacity for all frames
  var allFrames = [].concat(svgFramesUp, svgFramesDown, svgFramesLeft, svgFramesRight, [svgFrameShooting]);
  var _iterator = _createForOfIteratorHelper(allFrames),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var frame = _step.value;
      if (frame) {
        frame.style.opacity = 0;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
function animateFrames() {
  if (isWalking || isShooting) {
    for (var i = 0; i < currentFrames.length; i++) {
      if (currentFrames[i]) {
        currentFrames[i].style.opacity = i === currentIndex ? 1 : 0;
      }
    }
    currentIndex = (currentIndex + 1) % currentFrames.length;

    // Adjust the delay (in milliseconds) to control the speed of the animation
    animationTimeout = setTimeout(animateFrames, 500); // Example: 500ms delay
  }
}

// Your existing keydown and keyup event listeners...
document.addEventListener('keydown', function (event) {
  keysPressed[event.key] = true;
  switch (event.key) {
    case 'ArrowUp':
      console.log('walking up');
      startAnimation(svgFramesUp);
      break;
    case 'ArrowDown':
      console.log('walking down');
      startAnimation(svgFramesDown);
      break;
    case 'ArrowLeft':
      console.log('walking left');
      startAnimation(svgFramesLeft);
      break;
    case 'ArrowRight':
      console.log('walking right');
      startAnimation(svgFramesRight);
      break;
    case 'Space':
      // Assuming 'Space' key triggers shooting
      console.log('shooting');
      startShootingAnimation();
      break;
  }
});
document.addEventListener('keyup', function (event) {
  keysPressed[event.key] = false;
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    stopAnimation();
  }
});
},{}],"js/animations/change_player_color.js":[function(require,module,exports) {
// Assuming you have a button with the id "changeColorButton"
var changeColorButton = document.getElementById('changeColorButton');
var playerHeads = document.querySelectorAll('.playerHead');

// Array of color choices
var colorChoices = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
var currentColorIndex = 0;

// Function to change the color of player heads
function changePlayerColor() {
  playerHeads.forEach(function (playerHead) {
    playerHead.style.fill = colorChoices[currentColorIndex];
    // If you're using stroke color, you can set it like this: playerHead.style.stroke = colorChoices[currentColorIndex];
  });

  // Cycle to the next color
  currentColorIndex = (currentColorIndex + 1) % colorChoices.length;
}

// Event listener for the button click
changeColorButton.addEventListener('click', changePlayerColor);
},{}],"js/gta.js":[function(require,module,exports) {
"use strict";

var _player = _interopRequireDefault(require("../js/class/player.js"));
var _enemy = _interopRequireDefault(require("../js/class/enemy.js"));
var _npc_car = _interopRequireDefault(require("./car/npc_car.js"));
var _npc_car_manager = require("./car/npc_car_manager.js");
var _bullet = require("./combat/bullet.js");
var _player_animations = require("./animations/player_animations.js");
require("./animations/change_player_color.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); } // class
// import Item from '../js/class/item.js'; // Make sure to include the correct path
// import { checkPlayerCollisionsWithItems } from '../js/class/item.js'; // Make sure to include the correct path
// import Car from './car/car.js'; // class
// class
// import Building from '../js/class/buildings.js'; //class
//class extends Car
// import Bullet from './combat/bullet.js'; // class
//‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
//          Initialize            //
//________________________________//

var currentPage = document.body.dataset.page;
var player = new _player.default();
var npcCarInitialX = 20;
var npcCarInitialY = 0;
var sundayDriver = new _npc_car.default(npcCarInitialX, npcCarInitialY);
if (currentPage == 'bar_interior' && currentPage == 'casino_interior') {
  null, _readOnlyError("sundayDriver"); // Initialize to null
}
var enemies = [];

// const items = []; // Add this line to initialize the items array
// const healthPotion = new Item(0, 0, 'bag of crack');
// items.push(healthPotion);

//‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
//           Spawn NPC            //
//________________________________//

if (currentPage == 'casino_interior') {
  for (var i = 0; i < 10 //patrons will spawn in the casino
  ; i++) {
    enemies.push(new _enemy.default());
  }
} else if (currentPage === 'bar_interior') {
  for (var _i = 0; _i < 5 //patrons will spawn in the bar
  ; _i++) {
    enemies.push(new _enemy.default());
  }
} else {
  for (var _i2 = 0; _i2 < 12 //patrons will spawn in the outside portions
  ; _i2++) {
    enemies.push(new _enemy.default());
  }
}

//‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
//       Event Listeners          //
//________________________________//

document.addEventListener('keydown', function (event) {
  switch (event.key) {
    case ('ArrowUp', 'w'):
      player.move(0, -1); // Move upwards
      break;
    case ('ArrowDown', 's'):
      player.move(0, 1); // Move downwards
      break;
    case ('ArrowLeft', 'a'):
      player.move(-1, 0); // Move to the left
      break;
    case ('ArrowRight', 'd'):
      player.move(1, 0); // Move to the right
      break;
    // case 'Space':
    //     // Create a bullet and add it to the bullets array
    //     const bullet = new Bullet(player.x, player.y, 1, { x: 0, y: 0 });
    //     bullets.push(bullet);
    //     break;
    case 'c':
      // Toggle between being in the car and on foot
      player.toggleCar();
      break;
  }
}); // player car movement event listeners

document.addEventListener('keydown', function (event) {
  // Check if the player is in the car
  if (player.inCar) {
    switch (event.key) {
      case 'ArrowLeft':
        if (player.car.isDrifting) {
          // Drifting left: Adjust the angle and enable drifting
          player.car.setAngle(player.car.angle - 15); // Adjust the angle as needed
          player.car.isDrifting = true;
        } else {
          // Turning left without drifting
          player.car.setAngle(player.car.angle - 15); // Adjust the angle as needed
        }
        break;
      case 'ArrowRight':
        if (player.car.isDrifting) {
          // Drifting right: Adjust the angle and enable drifting
          player.car.setAngle(player.car.angle + 15); // Adjust the angle as needed
          player.car.isDrifting = true;
        } else {
          // Turning right without drifting
          player.car.setAngle(player.car.angle + 15); // Adjust the angle as needed
        }
        break;
      case ' ':
        // Spacebar pressed: Enable drifting
        player.car.isDrifting = true;
        break;
    }
  }
});
document.addEventListener('keyup', function (event) {
  // Check if the player is in the car
  if (player.inCar) {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
        // Stop drifting when left or right key is released
        player.car.isDrifting = false;
        break;
      case ' ':
        // Spacebar released: Disable drifting
        player.car.isDrifting = false;
        break;
    }
  }
});
document.addEventListener('keydown', function (event) {
  _player_animations.keysPressed[event.key] = true;
  handlePlayerMovement();
});
document.addEventListener('keyup', function (event) {
  _player_animations.keysPressed[event.key] = false;
  handlePlayerMovement();
});

// Shooting Listeners
//holding mouse down fires gun
document.addEventListener('mousedown', function (event) {
  player.shootBullet(event);
  var shootInterval = setInterval(function () {
    player.shootBullet(event);
  }, 30);

  //when you release mouse, it clears the interval so it doesnt keep shooting
  document.addEventListener('mouseup', function () {
    clearInterval(shootInterval);
  }, {
    once: true
  });
});
function handlePlayerMovement() {
  var directionX = (_player_animations.keysPressed['ArrowRight'] ? 1 : 0) + (_player_animations.keysPressed['ArrowLeft'] ? -1 : 0);
  var directionY = (_player_animations.keysPressed['ArrowDown'] ? 1 : 0) + (_player_animations.keysPressed['ArrowUp'] ? -1 : 0);
  player.move(directionX, directionY);
}
; // handle player movement

//‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
//           Game Loop            //
//________________________________//
/* This is the main brain of the   /
   the operations.               */

// Game Loop
function gameLoop() {
  // Update player
  player.update();

  // Update Sunday driver if it exists
  if (sundayDriver) {
    sundayDriver.update();
    checkPlayerCollisionsWithCar(player, sundayDriver);
  }

  // Update enemies
  for (var _i3 = 0, _enemies = enemies; _i3 < _enemies.length; _i3++) {
    var enemy = _enemies[_i3];
    enemy.update();
  }

  // Update bullets
  var _iterator = _createForOfIteratorHelper(_bullet.bullets),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var bullet = _step.value;
      bullet.update();
    }

    // Request the next animation frame
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  requestAnimationFrame(gameLoop);
}

// Call the gameLoop function to start the game loop
gameLoop(player, sundayDriver, enemies, _bullet.bullets);

// player | enemy Car
function checkPlayerCollisionsWithCar(player, sundayDriver) {
  // Check if sundayDriver exists
  return; // Exit the function if sundayDriver does not exist

  var playerRect = player.element.getBoundingClientRect();
  var npcCarRect = sundayDriver.element.getBoundingClientRect();

  // Check for collision
  if (playerRect.left < npcCarRect.right && playerRect.right > npcCarRect.left && playerRect.top < npcCarRect.bottom && playerRect.bottom > npcCarRect.top) {
    // Collision occurred, implement your collision handling logic
    console.log('Player has been hit by a car!');
    handleCarCollision(player);
  }
}

// handle enemy hits (from bullets)
function checkCollisionWithEnemies(player, enemies, bullets) {
  for (var _i4 = bullets.length - 1; _i4 >= 0; _i4--) {
    var bullet = bullets[_i4];
    var bulletRect = bullet.element.getBoundingClientRect();
    for (var j = enemies.length - 1; j >= 0; j--) {
      var enemy = enemies[j];
      var enemyRect = enemy.element.getBoundingClientRect();
      if (bulletRect.left < enemyRect.right && bulletRect.right > enemyRect.left && bulletRect.top < enemyRect.bottom && bulletRect.bottom > enemyRect.top) {
        // Bullet hit the enemy
        bullets.splice(_i4, 1);
        enemyHit(enemy, enemies);
        console.log('Enemy hit by a bullet');
        break; // Exit the inner loop once a collision is detected
      }
    }
  }
}

// player's car | enemy
function checkCarCollisionWithEnemies(player, sundayDriver, enemies) {
  var carRect = player.car.element.getBoundingClientRect();

  // Check collision with Sunday driver
  var sundayDriverRect = sundayDriver.element.getBoundingClientRect();
  if (player.inCar &&
  // Add this condition to check if the player is in the car
  carRect.left < sundayDriverRect.right && carRect.right > sundayDriverRect.left && carRect.top < sundayDriverRect.bottom && carRect.bottom > sundayDriverRect.top) {
    // Handle collision with Sunday driver, e.g., stop the car or remove the Sunday driver
    // Example: sundayDriver.stop();
  }

  // Check collision with enemies if the player is in the car
  if (player.inCar) {
    var _iterator2 = _createForOfIteratorHelper(enemies),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var enemy = _step2.value;
        var enemyRect = enemy.element.getBoundingClientRect();
        if (carRect.left < enemyRect.right && carRect.right > enemyRect.left && carRect.top < enemyRect.bottom && carRect.bottom > enemyRect.top) {
          // Handle collision with enemy only when the player is in the car
          enemy.stop(); // Assuming you have a stop method in your Enemy class
          enemy.element.classList.add('dead'); // Add the 'dead' class to the enemy's element
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
}

// handle enemy hits (from bullets)
function enemyHit(enemy, enemies) {
  // Decrease enemy health
  enemy.health = (enemy.health || 0) - 1;

  // Check if enemy is "dead"
  if (enemy.health <= 0) {
    console.log('Target Eliminated');
    // Remove the enemy
    enemies.splice(enemies.indexOf(enemy), 1);
  }
}

// what happens when the player is hit?
function handleCarCollision(player) {
  player.x -= -2; // Move the player upward by 50 pixels
  player.element.classList.add('jumping');
  //modify the .jumping class in CSS to add immersion to the vehicular homicide 

  // Remove the jumping class after a delay to stop the animation
  setTimeout(function () {
    player.element.classList.remove('jumping');
  }, 125); // Adjust the delay as needed
}

// // Call the gameLoop function to start the game loop
// gameLoop(player, sundayDriver, enemies, bullets);
},{"../js/class/player.js":"js/class/player.js","../js/class/enemy.js":"js/class/enemy.js","./car/npc_car.js":"js/car/npc_car.js","./car/npc_car_manager.js":"js/car/npc_car_manager.js","./combat/bullet.js":"js/combat/bullet.js","./animations/player_animations.js":"js/animations/player_animations.js","./animations/change_player_color.js":"js/animations/change_player_color.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64017" + '/');
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
      });

      // Enable HMR for CSS by default.
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
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/gta.js"], null)
//# sourceMappingURL=/gta.177ac387.js.map