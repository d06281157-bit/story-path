export interface Place {
  id: string;
  name: string;
  region: string;
  category: string;
  description: string;
  imageCount: number;
  duration?: string; // Optional or mapped
}

export const places: Place[] = [
  // A. 城市文化線
  { id: 'A-North', name: '大稻埕歷史文化', region: '北部', category: '城市文化', description: '迪化街 → 霞海城隍廟 → 建築立面導覽 → 台北舊城門', imageCount: 4, duration: '1日遊' },
  { id: 'A-Central', name: '舊城區知識文化', region: '中部', category: '城市文化', description: '台中火車站舊站 → 宮原眼科 → 臺中州廳 → 綠空廊道', imageCount: 4, duration: '1日遊' },
  { id: 'A-South', name: '府城知識故事', region: '南部', category: '城市文化', description: '孔廟 → 台灣文學館 → 美術館二館 → 司法博物館', imageCount: 4, duration: '1日遊' },
  { id: 'A-East', name: '舊城歷史軸線', region: '東部', category: '城市文化', description: '松園別館 → 將軍府 → 舊鐵道文化商圈 → 花蓮港景點', imageCount: 4, duration: '1日遊' },

  // B. 老街散策線
  { id: 'B-North', name: '九份 × 金瓜石礦業', region: '北部', category: '老街散策', description: '九份老街巷弄 → 黃金博物園區 → 昇平戲院 → 祈堂老街', imageCount: 4, duration: '1日遊' },
  { id: 'B-Central', name: '鹿港小鎮巷弄', region: '中部', category: '老街散策', description: '鹿港老街 → 摸乳巷 → 龍山寺 → 傳統工藝師傅工作室', imageCount: 4, duration: '1日遊' },
  { id: 'B-South', name: '鹽埕舊街區', region: '南部', category: '老街散策', description: '新樂街老冰店 → 堀江商場 → 大溝頂老街 → 舊街區建築', imageCount: 4, duration: '1日遊' },
  { id: 'B-East', name: '頭城老街文史', region: '東部', category: '老街散策', description: '頭城老街 → 慶元宮 → 盧纘祥故居 → 小涼園冰店', imageCount: 4, duration: '1日遊' },

  // C. 戶外自然線
  { id: 'C-North', name: '金面山步道', region: '北部', category: '戶外自然', description: '剪刀石 → 大崙頭尾山步道 → 城市山景', imageCount: 4, duration: '1日遊' },
  { id: 'C-Central', name: '車埕 × 明潭湖景', region: '中部', category: '戶外自然', description: '明潭發電廠水庫 → 車埕環湖步道 → 車埕木業生態館', imageCount: 4, duration: '1日遊' },
  { id: 'C-South', name: '阿朗壹古道', region: '南部', category: '戶外自然', description: '旭海安檢所 → 南田石海岸 → 觀音鼻山海步道', imageCount: 4, duration: '2天1夜' },
  { id: 'C-East', name: '小野柳海濱步道', region: '東部', category: '戶外自然', description: '小野柳地質景觀 → 加路蘭海岸 → 海邊森林散步', imageCount: 4, duration: '1日遊' },

  // D. 展覽文化線
  { id: 'D-North', name: '北美館 × 當代藝術', region: '北部', category: '展覽文化', description: '北美館 → 圓山公園 → 文創館 → 輕食咖啡', imageCount: 4, duration: '1日遊' },
  { id: 'D-Central', name: '國美館 × 草悟道', region: '中部', category: '展覽文化', description: '國美館 → 綠園道 → 文創小店', imageCount: 4, duration: '1日遊' },
  { id: 'D-South', name: '駁二 × 港都藝術', region: '南部', category: '展覽文化', description: '大勇倉庫群 → 海景步道 → 展覽空間', imageCount: 4, duration: '1日遊' },
  { id: 'D-East', name: '文創園區 × 舊酒廠', region: '東部', category: '展覽文化', description: '老倉庫 → 自然系展覽 → 老屋咖啡', imageCount: 4, duration: '1日遊' },

  // E. 市場生活線
  { id: 'E-North', name: '北門 × 城中市場', region: '北部', category: '市場生活', description: '城中市場 → 師大甜不辣 → 老街食物地圖', imageCount: 4, duration: '1日遊' },
  { id: 'E-Central', name: '第二市場生活', region: '中部', category: '市場生活', description: '麻薏湯 → 肉包 → 乾麵 → 市場生活文化', imageCount: 4, duration: '1日遊' },
  { id: 'E-South', name: '永樂市場 × 國華街', region: '南部', category: '市場生活', description: '布市 → 小吃 → 老舖甜點 → 步行路線', imageCount: 4, duration: '1日遊' },
  { id: 'E-East', name: '東大門夜市文化', region: '東部', category: '市場生活', description: '原住民料理 → 軍事老舊建物 → 海景散步', imageCount: 4, duration: '1日遊' },

  // F. 季節主題線
  { id: 'F-North', name: '平溪天燈古道', region: '北部', category: '季節主題', description: '平溪：天燈文化＋古道小旅行', imageCount: 4, duration: '1日遊' },
  { id: 'F-Central', name: '新社花海秋季旅', region: '中部', category: '季節主題', description: '台中：新社花海（秋季文化旅）', imageCount: 4, duration: '1日遊' },
  { id: 'F-South', name: '駁二跨年燈光季', region: '南部', category: '季節主題', description: '高雄：駁二跨年燈光季', imageCount: 4, duration: '2天1夜' },
  { id: 'F-East', name: '熱氣球嘉年華', region: '東部', category: '季節主題', description: '台東：熱氣球嘉年華（夏季）', imageCount: 4, duration: '2天1夜' },
];
