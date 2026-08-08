'use client'

import { useState, useEffect, useCallback } from 'react'
import { Laptop, Category } from '@/types'
import SearchBar from '@/components/SearchBar'
import CategoryFilter from '@/components/CategoryFilter'
import LaptopCard from '@/components/LaptopCard'
import CompareBar from '@/components/CompareBar'
import { Laptop as LaptopIcon, Search } from 'lucide-react'

export default function HomePage() {
  const [laptops, setLaptops] = useState<Laptop[]>([])
  const [category, setCategory] = useState<Category>('all')
  const [search, setSearch] = useState('')
  const [compareList, setCompareList] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  const fetchLaptops = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (category !== 'all') params.set('category', category)
    if (search) params.set('search', search)
    const res = await fetch(`/api/laptops?${params}`)
    const data = await res.json()
    setLaptops(data)
    setLoading(false)
  }, [category, search])

  useEffect(() => {
    fetchLaptops()
  }, [fetchLaptops])

  const toggleCompare = (id: number) => {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      if (prev.length >= 2) { alert('يمكنك مقارنة جهازين فقط'); return prev }
      return [...prev, id]
    })
  }

  const handleCompare = () => {
    if (compareList.length === 2) {
      window.location.href = `/laptop/${compareList[0]}?compare=${compareList[1]}`
    }
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-surface border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-5 flex-wrap">
          <a href="/" className="flex items-center gap-2.5 text-xl font-bold">
            <div className="w-9 h-9 bg-gradient-to-br from-accent to-blue-400 rounded-lg flex items-center justify-center">
              <LaptopIcon size={20} className="text-white" />
            </div>
            لابتوباتي
          </a>
          <SearchBar value={search} onChange={setSearch} />
          <a href="/admin" className="px-4 py-2 bg-surface-2 border border-border rounded-lg text-sm text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors">
            ⚙️ إدارة
          </a>
        </div>
      </header>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-6 py-5">
        <CategoryFilter active={category} onChange={setCategory} />
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6">
        <h2 className="text-xl font-bold mb-5 flex items-center gap-2.5">
          <LaptopIcon size={22} className="text-accent" />
          أحدث اللاب توبات
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-surface border border-border rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        ) : laptops.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-neutral-600">
            <Search size={64} className="mb-4 opacity-30" />
            <p className="text-lg">لا توجد نتائج مطابقة للبحث</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {laptops.map(laptop => (
              <LaptopCard
                key={laptop.id}
                laptop={laptop}
                isCompared={compareList.includes(laptop.id)}
                onCompare={toggleCompare}
              />
            ))}
          </div>
        )}
      </main>

      <CompareBar
        count={compareList.length}
        onClear={() => setCompareList([])}
        onCompare={handleCompare}
      />
    </div>
  )
}
