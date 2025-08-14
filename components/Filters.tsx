
export const dynamic = "force-dynamic";
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Filters() {
  const router = useRouter()
  const params = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [category, setCategory] = useState(params.get('category') ?? '')
  const [max, setMax] = useState(params.get('max') ?? '')

  useEffect(() => {
    setQuery(params.get('q') ?? '')
    setCategory(params.get('category') ?? '')
    setMax(params.get('max') ?? '')
  }, [params])

  const apply = () => {
    const p = new URLSearchParams()
    if (query) p.set('q', query)
    if (category) p.set('category', category)
    if (max) p.set('max', max)
    router.push('/?' + p.toString())
  }

  return (
    <div className="filters" role="region" aria-label="Product filters">
      <div>
        <label htmlFor="q">Search</label>
        <input id="q" value={query} onChange={e=>setQuery(e.target.value)} placeholder="mug, bowl..." />
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <select id="category" value={category} onChange={e=>setCategory(e.target.value)}>
          <option value="">All</option>
          <option>Home & Kitchen</option>
          <option>Home Decor</option>
          <option>Kitchenware</option>
        </select>
      </div>
      <div>
        <label htmlFor="max">Max price</label>
        <input id="max" type="number" min="0" step="1" value={max} onChange={e=>setMax(e.target.value)} />
      </div>
      <div style={{display:'flex', alignItems:'end'}}>
        <button className="btn" onClick={apply}>Apply</button>
      </div>
    </div>
  )
}
