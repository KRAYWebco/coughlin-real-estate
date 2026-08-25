import { useState } from 'react'
import { Phone, Send, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import AnimatedSection from './AnimatedSection'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { addLocalSubmission } from '../lib/adminStorage'

const services = ['Buying', 'Selling', 'Commercial', 'General Inquiry']

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const submission = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      service: formData.service,
      message: formData.message.trim(),
      status: 'unread',
    }

    if (!isSupabaseConfigured) {
      addLocalSubmission(submission)
      setSubmitted(true)
      toast.success('Message saved. Christine will be in touch shortly.')
      setFormData({ name: '', email: '', phone: '', service: '', message: '' })
      setSubmitting(false)
      return
    }

    const { error } = await supabase.from('contact_submissions').insert({
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      service: formData.service,
      message: formData.message.trim(),
      status: 'unread',
    })

    if (error) {
      console.error('Supabase contact submission failed:', error)
      toast.error('Something went wrong. Please try again or call directly.')
    } else {
      setSubmitted(true)
      toast.success('Message sent! Christine will be in touch shortly.')
      setFormData({ name: '', email: '', phone: '', service: '', message: '' })
    }

    setSubmitting(false)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-max mx-auto">
        {/* Call to Action Banner */}
        <AnimatedSection>
          <div className="bg-charcoal-950 rounded-sm p-8 md:p-12 mb-16 text-center">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-brand-400 mb-3">
              Ready to Move?
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Let's Talk.</h2>
            <p className="text-warm-400 mb-8 max-w-lg mx-auto">
              Have questions? Need expert guidance? Christine is always available
              to discuss your real estate goals.
            </p>
            <a
              href="tel:2195085555"
              className="inline-flex items-center gap-3 text-2xl md:text-3xl font-serif text-white hover:text-brand-300 transition-colors"
            >
              <Phone className="w-6 h-6 text-brand-400" />
              (219) 508-5555
            </a>
            <p className="text-warm-500 text-sm mt-3">Call or Text — Always Available</p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <AnimatedSection className="lg:col-span-3">
            <h3 className="font-serif text-2xl text-charcoal-900 mb-6">Send a Message</h3>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-sm p-8 text-center">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                <h4 className="font-serif text-xl text-charcoal-900 mb-2">Message Sent!</h4>
                <p className="text-charcoal-600 mb-6">
                  Thank you for reaching out. Christine will review your message and get
                  back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary text-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-1.5">
                      Service Needed *
                    </label>
                    <select
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Select a service</option>
                      {services.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="input-field resize-none"
                    placeholder="Tell us about your real estate needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </AnimatedSection>

          {/* Contact Info Sidebar */}
          <AnimatedSection delay={0.15} className="lg:col-span-2">
            <div className="bg-warm-50 rounded-sm p-8 border border-warm-200 h-full">
              <h3 className="font-serif text-xl text-charcoal-900 mb-6">Direct Contact</h3>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-warm-500 mb-1">Phone</p>
                  <a
                    href="tel:2195085555"
                    className="text-lg font-semibold text-charcoal-900 hover:text-brand-600 transition-colors"
                  >
                    (219) 508-5555
                  </a>
                  <p className="text-sm text-warm-500">Call or Text</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-warm-500 mb-1">Email</p>
                  <a
                    href="mailto:nwi.broker.chris@gmail.com"
                    className="text-lg font-semibold text-charcoal-900 hover:text-brand-600 transition-colors break-all"
                  >
                    nwi.broker.chris@gmail.com
                  </a>
                </div>

                <div>
                  <p className="text-sm font-medium text-warm-500 mb-2">Licensed In</p>
                  <div className="flex flex-wrap gap-2">
                    {['Indiana', 'Illinois', 'Florida', 'Texas'].map((state) => (
                      <span key={state} className="badge">
                        {state}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-warm-200">
                  <p className="text-sm text-warm-500 leading-relaxed">
                    Christine typically responds within a few hours during business
                    days. For urgent matters, calling or texting is the fastest way
                    to connect.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
