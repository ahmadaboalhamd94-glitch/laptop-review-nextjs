'use client'

import { useState, useEffect } from 'react'
import { Laptop } from '@/types'
import { ArrowRight, Trash2, Edit, Plus, Save, X } from 'lucide-react'

const emptyForm = {
  name: '', brand: '', category: 'gaming', price: '', rating: '',
  cpu: '', ram: '', storage: '', gpu: '', screen: '',
  battery: '', weight: '', ports: '', os: '', images: ''
}

export default function AdminPage() {
  const [laptops, setLaptops] = useState<Laptop[]>([])
  const [form, setForm] = useState<any>({ ...emptyForm })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchLaptops()
  }, [])

  async function fetchLaptops() {
    const res = await fetch('/api/laptops')
    const data = await res.json()
    setLaptops(data)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const body = {
      ...form,
      price: parseInt(form.price),
      rating: parseFloat(form.rating),
    }

    if (editingId) {
      await fetch(`/api/laptops/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } else {
      await fetch('/api/laptops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    }

    setForm({ ...emptyForm })
    setEditingId(null)
    setShowForm(false)
    fetchLaptops()
  }

  async function handleDelete(id: number) {
    if (!confirm('هل أنت متأكد من الحذف؟')) return
    await fetch(`/api/laptops/${id}`, { method: 'DELETE' })
    fetchLaptops()
  }

  function startEdit(laptop: Laptop) {
    setForm({
      name: laptop.name, brand: laptop.brand, category: laptop.category,
      price: laptop.price.toString(), rating: laptop.rating.toString(),
      cpu: laptop.cpu, ram: laptop.ram, storage: laptop.storage,
      gpu: laptop.gpu, screen: laptop.screen, battery: laptop.battery,
      weight: laptop.weight, ports: laptop.ports, os: laptop.os,
      images: laptop.images
    })
    setEditingId(laptop.id)
    setShowForm(true)
    window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <a href="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface border border-border rounded-lg text-neutral-400 hover:text-white hover:bg-surface-2 transition-colors mb-6">
          <ArrowRight size={18} />
          رجوع للموقع
        </a>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">⚙️ لوحة الإدارة</h1>
          <button
            onClick={() => { setShowForm(!showForm); if (showForm) { setForm({ ...emptyForm }); setEditingId(null) } }}
            className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}
            {showForm ? 'إلغاء' : 'إضافة لاب توب'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold mb-4">{editingId ? 'تعديل لاب توب' : 'لاب توب جديد'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'name', label: 'الاسم', type: 'text' },
                { name: 'brand', label: 'الشركة', type: 'text' },
                { name: 'category', label: 'الفئة', type: 'select', options: ['gaming', 'ultrabook', 'workstation', 'student', 'creative'] },
                { name: 'price', label: 'السعر', type: 'number' },
                { name: 'rating', label: 'التقييم (0-10)', type: 'number', step: '0.1' },
                { name: 'cpu', label: 'المعالج', type: 'text' },
                { name: 'ram', label: 'الرام', type: 'text' },
                { name: 'storage', label: 'التخزين', type: 'text' },
                { name: 'gpu', label: 'كرت الشاشة', type: 'text' },
                { name: 'screen', label: 'الشاشة', type: 'text' },
                { name: 'battery', label: 'البطارية', type: 'text' },
                { name: 'weight', label: 'الوزن', type: 'text' },
                { name: 'ports', label: 'المداخل', type: 'text' },
                { name: 'os', label: 'نظام التشغيل', type: 'text' },
                { name: 'images', label: 'روابط الصور (مفصولة بفاصلة)', type: 'text' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm text-neutral-400 mb-1.5">{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      value={form[field.name]}
                      onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                      className="w-full px-4 py-2.5 bg-surface-2 border border-border rounded-lg text-white outline-none focus:border-accent"
                    >
                      {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      step={(field as any).step}
                      value={form[field.name]}
                      onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                      className="w-full px-4 py-2.5 bg-surface-2 border border-border rounded-lg text-white placeholder-neutral-600 outline-none focus:border-accent"
                      placeholder={field.label}
                      required
                    />
                  )}
                </div>
              ))}
            </div>
            <button type="submit" className="mt-5 flex items-center gap-2 px-6 py-3 bg-accent-2 text-white rounded-lg font-bold hover:bg-green-600 transition-colors">
              <Save size={18} />
              {editingId ? 'حفظ التعديلات' : 'إضافة الجهاز'}
            </button>
          </form>
        )}

        {/* List */}
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-2">
                <th className="text-right px-5 py-3 font-semibold">#</th>
                <th className="text-right px-5 py-3 font-semibold">الجهاز</th>
                <th className="text-right px-5 py-3 font-semibold">الشركة</th>
                <th className="text-right px-5 py-3 font-semibold">الفئة</th>
                <th className="text-right px-5 py-3 font-semibold">السعر</th>
                <th className="text-right px-5 py-3 font-semibold">التقييم</th>
                <th className="text-right px-5 py-3 font-semibold">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {laptops.map((l) => (
                <tr key={l.id} className="border-b border-border last:border-b-0 hover:bg-surface-2/50 transition-colors">
                  <td className="px-5 py-3 text-neutral-500">{l.id}</td>
                  <td className="px-5 py-3 font-medium">{l.name}</td>
                  <td className="px-5 py-3 text-neutral-400">{l.brand}</td>
                  <td className="px-5 py-3 text-neutral-400">{l.category}</td>
                  <td className="px-5 py-3 text-accent-2 font-semibold">{l.price.toLocaleString()} ج.م</td>
                  <td className="px-5 py-3">{l.rating}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(l)} className="p-2 text-amber-400 hover:bg-amber-400/10 rounded-lg transition-colors" title="تعديل">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(l.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="حذف">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {laptops.length === 0 && (
            <div className="text-center py-12 text-neutral-600">لا يوجد أجهزة مسجلة</div>
          )}
        </div>
      </div>
    </div>
  )
}
