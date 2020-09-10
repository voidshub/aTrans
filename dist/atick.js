(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.atick = factory());
}(this, (function () { 'use strict';

  const easingMap = {
    linear: (t) => t,
    easeInQuad: (pos) => {
      return Math.pow(pos, 2);
    },

    easeOutQuad: (pos) => {
      return -(Math.pow(pos - 1, 2) - 1);
    },

    easeInOutQuad: (pos) => {
      if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 2);
      return -0.5 * ((pos -= 2) * pos - 2);
    },

    easeInCubic: (pos) => {
      return Math.pow(pos, 3);
    },

    easeOutCubic: (pos) => {
      return Math.pow(pos - 1, 3) + 1;
    },

    easeInOutCubic: (pos) => {
      if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 3);
      return 0.5 * (Math.pow(pos - 2, 3) + 2);
    },

    easeInQuart: (pos) => {
      return Math.pow(pos, 4);
    },

    easeOutQuart: (pos) => {
      return -(Math.pow(pos - 1, 4) - 1);
    },

    easeInOutQuart: (pos) => {
      if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 4);
      return -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
    },

    easeInQuint: (pos) => {
      return Math.pow(pos, 5);
    },

    easeOutQuint: (pos) => {
      return Math.pow(pos - 1, 5) + 1;
    },

    easeInOutQuint: (pos) => {
      if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 5);
      return 0.5 * (Math.pow(pos - 2, 5) + 2);
    },

    easeInSine: (pos) => {
      return -Math.cos(pos * (Math.PI / 2)) + 1;
    },

    easeOutSine: (pos) => {
      return Math.sin(pos * (Math.PI / 2));
    },

    easeInOutSine: (pos) => {
      return -0.5 * (Math.cos(Math.PI * pos) - 1);
    },

    easeInExpo: (pos) => {
      return pos == 0 ? 0 : Math.pow(2, 10 * (pos - 1));
    },

    easeOutExpo: (pos) => {
      return pos == 1 ? 1 : -Math.pow(2, -10 * pos) + 1;
    },

    easeInOutExpo: (pos) => {
      if (pos == 0) return 0;
      if (pos == 1) return 1;
      if ((pos /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (pos - 1));
      return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
    },

    easeInCirc: (pos) => {
      return -(Math.sqrt(1 - pos * pos) - 1);
    },

    easeOutCirc: (pos) => {
      return Math.sqrt(1 - Math.pow(pos - 1, 2));
    },

    easeInOutCirc: (pos) => {
      if ((pos /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - pos * pos) - 1);
      return 0.5 * (Math.sqrt(1 - (pos -= 2) * pos) + 1);
    },

    easeOutBounce: (pos) => {
      if (pos < 1 / 2.75) {
        return 7.5625 * pos * pos;
      } else if (pos < 2 / 2.75) {
        return 7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75;
      } else if (pos < 2.5 / 2.75) {
        return 7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375;
      } else {
        return 7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375;
      }
    },

    easeInBack: (pos) => {
      var s = 1.70158;
      return pos * pos * ((s + 1) * pos - s);
    },

    easeOutBack: (pos) => {
      var s = 1.70158;
      return (pos = pos - 1) * pos * ((s + 1) * pos + s) + 1;
    },

    easeInOutBack: (pos) => {
      var s = 1.70158;
      if ((pos /= 0.5) < 1)
        return 0.5 * (pos * pos * (((s *= 1.525) + 1) * pos - s));
      return 0.5 * ((pos -= 2) * pos * (((s *= 1.525) + 1) * pos + s) + 2);
    },

    elastic: (pos) => {
      return (
        -1 *
          Math.pow(4, -8 * pos) *
          Math.sin(((pos * 6 - 1) * (2 * Math.PI)) / 2) +
        1
      );
    },

    swingFromTo: (pos) => {
      var s = 1.70158;
      return (pos /= 0.5) < 1
        ? 0.5 * (pos * pos * (((s *= 1.525) + 1) * pos - s))
        : 0.5 * ((pos -= 2) * pos * (((s *= 1.525) + 1) * pos + s) + 2);
    },

    swingFrom: (pos) => {
      var s = 1.70158;
      return pos * pos * ((s + 1) * pos - s);
    },

    swingTo: (pos) => {
      var s = 1.70158;
      return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
    },

    bounce: (pos) => {
      if (pos < 1 / 2.75) {
        return 7.5625 * pos * pos;
      } else if (pos < 2 / 2.75) {
        return 7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75;
      } else if (pos < 2.5 / 2.75) {
        return 7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375;
      } else {
        return 7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375;
      }
    },

    bouncePast: (pos) => {
      if (pos < 1 / 2.75) {
        return 7.5625 * pos * pos;
      } else if (pos < 2 / 2.75) {
        return 2 - (7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75);
      } else if (pos < 2.5 / 2.75) {
        return 2 - (7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375);
      } else {
        return 2 - (7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375);
      }
    },

    easeFromTo: (pos) => {
      if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 4);
      return -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
    },

    easeFrom: (pos) => {
      return Math.pow(pos, 4);
    },

    easeTo: (pos) => {
      return Math.pow(pos, 0.25);
    },

    sinusoidal: (pos) => {
      return -Math.cos(pos * Math.PI) / 2 + 0.5;
    },

    reverse: (pos) => {
      return 1 - pos;
    },

    mirror: function (pos, transition) {
      transition = transition || tween.sinusoidal;
      if (pos < 0.5) return transition(pos * 2);
      else return transition(1 - (pos - 0.5) * 2);
    },

    flicker: (pos) => {
      var pos = pos + (Math.random() - 0.5) / 5;
      return tween.sinusoidal(pos < 0 ? 0 : pos > 1 ? 1 : pos);
    },

    wobble: (pos) => {
      return -Math.cos(pos * Math.PI * (9 * pos)) / 2 + 0.5;
    },

    pulse: function (pos, pulses) {
      return -Math.cos(pos * ((pulses || 5) - 0.5) * 2 * Math.PI) / 2 + 0.5;
    },

    blink: function (pos, blinks) {
      return Math.round(pos * (blinks || 5)) % 2;
    },

    spring: (pos) => {
      return 1 - Math.cos(pos * 4.5 * Math.PI) * Math.exp(-pos * 6);
    },
  };

  function engine(opt) {
    const {
      duration,
      onTick,
      onComplete,
      delay = 0,
      reverse = false,
      easing = "linear",
      yoyo = false,
    } = opt;
    let start = Date.now();
    let isRe = reverse;
    const run = () => {
      let delta = Date.now() - start;
      if (delta < delay) {
        return requestAnimationFrame(run);
      }
      const _delta = delta - delay;
      const p = Math.min(_delta, duration) / duration;
      const val = isRe ? 1 - p : p;
      onTick(easingMap[easing] ? easingMap[easing](val) : val, val);
      // console.log(val, _delta, duration);
      if (_delta >= duration) {
        if (yoyo) {
          start = Date.now();
          isRe = !isRe;
          requestAnimationFrame(run);
        } else {
          onComplete();
        }
      } else {
        requestAnimationFrame(run);
      }
    };

    requestAnimationFrame(run);
    return {
      toggle(val) {
        console.log(val);
      },
    };
  }

  function createEngine(actions) {
    let started = false;
    return () => {
      if (started) {
        return;
      }
      started = true;
      setTimeout(() => {
        let i = 0,
          len = actions.length;
        const run = () => {
          if (i >= len) {
            return;
          }
          const current = actions[i];
          const tick = current.update();
          engine({
            onTick: (p, p1) => {
              tick(p);
              current.onTick && current.onTick(p1);
            },
            onComplete: () => {
              run();
              current.onComplete && current.onComplete();
            },
            duration: current.duration || 1000,
            delay: current.delay || 0,
            reverse: current.reverse,
            yoyo: current.yoyo,
            easing: current.easing,
          });
          i++;
        };
        run();
      }, 0);
    };
  }

  function matrixToArr(matrix) {
    return [
      matrix.scaleX,
      matrix.skewX,
      matrix.skewY,
      matrix.scaleY,
      matrix.x,
      matrix.y,
    ];
  }
  function createMatrix(handler) {
    return new Proxy(
      {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        skewX: 0,
        skewY: 0,
        rotation: 0,
      },
      {
        get(obj, prop) {
          return obj[prop];
        },
        set(obj, prop, val) {
          obj[prop] = val;
          typeof handler === "function" && handler(obj);
          return true;
        },
      }
    );
  }

  function isDef(val) {
    return typeof val !== "undefined";
  }
  function parseTarget(target) {
    return typeof target === "string" ? document.querySelector(target) : target;
  }

  function Ticker(target) {
    this._actions = [];
    this._target = parseTarget(target);
    this._matrix = createMatrix((mtx) => {
      this._target.style.transform = `matrix(${matrixToArr(mtx).join(",")})`;
    });
    this._engine = createEngine(this._actions);
  }
  Ticker.prototype.action = function (config = {}) {
    const { x, y, scaleX, scaleY, rotation, ...rest } = config;
    this._actions.push({
      ...rest,
      update: () => {
        const mtx = { ...this._matrix };
        const flush = (prop, val, progress) => {
          if (!isDef(val)) {
            return;
          }
          this._matrix[prop] = mtx[prop] + (val - mtx[prop]) * progress;
        };
        return (timeProgress) => {
          flush("x", x, timeProgress);
          flush("y", y, timeProgress);
          flush("scaleX", scaleX, timeProgress);
          flush("scaleY", scaleY, timeProgress);
        };
      },
    });
    this._ctrl = this._engine();
    return this;
  };
  Ticker.prototype.toggle = function () {
    this._ctrl && this._ctrl.toggle(arguments[0]);
    return this;
  };

  function createTranser() {
    return new Ticker(arguments[0]);
  }

  return createTranser;

})));
