export interface Laptop {
  id: number
  name: string
  brand: string
  category: string
  price: number
  rating: number
  cpu: string
  ram: string
  storage: string
  gpu: string
  screen: string
  battery: string
  weight: string
  ports: string
  os: string
  images: string
  createdAt: Date
  updatedAt: Date
}

export type Category = 'all' | 'gaming' | 'ultrabook' | 'workstation' | 'student' | 'creative'

export const categoryLabels: Record<string, string> = {
  gaming: 'ألعاب',
  ultrabook: 'ألترابوك',
  workstation: 'محطة عمل',
  student: 'طلاب',
  creative: 'إبداعي',
}

export const categoryIcons: Record<string, string> = {
  gaming: '🎮',
  ultrabook: '💻',
  workstation: '⚙️',
  student: '🎓',
  creative: '🎨',
}
