'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ReviewFormClient({ productId, isSignedIn }: { productId: string, isSignedIn: boolean }) {
  const router = useRouter()
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, rating, comment })
    })
    if (res.ok) {
      setComment(''); setRating(5); router.refresh()
    } else {
      alert('Please sign in to review.')
    }
  }

  return (
    <section aria-labelledby="leave-review">
      <h2 id="leave-review">Leave a review</h2>
      {isSignedIn ? (
        <form onSubmit={submit}>
          <label htmlFor="rating">Rating</label>
          <select id="rating" value={rating} onChange={e=>setRating(Number(e.target.value))}>
            {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <label htmlFor="comment">Comment</label>
          <textarea id="comment" value={comment} onChange={e=>setComment(e.target.value)} required />
          <button className="btn" type="submit">Submit review</button>
        </form>
      ) : <p>You must sign in to leave a review.</p>}
    </section>
  )
}
