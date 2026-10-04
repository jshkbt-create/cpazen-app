export interface CampaignMetric {
  clicks: number
  conversions: number
  spend: number
  revenue: number
  ctr: number
  cpc: number
  roi: number
  trend: number
}

export function calculateCTR(clicks: number, impressions: number): number {
  return impressions > 0 ? (clicks / impressions) * 100 : 0
}

export function calculateCPC(spend: number, clicks: number): number {
  return clicks > 0 ? spend / clicks : 0
}

export function calculateROI(revenue: number, spend: number): number {
  return spend > 0 ? ((revenue - spend) / spend) * 100 : 0
}

export function calculateCPA(spend: number, conversions: number): number {
  return conversions > 0 ? spend / conversions : 0
}

export function calculatePayout(conversions: number, payoutPerConversion: number): number {
  return conversions * payoutPerConversion
}

export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value)
}

export function formatPercent(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

export function calculateTrend(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0
  return ((current - previous) / previous) * 100
}
