import { getServerSession } from 'next-auth'
import { auth } from '@/lib/auth'
import NewProductFormClient from './product-form.client'

export default async function NewProductForm() {
  const session = await getServerSession(auth)
  return <NewProductFormClient canCreate={!!session && (session.user as any).role === 'SELLER'} />
}
