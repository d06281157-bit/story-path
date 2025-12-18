This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

StoryPath / Wanderly - Project Context Summary
Project Overview
Name: StoryPath (Internal) / Wanderly (Display) Goal: A travel discovery application focusing on immersive storytelling and "travel persona" quizzes to recommend itineraries, specifically for Taiwan and other Asian destinations. Current State: Early development. Core landing page and an immersive "Home" carousel are implemented.

Tech Stack
Framework: Next.js 16 (App Router)
Language: TypeScript
Styling: Tailwind CSS v4 (PostCSS), clsx, tailwind-merge
Icons: lucide-react
Fonts: Noto Serif TC (Google Fonts)
Package Manager: npm
Key Features & Files

1. Landing Page (
   app/page.tsx
   )
   Route: /
   Content: Hero section introducing "StoryPath 台灣旅行人格測驗" (Taiwan Travel Persona Quiz).
   CTA: "Start Quiz" button leading to /quiz.
   Design: Clean, distinct from the dark/immersive Home page. Uses Terracotta accent color.
2. Immersive Home (
   app/home/page.tsx
   )
   Route: /home
   Design: Full-screen, dark mode, immersive background images.
   Functionality:
   Vertical Interaction: Switch between major Destinations (Indonesia, Taiwan, Japan) using scroll wheel or drag. Includes debounced switching logic.
   Horizontal Interaction: Scroll through specific "Places" (Cards) within a destination.
   Visuals: Parallax background transitions, glassmorphism cards, animated text entry.
   Navigation: Custom custom dot navigation on the left.
3. Global Layout (
   app/layout.tsx
   )
   Font: configured Noto_Serif_TC.
   Structure: Navbar + main content area.
   Theme: Default light background (bg-[#FFF9F2]), though /home overrides this with fixed inset-0 bg-black.
   Project Structure
   story-path/
   ├── app/
   │ ├── home/
   │ │ └── page.tsx # Main immersive carousel logic
   │ ├── layout.tsx # Root layout with fonts & navbar
   │ ├── page.tsx # Landing page (Quiz CTA)
   │ └── globals.css # Global styles (Tailwind imports)
   ├── components/
   │ └── Navbar.tsx # Global navigation
   ├── public/ # Static assets
   └── package.json # Dependencies & scripts
   Recent Changes
   Refined /home card layout: separated text from images, moved text above cards, expanded right column to screen edge.
   Implemented "Foxico" design specs: dark background, horizontal scroll.
   Added scroll debounce and smooth transitions to
   home/page.tsx
   .
   Known Issues / Notes
   The /home page uses fixed inset-0 z-40 to takeover the screen, bypassing the standard layout's padding.
   Mock data is currently hardcoded in
   app/home/page.tsx
   .
   Images use Unsplash source URLs.


# 專案邏輯規則 (Project Logic Rules)

## 1. 旅遊規劃邏輯 (Itinerary Logic)
- **地理一致性 (Strict Geography):** - 單日行程必須鎖定在同一個 `City`。
  - 絕對禁止跨縣市行程（例如：上午台南、下午高雄、晚上台南）。
## 2. 時間邏輯 (Time Slots)
- **上午 (Morning) / 下午 (Afternoon):** 只能安排 `bestTime: 'day'` 或 `'any'` 的景點。
- **晚上 (Evening):** 只能安排 `bestTime: 'night'` (如夜市) 或 `'any'` 的景點。
- **夜市規則:** 只要景點名稱包含「夜市」，強制只能出現在「晚上」。

## 3. 資料庫結構 (Mock Data)
- 所有 Mock Data 必須包含 `city` 和 `bestTime` 欄位。
- 範例： `{ name: '花園夜市', city: '台南', bestTime: 'night' }`