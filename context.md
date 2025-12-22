# Story Path (Wanderly) Project Context
**Last Updated: 2025-12-22**

## 1. Project Overview
**Name**: Wanderly (Discover Your Taiwan)
**Description**: A travel planning application focused on Taiwanese cultural and deep-tourism experiences, featuring AI-powered itinerary generation and a personal collection system.
**Language**: zh-TW (Traditional Chinese)

## 2. Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (Vanilla CSS logic for animations)
- **Icons**: lucide-react
- **Fonts**: Noto Serif TC (Google Fonts)
- **Storage**: LocalStorage (Client-side persistence)

## 3. Project Structure
```text
/
├── app/                  # Next.js App Router
│   ├── explore/          # Discovery page with filters
│   │   └── [slug]/       # Rich article detail pages
│   ├── plan/             # AI Itinerary Planner (Scoring logic)
│   ├── my-list/          # Personal Collection (Tabs: Routes & AI Plans)
│   ├── quiz/             # Personality/Preference quiz
│   ├── layout.tsx        # Global layout & Theme
│   └── page.tsx          # Landing page
├── constants/            # Centralized data
│   ├── itineraries.ts    # Attractions pool & Static routes
│   └── articles.ts       # Rich content for explore details
├── lib/                  # Utilities
└── public/               # Static assets
```

## 4. Feature Modules

### A. AI Itinerary Planner (`/plan`)
- **Logic**: Uses a Weighted Scoring algorithm based on:
    - User interests (Themes: Culture, Food, Nature, etc.)
    - Companion type (Solo, Couple, Family, Friends)
    - Budget level (1-3)
    - City filter (Strict city matching)
- **Persistence**: Saves generated plans to `localStorage` under `my-custom-plans`.
- **Deep Load**: Supports direct loading via URL parameter `?planId=...`.

### B. Personal Collection (`/my-list`)
- **Interface**: Tabbed navigation between:
    1. **Saved Routes**: Hand-picked itineraries from the Explore page.
    2. **AI Plans**: Custom-generated plans from the Planner.
- **Feedback**: Integrated Toast system with direct links to the collection page.

### C. Discovery Content (`/explore`)
- **Article System**: Dynamic rendering of long-form travel guides with full-width images and structured sections.

## 5. Current Development Status
- **Images**: Using LoremFlickr for stable, keyword-based placeholders.
- **Animations**: Custom `fade-in`, `slide-up`, and `bounce-in` transitions applied consistently.
- **Feedback Loop**: "Save to List" buttons provide immediate visual feedback (state change) and toast notifications.
- **Navigation**: "View Full Plan" in My List is fully functional, restoring the planner state via ID.

## 6. Development Instructions for Next Session
- **Planner State**: Ensure the `PlannerContent` remains wrapped in `Suspense` due to `useSearchParams`.
- **Data Hydration**: Check `localStorage` parsing for both `my-list` and `my-custom-plans` when modifying collection logic.
- **Aesthetics**: Maintain the premium "cultural" vibe (bg: #FFF9F2, accent: #D97C5F, dark: #2C1810).


🚀 Wanderly 專案開發進度總結 (2025-12-22)
📌 專案定位
Wanderly 是一款專為台灣旅遊設計的高級感 (Premium) AI 智慧規劃平台。透過精緻的視覺設計與直覺的 AI 互動，協助使用者探索台灣四大區域，並規劃專屬行程。

🛠️ 技術棧
框架: Next.js 14+ (App Router)
樣式: Vanilla CSS + Tailwind CSS (主要用於配置)
動畫: Framer Motion
資料存取: LocalStorage (暫存收藏與自定義行程)
視覺資產: AI 生成高品質影像 (WebP/PNG) + LoremFlickr (輔助佔位)
字體: Noto Serif TC (標題), Outfit/Inter (內文)
🌟 目前核心功能
首頁 (Regional Slider):
以「北、中、南、東」四大區域為核心，提供沈浸式的全螢幕切換體驗。
視覺優化: 已將原本隨機的佔位圖更換為專屬 AI 生成的高端攝影作品 (存放於 public/images/home/)。
卡片系統: 每個區域配有 4 個精選景點，目前 80% 已更換為實體高品質照片。
AI 行程規劃器 (Plan Page):
多步驟式引導 (地點、天數、旅伴、主題)。
支援生成 3-5 天的詳細行程，包含景點座標與時間分配。
儲存功能: 整合 LocalStorage，使用者可將 AI 規劃儲存至「我的清單」。
探索詳情頁 (Explore Detail):
動態路由 app/explore/[slug]，從 constants/articles.ts 抓取深度內容。
收藏系統: 加入「Save to My List」按鈕，具備即時提示（Toast）與愛心動畫。
我的清單 (My List):
分頁切換系統：可同時管理「收藏路線」與「AI 智慧計畫」。
支援從清單中直接開啟先前儲存的 AI 行程。
🎨 設計規範 (Design Tokens)
背景色: #FFF9F2 (米白綢緞)
主色/強調色: #D97C5F (夕陽橘)
文字主色: #2C1810 (深可可)
視覺風格: 玻璃擬態 (Glassmorphism)、微互動動畫、高品質人文攝影。
📂 關鍵檔案結構
/app/home/page.tsx: 首頁邏輯與區域資料。
/app/plan/page.tsx: AI 規劃邏輯與 LocalStorage 串接。
/app/my-list/page.tsx: 收藏清單管理。
/constants/itineraries.ts: 景點資料庫。
/constants/articles.ts: 行程文章深度內容。
/public/images/home/: 存放所有高端背景與卡片圖片。
🔜 下一步計畫 (待辦事項)
內容擴充: 完成「東部」剩下的 3 張景點卡片圖像生成。
資料一致性: 確保 Explore 頁面的 slug 與 My List 的 id 完美對應，避免收藏連結失效。
搜尋優化: 在探索頁面加入區域與主題的動態過濾器 (Filter)。