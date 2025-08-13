import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import ReviewForm from './review-form'
import Stars from '@/components/Stars'

export default async function ProductPage({ params }: { params: { id: string }}) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { seller: true, reviews: { include: { author: true }, orderBy: { createdAt: 'desc' } } }
  })
  if (!product) return <p>Not found</p>
  const avg = product.reviews.length ? product.reviews.reduce((a, r) => a + r.rating, 0) / product.reviews.length : 0

  return (
    <section aria-labelledby="product-title">
      <h1 id="product-title">{product.title}</h1>
      <div className="card">
        <Image src={product.imageUrl} alt={product.title} width={1200} height={800} />
        <div className="card-body">
          <p className="price">${Number(product.price).toFixed(2)}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Seller:</strong> {product.seller.name}</p>
          <p aria-label={`Average rating ${avg.toFixed(1)} out of 5`}><Stars value={avg} /> ({product.reviews.length})</p>
          <p>{product.description}</p>
        </div>
      </div>

      <h2>Reviews</h2>
      <ul>
        {product.reviews.map(r => (
          <li key={r.id}>
            <p><strong>{r.author.name}</strong> – <Stars value={r.rating} /></p>
            <p>{r.comment}</p>
          </li>
        ))}
      </ul>

      {/* @ts-expect-error Async Server Component */}
      <ReviewForm productId={product.id} />
    </section>
  )
}
