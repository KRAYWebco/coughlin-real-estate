import { Phone, Mail, MapPin, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

const states = ['Indiana', 'Illinois', 'Florida', 'Texas']

export default function Footer() {
  return (
    <footer className="border-t border-brand-200 bg-white text-brand-800">
      <div className="container-max mx-auto section-padding">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          <div>
            <h3 className="mb-2 font-serif text-2xl text-brand-900">Christine Coughlin</h3>
            <p className="mb-4 text-sm text-brand-700">Licensed Residential & Commercial Broker</p>
            <p className="text-sm leading-relaxed text-brand-700">
              Guiding buyers and sellers with expert market clarity, responsive service, and a stress-free experience across four states.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-600">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:2195085555" className="flex items-center gap-3 transition-colors hover:text-brand-500">
                  <Phone className="h-4 w-4 text-brand-600" />
                  (219) 508-5555 — Call or Text
                </a>
              </li>
              <li>
                <a href="mailto:nwi.broker.chris@gmail.com" className="flex items-center gap-3 transition-colors hover:text-brand-500">
                  <Mail className="h-4 w-4 text-brand-600" />
                  nwi.broker.chris@gmail.com
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-brand-600" />
                  <div>{states.map((state, i) => <span key={state}>{state}{i < states.length - 1 ? ' · ' : ''}</span>)}</div>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-600">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="transition-colors hover:text-brand-500">About</a></li>
              <li><a href="#services" className="transition-colors hover:text-brand-500">Services</a></li>
              <li><a href="#listings" className="transition-colors hover:text-brand-500">Listings</a></li>
              <li><a href="#contact" className="transition-colors hover:text-brand-500">Contact</a></li>
              <li><Link to="/admin" className="transition-colors hover:text-brand-500">Admin Portal</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-brand-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-4 text-xs text-brand-700">
              <div className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" />Equal Housing Opportunity</div>
              <span>|</span>
              <span>Realtor® Member</span>
            </div>
            <p className="text-xs text-brand-600">© {new Date().getFullYear()} Christine Coughlin. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
