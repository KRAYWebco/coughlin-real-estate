import { Database, ExternalLink } from 'lucide-react'

export default function SupabaseDataNotice({ resource }: { resource: 'submissions' | 'listings' }) {
  const table = resource === 'submissions' ? 'contact_submissions' : 'listings'

  return (
    <div className="max-w-2xl mx-auto my-8 border border-brand-200 bg-white p-6 rounded-sm">
      <div className="flex items-start gap-3">
        <Database className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-brand-900">Connect the {table} table</h3>
          <p className="text-sm text-brand-800 mt-2 leading-relaxed">
            Supabase is connected, but the database schema or row-level security policy for this area is not set up yet. Run the SQL in <code className="font-mono text-xs">supabase/schema.sql</code> in your Supabase SQL Editor, then refresh this page.
          </p>
          <a
            href="https://supabase.com/dashboard/project/_/sql/new"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            Open Supabase SQL Editor <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
