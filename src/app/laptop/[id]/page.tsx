'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Laptop, categoryLabels, categoryIcons } from '@/types'
import { ArrowRight, Star } from 'lucide-react'

export default function LaptopDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const compareId = searchParams.get('compare')
  const [laptop, setLaptop] = useState<Laptop | null>(null)
  const [compareLaptop, setCompareLaptop] = useState<Laptop | null>(null)
  const [activeImg, setActiveImg] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/laptops/${params.id}`)
      const data = await res.json()
      setLaptop(data)
      if (compareId) {
        const res2 = await fetch(`/api/laptops/${compareId}`)
        const data2 = await res2.json()
        setCompareLaptop(data2)
      }
      setLoading(false)
    }
    fetchData()
  }, [params.id, compareId])

  if (loading) return <div className="min-h-screen flex items-center justify-center text-neutral-500">جاري التحميل...</div>
  if (!laptop) return <div className="min-h-screen flex items-center justify-center text-neutral-500">الجهاز غير موجود</div>

  const imgs = laptop.images.split(',')
  const stars = Math.floor(laptop.rating / 2)

  const specs = [
    { label: 'المعالج', value: laptop.cpu },
    { label: 'الرام', value: laptop.ram },
    { label: 'التخزين', value: laptop.storage },
    { label: 'كرت الشاشة', value: laptop.gpu },
    { label: 'الشاشة', value: laptop.screen },
    { label: 'البطارية', value: laptop.battery },
    { label: 'الوزن', value: laptop.weight },
    { label: 'المداخل', value: laptop.ports },
    { label: 'نظام التشغيل', value: laptop.os },
  ]

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <a href="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface border border-border rounded-lg text-neutral-400 hover:text-white hover:bg-surface-2 transition-colors mb-6">
          <ArrowRight size={18} />
          رجوع للقائمة
        </a>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gallery */}
          <div>
            <div className="relative rounded-xl overflow-hidden bg-surface-2 h-80 lg:h-96">
              <img
                src={imgs[activeImg]}
                alt={laptop.name}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop' }}
              />
            </div>
            <div className="flex gap-2.5 mt-3 overflow-x-auto pb-2">
              {imgs.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                    activeImg === i ? 'border-accent' : 'border-transparent hover:border-neutral-600'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">{laptop.name}</h1>
            <p className="text-neutral-500 mb-5">
              {categoryIcons[laptop.category]} {laptop.brand} · {categoryLabels[laptop.category]}
            </p>
            <div className="text-3xl font-bold text-accent-2 mb-5">{laptop.price.toLocaleString()} ج.م</div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xl">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < stars ? 'text-amber-400' : 'text-neutral-700'}>★</span>
                ))}
              </span>
              <span className="text-xl font-bold">{laptop.rating}</span>
              <span className="text-neutral-500">/ 10</span>
              <div className="w-36 h-1.5 bg-surface-2 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: `${laptop.rating * 10}%` }} />
              </div>
            </div>
            <div className="border border-border rounded-xl overflow-hidden">
              {specs.map((spec, i) => (
                <div key={i} className="flex justify-between px-5 py-3.5 border-b border-border last:border-b-0">
                  <span className="text-neutral-500 text-sm">{spec.label}</span>
                  <span className="font-semibold text-sm">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Compare Section */}
        {compareLaptop && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
              <Star size={20} className="text-accent" />
              مقارنة مع {compareLaptop.name}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {[laptop, compareLaptop].map((l, idx) => (
                <div key={idx} className="bg-surface border border-border rounded-xl overflow-hidden">
                  <div className="h-48 bg-surface-2">
                    <img src={l.images.split(',')[0]} alt={l.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-1">{l.name}</h3>
                    <p className="text-neutral-500 text-sm mb-3">{l.brand}</p>
                    <div className="text-2xl font-bold text-accent-2 mb-4">{l.price.toLocaleString()} ج.م</div>
                    {specs.map((spec, i) => (
                      <div key={i} className="flex justify-between py-2 border-b border-border last:border-b-0 text-sm">
                        <span className="text-neutral-500">{spec.label}</span>
                        <span className="font-semibold">
                          {spec.label === 'السعر' ? l.price.toLocaleString() + ' ج.م' :
                           spec.label === 'التقييم' ? l.rating + '/10' :
                           (l as any)[['cpu','ram','storage','gpu','screen','battery','weight','ports','os'][i]]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
