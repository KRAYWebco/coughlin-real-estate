import { createClient } from '@supabase/supabase-js'

const configuredUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const configuredAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

const hasValidUrl = (() => {
  if (!configuredUrl) return false
  try {
    const url = new URL(configuredUrl)
    return url.protocol === 'https:' && (url.hostname.endsWith('.supabase.co') || url.hostname === 'localhost' || url.hostname === '127.0.0.1')
  } catch {
    return false
  }
})()

const hasValidAnonKey = Boolean(
  configuredAnonKey &&
  configuredAnonKey.length > 30 &&
  !configuredAnonKey.startsWith('your_') &&
  !configuredAnonKey.startsWith('placeholder-'),
)

export const isSupabaseConfigured = hasValidUrl && hasValidAnonKey

// Keep the public landing page renderable before Supabase keys are added.
// All database/auth actions are guarded by isSupabaseConfigured.
const supabaseUrl = hasValidUrl ? configuredUrl! : 'https://placeholder.supabase.co'
const supabaseAnonKey = hasValidAnonKey ? configuredAnonKey! : 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) as any

export type Database = {
  [key: string]: unknown
  public: {
    Tables: {
      listings: {
        Row: {
          id: string
          created_at: string
          title: string
          property_type: string
          price: number
          address: string
          specs: Record<string, unknown>
          image_url: string
          is_past_listing: boolean
          status: string
          description: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          property_type: string
          price: number
          address: string
          specs?: Record<string, unknown>
          image_url: string
          is_past_listing?: boolean
          status?: string
          description?: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          property_type?: string
          price?: number
          address?: string
          specs?: Record<string, unknown>
          image_url?: string
          is_past_listing?: boolean
          status?: string
          description?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone: string
          service: string
          message: string
          status: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone: string
          service: string
          message: string
          status?: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          phone?: string
          service?: string
          message?: string
          status?: string
        }
      }
    }
  }
}
