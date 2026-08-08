'use client'

import { Laptop, categoryLabels, categoryIcons } from '@/types'
import { Check } from 'lucide-react'

interface Props {
  laptop: Laptop
  isCompared: boolean
  onCompare: (id: number) => void
}

export default function LaptopCard({ laptop, isCompared, onCompare }: Props) {
  const imgs = laptop.images.split(',')
  const stars = Math.floor(laptop.rating / 2)

  return (
    <div
      className="group relative bg-surface border border-border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-neutral-700"
      onClick={() => window.location.href = `/laptop/${laptop.id}`}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onCompare(laptop.id) }}
        className={`absolute top-3 left-3 z-10 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
          isCompared
            ? 'bg-accent text-white opacity-100'
            : 'bg-black/50 text-white opacity-0 group-hover:opacity-100 backdrop-blur-sm'
        }`}
        title="أضف للمقارنة"
      >
        <Check size={16} />
      </button>
      {imgs.length > 1 && (
        <div className="absolute top-3 right-3 z-10 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
          {imgs.length} صور
        </div>
      )}
      <div className="relative h-52 overflow-hidden bg-surface-2">
        <img
          src={imgs[0]}
          alt={laptop.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop' }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-base mb-1 leading-snug">{laptop.name}</h3>
        <p className="text-sm text-neutral-500 mb-3">
          {categoryIcons[laptop.category]} {laptop.brand} · {categoryLabels[laptop.category]}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-xs px-2 py-0.5 bg-surface-2 rounded-md text-neutral-400 border border-border">
            {laptop.cpu.split(' ').slice(0, 3).join(' ')}
          </span>
          <span className="text-xs px-2 py-0.5 bg-surface-2 rounded-md text-neutral-400 border border-border">{laptop.ram}</span>
          <span className="text-xs px-2 py-0.5 bg-surface-2 rounded-md text-neutral-400 border border-border">{laptop.screen.split(' ')[0]}</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-lg font-bold text-accent-2">{laptop.price.toLocaleString()} ج.م</span>
          <span className="text-sm text-neutral-400 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < stars ? 'text-amber-400' : 'text-neutral-700'}>★</span>
            ))}
            {laptop.rating}
          </span>
        </div>
      </div>
    </div>
  )
}
