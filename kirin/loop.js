/**
 * @type {{_everyFrameFunctions: Array<Function>}}
 */
const Loop = {
  _everyFrameFunctions: [],
};

Loop.addToEveryFrame = (fn) => {
  Loop._everyFrameFunctions.push(fn);
};

Loop._compute = () => {
  Loop._everyFrameFunctions.forEach((fn) => fn());

  window.requestAnimationFrame(Loop._compute);
};

Loop.start = () => {
  Loop._compute();
};
