// bun test src/problems/02-debounce/test/debounce.test.ts
// npx tsx src/problems/02-debounce/debounce.ts

/**
 * A function to delay the function call for given milliseconds
 * It must reset/restart the delay when called again if the delay has not passed
 */
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

/**
 * Examples
 */

const log = debounce((msg: string) => console.log(msg), 300);

log("a"); // cancelled by next call
log("b"); // cancelled by next call
log("c"); // only this executes after 300ms -> "c"

export { debounce };
