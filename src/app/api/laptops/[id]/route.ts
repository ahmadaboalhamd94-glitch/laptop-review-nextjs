import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const laptop = await prisma.laptop.findUnique({ where: { id: parseInt(params.id) } })
  if (!laptop) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(laptop)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const laptop = await prisma.laptop.update({
    where: { id: parseInt(params.id) },
    data: body,
  })
  return NextResponse.json(laptop)
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  await prisma.laptop.delete({ where: { id: parseInt(params.id) } })
  return NextResponse.json({ success: true })
}
