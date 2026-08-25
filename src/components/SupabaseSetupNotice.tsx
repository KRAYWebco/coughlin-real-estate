import { Database, ExternalLink } from 'lucide-react'

export default function SupabaseSetupNotice() {
  return (
    <div className="min-h-screen bg-warm-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border border-warm-200 rounded-sm shadow-lg p-8 text-center">
        <Database className="w-10 h-10 text-brand-500 mx-auto mb-4" />
        <h1 className="font-serif text-2xl text-charcoal-900 mb-3">Connect Supabase</h1>
        <p className="text-sm text-charcoal-600 leading-relaxed mb-6">
          The public site is ready, but the admin portal needs a Supabase project connection.
          Add these keys in Settings → Environment, then refresh the preview:
        </p>
        <div className="bg-warm-50 border border-warm-200 rounded-sm p-4 text-left text-xs font-mono text-charcoal-700 space-y-2 mb-6">
          <p>VITE_SUPABASE_URL</p>
          <p>VITE_SUPABASE_ANON_KEY</p>
        </div>
        <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700">
          Return to public site <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}
