/**
 * Simple classnames combiner
 * Accepts an array of class strings (and optionally falsy values) and returns a space-joined string.
 * Extra: also supports variadic arguments for convenience.
 */
function cx(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export { cx };
