import ProductGrid from '@/components/ProductGrid'
import Filters from '@/components/Filters'

export default function Home() {
  return (
    <section>
      <h1>Discover unique, handmade products</h1>
      <Filters />
      <ProductGrid />
    </section>
  )
}
