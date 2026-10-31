import { FLAG_REGISTRY } from "./flags.mock";

interface IFeatureFlags {
  [key: string]: boolean;
}

interface ICacheEntry {
  value: boolean;
  expiresAt: number;
}

class FeatureFlagService {
  private _cache = new Map<string, ICacheEntry>();
  private _pending = new Map<string, Promise<boolean>>();
  private _TTL = 60000;

  constructor(timeToLive = 60000) {
    this._TTL = timeToLive;
  }

  public async isEnabled(key: string): Promise<boolean> {
    // 1. check cache
    const cached = this._cache.get(key);

    if (cached && cached.expiresAt > Date.now()) {
      return cached.value;
    }

    // 2. Check if request is already running
    const existingRequest = this._pending.get(key);

    if (existingRequest) {
      return existingRequest;
    }

    // 3. Fetch from API
    const request = this._fetchFlag(key);

    this._pending.set(key, request);

    try {
      const value = await request;

      // 4. Store result with expiration
      this._cache.set(key, {
        value,
        expiresAt: Date.now() + this._TTL,
      });

      return value;
    } finally {
      // 5. Clean up pending requests
      this._pending.delete(key);
    }
  }

  private async _fetchFlag(key: string): Promise<boolean> {
    if (Object.hasOwn(FLAG_REGISTRY, key)) {
      const isEnabled = FLAG_REGISTRY[key];
      return isEnabled;
    }

    const response = await fetch(`/api/flags/${key}`);

    if (!response.ok) {
      throw new Error("Failed to fetch feature flag");
    }

    const data = response.json();
    console.log("data: ", data);
    return Boolean((data as any).enabled);
  }

  public clearCache() {
    this._cache.clear();
  }
}

const featureFlagService = new FeatureFlagService();

export { featureFlagService };
export type { ICacheEntry, IFeatureFlags };
