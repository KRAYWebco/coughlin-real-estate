import { Phone, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

const states = [
  { code: 'IN', label: 'Indiana' },
  { code: 'IL', label: 'Illinois' },
  { code: 'FL', label: 'Florida' },
  { code: 'TX', label: 'Texas' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80')`,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/70 via-charcoal-950/50 to-charcoal-950/80" />

      {/* Listing Leaders brand lockup */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="absolute top-24 left-1/2 -translate-x-1/2 z-10 w-[min(320px,78vw)] rounded-sm bg-white/95 px-6 py-4 shadow-lg backdrop-blur-sm ring-1 ring-white/30"
      >
        <img
          src="/listing-leaders-logo.svg"
          alt="Listing Leaders — Changing Real Estate Forever"
          className="w-full h-auto"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container-max mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* License Badges */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          {states.map((state, i) => (
            <motion.span
              key={state.code}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold tracking-widest rounded-sm"
              title={state.label}
            >
              {state.code}
            </motion.span>
          ))}
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 max-w-5xl mx-auto leading-tight"
        >
          Residential, Commercial, Multi-State
          <span className="block text-brand-300 mt-2">Christine Coughlin</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-warm-200 max-w-2xl mx-auto mb-10 font-light leading-relaxed"
        >
          Guiding buyers and sellers with expert market clarity, responsive service,
          and a stress-free experience.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="tel:2195085555" className="btn-primary text-base">
            <Phone className="w-4 h-4" />
            Call or Text (219) 508-5555
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-sm hover:bg-white/10 transition-all duration-300"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/80 transition-colors"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.a>
    </section>
  )
}
