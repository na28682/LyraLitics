import type { CreatorPlatformId, PlatformMeta } from '@/types/creator-platform';

/**
 * Registry of all platforms the Creator Platform module knows how to display.
 * Add new platforms here, then implement a provider in ./providers.
 */
export const PLATFORMS: Record<CreatorPlatformId, PlatformMeta> = {
  instagram: {
    id: 'instagram',
    label: 'Instagram',
    description: 'Posts, Reels, Stories — reach, engagement, and follower growth.',
    icon: 'Instagram',
    color: '#E1306C',
    docsUrl: 'https://developers.facebook.com/docs/instagram-platform',
  },
  facebook: {
    id: 'facebook',
    label: 'Facebook (Meta)',
    description: 'Page insights, post performance, and audience demographics via the Meta Graph API.',
    icon: 'Facebook',
    color: '#1877F2',
    docsUrl: 'https://developers.facebook.com/docs/graph-api',
  },
  youtube: {
    id: 'youtube',
    label: 'YouTube',
    description: 'Channel analytics, video/Shorts performance, watch time, and revenue via YouTube Analytics API.',
    icon: 'Youtube',
    color: '#FF0000',
    docsUrl: 'https://developers.google.com/youtube/analytics',
  },
  tiktok: {
    id: 'tiktok',
    label: 'TikTok',
    description: 'Video performance, follower growth, and engagement via the TikTok for Developers API.',
    icon: 'Music2',
    color: '#000000',
    docsUrl: 'https://developers.tiktok.com/',
  },
  x: {
    id: 'x',
    label: 'X (Twitter)',
    description: 'Post impressions, engagement, and follower analytics via the X API.',
    icon: 'Twitter',
    color: '#1DA1F2',
    docsUrl: 'https://developer.x.com/en/docs',
  },
  onlyfans: {
    id: 'onlyfans',
    label: 'OnlyFans',
    description:
      'Subscription & content revenue tracking. OnlyFans has no public developer API — this integration runs on mock/demo data, or a manual CSV/spreadsheet import you supply.',
    icon: 'Heart',
    color: '#00AEEF',
    docsUrl: 'https://onlyfans.com/',
  },
  patreon: {
    id: 'patreon',
    label: 'Patreon',
    description: 'Membership revenue and patron analytics via the Patreon API.',
    icon: 'Gift',
    color: '#FF424D',
    docsUrl: 'https://docs.patreon.com/',
  },
};

export const PLATFORM_LIST = Object.values(PLATFORMS);
