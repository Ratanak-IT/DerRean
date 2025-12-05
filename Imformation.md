# 🚀 PlovRean — Learning Platform for Programming Tutorials

> PlovRean is a learning platform for sharing programming tutorials and guides, helping users follow a roadmap to learn both frontend and backend development. Users can explore courses, track progress, and manage their learning journey efficiently.

---

## 📑 Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Authentication & Auth Flow](#authentication--auth-flow)
- [API Integration](#api-integration)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Author / Contact](#author--contact)

---

## 📘 About
PlovRean is a modern web platform built with **Next.js, TypeScript, Tailwind CSS, and Supabase**. It allows users to learn programming through structured tutorials and course roadmaps, with features like bookmarks, search, user profiles, dark mode, and an admin dashboard for managing courses.

---

## ✨ Features
- **User Authentication:** Signup / Login using Supabase Auth  
- **Programming Roadmap:** Frontend & Backend learning paths  
- **Course/Tutorial Roadmap:** Explore courses step by step  
- **Search Tutorials:** Search by course title, instructor name, or categories  
- **Bookmark / Favorites:** Save tutorials for later  
- **Profile Management:** Update profile image, cover image, and name  
- **Admin Dashboard:**  
  - Login: `username: admin`, `password: admin1234`  
  - Add / Update / Delete courses  
  - See all courses  
- **Dark Mode** support  
- **API-Powered Content:** Data fetched and managed via Supabase  
- **Profile Page:** View and edit account info  
- **Category Filtering:** Filter courses by categories  
- **Contact Page:** Send text messages to developer email  
- **Map Integration:** Display developer/location map  
- **Responsive:** User Friendly on device

---

## 🛠 Tech Stack
- **Frontend:** Next.js + TypeScript + Tailwind CSS  
- **Backend / Database:** Supabase (Auth, Database, Storage)  
- **Deployment:** Vercel + Supabase  
- **Other Tools:** API integration, dark mode, react-hot-toast notifications  

---

## 📦 Requirements
- Node.js 18+  
- npm or yarn  
- Git  
- Vercel account (for deployment)  
- Supabase project for database & authentication  

---

## 🔧 Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/Ratanak-IT/PlovRean
cd PlovRean
2. **Install dependencies**
```bash
npm install
npm run build
3. **Create .env.local file**
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
4. **Run development server**
```bash
npm run dev 
#or 
yarn dev
5. **Open in browser**
http://localhost:3000

