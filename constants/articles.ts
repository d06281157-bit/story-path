// 1. 定義文章的結構 (Schema)
export interface Article {
    id: string;
    title: string;
    description: string;
    date: string;
    slug: string;
    content: string; // <--- 新增這個欄位來放內文
}

// 2. 轉化文案為結構化資料
export const ARTICLES: Article[] = [
    {
        id: '1',
        title: 'Antigravity 專案啟動',
        description: '探索如何構建一個輕量且高效的 Next.js 應用程式。',
        date: '2024-05-20',
        slug: 'getting-started-with-antigravity',
        // 使用反引號 ` 可以讓你直接貼上多行文章內容
        content: `
      這是 Antigravity 專案的第一篇文章。
      
      ### 為什麼選擇 Next.js？
      Next.js 提供了強大的 Server Components 功能，讓我們的網站載入速度飛快，就像失去重力一樣輕盈。
      
      ### 專案目標
      1. 極致的效能
      2. 優雅的程式碼結構
      3. 良好的使用者體驗
      
      我們將一步步把這個概念實作成真。
    `,
    },
    {
        id: '2',
        title: '深入理解 TypeScript 常數管理',
        description: '為什麼將資料抽離到 constants 是開發者的好習慣。',
        date: '2024-05-21',
        slug: 'typescript-constants-best-practice',
        content: `
      在開發大型應用程式時，將數據與 UI 分離是至關重要的。
      
      ### 什麼是 Constants？
      Constants 資料夾用來存放那些「不會輕易改變」的靜態資料。
      
      ### 好處
      - **易於維護**：修改文字不需要翻找複雜的組件代碼。
      - **型別安全**：透過 TypeScript interface，我們確保每篇文章都有標題和內容。
      - **全域共用**：定義一次，到處都能用。
    `,
    },
];