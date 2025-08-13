import { getServerSession } from 'next-auth'
import { auth } from '@/lib/auth'
import ReviewFormClient from './review-form.client'

export default async function ReviewForm({ productId }: { productId: string }) {
  const session = await getServerSession(auth)
  return <ReviewFormClient productId={productId} isSignedIn={!!session} />
}
