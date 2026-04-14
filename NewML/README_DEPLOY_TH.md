# Deploy MicroBactElite (Production Guide)

คู่มือนี้ทำให้เว็บในโฟลเดอร์นี้เปิดใช้กับคนอื่นผ่านลิงก์ได้จริง และปลอดภัยขึ้นสำหรับ Firebase.

## 1) เตรียมไฟล์ก่อนปล่อย

- Entry page ใช้ `index.html` (redirect ไป `MicroBactElite.html` แล้ว)
- ไฟล์หลักแอป: `MicroBactElite.html`
- รูปประกอบ: `IMG_*.jpg`, `Unknown*.jpeg`

## 2) Deploy แบบเร็ว (แนะนำเริ่มจาก Netlify)

### Netlify Drop

1. ไปที่ https://app.netlify.com/drop
2. ลากโฟลเดอร์ `NewML` เข้าไป
3. ได้ URL สำหรับแชร์ทันที
4. ถ้าต้องการ Firebase จริง ให้ทำข้อ 4 ต่อ (ห้ามข้าม)

### Netlify (ผ่าน GitHub, แนะนำสำหรับใช้งานจริง)

1. push โค้ดโฟลเดอร์นี้ขึ้น GitHub
2. Netlify -> Add new site -> Import an existing project
3. เลือก repo นี้
4. ตั้งค่า:
   - Build command: (เว้นว่าง)
   - Publish directory: `.`
5. Deploy
6. (แนะนำ) Site settings -> Domain management -> เปลี่ยนชื่อ subdomain ให้อ่านง่าย

### Vercel

1. push โค้ดไป GitHub repo
2. Import โปรเจกต์ใน Vercel
3. Framework preset: `Other`
4. Deploy ได้ทันที (static site)

### Cloudflare Pages

1. push โค้ดไป GitHub
2. Create Pages Project
3. Build command: เว้นว่าง
4. Output directory: `.`

## 3) GitHub Pages (ทางเลือก)

1. สร้าง repo แล้ว push โฟลเดอร์นี้
2. Settings -> Pages
3. Source = Deploy from a branch
4. เลือก branch `main` และ folder `/ (root)`

## 4) Firebase สำหรับ multi-user (สำคัญ)

ไฟล์ที่เตรียมไว้:

- `firestore.rules`
- `firebase.json`

### สิ่งที่ต้องทำใน Firebase Console

1. สร้าง Firebase project ของคุณเอง
2. เปิดบริการ:
   - Authentication (Email/Password + Google)
   - Firestore
3. สร้างไฟล์ `firebase-config.js` โดย copy จาก `firebase-config.example.js`
4. ใส่ค่า Firebase project จริงลงใน `firebase-config.js`
5. นำค่าเดิมใน `MicroBactElite.html` ออกแล้ว (โค้ดปัจจุบันอ่านจาก `window.MICROBACT_FIREBASE_CONFIG` ก่อนเสมอ)
6. Deploy rules:
   - ติดตั้ง CLI: `npm i -g firebase-tools`
   - login: `firebase login`
   - ผูกโปรเจกต์: `firebase use --add`
   - deploy rules: `firebase deploy --only firestore:rules`

## 5) Security checklist ก่อนแชร์ลิงก์

- [ ] Firestore rules ต้องไม่เป็น allow read,write: if true
- [ ] Authentication ต้องเปิดเฉพาะ provider ที่ใช้จริง
- [ ] ทดสอบ user A ไม่เห็นข้อมูล user B
- [ ] ทดสอบ Guest mode ยังทำงานได้ (localStorage)
- [ ] เปิดเว็บจากมือถือ/desktop แล้วใช้งาน flow ครบ
- [ ] ใน Netlify ตั้งค่า header `X-Frame-Options`/`X-Content-Type-Options` เพิ่ม (ถ้าต้องการ hardening)

## 6) อัปเดตเวอร์ชันในอนาคต

1. แก้โค้ด
2. ทดสอบ local (`python3 -m http.server 5500`)
3. push ขึ้น GitHub
4. ระบบ deploy จะอัปเดตลิงก์อัตโนมัติ (Vercel/Netlify/Pages)

## 7) ข้อควรระวังสำคัญ

- อย่า commit `firebase-config.js` ที่เป็นของจริงลง public repo
- ให้เก็บ `firebase-config.example.js` ไว้เป็น template เท่านั้น
