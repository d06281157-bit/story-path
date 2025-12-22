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
