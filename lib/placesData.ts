export interface Place {
  id: number;
  name: string;
  region: string;
  category: string;
  duration: string;
  image: string;
  description: string;
}

export const places: Place[] = [
  // --- 1. 文化 (Culture) ---
  {
    id: 1,
    name: '大稻埕歷史文化',
    region: '北部',
    category: '文化',
    duration: '1日遊',
    image: 'https://loremflickr.com/800/600/taipei,dadaocheng/all',
    description: '穿梭台北舊城，感受迪化街的南北貨與紅磚洋樓魅力。'
  },
  {
    id: 2,
    name: '舊城區知識文化',
    region: '中部',
    category: '文化',
    duration: '1日遊',
    image: 'https://loremflickr.com/800/600/taichung,station/all',
    description: '探索台中舊火車站周邊的歷史軌跡與現代變遷。'
  },
  {
    id: 3,
    name: '府城知識故事',
    region: '南部',
    category: '文化',
    duration: '2天1夜',
    image: 'https://loremflickr.com/800/600/tainan,temple/all',
    description: '漫步台南古都，閱讀孔廟與文學館的歲月故事。'
  },
  {
    id: 4,
    name: '舊城歷史軸線',
    region: '東部',
    category: '文化',
    duration: '1日遊',
    image: 'https://loremflickr.com/800/600/hualien,architecture/all',
    description: '花蓮市區的歷史散策，尋找日治時期的建築記憶。'
  },

  // --- 2. 老街 (Old Street) ---
  {
    id: 5,
    name: '九份金瓜石',
    region: '北部',
    category: '老街',
    duration: '1日遊',
    image: 'https://loremflickr.com/800/600/jiufen,lantern/all',
    description: '悲情城市與黃金博物館的礦業記憶。'
  },
  {
    id: 6,
    name: '鹿港小鎮巷弄',
    region: '中部',
    category: '老街',
    duration: '1日遊',
    image: 'https://loremflickr.com/800/600/lukang,temple/all',
    description: '一府二鹿三艋舺，穿梭九曲巷與摸乳巷。'
  },
  {
    id: 7,
    name: '鹽埕舊街區',
    region: '南部',
    category: '老街',
    duration: '1日遊',
    image: 'https://loremflickr.com/800/600/kaohsiung,street/all',
    description: '高雄最早的繁華街區，品味老派浪漫。'
  },
  {
    id: 8,
    name: '頭城老街文史',
    region: '東部',
    category: '老街',
    duration: '1日遊',
    image: 'https://loremflickr.com/800/600/yilan,oldstreet/all',
    description: '開蘭第一城，感受宜蘭濱海的純樸歲月。'
  },

  // --- 3. 自然 (Nature) ---
  {
    id: 9,
    name: '金面山步道',
    region: '北部',
    category: '自然',
    duration: '1日遊',
    image: 'https://loremflickr.com/800/600/taipei,mountain/all',
    description: '登上剪刀石，俯瞰台北盆地的壯闊全景。'
  },
  {
    id: 10,
    name: '車埕×明潭湖景',
    region: '中部',
    category: '自然',
    duration: '1日遊',
    image: 'https://loremflickr.com/800/600/sunmoonlake,water/all',
    description: '最後的火車站與日月潭湖畔的靜謐時光。'
  },
  {
    id: 11,
    name: '阿朗壹古道',
    region: '南部',
    category: '自然',
    duration: '2天1夜',
    image: 'https://loremflickr.com/800/600/taiwan,coast/all',
    description: '踏上台灣最後一段原始海岸線。'
  },
  {
    id: 12,
    name: '小野柳海濱',
    region: '東部',
    category: '自然',
    duration: '1日遊',
    image: 'https://loremflickr.com/800/600/taitung,ocean/all',
    description: '奇岩怪石與太平洋海浪的自然交響曲。'
  },

  // --- 4. 展覽 (Exhibition) ---
  {
    id: 13,
    name: '北美館×當代藝術',
    region: '北部',
    category: '展覽',
    duration: '1日遊',
    image: 'https://loremflickr.com/800/600/taipei,museum/all',
    description: '台北當代藝術散步，激盪視覺與思考。'
  },
  {
    id: 14,
    name: '國美館×草悟道',
    region: '中部',
    category: '展覽',
    duration: '1日遊',
    image: 'https://loremflickr.com/800/600/taichung,park/all',
    description: '美術館周邊的綠帶與裝置藝術巡禮。'
  },
  {
    id: 15,
    name: '駁二×港都藝術',
    region: '南部',
    category: '展覽',
    duration: '1日遊',
    image: 'https://loremflickr.com/800/600/kaohsiung,art/all',
    description: '在海風中欣賞倉庫群的設計與創意。'
  },
  {
    id: 16,
    name: '花蓮文創園區',
    region: '東部',
    category: '展覽',
    duration: '1日遊',
    image: 'https://loremflickr.com/800/600/hualien,creative/all',
    description: '舊酒廠轉身的文化展演空間。'
  },

  // --- 5. 生活 (Lifestyle) ---
  {
    id: 17,
    name: '北門×城中市場',
    region: '北部',
    category: '生活',
    duration: '1日遊',
    image: 'https://loremflickr.com/800/600/taipei,gate/all',
    description: '老台北人的生活廚房與歷史城門導覽。'
  },
  {
    id: 18,
    name: '台中第二市場',
    region: '中部',
    category: '生活',
    duration: '1日遊',
    image: 'https://loremflickr.com/800/600/taiwan,market/all',
    description: '探索六角樓下的在地美食與人情味。'
  },
  {
    id: 19,
    name: '永樂市場×國華街',
    region: '南部',
    category: '生活',
    duration: '1日遊',
    image: 'https://loremflickr.com/800/600/tainan,food/all',
    description: '台南小吃一級戰區，滿足你的味蕾。'
  },
  {
    id: 20,
    name: '東大門夜市',
    region: '東部',
    category: '生活',
    duration: '1日遊',
    image: 'https://loremflickr.com/800/600/nightmarket,food/all',
    description: '匯集原民料理與在地小吃的深夜食堂。'
  },

  // --- 6. 季節主題 (Seasonal) ---
  {
    id: 21,
    name: '平溪天燈古道',
    region: '北部',
    category: '季節主題',
    duration: '1日遊',
    image: 'https://loremflickr.com/800/600/pingxi,lantern/all',
    description: '鐵道、天燈與瀑布交織的山城浪漫。'
  },
  {
    id: 22,
    name: '新社花海',
    region: '中部',
    category: '季節主題',
    duration: '1日遊',
    image: 'https://loremflickr.com/800/600/flower,field/all',
    description: '季節限定的繽紛花毯與農村風光。'
  },
  {
    id: 23,
    name: '駁二跨年燈光季',
    region: '南部',
    category: '季節主題',
    duration: '2天1夜',
    image: 'https://loremflickr.com/800/600/kaohsiung,night/all',
    description: '璀璨燈光點亮高雄港灣的夜晚。'
  },
  {
    id: 24,
    name: '熱氣球嘉年華',
    region: '東部',
    category: '季節主題',
    duration: '2天1夜',
    image: 'https://loremflickr.com/800/600/hotairballoon,sky/all',
    description: '鹿野高台上空，夢想隨熱氣球升空。'
  },
];
