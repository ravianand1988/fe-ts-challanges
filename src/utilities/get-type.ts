const getType = (val: any): string => {
  if (val == null) {
    return `${val}`;
  }

  const proto = Object.getPrototypeOf(val);
  return proto?.constructor?.name?.toLowerCase() ?? "object";
};

export { getType };
