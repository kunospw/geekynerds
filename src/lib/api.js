/**
 * src/lib/api.js
 * Small wrapper around api.itbook.store for the GeekyNerds app.
 * Exports: fetchSearch, fetchBook, fetchNew
 *
 * Normalized book shape used by the app:
 * {
 *   isbn13: string,
 *   title: string,
 *   subtitle: string,
 *   price: string,
 *   rating: string|null, // api.itbook.store does not consistently provide ratings; use local reviews when available
 *   image: string,
 *   url: string
 * }
 */

const API_BASE = 'https://api.itbook.store/1.0'

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    const err = new Error(`API error ${res.status}${text ? `: ${text}` : ''}`)
    err.status = res.status
    throw err
  }
  return res.json()
}

function normalizeSummary(item) {
  // item comes from /search or /new endpoint
  return {
    isbn13: item.isbn13 || item.isbn || null,
    title: item.title || '',
    subtitle: item.subtitle || '',
    price: item.price || '',
    // rating is not part of the public search/new payload — keep null so UI can merge local ratings
    rating: item.rating || null,
    image: item.image || '',
    url: item.url || ''
  }
}

function normalizeDetail(data) {
  // the /books/:isbn response contains more fields; map the ones our UI expects
  return {
    isbn13: data.isbn13 || data.isbn || null,
    title: data.title || '',
    subtitle: data.subtitle || data.subtitle || '',
    price: data.price || '',
    // api.itbook.store sometimes has a "rating" field; otherwise null
    rating: data.rating || null,
    image: data.image || '',
    url: data.url || '',
    // keep other raw fields available for product detail pages
    raw: data
  }
}

/**
 * Search books by query (delegates to /search/{query}/{page}).
 * Returns { total: number, page: number, books: Array<book> }
 */
export async function fetchSearch(query, page = 1) {
  if (!query || typeof query !== 'string') {
    throw new Error('fetchSearch: query must be a non-empty string')
  }

  const url = `${API_BASE}/search/${encodeURIComponent(query)}/${page}`
  const res = await fetch(url)
  const data = await handleResponse(res)

  return {
    total: Number(data.total) || 0,
    page: Number(data.page) || Number(page) || 1,
    books: Array.isArray(data.books) ? data.books.map(normalizeSummary) : []
  }
}

/**
 * Fetch book detail by ISBN-13 (/books/{isbn13}).
 * Returns normalized book object (with `raw` containing the original API payload).
 */
export async function fetchBook(isbn13) {
  if (!isbn13) throw new Error('fetchBook: isbn13 is required')
  const url = `${API_BASE}/books/${encodeURIComponent(isbn13)}`
  const res = await fetch(url)
  const data = await handleResponse(res)
  return normalizeDetail(data)
}

/**
 * Fetch newly released books (/new).
 * Returns an array of normalized book summaries.
 */
export async function fetchNew() {
  const url = `${API_BASE}/new`
  const res = await fetch(url)
  const data = await handleResponse(res)
  return Array.isArray(data.books) ? data.books.map(normalizeSummary) : []
}

export default {
  fetchSearch,
  fetchBook,
  fetchNew
}
