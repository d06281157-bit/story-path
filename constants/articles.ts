// 定義文章的結構
export interface Article {
    id: string;
    title: string;
    description: string;
    date: string;
    slug: string; // 用於 URL 網址
}

// 存放實際的文章資料
export const ARTICLES: Article[] = [
    {
        id: '1',
        title: 'Antigravity 專案啟動',
        description: '探索如何構建一個輕量且高效的 Next.js 應用程式。',
        date: '2024-05-20',
        slug: 'getting-started-with-antigravity',
    },
    {
        id: '2',
        title: '深入理解 TypeScript 常數管理',
        description: '為什麼將資料抽離到 constants 是開發者的好習慣。',
        date: '2024-05-21',
        slug: 'typescript-constants-best-practice',
    },
];