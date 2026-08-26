import AnimatedSection from './AnimatedSection'
import { Award, Home, Building2, Handshake } from 'lucide-react'

const headshotFallback = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80'
const specs = [
  {
    icon: Award,
    label: '4 States Licensed',
    detail: 'IN, IL, FL, TX',
  },
  {
    icon: Home,
    label: 'Residential Expertise',
    detail: 'Buyer & Seller Representation',
  },
  {
    icon: Building2,
    label: 'Commercial Specialist',
    detail: 'Investment & Leasing',
  },
  {
    icon: Handshake,
    label: 'Client-First Approach',
    detail: 'Dedicated & Responsive',
  },
]

export default function About() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <AnimatedSection>
            <div className="relative">
              <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-xl">
                <img
                  src="/christine-headshot.jpg"
                  onError={(event) => {
                    event.currentTarget.src = headshotFallback
                  }}
                  alt="Christine Coughlin, Licensed Broker"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Accent shape */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-brand-100 rounded-sm -z-10" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-brand-300 rounded-sm -z-10" />
            </div>
          </AnimatedSection>

          {/* Text */}
          <div>
            <AnimatedSection>
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-brand-600 mb-3">
                About Christine
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-900 mb-6">
                A Calm Guide Through{' '}
                <span className="text-brand-600">Every Transaction</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <p className="text-brand-800 leading-relaxed mb-4">
                With years of experience navigating the complexities of both residential and
                commercial real estate, Christine Coughlin brings a uniquely calm, transparent,
                and client-first approach to every deal. Whether you're a first-time buyer
                feeling overwhelmed by the process or a seasoned investor seeking institutional-grade
                market analysis, Christine meets you where you are.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <p className="text-brand-800 leading-relaxed mb-4">
                Licensed in four states — Indiana, Illinois, Florida, and Texas — Christine
                offers a breadth of market knowledge that few brokers can match. Her clients
                consistently praise her responsiveness, honesty, and ability to demystify even
                the most complex transactions.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-brand-800 font-medium leading-relaxed mb-8 italic border-l-2 border-brand-500 pl-4">
                "I believe every client deserves clarity, not confusion. My job is to make
                the process feel effortless — from the first conversation to closing day."
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-[2px] bg-brand-500" />
                <span className="text-sm text-brand-700 font-medium">
                  Residential · Commercial · Multi-State
                </span>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Quick Specs Bar */}
        <AnimatedSection delay={0.1}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="bg-white p-6 rounded-sm border border-brand-200 text-center hover:border-brand-300 hover:shadow-md transition-all duration-300"
              >
                <spec.icon className="w-8 h-8 text-brand-500 mx-auto mb-3" />
                <p className="font-serif text-lg font-semibold text-brand-900 mb-1">
                  {spec.label}
                </p>
                <p className="text-sm text-brand-700">{spec.detail}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
