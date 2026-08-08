'use client'

import { Category, categoryLabels, categoryIcons } from '@/types'

interface Props {
  active: Category
  onChange: (cat: Category) => void
}

const categories: Category[] = ['all', 'gaming', 'ultrabook', 'workstation', 'student', 'creative']

export default function CategoryFilter({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
            active === cat
              ? 'bg-accent text-white border-accent'
              : 'bg-surface text-neutral-400 border-border hover:bg-surface-2 hover:text-white'
          }`}
        >
          {cat === 'all' ? 'الكل' : `${categoryIcons[cat]} ${categoryLabels[cat]}`}
        </button>
      ))}
    </div>
  )
}
