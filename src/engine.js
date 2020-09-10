import easingMap from "./easing";
export default function engine(opt) {
  const {
    duration,
    onTick,
    onComplete,
    delay = 0,
    reverse = false,
    easing = "linear",
    yoyo = false,
  } = opt;
  let paused = false;
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
      paused = typeof val === "undefined" ? !paused : !!val;
    },
  };
}

export function createEngine(actions) {
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
