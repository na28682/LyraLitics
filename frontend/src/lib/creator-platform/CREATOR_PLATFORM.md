# Creator Platform Module

The Creator Platform module (`/creator-platform`) is a unified analytics dashboard covering multiple social and creator-monetization platforms. It's built around a **provider pattern** so each platform can be backed by either demo/mock data or a real API integration, with the UI staying identical either way.

## Supported platforms

| Platform | Status | Official API docs |
|---|---|---|
| Instagram | Demo data | https://developers.facebook.com/docs/instagram-platform |
| Facebook (Meta) | Demo data | https://developers.facebook.com/docs/graph-api |
| YouTube | Demo data | https://developers.google.com/youtube/analytics |
| TikTok | Demo data | https://developers.tiktok.com/ |
| X (Twitter) | Demo data | https://developer.x.com/en/docs |
| Patreon | Demo data | https://docs.patreon.com/ |
| OnlyFans | Demo data only — no official API exists | — |

## How it works

```
src/types/creator-platform.ts     # Shared types (PlatformAccount, RevenueSummary, etc.)
src/lib/creator-platform/
  ├── platforms.ts                # Registry of platform metadata (label, color, docs URL)
  ├── mock.ts                     # Deterministic mock data generators
  ├── providers.ts                # Provider factory — picks real provider or falls back to mock
  └── index.ts                    # Barrel export
```

Every data-fetching call in the UI goes through a `CreatorPlatformProvider`:

```ts
interface CreatorPlatformProvider {
  platform: CreatorPlatformId;
  isConfigured(): boolean;
  getAccount(): Promise<PlatformAccount>;
  getRevenue(range: DateRange): Promise<RevenueSummary>;
  getEngagement(range: DateRange): Promise<EngagementSummary>;
  getTopContent(range: DateRange, limit?: number): Promise<ContentItem[]>;
  getAudience(): Promise<AudienceInsight>;
}
```

`createProvider(platform)` returns a mock-backed provider unless:
1. A real provider has been registered for that platform in `REAL_PROVIDERS` (in `providers.ts`), **and**
2. The corresponding `NEXT_PUBLIC_<PLATFORM>_ENABLED` env var is `"true"`, **and**
3. That provider's `isConfigured()` returns `true` (i.e. credentials are present).

This means the dashboard is always usable — even with zero configuration — and connecting a real account is additive and isolated per platform.

## Connecting a real platform

1. Create `src/lib/creator-platform/providers/<platform>.ts` implementing `CreatorPlatformProvider`, calling that platform's **official** API and mapping the response into the shared types.
2. Register it in `REAL_PROVIDERS` in `providers.ts`:
   ```ts
   const REAL_PROVIDERS: Partial<Record<CreatorPlatformId, () => CreatorPlatformProvider>> = {
     youtube: () => new YouTubeProvider(),
   };
   ```
3. Add the platform's credentials to `.env.local` (see `.env.example` for the expected variable names per platform).
4. Set `NEXT_PUBLIC_<PLATFORM>_ENABLED=true`.

## A note on OnlyFans

OnlyFans does not provide a public developer API or official SDK. There is no legitimate way to programmatically pull analytics or manage content via an "OnlyFans API" — services advertising one are unofficial, typically violate OnlyFans' Terms of Service, and should not be relied upon (especially anything requiring you to share account credentials with a third party).

The OnlyFans tile exists in this module for layout consistency (e.g. if you want to display manually-exported numbers alongside other platforms), and ships with demo data only. If you want to include real OnlyFans figures, the safest approach is:

- Export your stats manually from the OnlyFans creator dashboard (CSV where available).
- Write a small custom provider that reads from that exported file or a spreadsheet you maintain, implementing `CreatorPlatformProvider` as described above.

Do not attempt to automate login or scraping against OnlyFans — this is against their Terms of Service and a security risk to your account.
