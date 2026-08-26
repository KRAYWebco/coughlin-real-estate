import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../lib/supabase'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const returnTo = searchParams.get('returnTo') || '/admin'

  useEffect(() => {
    let active = true
    void supabase.auth.getSession().then((result: { data: { session: { user: unknown } | null } }) => {
      if (active && result.data.session) navigate(returnTo, { replace: true })
    }).catch(() => {
      if (active) toast.error('Unable to connect to the admin service right now.')
    })
    return () => { active = false }
  }, [navigate, returnTo])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    try {
      const result = isSignUp
        ? await supabase.auth.signUp({ email: email.trim(), password })
        : await supabase.auth.signInWithPassword({ email: email.trim(), password })

      if (result.error) {
        toast.error(result.error.message)
      } else if (isSignUp) {
        toast.success('Account created. Check your email, then sign in.')
        setIsSignUp(false)
      } else {
        toast.success('Welcome back!')
        navigate(returnTo, { replace: true })
      }
    } catch {
      toast.error('Unable to connect to Supabase. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <h1 className="font-serif text-2xl font-semibold text-brand-900">Christine Coughlin</h1>
            <p className="text-xs tracking-[0.2em] uppercase text-brand-700">Admin Portal</p>
          </a>
        </div>

        <section className="bg-white rounded-sm shadow-lg border border-brand-200 p-8">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5 text-brand-500" />
            <h2 className="font-serif text-xl text-brand-900">{isSignUp ? 'Create Account' : 'Sign In'}</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-brand-800 mb-1.5" htmlFor="admin-email">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
                <input id="admin-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input-field pl-10" placeholder="admin@example.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-800 mb-1.5" htmlFor="admin-password">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
                <input id="admin-password" type={showPassword ? 'text' : 'password'} required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="input-field pl-10 pr-10" placeholder="••••••••" />
                <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-400 hover:text-brand-700">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-50">
              {loading ? <div className="w-4 h-4 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" /> : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button type="button" onClick={() => setIsSignUp((value) => !value)} className="text-sm text-brand-600 hover:text-brand-700 transition-colors">
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
            </button>
          </div>
        </section>

        <p className="text-center text-xs text-brand-700 mt-6">Protected admin area. Authorized personnel only.</p>
      </div>
    </main>
  )
}
