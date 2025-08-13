import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const session = await getServerSession(auth)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { productId, rating, comment } = body
  const review = await prisma.review.create({
    data: { productId, rating: Number(rating), comment, authorId: (session.user as any).id }
  })
  return NextResponse.json(review, { status: 201 })
}
