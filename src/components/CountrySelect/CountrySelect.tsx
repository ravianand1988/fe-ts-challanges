import { useEffect, useMemo, useRef, useState } from "react";
import { cx } from "src/utilities";
import cssUtils from "../../utilities/styles.module.css";
import { COUNTRIES } from "./Countries.config";
import css from "./CountrySelect.module.css";

export const CountrySelect = ({
  multi,
  onSelect,
}: {
  multi?: boolean;
  onSelect: (value: string | string[]) => void;
}) => {
  const [query, setQuery] = useState(""); // drives filtering
  const [inputValue, setInputValue] = useState(""); // what the input displays
  const [activeIndex, setActiveIndex] = useState(-1); // item highlighted via arrow keys
  const listRef = useRef<HTMLUListElement>(null);

  const handleOnSelect = (value: string) => {
    const country = COUNTRIES[value];
    setInputValue(country);
    setQuery(""); // reset filter so the full list shows next time
    setActiveIndex(-1);
    onSelect(value);
  };

  const compute = useMemo(() => {
    const filtered = query
      ? Object.fromEntries(
          Object.entries(COUNTRIES).filter(
            ([iso, label]) =>
              iso.toLowerCase().includes(query.toLowerCase()) ||
              label.toLowerCase().includes(query.toLowerCase()),
          ),
        )
      : COUNTRIES;

    return Object.entries(filtered);
  }, [query]);

  // keep the highlighted item visible inside the scrollable dropdown
  useEffect(() => {
    if (activeIndex < 0) return;
    listRef.current?.children[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const count = compute.length;
    if (!count) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault(); // stop the caret jumping to the end of the input
        setActiveIndex((i) => (i + 1) % count);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => (i <= 0 ? count - 1 : i - 1));
        break;
      case "Enter":
        if (activeIndex >= 0) {
          handleOnSelect(compute[activeIndex][0]);
          e.currentTarget.blur();
        }
        break;
      case "Escape":
        setActiveIndex(-1);
        e.currentTarget.blur();
        break;
    }
  };

  return (
    <>
      <div className={cx(css.countrySelectInputWrapper, cssUtils.pRel)}>
        <label htmlFor="countrySelect" className={css.countrySelectLabel}>
          Select Country: <strong>{inputValue && inputValue}</strong>
        </label>
        <input
          type="text"
          name="countrySelect"
          id="countrySelect"
          placeholder="Search Countries..."
          className={cx(css.inputCountrySelect)}
          role="combobox"
          aria-controls="countrySelectList"
          aria-activedescendant={
            activeIndex >= 0 ? `country-${compute[activeIndex][0]}` : undefined
          }
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setInputValue(e.target.value);
            setQuery(e.target.value);
            setActiveIndex(-1); // list changed, old index is meaningless
          }}
        />
        <div
          className={cx(
            cssUtils.pAbs,
            css.countrySelectContainer,
            css.countrySuggestions,
          )}
        >
          <ul
            id="countrySelectList"
            role="listbox"
            ref={listRef}
            className={cx(css.countrySelectList)}
          >
            {compute.map(([iso, label], index) => {
              return (
                <li
                  id={`country-${iso}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  tabIndex={-1}
                  key={iso}
                  className={cx(
                    css.countryItem,
                    index === activeIndex ? css.countryItemActive : "",
                  )}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={(e) => {
                    handleOnSelect(iso);
                    e.currentTarget.blur();
                  }}
                >
                  {label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
