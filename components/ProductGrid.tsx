'use client'

export const dynamic = "force-dynamic";
import ProductCard from './ProductCard'
import { Suspense } from 'react'
import ProductGridContent from './ProductGridContent'

export default function ProductGrid() {
  return (
    <Suspense fallback={<p>Loading products…</p>}>
      <ProductGridContent />
    </Suspense>
  )
}
