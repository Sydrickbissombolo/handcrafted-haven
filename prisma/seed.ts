import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient().$extends(withAccelerate())


async function main() {
  const salt = await bcrypt.genSalt(10)

  const sellerPwd = await bcrypt.hash('seller123', salt)
  const buyerPwd = await bcrypt.hash('buyer123', salt)

  const seller = await prisma.user.upsert({
    where: { email: 'seller@haven.test' },
    update: {},
    create: {
      name: 'Ava Artisan',
      email: 'seller@haven.test',
      password: sellerPwd,
      role: 'SELLER',
      bio: 'Woodwork and hand-carved home décor.'
    }
  })

  const buyer = await prisma.user.upsert({
    where: { email: 'buyer@haven.test' },
    update: {},
    create: {
      name: 'Ben Buyer',
      email: 'buyer@haven.test',
      password: buyerPwd,
      role: 'BUYER'
    }
  })

  const products = await prisma.product.createMany({
    data: [
      {
        title: 'Hand-Carved Wooden Dolls',
        description: 'Great for kids and collectors alike.',
        price: 45.00,
        imageUrl: 'https://unsplash.com/fr/photos/un-groupe-de-poupees-assises-sur-des-chaises-_taJQu2igaw',
        category: 'Home & Kitchen',
        sellerId: seller.id
      },
      {
        title: 'Macramé Wall Hanging',
        description: '100% cotton, boho inspired.',
        price: 60.00,
        imageUrl: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200',
        category: 'Home Decor',
        sellerId: seller.id
      },
      {
        title: 'Hand-thrown Ceramic Mug',
        description: 'Stoneware, microwave safe.',
        price: 24.00,
        imageUrl: 'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?q=80&w=1200',
        category: 'Kitchenware',
        sellerId: seller.id
      }
    ]
  })

  const created = await prisma.product.findMany()

  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Beautiful craftsmanship and fast shipping!',
      productId: created[0].id,
      authorId: buyer.id
    }
  })

  await prisma.review.create({
    data: {
      rating: 4,
      comment: 'Looks great on my wall.',
      productId: created[1].id,
      authorId: buyer.id
    }
  })

  console.log('Seed complete:', { users: [seller.email, buyer.email], products: created.length })
}

main().catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
