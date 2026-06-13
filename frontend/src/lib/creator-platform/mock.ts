import type {
  AudienceInsight,
  ContentItem,
  CreatorPlatformId,
  DateRange,
  EngagementSummary,
  PlatformAccount,
  RevenueSummary,
} from '@/types/creator-platform';

/** Tiny deterministic PRNG so mock data is stable across renders/SSR. */
function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) || 1;
}

function rangeToDays(range: DateRange): number {
  switch (range) {
    case '7d':
      return 7;
    case '30d':
      return 30;
    case '90d':
      return 90;
    case 'ytd':
      return Math.max(
        1,
        Math.ceil((Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) / 86400000)
      );
  }
}

const PLATFORM_BASELINES: Record<
  CreatorPlatformId,
  { followers: number; dailyViews: number; engagementRate: number; dailyRevenueCents: number }
> = {
  instagram: { followers: 84200, dailyViews: 42000, engagementRate: 0.045, dailyRevenueCents: 0 },
  facebook: { followers: 61300, dailyViews: 28000, engagementRate: 0.018, dailyRevenueCents: 0 },
  youtube: { followers: 152000, dailyViews: 95000, engagementRate: 0.06, dailyRevenueCents: 38000 },
  tiktok: { followers: 210400, dailyViews: 310000, engagementRate: 0.092, dailyRevenueCents: 0 },
  x: { followers: 39800, dailyViews: 18000, engagementRate: 0.021, dailyRevenueCents: 0 },
  onlyfans: { followers: 4200, dailyViews: 9000, engagementRate: 0.11, dailyRevenueCents: 185000 },
  patreon: { followers: 1850, dailyViews: 1200, engagementRate: 0.07, dailyRevenueCents: 64000 },
};

const REVENUE_SOURCES: Record<CreatorPlatformId, string[]> = {
  instagram: ['Brand Partnerships', 'Affiliate Links', 'Bonuses'],
  facebook: ['Ad Revenue', 'Stars', 'Brand Partnerships'],
  youtube: ['Ad Revenue', 'Channel Memberships', 'Super Chat', 'Sponsorships'],
  tiktok: ['Creator Rewards', 'Live Gifts', 'Brand Partnerships'],
  x: ['Ad Revenue Share', 'Subscriptions'],
  onlyfans: ['Subscriptions', 'Tips', 'Pay-Per-View'],
  patreon: ['Memberships', 'One-time Tips'],
};

function buildSeries(seed: number, days: number, base: number, volatility = 0.35) {
  const rand = seededRandom(seed);
  const series: { date: string; value: number }[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const noise = 1 + (rand() - 0.5) * volatility;
    const trend = 1 + ((days - i) / days) * 0.15; // slight upward trend
    series.push({ date: d.toISOString().slice(0, 10), value: Math.max(0, Math.round(base * noise * trend)) });
  }
  return series;
}

export function getMockAccount(platform: CreatorPlatformId): PlatformAccount {
  const baseline = PLATFORM_BASELINES[platform];
  const rand = seededRandom(hashString(platform + 'account'));
  return {
    platform,
    connected: false,
    handle: `@your_${platform}_handle`,
    displayName: 'Demo Creator',
    followers: baseline.followers,
    followerChange: Math.round(baseline.followers * (0.005 + rand() * 0.02)),
  };
}

export function getMockRevenue(platform: CreatorPlatformId, range: DateRange): RevenueSummary {
  const baseline = PLATFORM_BASELINES[platform];
  const days = rangeToDays(range);
  const series = buildSeries(hashString(platform + 'revenue'), days, baseline.dailyRevenueCents, 0.4);
  const total = series.reduce((sum, p) => sum + p.value, 0);

  const sources = REVENUE_SOURCES[platform];
  const rand = seededRandom(hashString(platform + 'revenue-sources'));
  const weights = sources.map(() => 0.4 + rand());
  const weightSum = weights.reduce((a, b) => a + b, 0);
  const bySource = sources.map((label, i) => ({
    label,
    amountCents: Math.round((weights[i] / weightSum) * total),
  }));

  return {
    platform,
    totalCents: total,
    currency: 'USD',
    bySource,
    series: series.map((p) => ({ date: p.date, amountCents: p.value })),
  };
}

export function getMockEngagement(platform: CreatorPlatformId, range: DateRange): EngagementSummary {
  const baseline = PLATFORM_BASELINES[platform];
  const days = rangeToDays(range);
  const viewSeries = buildSeries(hashString(platform + 'views'), days, baseline.dailyViews);
  const totalViews = viewSeries.reduce((sum, p) => sum + p.value, 0);
  const totalEngagements = Math.round(totalViews * baseline.engagementRate);

  const rand = seededRandom(hashString(platform + 'engagement-breakdown'));
  const likes = Math.round(totalEngagements * (0.55 + rand() * 0.1));
  const comments = Math.round(totalEngagements * (0.08 + rand() * 0.05));
  const shares = Math.round(totalEngagements * (0.05 + rand() * 0.05));
  const saves = Math.round(totalEngagements * (0.05 + rand() * 0.05));

  return {
    platform,
    views: totalViews,
    likes,
    comments,
    shares,
    saves,
    engagementRate: baseline.engagementRate,
    series: viewSeries.map((p, i) => ({
      date: p.date,
      views: p.value,
      engagements: Math.round(p.value * baseline.engagementRate),
    })),
  };
}

const CONTENT_TYPES_BY_PLATFORM: Record<CreatorPlatformId, ContentItem['type'][]> = {
  instagram: ['reel', 'photo', 'story', 'post'],
  facebook: ['post', 'video', 'photo'],
  youtube: ['video', 'short'],
  tiktok: ['video', 'short'],
  x: ['post'],
  onlyfans: ['photo', 'video', 'audio', 'text'],
  patreon: ['post', 'video', 'text'],
};

const SAMPLE_TITLES = [
  'Behind the scenes',
  'Q&A with the community',
  'New drop announcement',
  'Day in the life',
  'Top 5 tips this week',
  'Collab teaser',
  'Weekly highlights',
  'Tutorial walkthrough',
  'Fan favorite remix',
  'Live recap',
];

export function getMockTopContent(platform: CreatorPlatformId, range: DateRange, limit = 5): ContentItem[] {
  const baseline = PLATFORM_BASELINES[platform];
  const types = CONTENT_TYPES_BY_PLATFORM[platform];
  const rand = seededRandom(hashString(platform + 'content' + range));
  const items: ContentItem[] = [];

  for (let i = 0; i < limit; i++) {
    const views = Math.round(baseline.dailyViews * (0.5 + rand() * 2.5));
    const engagementRate = baseline.engagementRate * (0.7 + rand() * 0.6);
    const engagements = Math.round(views * engagementRate);
    const daysAgo = Math.floor(rand() * rangeToDays(range));
    const publishedAt = new Date();
    publishedAt.setDate(publishedAt.getDate() - daysAgo);

    items.push({
      id: `${platform}-${i}`,
      platform,
      type: types[i % types.length],
      title: SAMPLE_TITLES[(hashString(platform) + i) % SAMPLE_TITLES.length],
      publishedAt: publishedAt.toISOString(),
      metrics: {
        views,
        likes: Math.round(engagements * 0.7),
        comments: Math.round(engagements * 0.15),
        shares: Math.round(engagements * 0.15),
        revenueCents:
          baseline.dailyRevenueCents > 0 ? Math.round(baseline.dailyRevenueCents * (0.05 + rand() * 0.3)) : undefined,
      },
    });
  }

  return items.sort((a, b) => b.metrics.views - a.metrics.views);
}

const COUNTRY_POOLS: Record<CreatorPlatformId, string[]> = {
  instagram: ['United States', 'Brazil', 'India', 'United Kingdom', 'Mexico'],
  facebook: ['United States', 'India', 'Indonesia', 'Brazil', 'Philippines'],
  youtube: ['United States', 'India', 'United Kingdom', 'Germany', 'Japan'],
  tiktok: ['United States', 'Indonesia', 'Brazil', 'Vietnam', 'Philippines'],
  x: ['United States', 'United Kingdom', 'Japan', 'Brazil', 'India'],
  onlyfans: ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany'],
  patreon: ['United States', 'Canada', 'United Kingdom', 'Germany', 'Australia'],
};

export function getMockAudience(platform: CreatorPlatformId): AudienceInsight {
  const rand = seededRandom(hashString(platform + 'audience'));
  const countries = COUNTRY_POOLS[platform];
  const weights = countries.map(() => 0.3 + rand());
  const total = weights.reduce((a, b) => a + b, 0);

  return {
    platform,
    topCountries: countries.map((country, i) => ({
      country,
      percent: Math.round((weights[i] / total) * 1000) / 10,
    })),
    ageRanges: [
      { range: '13-17', percent: 4 },
      { range: '18-24', percent: 28 },
      { range: '25-34', percent: 36 },
      { range: '35-44', percent: 19 },
      { range: '45-54', percent: 9 },
      { range: '55+', percent: 4 },
    ],
    genderSplit: [
      { label: 'Female', percent: 54 },
      { label: 'Male', percent: 44 },
      { label: 'Other', percent: 2 },
    ],
  };
}
