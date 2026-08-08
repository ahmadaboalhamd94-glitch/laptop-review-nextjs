import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const laptops = [
  {
    name: 'MacBook Pro 16" M4 Pro',
    brand: 'Apple', category: 'creative', price: 74999, rating: 9.6,
    cpu: 'Apple M4 Pro (14-core)', ram: '36 GB', storage: '512 GB SSD',
    gpu: 'Apple M4 Pro 20-core', screen: '16.2" Liquid Retina XDR',
    battery: '22 ساعة', weight: '2.14 كجم',
    ports: '3x Thunderbolt 4, HDMI, SD', os: 'macOS Sequoia',
    images: 'https://kimi-web-img.kimi.ai/img/i.pcmag.com/57d88ada6688ba5d0f8f1b083b52a012270c76cb.jpg,https://kimi-web-img.kimi.ai/img/cdn.mos.cms.futurecdn.net/62cf043be08661d0ed396e916479d13588129f9b.jpg'
  },
  {
    name: 'Dell XPS 15 (2026)',
    brand: 'Dell', category: 'ultrabook', price: 52999, rating: 8.9,
    cpu: 'Intel Core Ultra 9 285H', ram: '32 GB', storage: '1 TB SSD',
    gpu: 'NVIDIA RTX 4060', screen: '15.6" OLED 3.5K',
    battery: '13 ساعة', weight: '1.86 كجم',
    ports: '2x Thunderbolt 4, USB-A', os: 'Windows 11',
    images: 'https://kimi-web-img.kimi.ai/img/i.dell.com/4789ca80849185b2dbf10e1723e32932e5362d22.psd,https://kimi-web-img.kimi.ai/img/i.dell.com/cacb373c8994a9d4292974855573c15b872a7b1c.psd'
  },
  {
    name: 'Lenovo ThinkPad X1 Carbon Gen 13',
    brand: 'Lenovo', category: 'ultrabook', price: 48999, rating: 9.1,
    cpu: 'Intel Core Ultra 7 265U', ram: '32 GB', storage: '1 TB SSD',
    gpu: 'Intel Arc Graphics', screen: '14" 2.8K OLED',
    battery: '15 ساعة', weight: '0.98 كجم',
    ports: '2x Thunderbolt 4, 2x USB-A, HDMI', os: 'Windows 11 Pro',
    images: 'https://kimi-web-img.kimi.ai/img/p4-ofp.static.pub/869f424a7cabc4737831a07c85c5b8c386d6f770.png,https://kimi-web-img.kimi.ai/img/p4-ofp.static.pub/54b64c37be05912f6d8c1c253b7cae014a57450f.png'
  },
  {
    name: 'ASUS ROG Zephyrus G14 (2026)',
    brand: 'ASUS', category: 'gaming', price: 45999, rating: 9.0,
    cpu: 'AMD Ryzen AI 9 HX 370', ram: '32 GB', storage: '1 TB SSD',
    gpu: 'NVIDIA RTX 4070', screen: '14" OLED 120Hz',
    battery: '10 ساعات', weight: '1.5 كجم',
    ports: 'USB4, USB-A, HDMI 2.1', os: 'Windows 11',
    images: 'https://kimi-web-img.kimi.ai/img/dlcdnwebimgs.asus.com.cn/b7b18a2f402d0b7c79109d863cd27506a0148e4a,https://dlcdnwebimgs.asus.com/gain/6e8939f7-6e2e-4e1e-8b1e-3c5d7e9f8a2a/w800/h600'
  },
  {
    name: 'HP Spectre x360 16',
    brand: 'HP', category: 'creative', price: 54999, rating: 8.7,
    cpu: 'Intel Core Ultra 7 155H', ram: '32 GB', storage: '1 TB SSD',
    gpu: 'Intel Arc Graphics', screen: '16" 4K OLED convertible',
    battery: '12 ساعة', weight: '1.95 كجم',
    ports: '2x Thunderbolt 4, USB-A', os: 'Windows 11',
    images: 'https://kimi-web-img.kimi.ai/img/www.hp.com/5efa604a572d3d192103fb0e9e45358273b92846.png,https://kimi-web-img.kimi.ai/img/hp.widen.net/0f021eda2e17b6ee9639d474fd680325631ea32b.png'
  },
  {
    name: 'MSI Raider GE78 HX',
    brand: 'MSI', category: 'gaming', price: 82999, rating: 8.8,
    cpu: 'Intel Core i9-14900HX', ram: '64 GB', storage: '2 TB SSD',
    gpu: 'NVIDIA RTX 4090', screen: '17" QHD+ 240Hz',
    battery: '5 ساعات', weight: '3.0 كجم',
    ports: 'Thunderbolt 4, USB-A, HDMI 2.1', os: 'Windows 11',
    images: 'https://kimi-web-img.kimi.ai/img/storage-asset.msi.com/00b6a6ffabb8b891af5412faf41dfc9f5c9f7ce8.png,https://kimi-web-img.kimi.ai/img/storage-asset.msi.com/bf93aaec7cd0462619f77247ad72f67067a21b8f.png'
  },
  {
    name: 'Acer Swift 5 (2026)',
    brand: 'Acer', category: 'student', price: 24999, rating: 8.2,
    cpu: 'Intel Core Ultra 5 125U', ram: '16 GB', storage: '512 GB SSD',
    gpu: 'Intel Graphics', screen: '14" FHD IPS',
    battery: '14 ساعة', weight: '1.05 كجم',
    ports: '2x USB-C, 2x USB-A, HDMI', os: 'Windows 11',
    images: 'https://kimi-web-img.kimi.ai/img/i.pcmag.com/6f2086d3aa89b7d6ce4ce0e3a1bbec936caabd5b.jpg,https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop'
  },
  {
    name: 'Microsoft Surface Laptop 7',
    brand: 'Microsoft', category: 'student', price: 44999, rating: 8.5,
    cpu: 'Qualcomm Snapdragon X Elite', ram: '16 GB', storage: '512 GB SSD',
    gpu: 'Qualcomm Adreno', screen: '13.8" PixelSense touchscreen',
    battery: '20 ساعة', weight: '1.2 كجم',
    ports: '2x USB-C, USB-A', os: 'Windows 11 ARM',
    images: 'https://kimi-web-img.kimi.ai/img/cdn-dynmedia-1.microsoft.com/dd6c0dfd482191b42dc47b8593934d5367828820,https://kimi-web-img.kimi.ai/img/cdn.microsoftstore.com.cn/76fe35b6302a3167eeaad21bdd7ecc7b567c42e7.jpg'
  },
  {
    name: 'Lenovo Legion Pro 7i',
    brand: 'Lenovo', category: 'gaming', price: 64999, rating: 9.2,
    cpu: 'Intel Core i9-14900HX', ram: '32 GB', storage: '1 TB SSD',
    gpu: 'NVIDIA RTX 4080', screen: '16" WQXGA 240Hz',
    battery: '6 ساعات', weight: '2.8 كجم',
    ports: 'USB-C, USB-A, HDMI 2.1', os: 'Windows 11',
    images: 'https://kimi-web-img.kimi.ai/img/p1-ofp.static.pub/4c071e6b86845412206299ee50f8739e005cb9c7.png,https://kimi-web-img.kimi.ai/img/p3-ofp.static.pub/be6d6de14093321035b4a1ac60428db4ac39c799.png'
  },
  {
    name: 'Dell Precision 5690',
    brand: 'Dell', category: 'workstation', price: 89999, rating: 8.6,
    cpu: 'Intel Core Ultra 9 185H', ram: '64 GB', storage: '2 TB SSD',
    gpu: 'NVIDIA RTX 2000 Ada', screen: '16" FHD+',
    battery: '10 ساعات', weight: '1.9 كجم',
    ports: 'Thunderbolt 4, USB-A, HDMI', os: 'Windows 11 Pro',
    images: 'https://kimi-web-img.kimi.ai/img/i.dell.com/426c4ef6f1d41cb4d82952308e8ff807ddd0661a.psd,https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop'
  },
  {
    name: 'ASUS Zenbook S 14',
    brand: 'ASUS', category: 'ultrabook', price: 38999, rating: 8.8,
    cpu: 'Intel Core Ultra 7 258V', ram: '32 GB', storage: '1 TB SSD',
    gpu: 'Intel Arc Graphics', screen: '14" 3K OLED',
    battery: '18 ساعة', weight: '1.2 كجم',
    ports: '2x Thunderbolt 4, HDMI', os: 'Windows 11',
    images: 'https://kimi-web-img.kimi.ai/img/dlcdnwebimgs.asus.com/25e0ef87babfbb5c7786b3eb9f8ec757fae1a47d.jpg,https://kimi-web-img.kimi.ai/img/dlcdnwebimgs.asus.com.cn/776ca3695ca39c2357f3b69e2105f309517fcd6b'
  },
  {
    name: 'HP ZBook Power G11',
    brand: 'HP', category: 'workstation', price: 55999, rating: 8.4,
    cpu: 'AMD Ryzen 9 PRO 8945HS', ram: '32 GB', storage: '1 TB SSD',
    gpu: 'NVIDIA RTX 3000 Ada', screen: '16" FHD+',
    battery: '11 ساعة', weight: '2.1 كجم',
    ports: 'USB-C, USB-A, HDMI', os: 'Windows 11 Pro',
    images: 'https://kimi-web-img.kimi.ai/img/hp.widen.net/6ecc71e72ac90261820f12f053a1fdabf60940fa.png,https://kimi-web-img.kimi.ai/img/th-media.apjonlinecdn.com/8061207adcafcb6caad3780654783b8669855c01.png'
  }
]

async function main() {
  await prisma.laptop.deleteMany()
  for (const laptop of laptops) {
    await prisma.laptop.create({ data: laptop })
  }
  console.log('✅ Seeded', laptops.length, 'laptops')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
