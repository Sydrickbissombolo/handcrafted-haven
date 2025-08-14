'use client'
export const dynamic = "force-dynamic"

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Filters() {
  const router = useRouter()
  const params = useSearchParams()

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [max, setMax] = useState('')

  // Initialize from URL params
  useEffect(() => {
    setQuery(params.get('q') ?? '')
    setCategory(params.get('category') ?? '')
    setMax(params.get('max') ?? '')
  }, [params])

  const applyFilters = () => {
    const p = new URLSearchParams()

    if (query.trim()) p.set('q', query.trim())
    if (category) p.set('category', category)
    if (max && parseInt(max) > 0) p.set('max', max)

    router.push('/?' + p.toString())
  }

  const resetFilters = () => {
    setQuery('')
    setCategory('')
    setMax('')
    router.push('/')
  }

  return (
    <div className="filters" role="region" aria-label="Product filters">
      <div>
        <label htmlFor="q">Search</label>
        <input
          id="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="mug, bowl..."
        />
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All</option>
          <option>Home & Kitchen</option>
          <option>Home Decor</option>
          <option>Kitchenware</option>
        </select>
      </div>
      <div>
        <label htmlFor="max">Max price</label>
        <input
          id="max"
          type="number"
          min="0"
          step="1"
          value={max}
          onChange={(e) => setMax(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'end' }}>
        <button className="btn" onClick={applyFilters}>Apply</button>
        <button className="btn-secondary" onClick={resetFilters}>Reset</button>
      </div>
    </div>
  )
}
