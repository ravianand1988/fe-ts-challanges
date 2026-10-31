import { useFeatureFlag } from "src/hooks";
import { CountrySelect } from "../CountrySelect/CountrySelect";

export const FeatureFlagExample = () => {
  const { loading, enabled } = useFeatureFlag("newSearch");
  const countryMultiFF = useFeatureFlag("countrySelectMulti");

  if (loading || countryMultiFF.loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      {enabled ? (
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
    </>
  );
};
