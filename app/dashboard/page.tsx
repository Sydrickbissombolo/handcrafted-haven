import { getServerSession } from 'next-auth/next'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import NewProductForm from './product-form'

export default async function Dashboard() {
  const session = await getServerSession(auth)
  if (!session || (session.user as any)?.role !== 'SELLER') {
    return <p>Access denied. Seller sign-in required.</p>
  }
  const products = await prisma.product.findMany({ where: { sellerId: (session.user as any).id }, orderBy: { createdAt: 'desc' } })
  return (
    <section>
      <h1>Seller Dashboard</h1>
      <h2>Your Products</h2>
      <ul>
        {products.map(p => <li key={p.id}><Link href={`/product/${p.id}`}>{p.title}</Link> – ${Number(p.price).toFixed(2)}</li>)}
      </ul>
      <NewProductForm />
    </section>
  )
}
