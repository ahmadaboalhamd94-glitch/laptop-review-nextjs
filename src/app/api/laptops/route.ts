import { NextResponse } from 'next/server'
import { laptopsData } from '@/lib/data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const search = searchParams.get('search')

  let laptops = [...laptopsData]

  if (category && category !== 'all') {
    laptops = laptops.filter(l => l.category === category)
  }

  if (search) {
    const s = search.toLowerCase()
    laptops = laptops.filter(l =>
      l.name.toLowerCase().includes(s) || l.brand.toLowerCase().includes(s)
    )
  }

  return NextResponse.json(laptops)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newId = Math.max(...laptopsData.map(l => l.id)) + 1
  const laptop = { ...body, id: newId }
  laptopsData.push(laptop)
  return NextResponse.json(laptop, { status: 201 })
}
