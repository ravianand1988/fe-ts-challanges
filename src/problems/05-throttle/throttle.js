function throttleJS(fn, delay) {
  let lastCall = 0;

  return (...args) => {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      return fn(...args);
    }
  };
}

const log = throttleJS((msg) => console.log(msg), 300);

log("a"); // executes
log("b"); // cancelled
log("c"); // cancelled
log("d"); // cancelled
log("e"); // cancelled
log("f"); // cancelled

setTimeout(() => {
  log("should not print");
}, 290);

setTimeout(() => {
  log("Ravi");
}, 301);

export { throttleJS };
