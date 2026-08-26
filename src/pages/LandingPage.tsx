import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Listings from '../components/Listings'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-brand-900">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Listings />
      <Contact />
      <Footer />
    </div>
  )
}
