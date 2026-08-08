# 🖥️ لابتوباتي - موقع مراجعات اللاب توبات

موقع عربي متخصص في مراجعات ومواصفات وأسعار اللاب توبات، مبني بـ **Next.js 14 + TypeScript + Prisma + SQLite**.

## 🚀 تشغيل المشروع

### 1. تثبيت الحزم
```bash
npm install
```

### 2. إعداد قاعدة البيانات
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 3. تشغيل السيرفر
```bash
npm run dev
```

افتح المتصفح على: `http://localhost:3000`

## 📁 هيكل المشروع

```
├── prisma/
│   ├── schema.prisma      # تعريف قاعدة البيانات
│   └── seed.ts            # بيانات أولية (12 لاب توب)
├── src/
│   ├── app/
│   │   ├── page.tsx       # الصفحة الرئيسية
│   │   ├── layout.tsx     # التخطيط العام
│   │   ├── admin/         # ⚙️ لوحة الإدارة
│   │   ├── laptop/[id]/   # صفحة تفاصيل الجهاز
│   │   └── api/laptops/   # API Routes (CRUD)
│   ├── components/        # مكونات React
│   ├── lib/prisma.ts      # عميل Prisma
│   └── types/index.ts     # أنواع TypeScript
```

## ⚙️ لوحة الإدارة

افتح: `http://localhost:3000/admin`

من هنا تقدر:
- ➕ **إضافة** لاب توب جديد
- ✏️ **تعديل** بيانات جهاز موجود
- 🗑️ **حذف** جهاز

## 📝 إضافة لاب توب جديد (من لوحة الإدارة)

1. افتح `/admin`
2. اضغط "إضافة لاب توب"
3. املأ النموذج:
   - **الاسم**: مثلاً `ASUS TUF Gaming A16`
   - **الشركة**: `ASUS`
   - **الفئة**: اختر من القائمة (`gaming`, `ultrabook`, ...)
   - **السعر**: رقم بدون فواصل (مثلاً `34999`)
   - **التقييم**: من 0 لـ 10 (مثلاً `8.5`)
   - **روابط الصور**: ضع روابط مفصولة بفاصلة
4. اضغط "إضافة الجهاز"

## 🔌 API Endpoints

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/laptops` | قائمة كل الأجهزة |
| GET | `/api/laptops?category=gaming` | تصفية حسب الفئة |
| GET | `/api/laptops?search=macbook` | بحث |
| POST | `/api/laptops` | إضافة جهاز جديد |
| GET | `/api/laptops/1` | تفاصيل جهاز |
| PUT | `/api/laptops/1` | تعديل جهاز |
| DELETE | `/api/laptops/1` | حذف جهاز |

## 🛠️ التقنيات المستخدمة

- **Next.js 14** - App Router + API Routes
- **TypeScript** - أنواع آمنة
- **Tailwind CSS** - تصميم سريع
- **Prisma ORM** - التعامل مع قاعدة البيانات
- **SQLite** - قاعدة بيانات محلية (سهلة ومجانية)
- **Lucide React** - الأيقونات

## 📦 نشر الموقع (Vercel)

```bash
npm install -g vercel
vercel
```

أو ربط المشروع بـ GitHub و Vercel يشتغل تلقائي.

## 💡 ملاحظات

- قاعدة البيانات SQLite محلية — في الإنتاج استخدم PostgreSQL على Vercel/Neon
- الصور من روابط خارجية — في الإنتاج استخدم Cloudinary
- لوحة الإدارة بدون login — في الإنتاج أضف NextAuth.js
