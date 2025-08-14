// app/components/ProductGrid.tsx
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import ProductGridContent from "./ProductGridContent";

export default function ProductGrid({
  searchParams,
}: {
  searchParams?: { q?: string; category?: string; max?: string };
}) {
  return (
    <Suspense fallback={<p>Loading products…</p>}>
      <ProductGridContent searchParams={searchParams} />
    </Suspense>
  );
}