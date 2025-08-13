import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/ProductCard'

export default async function SellerPage({ params }: { params: { id: string }}) {
  const seller = await prisma.user.findUnique({ where: { id: params.id }, include: { products: { include: { reviews: true, seller: true } } } })
  if (!seller) return <p>Not found</p>
  return (
    <section>
      <h1>{seller.name}</h1>
      {seller.bio && <p>{seller.bio}</p>}
      <h2>Products by {seller.name}</h2>
      <div className="grid">
        {seller.products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  )
}
