interface User {
  id: string;
  name: string;
}

type TAutocompleteItem<T> = {
  key: string;
  value: T;
};

const getOptions = (
  query: string,
  signal?: AbortSignal,
): Promise<TAutocompleteItem<string>[]> => {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Request aborted", "AbortError"));
      return;
    }
    const timeoutId = setTimeout(() => {
      if (query.toLowerCase() === "error") {
        reject(new Error("Error fetching result"));
        return;
      }

      // await fetch(`api/autocomplete?query=${query}`, { signal })
      resolve(
        [
          { key: "foo", value: "bar" },
          { key: "baz", value: "qux" },
        ].filter((item) => item.value.includes(query)),
      );
    }, 1000);

    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timeoutId);
        reject(new DOMException("Request aborted", "AbortError"));
      },
      { once: true },
    );
  });
};

const getUsersOptions = (query: string, signal: AbortSignal) => {
  return new Promise<TAutocompleteItem<User>[]>((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("Request aborted", "AbortError"));
      return;
    }

    const timeoutId = setTimeout(() => {
      if (query.toLowerCase() === "error") {
        reject(new Error("Error fetching result"));
        return;
      }

      resolve(
        [
          {
            key: "1",
            value: { id: "1", name: "John Doe" },
          },
          {
            key: "2",
            value: { id: "2", name: "Jane Doe" },
          },
          {
            key: "3",
            value: { id: "3", name: "John Smith" },
          },
        ].filter((item) =>
          item.value.name.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    }, 1000);

    signal.addEventListener(
      "abort",
      () => {
        (clearTimeout(timeoutId),
          reject(new DOMException("Request aborted", "AbortError")));
        return;
      },
      { once: true },
    );
  });
};

export { getOptions, getUsersOptions };
export type { TAutocompleteItem, User };
