import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Session } from '@supabase/supabase-js'

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    let active = true

    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (!active) return
        if (error || !data.session) {
          setSession(null)
          navigate(`/auth?returnTo=${encodeURIComponent(location.pathname)}`, { replace: true })
          return
        }
        setSession(data.session)
      } catch {
        if (active) {
          setSession(null)
          navigate(`/auth?returnTo=${encodeURIComponent(location.pathname)}`, { replace: true })
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    void checkSession()

    const { data } = supabase.auth.onAuthStateChange((_event: string, nextSession: Session | null) => {
      if (!active) return
      setSession(nextSession)
      if (!nextSession) {
        navigate(`/auth?returnTo=${encodeURIComponent(location.pathname)}`, { replace: true })
      }
    })

    return () => {
      active = false
      data.subscription.unsubscribe()
    }
  }, [location.pathname, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-50">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-sm text-warm-500">Checking admin access…</p>
        </div>
      </div>
    )
  }

  return session ? <>{children}</> : null
}
