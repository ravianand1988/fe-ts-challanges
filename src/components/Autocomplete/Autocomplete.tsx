import { useEffect, useId, useRef, useState } from "react";
import type { TAutocompleteItem } from "src/api";
import { cx } from "src/utilities";
import cssUtils from "../../utilities/styles.module.css";
import css from "./Autocomplete.module.css";
import type { IAutocomplete } from "./Autocomplete.types";

export const Autocomplete = <T,>({
  label,
  placeholder,
  options,
  onSelect,
  onQueryChange,
  getOptionLabel,
  loading,
  error,
}: IAutocomplete<T>) => {
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);
  const uId = useId();
  const inputId = `${uId}-input`;
  const listId = `${uId}-list`;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setInputValue(value);
    setActiveIndex(-1);
    onQueryChange(value);
  };

  const handleOnSelect = (option: TAutocompleteItem<T>) => {
    setInputValue(getOptionLabel(option.value));
    setActiveIndex(-1);
    onSelect(option);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const count = options.length;
    if (!count) {
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % count);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev <= 0 ? count - 1 : prev - 1));
        break;
      case "Escape":
        setActiveIndex(-1);
        e.currentTarget.blur();
        break;
      case "Enter":
        if (activeIndex >= 0) {
          handleOnSelect(options[activeIndex]);
          e.currentTarget.blur();
        }
        break;
    }
  };

  useEffect(() => {
    if (activeIndex < 0) {
      return;
    }
    listRef.current?.children[activeIndex]?.scrollIntoView({
      block: "nearest",
    });
  }, [activeIndex]);

  return (
    <div
      className={cx(css.autocompleteWrapper, cssUtils.margin24, cssUtils.pRel)}
    >
      <label className={cx(css.inputLabel)} htmlFor={inputId}>
        {label || "Autocomplete"}
      </label>
      <input
        className={cx(css.inputAutocomplete)}
        type="text"
        role="combobox"
        placeholder={placeholder || "Type to search..."}
        id={inputId}
        aria-controls={listId}
        aria-activedescendant={
          activeIndex >= 0 ? `${uId}-option-${activeIndex}` : undefined
        }
        value={inputValue}
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={(e) => handleOnChange(e)}
      />
      <ul
        id={listId}
        ref={listRef}
        role="listbox"
        className={cx(css.suggestions, cssUtils.pAbs)}
      >
        {error ? (
          <li
            tabIndex={-1}
            className={cx(
              cssUtils.paddingHor16,
              cssUtils.paddingVer8,
              css.suggestionsItem,
            )}
            key={error}
          >
            {error}
          </li>
        ) : loading ? (
          <li
            tabIndex={-1}
            className={cx(
              cssUtils.paddingHor16,
              cssUtils.paddingVer8,
              css.suggestionsItem,
            )}
            key={"loading"}
          >
            Loading...
          </li>
        ) : query.trim() && options.length === 0 ? (
          <li
            tabIndex={-1}
            className={cx(
              cssUtils.paddingHor16,
              cssUtils.paddingVer8,
              css.suggestionsItem,
            )}
            key={"noResult"}
          >
            No matching result!
          </li>
        ) : (
          options.map((option, index) => (
            <li
              id={`${uId}-option-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              tabIndex={-1}
              className={cx(
                cssUtils.paddingHor16,
                cssUtils.paddingVer8,
                css.suggestionsItem,
                index === activeIndex ? css.suggestionsItemActive : "",
              )}
              key={option.key}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={(e) => {
                handleOnSelect(option);
                e.currentTarget.blur();
              }}
            >
              {getOptionLabel(option.value)}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
