export interface Listing {
  id: string
  created_at: string
  title: string
  property_type: string
  price: number
  address: string
  specs: {
    beds?: number
    baths?: number
    sqft?: number
    year_built?: number
    lot_size?: string
    commercial_type?: string
    [key: string]: unknown
  }
  image_url: string
  is_past_listing: boolean
  status: string
  description: string
}

export interface ContactSubmission {
  id: string
  created_at: string
  name: string
  email: string
  phone: string
  service: string
  message: string
  status: string
}

export type FilterType = 'all' | 'residential' | 'commercial' | 'past'
