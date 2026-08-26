import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import {
  LogOut,
  Mail,
  Phone,
  Eye,
  Trash2,
  Plus,
  Pencil,
  X,
  ExternalLink,
  MessageSquare,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { formatPrice, formatDate } from '../lib/utils'
import type { ContactSubmission, Listing } from '../lib/types'
import SupabaseDataNotice from '../components/SupabaseDataNotice'
import { getLocalListings, getLocalSubmissions, saveLocalListings, updateLocalSubmission } from '../lib/adminStorage'

/* ───────── Submissions Feed ───────── */

function SubmissionsFeed() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'contacted'>('all')
  const [loading, setLoading] = useState(true)
  const [dataError, setDataError] = useState(false)
  const [usingLocalData, setUsingLocalData] = useState(false)

  const fetchSubmissions = useCallback(async () => {
    setLoading(true)
    let query = supabase.from('contact_submissions').select('*').order('created_at', { ascending: false })
    if (filter !== 'all') query = query.eq('status', filter)
    const { data, error } = await query
    if (error) {
      console.error('Supabase submissions fetch failed:', error)
      const localSubmissions = getLocalSubmissions()
      setSubmissions(localSubmissions)
      setUsingLocalData(true)
      setDataError(false)
    } else {
      setDataError(false)
      setUsingLocalData(false)
      setSubmissions((data as ContactSubmission[]) || [])
    }
    setLoading(false)
  }, [filter])

  useEffect(() => {
    fetchSubmissions()
  }, [fetchSubmissions])

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('contact-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'contact_submissions' },
        () => fetchSubmissions()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchSubmissions])

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ status })
      .eq('id', id)

    if (error) {
      console.error('Supabase status update failed:', error)
      toast.error('Unable to update this submission.')
    } else {
      setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)))
      toast.success(`Marked as ${status}`)
    }
  }

  const statusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-brand-50 text-brand-700 border border-brand-200'
      case 'read': return 'bg-white text-brand-700 border border-brand-200'
      case 'contacted': return 'bg-brand-100 text-brand-800 border border-brand-200'
      default: return 'bg-white text-brand-700 border border-brand-200'
    }
  }

  return (
    <div>
      {/* Filter Bar */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {(['all', 'unread', 'read', 'contacted'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium rounded-sm transition-all ${
              filter === f
                ? 'bg-white border-2 border-brand-600 text-brand-700'
                : 'bg-white border border-brand-200 text-brand-700 hover:bg-brand-50'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {dataError ? (
        <SupabaseDataNotice resource="submissions" />
      ) : loading ? (
        <div className="text-center py-12 text-brand-700">Loading submissions...</div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-12 text-brand-700">No submissions found.</div>
      ) : (
        <div className="space-y-3">
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className={`bg-white border rounded-sm p-5 transition-all hover:shadow-sm ${
                sub.status === 'unread' ? 'border-brand-300 bg-brand-50' : 'border-brand-200'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-brand-900">{sub.name}</h4>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm ${statusColor(sub.status)}`}>
                      {sub.status}
                    </span>
                  </div>
                  <p className="text-sm text-brand-700">{formatDate(sub.created_at)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-brand-800 mb-3">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-brand-400" />
                  <a href={`mailto:${sub.email}`} className="hover:text-brand-600">{sub.email}</a>
                </div>
                {sub.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-brand-400" />
                    <a href={`tel:${sub.phone}`} className="hover:text-brand-600">{sub.phone}</a>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-brand-400" />
                  <span className="font-medium">{sub.service}</span>
                </div>
              </div>

              <p className="text-sm text-brand-800 bg-white p-3 rounded-sm mb-4 border border-brand-100">
                {sub.message}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-wrap">
                {sub.status === 'unread' && (
                  <button
                    onClick={() => updateStatus(sub.id, 'read')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-brand-200 text-brand-700 rounded-sm hover:bg-brand-50 transition-colors"
                  >
                    <Eye className="w-3 h-3" />
                    Mark as Read
                  </button>
                )}
                <a
                  href={`tel:${sub.phone}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-brand-200 text-brand-700 rounded-sm hover:bg-brand-50 transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  Call Client
                </a>
                <a
                  href={`mailto:${sub.email}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white text-brand-800 rounded-sm hover:bg-brand-50 transition-colors"
                >
                  <Mail className="w-3 h-3" />
                  Email Client
                </a>
                {sub.status !== 'contacted' && (
                  <button
                    onClick={() => updateStatus(sub.id, 'contacted')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white text-brand-800 rounded-sm hover:bg-brand-50 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Mark Contacted
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {usingLocalData && (
        <p className="mt-6 text-center text-xs text-brand-700 bg-white border border-brand-200 p-3 rounded-sm">
          Supabase tables are not available yet. Showing leads saved in this browser.
        </p>
      )}
    </div>
  )
}

/* ───────── Listing Manager ───────── */

const emptyListing = {
  title: '',
  property_type: 'residential',
  price: 0,
  address: '',
  image_url: '',
  description: '',
  is_past_listing: false,
  status: 'Active',
  beds: '',
  baths: '',
  sqft: '',
}

function ListingManager() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [dataError, setDataError] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyListing)

  const fetchListings = useCallback(async () => {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      console.error('Supabase listings fetch failed:', error)
      setListings(getLocalListings())
      setDataError(false)
    } else {
      setDataError(false)
      setListings((data as Listing[]) || [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchListings()
  }, [fetchListings])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const specs: Record<string, unknown> = {}
    if (form.beds) specs.beds = parseInt(form.beds)
    if (form.baths) specs.baths = parseInt(form.baths)
    if (form.sqft) specs.sqft = parseInt(form.sqft)

    const payload = {
      title: form.title,
      property_type: form.property_type,
      price: form.price,
      address: form.address,
      image_url: form.image_url,
      description: form.description,
      is_past_listing: form.is_past_listing,
      status: form.status,
      specs,
    }

    if (editingId) {
      const { error } = await supabase.from('listings').update(payload).eq('id', editingId)
      if (!error) {
        toast.success('Listing updated!')
        fetchListings()
      }
    } else {
      const { error } = await supabase.from('listings').insert(payload)
      if (!error) {
        toast.success('Listing created!')
        fetchListings()
      }
    }
    setShowForm(false)
    setEditingId(null)
    setForm(emptyListing)
  }

  const handleEdit = (listing: Listing) => {
    setForm({
      title: listing.title,
      property_type: listing.property_type,
      price: listing.price,
      address: listing.address,
      image_url: listing.image_url,
      description: listing.description,
      is_past_listing: listing.is_past_listing,
      status: listing.status,
      beds: listing.specs.beds?.toString() || '',
      baths: listing.specs.baths?.toString() || '',
      sqft: listing.specs.sqft?.toString() || '',
    })
    setEditingId(listing.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this listing?')) return
    const { error } = await supabase.from('listings').delete().eq('id', id)
    if (!error) {
      setListings((prev) => prev.filter((l) => l.id !== id))
      toast.success('Listing deleted')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : type === 'number' ? Number(value) : value,
    }))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-brand-700">{listings.length} listing(s)</p>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setForm(emptyListing)
          }}
          className="btn-primary text-sm py-2.5"
        >
          <Plus className="w-4 h-4" />
          Add Listing
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-brand-200 rounded-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg text-brand-900">
              {editingId ? 'Edit Listing' : 'New Listing'}
            </h3>
            <button onClick={() => { setShowForm(false); setEditingId(null) }}>
              <X className="w-5 h-5 text-brand-400 hover:text-brand-800" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-800 mb-1">Title *</label>
                <input name="title" required value={form.title} onChange={handleChange} className="input-field" placeholder="Property title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-800 mb-1">Price *</label>
                <input name="price" type="number" required value={form.price || ''} onChange={handleChange} className="input-field" placeholder="425000" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-800 mb-1">Address *</label>
              <input name="address" required value={form.address} onChange={handleChange} className="input-field" placeholder="Full address" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-800 mb-1">Type *</label>
                <select name="property_type" value={form.property_type} onChange={handleChange} className="input-field">
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-800 mb-1">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="input-field">
                  <option value="Active">Active</option>
                  <option value="Featured">Featured</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 text-sm text-brand-800 cursor-pointer pb-3">
                  <input type="checkbox" name="is_past_listing" checked={form.is_past_listing} onChange={handleChange} className="w-4 h-4 accent-brand-500" />
                  Past Listing
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-800 mb-1">Beds</label>
                <input name="beds" type="number" value={form.beds} onChange={handleChange} className="input-field" placeholder="4" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-800 mb-1">Baths</label>
                <input name="baths" type="number" value={form.baths} onChange={handleChange} className="input-field" placeholder="3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-800 mb-1">Sq Ft</label>
                <input name="sqft" type="number" value={form.sqft} onChange={handleChange} className="input-field" placeholder="2800" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-800 mb-1">Image URL</label>
              <input name="image_url" value={form.image_url} onChange={handleChange} className="input-field" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-800 mb-1">Description</label>
              <textarea name="description" rows={3} value={form.description} onChange={handleChange} className="input-field resize-none" placeholder="Property description..." />
            </div>
            <button type="submit" className="btn-primary text-sm">
              {editingId ? 'Save Changes' : 'Create Listing'}
            </button>
          </form>
        </div>
      )}

      {/* Listing Table */}
      {dataError ? (
        <SupabaseDataNotice resource="listings" />
      ) : loading ? (
        <div className="text-center py-12 text-brand-700">Loading listings...</div>
      ) : listings.length === 0 ? (
        <div className="text-center py-12 text-brand-700">
          No listings yet. Add your first listing above.
        </div>
      ) : (
        <div className="space-y-3">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white border border-brand-200 rounded-sm p-4 flex items-center gap-4 hover:shadow-sm transition-all">
              <img
                src={listing.image_url}
                alt={listing.title}
                className="w-16 h-16 object-cover rounded-sm flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-brand-900 truncate">{listing.title}</h4>
                <p className="text-sm text-brand-700 truncate">{listing.address}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-serif font-bold text-brand-600">{formatPrice(listing.price)}</p>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm ${
                  listing.status === 'Sold' ? 'bg-white border border-brand-200 text-brand-700' :
                  listing.status === 'Featured' ? 'bg-brand-100 text-brand-700' :
                  'bg-brand-50 border border-brand-200 text-brand-700'
                }`}>
                  {listing.status}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => handleEdit(listing)} className="p-2 text-brand-400 hover:text-brand-600 transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(listing.id)} className="p-2 text-brand-400 hover:text-brand-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ───────── Admin Dashboard ───────── */

type Tab = 'submissions' | 'listings'

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('submissions')
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/', { replace: true })
    toast.success('Signed out')
  }

  return (
    <div className="min-h-screen bg-white text-brand-900">
      {/* Header */}
      <header className="bg-white border-b border-brand-200 px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl font-semibold text-brand-900">
              Admin Dashboard
            </h1>
            <p className="text-xs text-brand-700">Christine Coughlin Realty</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-sm text-brand-700 hover:text-brand-800 transition-colors">
              View Site
            </a>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-800 bg-brand-50 rounded-sm hover:bg-brand-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex gap-1 bg-brand-50 p-1 rounded-sm w-fit">
          <button
            onClick={() => setTab('submissions')}
            className={`px-6 py-2.5 text-sm font-semibold rounded-sm transition-all ${
              tab === 'submissions' ? 'bg-white text-brand-900 shadow-sm' : 'text-brand-700 hover:text-brand-800'
            }`}
          >
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Submissions
          </button>
          <button
            onClick={() => setTab('listings')}
            className={`px-6 py-2.5 text-sm font-semibold rounded-sm transition-all ${
              tab === 'listings' ? 'bg-white text-brand-900 shadow-sm' : 'text-brand-700 hover:text-brand-800'
            }`}
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Listings
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {tab === 'submissions' ? <SubmissionsFeed /> : <ListingManager />}
      </main>
    </div>
  )
}
