import { Phone, ArrowDownRight, Check } from 'lucide-react'
import { motion } from 'framer-motion'

const states = [
  { code: 'IN', label: 'Indiana' },
  { code: 'IL', label: 'Illinois' },
  { code: 'FL', label: 'Florida' },
  { code: 'TX', label: 'Texas' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-16 md:pt-40 md:pb-24">
      <div className="container-max mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700"
            >
              <span>Licensed Broker</span>
              <span className="h-1 w-1 rounded-full bg-brand-500" />
              <span>IN · IL · FL · TX</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="max-w-4xl font-serif text-5xl leading-[1.05] text-brand-900 sm:text-6xl md:text-7xl"
            >
              Clear decisions for your next move.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-brand-800 md:text-xl"
            >
              Christine Coughlin brings calm guidance, sharp market clarity, and responsive service to residential and commercial real estate.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            >
              <a href="#contact" className="btn-primary text-base">
                Start a Conversation
                <ArrowDownRight className="h-4 w-4" />
              </a>
              <a
                href="tel:2195085555"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-900"
              >
                <Phone className="h-4 w-4" />
                (219) 508-5555
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative border-l-2 border-brand-500 pl-7 md:pl-10"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              One trusted point of contact
            </p>
            <p className="mt-5 max-w-md font-serif text-3xl leading-tight text-brand-900 md:text-4xl">
              Residential, commercial, and multi-state expertise in one place.
            </p>
            <ul className="mt-8 space-y-4 text-sm text-brand-800">
              {[
                'Buyer and seller representation',
                'Commercial investment and leasing',
                'Licensed across four states',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-2">
              {states.map((state) => (
                <span key={state.code} title={state.label} className="border border-brand-200 px-3 py-1.5 text-xs font-semibold tracking-widest text-brand-700">
                  {state.code}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
