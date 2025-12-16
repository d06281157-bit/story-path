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


Project Context: Story-Path (Travel Personality & Exploration App)
1. Project Overview
Name: story-path Description: A Next.js application designed to help users discover Taiwan travel destinations based on their personality (Travel DNA) or through direct exploration with filters. Key Features:

Interactive Home Page: Full-screen slider showcasing 4 major cities (Taipei, Taichung, Kaohsiung, Taitung) with sub-attractions.
Travel Quiz: A personality test to determine travel style (OldStreet, Nature, Culture, Lifestyle).
Result Analysis: Radar chart visualization of travel traits and personalized route recommendations.
Explore Page: Discovery hub with filters for Region, Category, and Duration.
Favorites (My List): functionality to save destinations (using localStorage).
2. Tech Stack
Framework: Next.js 16 (App Router)
Language: TypeScript
Styling: Tailwind CSS 4, Lucide React (Icons)
Visualization: Recharts (Radar Chart in Results)
State Management: React Hooks (useState, useEffect, useContext implied), localStorage for favorites.
Assets: loremflickr for placeholder images (previously Unsplash).
3. Directory Structure
root
├── app/
│   ├── home/       # Home page with specific Slider logic
│   ├── explore/    # Destination discovery with filters
│   ├── quiz/       # Personality quiz interface
│   ├── result/     # Quiz results with Radar Chart
│   ├── my-list/    # Saved favorites page
│   ├── layout.tsx  # Root layout
│   └── page.tsx    # Root page (likely redirects or serves as Landing)
├── lib/
│   ├── placesData.ts # Data source for attractions
│   └── quizData.ts   # Data source for questions & personality profiles
├── components/     # Shared UI components
└── public/         # Static assets
4. Key Components & Data
A. Data Models (lib/)
Place
 (placesData.ts)

id: number
name: string
region: '北部' | '中部' | '南部' | '東部'
category: '文化' | '老街' | '自然' | '展覽' | '生活' | '季節主題'
duration: '1日遊' | '2天1夜' ...
image: URL string
description: string
Quiz (quizData.ts)

Dimensions: OldStreet (巷弄), Nature (自然), Culture (文化), Lifestyle (生活)
Questions: 4 scenario-based questions mapping answers to dimensions.
Profiles: Detailed descriptions for each dimension (e.g., "巷弄故事派").
B. Page Implementations
1. Home (
app/home/page.tsx
)
Vertical Navigation: Switches between Cities (Taipei, Taichung, etc.).
Horizontal Navigation: Switches between attractions within a city.
Visuals: Full-screen background images with fade transitions. Glassmorphism cards for attractions.
2. Explore (
app/explore/page.tsx
)
Filters: 3 Dropdowns (Region, Category, Duration).
Listing: Grid of 
Place
 cards.
Interactions: Heart icon to toggle favorites (persisted in localStorage).
3. Result (
app/result/page.tsx
)
Logic: Calculates scores from URL search params (e.g., ?OldStreet=3&Nature=1).
Visuals: Recharts Radar Chart showing the user's "Travel DNA".
Content: Shows matched Persona title, description, and recommended routes.
5. Design System
Primary Color: Terracotta (#D97C5F)
Backgrounds: Warm off-white (#FFF9F2), Dark overlays for hero sections.
Typography: Sans-serif, clean modern look.
Effects: Glassmorphism (backdrop-blur), soft shadows, smooth transitions (animate-fade-in).
6. Current Status & Notes
Images: All images currently point to loremflickr with specific keywords to avoid 404s.
Filters: Explore page filters are implemented as dropdowns.
Responsiveness: Basic responsive grid and flex layouts implemented.
Navigation: Home page has custom wheel/touch navigation logic.
