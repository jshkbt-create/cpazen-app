export const APP_NAME = 'Cpazen'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://cpazen.com'

export const PLANS = {
  FREE: { name: 'Free', events: 50000, campaigns: 3 },
  STARTER: { name: 'Starter', events: 500000, campaigns: 10 },
  PRO: { name: 'Pro', events: 2000000, campaigns: Infinity },
  ENTERPRISE: { name: 'Enterprise', events: Infinity, campaigns: Infinity },
} as const

export const REDIRECT_MODES = [
  { value: 'HTTP_302', label: '302 Redirect', description: 'Fastest, most common' },
  { value: 'META_REFRESH', label: 'Meta Refresh', description: 'Hides referrer' },
  { value: 'DOUBLE_META', label: 'Double Meta', description: 'Maximum referrer hiding' },
] as const
