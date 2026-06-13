import type { CreatorPlatformId, CreatorPlatformProvider, DateRange } from '@/types/creator-platform';
import {
  getMockAccount,
  getMockAudience,
  getMockEngagement,
  getMockRevenue,
  getMockTopContent,
} from './mock';

/**
 * Each platform reads its "configured" status from an env var of the form
 * NEXT_PUBLIC_<PLATFORM>_ENABLED=true plus the platform's own credential
 * vars (see env.example). When not configured, the provider transparently
 * falls back to mock data so the dashboard always renders something useful.
 *
 * To wire up a REAL integration for a platform:
 *  1. Add the platform's official SDK / fetch calls in a new file,
 *     e.g. `providers/youtube.ts`, implementing `CreatorPlatformProvider`.
 *  2. Register it in `REAL_PROVIDERS` below.
 *  3. Set the relevant env vars (see env.example) and the
 *     NEXT_PUBLIC_<PLATFORM>_ENABLED flag to "true".
 *
 * Until a real provider is registered for a platform, `createProvider`
 * returns the mock-backed provider for that platform.
 */

const ENABLED_ENV_VAR: Record<CreatorPlatformId, string> = {
  instagram: 'NEXT_PUBLIC_INSTAGRAM_ENABLED',
  facebook: 'NEXT_PUBLIC_FACEBOOK_ENABLED',
  youtube: 'NEXT_PUBLIC_YOUTUBE_ENABLED',
  tiktok: 'NEXT_PUBLIC_TIKTOK_ENABLED',
  x: 'NEXT_PUBLIC_X_ENABLED',
  onlyfans: 'NEXT_PUBLIC_ONLYFANS_ENABLED',
  patreon: 'NEXT_PUBLIC_PATREON_ENABLED',
};

function isEnabled(platform: CreatorPlatformId): boolean {
  const key = ENABLED_ENV_VAR[platform];
  return process.env[key] === 'true';
}

function createMockProvider(platform: CreatorPlatformId): CreatorPlatformProvider {
  return {
    platform,
    isConfigured: () => false,
    getAccount: async () => getMockAccount(platform),
    getRevenue: async (range: DateRange) => getMockRevenue(platform, range),
    getEngagement: async (range: DateRange) => getMockEngagement(platform, range),
    getTopContent: async (range: DateRange, limit?: number) => getMockTopContent(platform, range, limit),
    getAudience: async () => getMockAudience(platform),
  };
}

/**
 * Real providers, registered as they're implemented. Empty by default —
 * every platform ships as mock-only until a real provider is added here.
 */
const REAL_PROVIDERS: Partial<Record<CreatorPlatformId, () => CreatorPlatformProvider>> = {
  // youtube: () => new YouTubeProvider(),
  // instagram: () => new InstagramProvider(),
  // ...
};

export function createProvider(platform: CreatorPlatformId): CreatorPlatformProvider {
  const factory = REAL_PROVIDERS[platform];
  if (factory && isEnabled(platform)) {
    const provider = factory();
    if (provider.isConfigured()) return provider;
  }
  return createMockProvider(platform);
}

export function isUsingMockData(platform: CreatorPlatformId): boolean {
  return createProvider(platform).isConfigured() === false;
}
