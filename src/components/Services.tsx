import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from './AnimatedSection'
import { Home, TrendingUp, Building2, ArrowRight } from 'lucide-react'

const services = [
  {
    id: 'buyer',
    icon: Home,
    title: 'Buyer Representation',
    subtitle: 'Find Your Perfect Home',
    description:
      "Whether you're a first-time buyer navigating the market or relocating from another state, Christine provides patient, expert guidance every step of the way. She takes the time to understand your needs, walks you through every detail, and ensures you make confident, informed decisions.",
    features: [
      'First-time buyer guidance',
      'Relocation assistance',
      'Residential search & negotiation',
      'Market analysis & pricing insights',
      'Contract review & closing support',
    ],
  },
  {
    id: 'seller',
    icon: TrendingUp,
    title: 'Seller Representation',
    subtitle: 'Maximize Your Return',
    description:
      "Selling a home is about strategy, not luck. Christine combines data-driven pricing with staging guidance and maximum market exposure to ensure your property attracts the right buyers at the best possible price — efficiently and with minimal stress.",
    features: [
      'Strategic pricing & valuation',
      'Staging & presentation guidance',
      'Multi-platform marketing exposure',
      'Skilled negotiation on your behalf',
      'Smooth closing process management',
    ],
  },
  {
    id: 'commercial',
    icon: Building2,
    title: 'Commercial Real Estate',
    subtitle: 'Institutional-Grade Expertise',
    description:
      "From investment properties to leasing and commercial acquisitions, Christine brings institutional-level competence to every commercial transaction. Her analytical approach and market knowledge help investors and business owners make decisions backed by real data.",
    features: [
      'Investment property analysis',
      'Commercial leasing',
      'Business acquisition support',
      'Market research & feasibility',
      'Multi-state commercial portfolio',
    ],
  },
]

export default function Services() {
  const [active, setActive] = useState('buyer')
  const activeService = services.find((s) => s.id === active)!

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-max mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-brand-600 mb-3">
              What I Do
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900 mb-4">
              Comprehensive Real Estate Services
            </h2>
            <p className="text-charcoal-500 max-w-2xl mx-auto">
              From your first home to your largest investment, Christine provides expert
              representation across every aspect of real estate.
            </p>
          </div>
        </AnimatedSection>

        {/* Tab Buttons */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActive(service.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-sm text-sm font-semibold transition-all duration-300 ${
                  active === service.id
                    ? 'bg-brand-500 text-white shadow-md'
                    : 'bg-warm-100 text-charcoal-600 hover:bg-warm-200'
                }`}
              >
                <service.icon className="w-4 h-4" />
                {service.title}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Active Service Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-warm-50 rounded-sm p-8 md:p-12"
          >
            <div>
              <activeService.icon className="w-12 h-12 text-brand-500 mb-4" />
              <h3 className="font-serif text-2xl md:text-3xl text-charcoal-900 mb-2">
                {activeService.title}
              </h3>
              <p className="text-brand-600 font-medium mb-6">{activeService.subtitle}</p>
              <p className="text-charcoal-600 leading-relaxed mb-8">
                {activeService.description}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 transition-colors group"
              >
                Discuss Your Needs
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div>
              <h4 className="text-sm font-semibold tracking-widest uppercase text-warm-500 mb-4">
                What's Included
              </h4>
              <ul className="space-y-3">
                {activeService.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-charcoal-700 bg-white p-4 rounded-sm border border-warm-200"
                  >
                    <div className="w-2 h-2 bg-brand-500 rounded-full flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
