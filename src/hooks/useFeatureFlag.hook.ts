import { useEffect, useState } from "react";
import { featureFlagService, type FLAG_DUMMY } from "src/services";

export const useFeatureFlag = (flagName: FLAG_DUMMY | string) => {
  const [loading, setLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const timeoutId = setTimeout(() => {
      featureFlagService
        .isEnabled(flagName)
        .then((res) => {
          if (!cancelled) {
            setEnabled(res);
          }
        })
        .catch(() => {
          if (!cancelled) {
            setEnabled(false);
          }
        })
        .finally(() => {
          if (!cancelled) {
            setLoading(false);
          }
        });
    }, 3000);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [flagName]);

  return { loading, enabled };
};
