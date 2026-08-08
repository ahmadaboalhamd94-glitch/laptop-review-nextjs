'use client'

interface Props {
  count: number
  onClear: () => void
  onCompare: () => void
}

export default function CompareBar({ count, onClear, onCompare }: Props) {
  if (count === 0) return null
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border px-6 py-4 flex items-center justify-between z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
      <span className="text-sm">
        تم اختيار <strong className="text-accent">{count}</strong> أجهزة للمقارنة
      </span>
      <div className="flex gap-2.5">
        <button onClick={onClear} className="px-5 py-2.5 rounded-lg border border-border text-neutral-400 text-sm font-semibold hover:bg-surface-2 hover:text-white transition-colors">
          إلغاء
        </button>
        <button onClick={onCompare} className="px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-blue-600 transition-colors">
          قارن الآن
        </button>
      </div>
    </div>
  )
}
