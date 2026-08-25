import type { ContactSubmission, Listing } from './types'

const submissionsKey = 'christine-contact-submissions'
const listingsKey = 'christine-listings'

function read<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : fallback
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage can be unavailable in private browsing; the UI still remains usable.
  }
}

export function getLocalSubmissions() {
  return read<ContactSubmission[]>(submissionsKey, [])
}

export function addLocalSubmission(input: Omit<ContactSubmission, 'id' | 'created_at'>) {
  const submission: ContactSubmission = {
    ...input,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  }
  write(submissionsKey, [submission, ...getLocalSubmissions()])
  return submission
}

export function updateLocalSubmission(id: string, status: string) {
  const submissions = getLocalSubmissions().map((submission) =>
    submission.id === id ? { ...submission, status } : submission,
  )
  write(submissionsKey, submissions)
  return submissions
}

export function getLocalListings() {
  return read<Listing[]>(listingsKey, [])
}

export function saveLocalListings(listings: Listing[]) {
  write(listingsKey, listings)
}
