import { NextResponse } from 'next/server'
import { laptopsData } from '@/lib/data'

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const laptop = laptopsData.find(l => l.id === parseInt(params.id))
  if (!laptop) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(laptop)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const index = laptopsData.findIndex(l => l.id === parseInt(params.id))
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  laptopsData[index] = { ...laptopsData[index], ...body }
  return NextResponse.json(laptopsData[index])
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const index = laptopsData.findIndex(l => l.id === parseInt(params.id))
  if (index > -1) laptopsData.splice(index, 1)
  return NextResponse.json({ success: true })
}
