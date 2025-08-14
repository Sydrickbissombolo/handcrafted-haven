export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import ProductCard from "./ProductCard";

interface SearchParams {
  q?: string;
  category?: string;
  max?: string;
}

export default async function ProductGridContent({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const where: any = {};

  // Apply filters from query params
  if (searchParams?.q) {
    where.name = { contains: searchParams.q, mode: "insensitive" };
  }
  if (searchParams?.category) {
    where.category = searchParams.category;
  }
  if (searchParams?.max) {
    const maxPrice = parseFloat(searchParams.max);
    if (!isNaN(maxPrice)) {
      where.price = { lte: maxPrice };
    }
  }

  const products = await prisma.product.findMany({
  where,
  include: { reviews: true, seller: true },
  orderBy: { createdAt: 'desc' },
})

  if (!products.length) {
    return <p>No products match your filters.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
