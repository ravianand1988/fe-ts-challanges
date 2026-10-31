/**
 * Simple classnames combiner
 * Accepts an array of class strings (and optionally falsy values) and returns a space-joined string.
 * Extra: also supports variadic arguments for convenience.
 */
function cx(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: unknown, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn.apply(this, args);
    }, delay);
  };
}

export { cx, debounce };
