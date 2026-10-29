import { useMemo, useState } from "react";
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
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");

  const handleOnSelect = (value: string) => {
    const country = COUNTRIES[value];
    setSelected(country);
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

    return filtered;
  }, [query]);

  return (
    <>
      <div className={cx(css.countrySelectInputWrapper, cssUtils.pRel)}>
        <label htmlFor="countrySelect" className={css.countrySelectLabel}>
          Select Country: <strong>{selected && selected}</strong>
        </label>
        <input
          type="text"
          name="countrySelect"
          id="countrySelect"
          placeholder="Search Countries..."
          className={cx(css.inputCountrySelect)}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <div
          className={cx(
            cssUtils.pAbs,
            css.countrySelectContainer,
            css.countrySuggestions,
          )}
        >
          <ul className={cx(css.countrySelectList)}>
            {Object.entries(compute).map(([iso, label]) => {
              return (
                <li
                  role="button"
                  tabIndex={0}
                  aria-label={`Country - ${label}`}
                  key={iso}
                  className={cx(css.countryItem)}
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
