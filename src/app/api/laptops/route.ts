import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const search = searchParams.get('search')

  const where: any = {}
  if (category && category !== 'all') where.category = category
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { brand: { contains: search, mode: 'insensitive' } },
    ]
  }

  const laptops = await prisma.laptop.findMany({ where, orderBy: { createdAt: 'desc' } })
  return NextResponse.json(laptops)
}

export async function POST(request: Request) {
  const body = await request.json()
  const laptop = await prisma.laptop.create({ data: body })
  return NextResponse.json(laptop, { status: 201 })
}
