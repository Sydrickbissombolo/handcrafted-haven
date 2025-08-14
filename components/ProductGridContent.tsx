'use client'

export const dynamic = "force-dynamic";
import { prisma } from '@/lib/prisma'
import ProductCard from './ProductCard'
import { headers } from 'next/headers'

export default async function ProductGridContent() {
  const h = headers()
  const url = new URL(h.get('x-url') ?? 'http://localhost:3000/')
  const q = url.searchParams.get('q') ?? undefined
  const category = url.searchParams.get('category') ?? undefined
  const max = url.searchParams.get('max') ? Number(url.searchParams.get('max')) : undefined

  
  const products = await prisma.product.findMany({
    where: {
      AND: [
        q ? { OR: [{ title: { contains: q, mode: 'insensitive' }}, { description: { contains: q, mode: 'insensitive' }}] } : {},
        category ? { category } : {},
        max ? { price: { lte: max } } : {}
      ]
    },
    include: { reviews: true, seller: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="grid" role="list" aria-label="Products">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}
