export function matrixToArr(matrix) {
  return [
    matrix.scaleX,
    matrix.skewX,
    matrix.skewY,
    matrix.scaleY,
    matrix.x,
    matrix.y,
  ];
}
export function createMatrix(handler) {
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
