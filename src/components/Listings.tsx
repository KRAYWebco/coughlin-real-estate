import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Bed, Bath, Maximize, MapPin, ArrowRight } from 'lucide-react'
import AnimatedSection from './AnimatedSection'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { formatPrice } from '../lib/utils'
import { sampleListings } from '../data/sampleListings'
import type { Listing, FilterType } from '../lib/types'

const filters: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Residential', value: 'residential' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Past Sales', value: 'past' },
]

function ListingCard({ listing, onClick }: { listing: Listing; onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-sm overflow-hidden border border-warm-200 hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={listing.image_url}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Status Badge */}
        <span
          className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-sm ${
            listing.status === 'Sold'
              ? 'bg-charcoal-800 text-white'
              : listing.status === 'Featured'
              ? 'bg-brand-500 text-white'
              : 'bg-emerald-600 text-white'
          }`}
        >
          {listing.status}
        </span>
        {/* Type Badge */}
        <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase bg-white/90 backdrop-blur-sm text-charcoal-700 rounded-sm">
          {listing.property_type}
        </span>
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="text-2xl font-serif font-bold text-brand-600 mb-1">
          {formatPrice(listing.price)}
        </p>
        <h3 className="font-serif text-lg font-semibold text-charcoal-900 mb-1">
          {listing.title}
        </h3>
        <div className="flex items-center gap-1.5 text-sm text-warm-500 mb-3">
          <MapPin className="w-3.5 h-3.5" />
          {listing.address}
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 text-sm text-charcoal-500 border-t border-warm-100 pt-3">
          {listing.specs.beds && (
            <div className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5" />
              <span>{listing.specs.beds} Beds</span>
            </div>
          )}
          {listing.specs.baths && (
            <div className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5" />
              <span>{listing.specs.baths} Baths</span>
            </div>
          )}
          {listing.specs.sqft && (
            <div className="flex items-center gap-1">
              <Maximize className="w-3.5 h-3.5" />
              <span>{listing.specs.sqft.toLocaleString()} SF</span>
            </div>
          )}
          {listing.specs.commercial_type && (
            <span className="text-xs font-medium bg-warm-100 px-2 py-0.5 rounded-sm">
              {listing.specs.commercial_type}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function ListingModal({ listing, onClose }: { listing: Listing; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-charcoal-950/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={listing.image_url}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <X className="w-5 h-5 text-charcoal-700" />
          </button>
          <span
            className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-sm ${
              listing.status === 'Sold'
                ? 'bg-charcoal-800 text-white'
                : listing.status === 'Featured'
                ? 'bg-brand-500 text-white'
                : 'bg-emerald-600 text-white'
            }`}
          >
            {listing.status}
          </span>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-3xl font-serif font-bold text-brand-600 mb-2">
            {formatPrice(listing.price)}
          </p>
          <h3 className="font-serif text-2xl font-semibold text-charcoal-900 mb-2">
            {listing.title}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-warm-500 mb-6">
            <MapPin className="w-4 h-4" />
            {listing.address}
          </div>

          {/* Specs Bar */}
          <div className="flex items-center gap-6 p-4 bg-warm-50 rounded-sm mb-6">
            {listing.specs.beds && (
              <div className="flex items-center gap-2 text-sm text-charcoal-700">
                <Bed className="w-4 h-4 text-brand-500" />
                <span className="font-semibold">{listing.specs.beds}</span> Beds
              </div>
            )}
            {listing.specs.baths && (
              <div className="flex items-center gap-2 text-sm text-charcoal-700">
                <Bath className="w-4 h-4 text-brand-500" />
                <span className="font-semibold">{listing.specs.baths}</span> Baths
              </div>
            )}
            {listing.specs.sqft && (
              <div className="flex items-center gap-2 text-sm text-charcoal-700">
                <Maximize className="w-4 h-4 text-brand-500" />
                <span className="font-semibold">{listing.specs.sqft.toLocaleString()}</span> SF
              </div>
            )}
          </div>

          <p className="text-charcoal-600 leading-relaxed mb-8">{listing.description}</p>

          {/* CTA */}
          {listing.status !== 'Sold' ? (
            <a
              href="#contact"
              onClick={onClose}
              className="btn-primary w-full justify-center"
            >
              Inquire About This Property
              <ArrowRight className="w-4 h-4" />
            </a>
          ) : (
            <p className="text-center text-sm text-warm-500 italic">
              This property has been sold. Contact Christine for similar opportunities.
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Listings() {
  const [filter, setFilter] = useState<FilterType>('all')
  const [listings, setListings] = useState<Listing[]>(sampleListings)
  const [selected, setSelected] = useState<Listing | null>(null)

  useEffect(() => {
    const fetchListings = async () => {
      if (!isSupabaseConfigured) return

      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase listings fetch failed:', error)
        return
      }

      if (data && data.length > 0) {
        setListings(data as Listing[])
      }
    }
    fetchListings()
  }, [])

  const filtered = listings.filter((l) => {
    if (filter === 'all') return true
    if (filter === 'past') return l.is_past_listing
    return l.property_type === filter
  })

  return (
    <section id="listings" className="section-padding bg-warm-50">
      <div className="container-max mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-brand-600 mb-3">
              Portfolio
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900 mb-4">
              Featured Listings
            </h2>
            <p className="text-charcoal-500 max-w-2xl mx-auto">
              Explore past and present properties Christine has represented. From charming
              family homes to high-value commercial investments.
            </p>
          </div>
        </AnimatedSection>

        {/* Filters */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-5 py-2 text-sm font-medium rounded-sm transition-all duration-200 ${
                  filter === f.value
                    ? 'bg-charcoal-900 text-white'
                    : 'bg-white text-charcoal-600 border border-warm-200 hover:border-charcoal-300'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onClick={() => setSelected(listing)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-warm-500 py-12">
            No listings found for this filter.
          </p>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selected && (
            <ListingModal listing={selected} onClose={() => setSelected(null)} />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
