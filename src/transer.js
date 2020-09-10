import { createEngine } from "./engine";
import { createMatrix, matrixToArr } from "./matrix";
function isDef(val) {
  return typeof val !== "undefined";
}
function parseTarget(target) {
  return typeof target === "string" ? document.querySelector(target) : target;
}

export default function Transer(target) {
  this._actions = [];
  this._target = parseTarget(target);
  this._matrix = createMatrix((mtx) => {
    this._target.style.transform = `matrix(${matrixToArr(mtx).join(",")})`;
  });
  this._engine = createEngine(this._actions);
}
Transer.prototype.action = function (config = {}) {
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
  this._engine();
  return this;
};
