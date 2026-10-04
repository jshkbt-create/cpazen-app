export const APP_NAME = 'Cpazen'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://cpazen.com'

export const PLAN_CONFIG = {
  FREE: { name: 'Free', events: 50_000, campaigns: 3 },
  STARTER: { name: 'Starter', events: 500_000, campaigns: 10 },
  PRO: { name: 'Pro', events: 2_000_000, campaigns: Infinity },
  ENTERPRISE: { name: 'Enterprise', events: Infinity, campaigns: Infinity },
} as const

export type PlanKey = keyof typeof PLAN_CONFIG

export interface DashboardStat {
  label: string
  value: string
  change: number
  trend: 'up' | 'down' | 'neutral'
}

export interface CampaignDraft {
  name: string
  slug: string
  status: 'DRAFT' | 'ACTIVE' | 'PAUSED'
  dailyBudget?: number
}

export interface PostbackEvent {
  clickId: string
  campaignId?: string
  ip: string
  userAgent: string
  referrer?: string
  metadata?: Record<string, unknown>
}
