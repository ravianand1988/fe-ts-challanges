import { useCallback, useEffect, useState } from "react";
import { featureFlagService, type FLAG_DUMMY } from "src/services";

export const useFeatureFlag = (flagName: FLAG_DUMMY | string) => {
  const [loading, setLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [version, setVersion] = useState(0);

  const refetch = useCallback(() => {
    featureFlagService.invalidate(flagName as string);
    setVersion((v) => v + 1);
  }, [flagName]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const timeoutId = setTimeout(() => {
      featureFlagService
        .isEnabled(flagName as string)
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
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [flagName, version]);

  return { loading, enabled, refetch };
};
