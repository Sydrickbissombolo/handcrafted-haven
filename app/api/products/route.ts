import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const session = await getServerSession(auth)
  if (!session || (session.user as any).role !== 'SELLER') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { title, description, price, imageUrl, category } = body
  const product = await prisma.product.create({
    data: { title, description, price, imageUrl, category, sellerId: (session.user as any).id }
  })
  return NextResponse.json(product, { status: 201 })
}