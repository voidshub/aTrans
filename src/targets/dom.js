export default function DomTarget() {
  this._matrix = new Proxy([1, 0, 0, 1, 0, 0], {
    get(obj, prop) {
      if (prop === "scaleX") {
        return obj[0];
      } else if (prop === "scaleY") {
        return obj[3];
      }
      return obj[prop];
    },
    set(obj, prop, val) {
      if (prop === "scaleX") {
        obj[0] = val;
      } else if (prop === "scaleY") {
        obj[3] = val;
      } else {
        obj[prop] = val;
      }
      return val;
    },
  });
}
DomTarget.prototype.update = function (p) {
  
};
