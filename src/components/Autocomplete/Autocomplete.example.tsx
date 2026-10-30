import { useEffect, useRef, useState } from "react";
import { getOptions, getUsersOptions, type TAutocompleteItem } from "src/api";
import { cx } from "src/utilities";
import cssUtils from "../../utilities/styles.module.css";
import { Autocomplete } from "./Autocomplete";

interface User {
  id: string;
  name: string;
}

export const AutocompleteExample = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);
  const [userQuery, setUserQuery] = useState("");
  const [options, setOptions] = useState<TAutocompleteItem<string>[]>([]);
  const [userOptions, setUserOptions] = useState<TAutocompleteItem<User>[]>([]);
  function handleOnSelect(e: TAutocompleteItem<string>): void {
    console.log(e);
  }

  function handleOnSelectUser(e: TAutocompleteItem<User>): void {
    console.log(e);
  }

  const requestId = useRef(0);
  /**
   * Load and handle string autocomplete options
   */
  useEffect(() => {
    const currentRequestId = ++requestId.current;

    if (!query.trim()) {
      // set Option to empty or first default options to start with
      setOptions([]);
      setLoading(false);
      setError(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setOptions([]);
        setLoading(true);
        setError(null);
        const results = await getOptions(query);
        if (currentRequestId === requestId.current) {
          setOptions(results);
        }
      } catch (err) {
        if (currentRequestId === requestId.current) {
          setError(err instanceof Error ? err.message : "Request failed");
        }
      } finally {
        if (currentRequestId === requestId.current) {
          setLoading(false);
        }
      }
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  /**
   * Load and handle users autocomplete options
   */
  useEffect(() => {
    if (!userQuery.trim()) {
      // set Option to empty or first default options to start with
      setUserOptions([]);
      setUserLoading(false);
      setUserError(null);
      return;
    }
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        setUserOptions([]);
        setUserLoading(true);
        setUserError(null);
        const results = await getUsersOptions(userQuery, controller.signal);
        setUserOptions(results);
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }

        setError(err instanceof Error ? err.message : "Request failed");

        setOptions([]);
      } finally {
        if (!controller.signal.aborted) {
          setUserLoading(false);
        }
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [userQuery]);

  return (
    <div className={cx(cssUtils.flexRowStart)}>
      <Autocomplete
        onSelect={(e) => handleOnSelect(e as any)}
        options={options}
        onQueryChange={(q) => setQuery(q)}
        getOptionLabel={(item) => item as string}
        loading={loading}
        error={error}
      />
      <Autocomplete<User>
        label="Search User"
        placeholder="Search User (i.e. John)"
        onSelect={(e) => handleOnSelectUser(e)}
        options={userOptions}
        onQueryChange={(q) => setUserQuery(q)}
        getOptionLabel={(item) => item.name}
        loading={userLoading}
        error={userError}
      />
      <div>
        <h3>Existing options to search upon..</h3>
        <ul>
          {["bar", "qux"].map((val) => (
            <li>{val}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Existing options to search upon..</h3>
        <ul>
          {["John Doe", "Jane Doe", "John Smith"].map((val) => (
            <li>{val}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
