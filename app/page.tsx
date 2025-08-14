import ProductGrid from "@/components/ProductGrid";
import Filters from "@/components/Filters";

export default function Home({
  searchParams,
}: {
  searchParams?: { q?: string; category?: string; max?: string };
}) {
  return (
    <section>
      <h1>Discover unique, handmade products</h1>
      <Filters />
      <ProductGrid searchParams={searchParams} />
    </section>
  );
}
