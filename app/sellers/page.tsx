import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function SellersList() {
  const sellers = await prisma.user.findMany({ where: { role: 'SELLER' }, orderBy: { name: 'asc' } })
  return (
    <section>
      <h1>Our Artisans</h1>
      <ul>
        {sellers.map(s => (
          <li key={s.id}><Link href={`/seller/${s.id}`}>{s.name}</Link></li>
        ))}
      </ul>
    </section>
  )
}
