import type { IFeatureFlags } from "./FeatureFlag.service";

export const FLAG_REGISTRY: IFeatureFlags = {
  newSearch: true,
  countrySelectMulti: false,
};

export type FLAG_DUMMY = keyof typeof FLAG_REGISTRY;
