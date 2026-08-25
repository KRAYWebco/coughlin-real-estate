import { Phone, Mail, MapPin, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

const states = ['Indiana', 'Illinois', 'Florida', 'Texas']

export default function Footer() {
  return (
    <footer className="bg-charcoal-950 text-warm-300">
      <div className="container-max mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl text-white mb-2">Christine Coughlin</h3>
            <p className="text-sm text-warm-400 mb-4">Licensed Residential & Commercial Broker</p>
            <p className="text-sm text-warm-500 leading-relaxed">
              Guiding buyers and sellers with expert market clarity, responsive service,
              and a stress-free experience across four states.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase text-warm-400 mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:2195085555" className="flex items-center gap-3 hover:text-brand-400 transition-colors">
                  <Phone className="w-4 h-4 text-brand-500" />
                  (219) 508-5555 — Call or Text
                </a>
              </li>
              <li>
                <a href="mailto:nwi.broker.chris@gmail.com" className="flex items-center gap-3 hover:text-brand-400 transition-colors">
                  <Mail className="w-4 h-4 text-brand-500" />
                  nwi.broker.chris@gmail.com
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-brand-500" />
                  <div>
                    {states.map((state, i) => (
                      <span key={state}>
                        {state}{i < states.length - 1 ? ' · ' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase text-warm-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-brand-400 transition-colors">About</a></li>
              <li><a href="#services" className="hover:text-brand-400 transition-colors">Services</a></li>
              <li><a href="#listings" className="hover:text-brand-400 transition-colors">Listings</a></li>
              <li><a href="#contact" className="hover:text-brand-400 transition-colors">Contact</a></li>
              <li><Link to="/admin" className="hover:text-brand-400 transition-colors">Admin Portal</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-charcoal-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs text-warm-500">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                Equal Housing Opportunity
              </div>
              <span>|</span>
              <span>Realtor® Member</span>
            </div>
            <p className="text-xs text-warm-600">
              © {new Date().getFullYear()} Christine Coughlin. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
