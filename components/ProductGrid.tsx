import { prisma } from '@/lib/prisma'
import ProductCard from './ProductCard'
import { Suspense } from 'react'
import ProductGridContent from './ProductGridContent'

export default function ProductGrid() {
  return (
    <Suspense fallback={<p>Loading products…</p>}>
      {/* @ts-expect-error Async Server Component */}
      <ProductGridContent />
    </Suspense>
  )
}
