import { useEffect, useState } from "react";
import { Autocomplete, type TAutocompleteItem } from "./Autocomplte";

interface User {
  id: string;
  name: string;
}

export const AutocompleteExample = () => {
  const [query, setQuery] = useState("");
  const [userQuery, setUserQuery] = useState("");
  const [options, setOptions] = useState<TAutocompleteItem<string>[]>([]);
  const [userOptions, setUserOptions] = useState<TAutocompleteItem<User>[]>([]);
  function handleOnSelect(e: TAutocompleteItem<string>): void {
    console.log(e);
  }

  function handleOnSelectUser(e: TAutocompleteItem<User>): void {
    console.log(e);
  }

  const getOptions = (query: string): Promise<TAutocompleteItem<string>[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // fetch(`api/autocomplete?query=${query}`)
        resolve(
          [
            { key: "foo", value: "bar" },
            { key: "baz", value: "qux" },
          ].filter((item) => item.value.includes(query)),
        );
      }, 1000);
    });
  };

  const getUsersOptions = (query: string) => {
    return new Promise<TAutocompleteItem<User>[]>((resolve) => {
      setTimeout(() => {
        resolve(
          [
            {
              key: "1",
              value: { id: "1", name: "John Doe" },
              renderer: (item: TAutocompleteItem<User>) => item.value.name,
              // <div>{item.value.name}</div>
            },
            {
              key: "2",
              value: { id: "2", name: "Jane Doe" },
              renderer: (item: TAutocompleteItem<User>) => item.value.name,
              // <div>{item.value.name}</div>
            },
            {
              key: "3",
              value: { id: "3", name: "John Smith" },
              renderer: (item: TAutocompleteItem<User>) => item.value.name,
              // <div>{item.value.name}</div>
            },
          ].filter((item) =>
            item.value.name.toLowerCase().includes(query.toLowerCase()),
          ),
        );
      }, 1000);
    });
  };

  useEffect(() => {
    getOptions(query).then((options) => setOptions(options));
    getUsersOptions(userQuery).then((options) => setUserOptions(options));
  }, [query, userQuery]);

  return (
    <div>
      <Autocomplete
        onSelect={(e) => handleOnSelect(e)}
        options={options}
        onQueryChange={(q) => setQuery(q)}
      />
      <Autocomplete<User>
        onSelect={(e) => handleOnSelectUser(e)}
        options={userOptions}
        onQueryChange={(q) => setUserQuery(q)}
      />
    </div>
  );
};
