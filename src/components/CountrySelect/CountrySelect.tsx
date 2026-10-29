import { useEffect, useId, useMemo, useRef, useState } from "react";
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
  const [selected, setSelected] = useState<string[]>([]); // iso codes, multi mode only
  const listRef = useRef<HTMLUListElement>(null);
  const uid = useId(); // unique ids so several instances can live on one page
  const inputId = `${uid}-input`;
  const listId = `${uid}-list`;
  const optionId = (iso: string) => `${uid}-country-${iso}`;

  const handleOnSelect = (value: string) => {
    if (multi) {
      // toggle, keep the dropdown open and the query intact for more picks
      const next = selected.includes(value)
        ? selected.filter((iso) => iso !== value)
        : [...selected, value];
      setSelected(next);
      onSelect(next);
      return;
    }

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
    listRef.current?.children[activeIndex]?.scrollIntoView({
      block: "nearest",
    });
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
          if (!multi) e.currentTarget.blur(); // multi stays open for more picks
        }
        break;
      case "Escape":
        setActiveIndex(-1);
        e.currentTarget.blur();
        break;
    }
  };

  const selectedLabel = multi
    ? selected.map((iso) => COUNTRIES[iso]).join(", ")
    : inputValue;

  return (
    <>
      <div className={cx(css.countrySelectInputWrapper, cssUtils.pRel)}>
        <label htmlFor={inputId} className={css.countrySelectLabel}>
          Select Country: <strong>{selectedLabel}</strong>
        </label>
        <input
          type="text"
          name="countrySelect"
          id={inputId}
          placeholder="Search Countries..."
          className={cx(css.inputCountrySelect)}
          role="combobox"
          aria-controls={listId}
          aria-activedescendant={
            activeIndex >= 0 ? optionId(compute[activeIndex][0]) : undefined
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
            id={listId}
            role="listbox"
            aria-multiselectable={multi || undefined}
            ref={listRef}
            className={cx(css.countrySelectList)}
          >
            {compute.map(([iso, label], index) => {
              const isSelected = selected.includes(iso);
              return (
                <li
                  id={optionId(iso)}
                  role="option"
                  aria-selected={multi ? isSelected : index === activeIndex}
                  tabIndex={-1}
                  key={iso}
                  className={cx(
                    css.countryItem,
                    multi ? cssUtils.flexRowStart : "",
                    index === activeIndex ? css.countryItemActive : "",
                  )}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={(e) => {
                    handleOnSelect(iso);
                    if (!multi) e.currentTarget.blur();
                  }}
                >
                  {multi && (
                    // purely visual: the <li> owns the click, so keep it out of tab order
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      tabIndex={-1}
                      aria-hidden="true"
                      className={css.countryCheckbox}
                    />
                  )}
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
