import { useFeatureFlag } from "src/hooks";
import { FLAG_REGISTRY, type FLAG_DUMMY } from "src/services";
import { cx } from "src/utilities";
import { CountrySelect } from "../CountrySelect/CountrySelect";
import css from "./FeatureFlag.module.css";

export const FeatureFlagExample = () => {
  const newSearchFF = useFeatureFlag("newSearch");
  const countryMultiFF = useFeatureFlag("countrySelectMulti");
  const flagHooks = {
    newSearch: newSearchFF,
    countrySelectMulti: countryMultiFF,
  };

  const handleFlagChange = (key: FLAG_DUMMY, val: boolean) => {
    FLAG_REGISTRY[key] = val;
    flagHooks[key as keyof typeof flagHooks]?.refetch();
  };

  if (newSearchFF.loading || countryMultiFF.loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <div className={cx(css.flagsContainer)}>
        <div>
          {newSearchFF.enabled ? (
            <div>
              <i> (this feature flag is enabled in registry)</i>
              <h3> New Search component!</h3>
            </div>
          ) : (
            <h3> Old Search component </h3>
          )}
          {countryMultiFF.enabled ? (
            <CountrySelect onSelect={() => {}} multi={true} />
          ) : (
            <div>
              <CountrySelect onSelect={() => {}} />
              <i>Multi mode is yet to be enabled</i>
            </div>
          )}
        </div>
        <div>
          <ul>
            {Object.entries(FLAG_REGISTRY).map(([key, val]) => (
              <li key={key}>
                <label htmlFor={key}>{key}</label>
                <input
                  type="checkbox"
                  name={key}
                  id={key}
                  defaultChecked={val}
                  onChange={(e) => handleFlagChange(key, e.target.checked)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
