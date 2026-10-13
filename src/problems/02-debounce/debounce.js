function debounce(fn, delay) {
  let timeoutId = null;

  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      timeoutId = null;
      return fn(...args);
    }, delay);
  };
}

const printMsg = (msg) => {
  console.log(msg);
};

const logJS = debounce(printMsg, 3000);
logJS("a");
logJS("b");
logJS("c");

export { debounce as debounceJS };
