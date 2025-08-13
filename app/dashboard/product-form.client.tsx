'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewProductFormClient({ canCreate }: { canCreate: boolean }) {
  const router = useRouter()
  const [form, setForm] = useState({ title: '', description: '', price: '', imageUrl: '', category: '' })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: Number(form.price) })
    })
    if (res.ok) router.refresh()
    else alert('You must be a signed-in seller to create products.')
  }

  if (!canCreate) return null

  return (
    <section aria-labelledby="add-product">
      <h2 id="add-product">Add a new product</h2>
      <form onSubmit={submit}>
        <label htmlFor="title">Title</label>
        <input id="title" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} required />
        <label htmlFor="description">Description</label>
        <textarea id="description" value={form.description} onChange={e=>setForm({...form, description: e.target.value})} required />
        <label htmlFor="price">Price</label>
        <input id="price" type="number" min="0" step="0.01" value={form.price} onChange={e=>setForm({...form, price: e.target.value})} required />
        <label htmlFor="imageUrl">Image URL</label>
        <input id="imageUrl" type="url" value={form.imageUrl} onChange={e=>setForm({...form, imageUrl: e.target.value})} required />
        <label htmlFor="category">Category</label>
        <input id="category" value={form.category} onChange={e=>setForm({...form, category: e.target.value})} required />
        <button className="btn" type="submit">Create</button>
      </form>
    </section>
  )
}
