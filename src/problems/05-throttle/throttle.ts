function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let lastCall: number = 0;

  return function (this: unknown, ...args: Parameters<T>) {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

const log = throttle((msg: string) => console.log(msg), 300);
log("a"); // fires immediately → "a"
log("b"); // ignored (within 300ms)
log("c"); // ignored (within 300ms)
setTimeout(() => log("d"), 400); // fires → "d" (300ms passed)

export { throttle };
