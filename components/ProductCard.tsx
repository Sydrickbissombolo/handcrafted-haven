import Link from 'next/link'
import Image from 'next/image'
import Stars from './Stars'

export default function ProductCard({ product }: { product: any }) {
  const avg = product.reviews.length ? product.reviews.reduce((a: number, r: any) => a + r.rating, 0) / product.reviews.length : 0
  return (
    <article className="card" role="listitem" aria-labelledby={`prod-${product.id}-title`}>
      <Image src={product.imageUrl} alt={product.title} width={800} height={600} style={{objectFit:'cover'}} />
      <div className="card-body">
        <h2 id={`prod-${product.id}-title`}><Link href={`/product/${product.id}`}>{product.title}</Link></h2>
        <p className="price">${Number(product.price).toFixed(2)}</p>
        <p aria-label={`Average rating ${avg.toFixed(1)} out of 5`}><Stars value={avg} /> ({product.reviews.length})</p>
        <p>by <Link href={`/seller/${product.sellerId}`}>{product.seller.name}</Link></p>
        <Link className="btn" href={`/product/${product.id}`}>View</Link>
      </div>
    </article>
  )
}
