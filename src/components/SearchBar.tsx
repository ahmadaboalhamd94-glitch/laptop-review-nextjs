'use client'

import { Search } from 'lucide-react'

interface Props {
  value: string
  onChange: (val: string) => void
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative flex-1 max-w-xl">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ابحث عن لاب توب..."
        className="w-full py-3 pr-12 pl-4 bg-surface-2 border border-border rounded-lg text-white placeholder-neutral-600 outline-none focus:border-accent transition-colors"
      />
      <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
    </div>
  )
}
