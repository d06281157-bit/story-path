# Story Path Project Context

## Project Overview
**Name**: Story Path (Wanderly - Discover Your Taiwan)
**Description**: A travel planning application focused on Taiwanese cultural and deep-tourism experiences.
**Language**: zh-TW

## Tech Stack
- **Framework**: Next.js 16.0.10 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19.2.1
- **Styling**: Tailwind CSS v4
- **Icons**: lucide-react
- **Fonts**: Noto Serif TC (Google Fonts)

## Project Structure
```text
/
├── app/                  # Next.js App Router pages
│   ├── about/            # About page
│   ├── explore/          # Explore page (discovery)
│   ├── home/             # Home page (landing)
│   ├── my-list/          # User's saved list
│   ├── plan/             # Itinerary planning
│   ├── quiz/             # Personality/Preference quiz
│   ├── result/           # Quiz results
│   ├── layout.tsx        # Root layout (Navbar, Fonts)
│   └── page.tsx          # Root page (redirects or landing)
├── components/           # Reusable UI components
│   └── Navbar.tsx        # Main navigation
├── lib/                  # Data and utility functions
│   ├── placesData.ts     # Mock data for attractions
│   └── quizData.ts       # Mock data for quiz
├── public/               # Static assets
└── package.json          # Dependencies
```

## Data Schemas

### Places (`lib/placesData.ts`)
The application currently uses static mock data.
```typescript
interface Place {
  id: number;
  name: string;
  region: string;     // e.g., '北部', '中部'
  category: string;   // e.g., '文化', '老街', '自然'
  duration: string;   // e.g., '1日遊', '2天1夜'
  image: string;      // LoremFlickr URL
  description: string;
}
```

### Quiz (`lib/quizData.ts`)
Defines the structure for the personality quiz.
```typescript
type Dimension = "OldStreet" | "Nature" | "Culture" | "Lifestyle";

interface Option {
  label: string;
  value: Dimension;
}

interface Question {
  id: number;
  title: string;
  questionText: string;
  options: Option[];
}

// Result profiles map Dimensions to recommendations
interface ResultProfile {
  title: string;
  description: string;
  match: string;
  recommend: string;
  tags: string[];
}
```

## Key Features
1.  **Home Page**: Features destinations and sliders.
2.  **Explore**: Discover places by filters (Region, Style, Duration).
3.  **Quiz**: A 4-question quiz to determine travel preferences (OldStreet, Nature, Culture, Lifestyle).
4.  **Itinerary Planning**: Ability to create travel plans.

## Current Status (as of 2025-12-18)
-   **Images**: All images are currently using `https://loremflickr.com` to avoid broken links.
-   **Data**: The `places` data contains basic fields. Note: Previous discussions regarding adding `city` and `timePreference` fields have NOT been reflected in the current `placesData.ts`.
-   **Styling**: Uses a consistent color palette (`bg-[#FFF9F2]`) and Noto Serif font for a cultural feel.
