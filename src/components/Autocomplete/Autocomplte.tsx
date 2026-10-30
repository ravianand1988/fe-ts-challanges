import { useEffect, useId, useRef, useState } from "react";
import { cx } from "src/utilities";
import cssUtils from "../../utilities/styles.module.css";
import css from "./Autocomplete.module.css";

export type TAutocompleteItem<T> = {
  key: string;
  value: T;
  renderer?: (item: TAutocompleteItem<T>) => string;
};

export interface IAutocomplete<T> {
  options: TAutocompleteItem<T>[];
  onSelect: (item: TAutocompleteItem<T>) => void;
  onQueryChange: (query: string) => void;
}

export const Autocomplete = <T,>({
  options,
  onSelect,
  onQueryChange,
}: IAutocomplete<T>) => {
  // const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);
  const uId = useId();
  const inputId = `${uId}-input`;
  const listId = `${uId}-list`;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    // setQuery(value);
    setActiveIndex(-1);
    onQueryChange(value);
  };

  const handleOnSelect = (option: TAutocompleteItem<T>) => {
    const { value } = option;
    if (typeof value === "string") {
      setInputValue(option.value as string);
    } else {
      const val = option.renderer && option.renderer(option);
      setInputValue(val!);
    }
    // setQuery("");
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
      <label className={cx(css.inputLabel)} htmlFor="">
        Autocomplete
      </label>
      <input
        className={cx(css.inputAutocomplete)}
        type="text"
        role="combobox"
        placeholder="Type to search..."
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
        {options.map((option, index) => (
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
            {typeof option.value === "string"
              ? option.value
              : option.renderer
                ? option.renderer(option)
                : JSON.stringify(option.value)}
          </li>
        ))}
      </ul>
    </div>
  );
};
