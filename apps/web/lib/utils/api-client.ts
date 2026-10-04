import { createClient } from '@/lib/supabase/client'

export class ApiClient {
  private supabase = createClient()

  async fetchCampaigns(userId: string) {
    const { data, error } = await this.supabase
      .from('campaigns')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw new Error(error.message)
    return data || []
  }

  async fetchCampaignById(campaignId: string) {
    const { data, error } = await this.supabase
      .from('campaigns')
      .select('*')
      .eq('id', campaignId)
      .single()

    if (error) throw new Error(error.message)
    return data
  }

  async fetchCampaignStats(campaignId: string, days: number = 7) {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

    const { data: clicks, error: clicksError } = await this.supabase
      .from('clicks')
      .select('count')
      .eq('campaign_id', campaignId)
      .gte('clicked_at', since)

    const { data: conversions, error: conversionsError } = await this.supabase
      .from('conversions')
      .select('count')
      .eq('campaign_id', campaignId)
      .gte('created_at', since)

    if (clicksError || conversionsError) {
      throw new Error('Failed to fetch campaign stats')
    }

    return {
      clicks: clicks?.[0]?.count ?? 0,
      conversions: conversions?.[0]?.count ?? 0,
      ctr: clicks?.[0]?.count ? ((conversions?.[0]?.count ?? 0) / (clicks?.[0]?.count ?? 1)) * 100 : 0,
    }
  }

  async fetchOffers(networkId?: string) {
    let query = this.supabase.from('offers').select('*')

    if (networkId) {
      query = query.eq('network_id', networkId)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw new Error(error.message)
    return data || []
  }

  async fetchConversions(campaignId: string, limit: number = 50) {
    const { data, error } = await this.supabase
      .from('conversions')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw new Error(error.message)
    return data || []
  }

  async fetchAiInsights(userId: string) {
    const { data, error } = await this.supabase
      .from('ai_insights')
      .select('*')
      .eq('user_id', userId)
      .eq('dismissed', false)
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) throw new Error(error.message)
    return data || []
  }

  async createCampaign(campaign: any) {
    const { data, error } = await this.supabase
      .from('campaigns')
      .insert([campaign])
      .select()

    if (error) throw new Error(error.message)
    return data?.[0]
  }

  async updateCampaign(campaignId: string, updates: any) {
    const { data, error } = await this.supabase
      .from('campaigns')
      .update(updates)
      .eq('id', campaignId)
      .select()

    if (error) throw new Error(error.message)
    return data?.[0]
  }
}

export const apiClient = new ApiClient()
