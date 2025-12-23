// constants/itineraries.ts
export interface TripDetail {
    duration: string;
    location: string;
    transport: string;
    season: string;
}

export interface Itinerary {
    id: string; // A-North, B-Central, etc.
    slug: string;
    tag: string;
    title: string;
    description: string;
    highlights: string[];
    tripDetails: TripDetail;
    images: string[];
    region: '北部' | '中部' | '南部' | '東部';
}

export const ITINERARIES: Itinerary[] = [
    // === A. 城市文化 ===
    {
        id: 'A-North',
        slug: 'dadaocheng-history-walk',
        tag: '城市文化',
        region: '北部',
        title: '台北：大稻埕歷史文化',
        description: `有些城市，必須抬頭閱讀。大稻埕的建築仍在說話，從商業動脈「迪化街」出發，欣賞巴洛克式與閩南式的街屋立面。
這條「城市文化線」帶你重新理解台北如何一步步成形。站在曾经的城市邊界，看見歷史沒有被整理成一條直線，而是重疊在同一個街區裡。`,
        highlights: ['迪化街歷史街屋', '霞海城隍廟', '老建築立面導覽', '台北舊城門(北門)'],
        tripDetails: { duration: '3-4 小時', location: '台北・大稻埕', transport: '步行', season: '四季皆宜' },
        images: [
            '/images/itineraries/A-North-1.jpg',
            '/images/itineraries/A-North-2.jpg',
            '/images/itineraries/A-North-3.jpg'
        ]
    },
    {
        id: 'A-Central',
        slug: 'taichung-old-city',
        tag: '城市文化',
        region: '中部',
        title: '台中：舊城區知識文化',
        description: `從台中火車站舊站出發，走過宮原眼科、臺中州廳，這是一段關於日治時期城市規劃與現代復甦的故事。`,
        highlights: ['台中火車站舊站', '宮原眼科', '臺中州廳', '綠空廊道'],
        tripDetails: { duration: '3-4 小時', location: '台中・中區', transport: '步行', season: '四季皆宜' },
        images: [
            '/images/itineraries/A-Central-1.jpg',
            '/images/itineraries/A-Central-2.jpg',
            '/images/itineraries/A-Central-3.jpg',
            '/images/itineraries/A-Central-4.jpg'
        ]
    },
    {
        id: 'A-South',
        slug: 'tainan-cultural-walk',
        tag: '城市文化',
        region: '南部',
        title: '台南：府城知識故事',
        description: `台南的厚度，在街道。它是台灣歷史的起點，政權更迭的痕跡層層疊加在建築的立面上。從清代學宮到當代幾何美術館，你就能穿越三個世紀。`,
        highlights: ['孔廟｜紅牆裡的儒學初心', '台灣文學館｜統治權力到文字溫柔', '美術館二館｜光影碎裂的當代容器', '司法博物館｜凝視正義的巴洛克'],
        tripDetails: { duration: '4-5 小時', location: '台南・中西區', transport: '步行', season: '四季皆宜' },
        images: [
            '/images/itineraries/A-South-1.jpg',
            '/images/itineraries/A-South-2.jpg',
            '/images/itineraries/A-South-3.jpg'
        ]
    },
    {
        id: 'A-East',
        slug: 'hualien-history-walk',
        tag: '城市文化',
        region: '東部',
        title: '花蓮：舊城歷史軸線',
        description: `穿梭在松園別館與將軍府之間，感受花蓮在日治時期的軍事地位與獨特的海港氛圍。`,
        highlights: ['松園別館', '將軍府', '舊鐵道文化商圈', '花蓮港景點'],
        tripDetails: { duration: '3-4 小時', location: '花蓮市', transport: '自行車/步行', season: '四季皆宜' },
        images: [
            '/images/home/cards/east_hualien_city.png'
        ]
    },

    // === B. 老街 ===
    {
        id: 'B-North',
        slug: 'jiufen-gold-town',
        tag: '老街',
        region: '北部',
        title: '台北：九份× 金瓜石礦業故事',
        description: `山城的雨，總是一層一層地把世界洗舊。這裡曾經是亞洲的金都，夜夜笙歌的「小上海」。讓我們穿梭在高低落差間，閱讀這座礦業之城的寂寥。`,
        highlights: ['九份老街巷弄', '黃金博物園區', '昇平戲院', '祈堂老街'],
        tripDetails: { duration: '4-5 小時', location: '新北・瑞芳', transport: '步行', season: '四季皆宜' },
        images: [
            '/images/itineraries/B-North-1.jpg',
            '/images/itineraries/B-North-2.jpg'
        ]
    },
    {
        id: 'B-Central',
        slug: 'lukang-old-town',
        tag: '老街',
        region: '中部',
        title: '彰化：鹿港小鎮巷弄',
        description: `如果時間是一條河流，那麼鹿港就是被泥沙淤積而留住的渡口。走進鹿港，不是為了趕景點，而是為了在紅磚道上迷路。`,
        highlights: ['鹿港老街', '摸乳巷', '龍山寺', '傳統工藝師傅工作室'],
        tripDetails: { duration: '3-4 小時', location: '彰化・鹿港', transport: '步行', season: '四季皆宜' },
        images: [
            '/images/itineraries/B-Central-1.jpg',
            '/images/itineraries/B-Central-2.jpg',
            '/images/itineraries/B-Central-3.jpg',
            '/images/itineraries/B-Central-4.jpg'
        ]
    },
    {
        id: 'B-South',
        slug: 'yancheng-old-street',
        tag: '老街',
        region: '南部',
        title: '高雄：鹽埕舊街區',
        description: `踏入鹽埕，尋找老冰店、大溝頂與舊街區的建築，感受高雄最早期的繁華生活節奏。`,
        highlights: ['新樂街老冰店', '堀江商場', '大溝頂老街', '舊街區建築巡禮'],
        tripDetails: { duration: '2-3 小時', location: '高雄・鹽埕', transport: '步行', season: '四季皆宜' },
        images: [
            '/images/itineraries/B-South-1.jpg',
            '/images/itineraries/B-South-2.jpg',
            '/images/itineraries/B-South-3.jpg'
        ]
    },
    {
        id: 'B-East',
        slug: 'toucheng-old-street',
        tag: '老街',
        region: '東部',
        title: '宜蘭：頭城老街文史',
        description: `頭城老街保留了慶元宮與盧纘祥故居，是宜蘭最早發展的街區，每一根樑柱都刻滿了拓墾的故事。`,
        highlights: ['慶元宮', '盧纘祥故居', '小涼園冰店', '老街文史導覽'],
        tripDetails: { duration: '2-3 小時', location: '宜蘭・頭城', transport: '步行', season: '四季皆宜' },
        images: ['/images/itineraries/B-East-1.jpg']
    },

    // === C. 自然 ===
    {
        id: 'C-North',
        slug: 'jinmianshan-trail',
        tag: '自然',
        region: '北部',
        title: '台北：金面山步道',
        description: `站上剪刀石，俯瞰整座台北盆地。這是一條讓你在城市與荒野之間快速切換的冒險路線。`,
        highlights: ['剪刀石奇岩', '大崙頭尾山步道', '俯瞰台北景色'],
        tripDetails: { duration: '2-3 小時', location: '台北・內湖', transport: '登山', season: '避開雨天' },
        images: ['/images/itineraries/C-North-1.jpg']
    },
    {
        id: 'C-Central',
        slug: 'checheng-lake-view',
        tag: '自然',
        region: '中部',
        title: '南投：車埕× 明潭湖景',
        description: `在車埕環湖步道散步，觀察明潭發電廠與這片被山林擁抱的寧靜湖水。`,
        highlights: ['明潭發電廠水庫', '車埕環湖步道', '車埕木業生態館'],
        tripDetails: { duration: '3-4 小時', location: '南投・水里', transport: '火車/步行', season: '四季皆宜' },
        images: [
            '/images/itineraries/C-Central-1.jpg',
            '/images/itineraries/C-Central-2.jpg',
            '/images/itineraries/C-Central-3.jpg'
        ]
    },
    {
        id: 'C-South',
        slug: 'alangyi-ancient-trail',
        tag: '自然',
        region: '南部',
        title: '屏東：阿朗壹古道',
        description: `台灣最後的海岸線原始地貌。聽著南田石與海浪的合奏，翻過觀音鼻，看見最純粹的山海。`,
        highlights: ['南田石海岸', '觀音鼻山海步道', '原始海岸林'],
        tripDetails: { duration: '4-6 小時', location: '屏東・旭海', transport: '特許入山', season: '冬季最涼爽' },
        images: [
            '/images/itineraries/C-South-1.jpg',
            '/images/itineraries/C-South-2.jpg',
            '/images/itineraries/C-South-3.jpg'
        ]
    },
    {
        id: 'C-East',
        slug: 'xiaoyeliu-coast',
        tag: '自然',
        region: '東部',
        title: '台東：小野柳海濱步道',
        description: `太平洋的風雕刻了這片海岸。在奇岩怪石與無邊際的海洋之間，找回與自然同步的呼吸節奏。`,
        highlights: ['小野柳地質景觀', '加路蘭海岸', '海邊森林散步'],
        tripDetails: { duration: '3-4 小時', location: '台東・小野柳', transport: '步行/客運', season: '四季皆宜' },
        images: [
            '/images/itineraries/C-East-1.jpg',
            '/images/itineraries/C-East-2.jpg',
            '/images/itineraries/C-East-3.jpg'
        ]
    },

    // === D. 展覽 ===
    {
        id: 'D-North',
        slug: 'tfam-art-walk',
        tag: '展覽',
        region: '北部',
        title: '台北：北美館× 當代藝術散步',
        description: `從北美館到圓山公園，這是一段讓視覺與靈魂同時飽足的文化散策。`,
        highlights: ['北美館當代展覽', '圓山花博園區', '圓山文創空間'],
        tripDetails: { duration: '3-4 小時', location: '台北・中山', transport: '捷運', season: '四季皆宜' },
        images: ['/images/itineraries/D-North-1.jpg']
    },
    {
        id: 'D-Central',
        slug: 'ntmofa-park-walk',
        tag: '展覽',
        region: '中部',
        title: '台中：國美館× 草悟道',
        description: `國美館與綠意盎然的草悟道交織，展現了台中特有的舒緩人文氣息。`,
        highlights: ['國美館室內外展區', '草悟道綠色廊道', '文創小店探索'],
        tripDetails: { duration: '3-5 小時', location: '台中・西區', transport: '步行', season: '四季皆宜' },
        images: [
            '/images/itineraries/D-Central-1.jpg',
            '/images/itineraries/D-Central-2.jpg'
        ]
    },
    {
        id: 'D-South',
        slug: 'pier2-art-district',
        tag: '展覽',
        region: '南部',
        title: '高雄：駁二× 港都藝術',
        description: `在駁二，看見工業巨獸如何溫柔轉身。在鏽蝕與海風中，閱讀高雄如何成為設計之都。`,
        highlights: ['大勇倉庫策展群', '大港橋海景', '蓬萊特展區區', '哈瑪星鐵道館'],
        tripDetails: { duration: '3-4 小時', location: '高雄・駁二', transport: '輕軌/步行', season: '四季皆宜' },
        images: [
            '/images/itineraries/D-South-1.jpg',
            '/images/itineraries/D-South-2.jpg',
            '/images/itineraries/D-South-3.jpg',
            '/images/itineraries/D-South-4.jpg'
        ]
    },
    {
        id: 'D-East',
        slug: 'hualien-creative-park',
        tag: '展覽',
        region: '東部',
        title: '花蓮：文創園區× 舊酒廠展場',
        description: `舊酒廠變身的藝術聚落，在厚實的花崗岩建築中，藏著花蓮特有的自然藝術能量。`,
        highlights: ['老倉庫展演空間', '職人市集', '自然系藝術特展'],
        tripDetails: { duration: '2-3 小時', location: '花蓮市', transport: '步行', season: '四季皆宜' },
        images: [
            '/images/itineraries/D-East-1.jpg',
            '/images/itineraries/D-East-2.jpg'
        ]
    },

    // === E. 生活 ===
    {
        id: 'E-North',
        slug: 'chengzhong-market-walk',
        tag: '生活',
        region: '北部',
        title: '北部：北門× 城中市場導覽',
        description: `穿梭在老台北的胃，這是一場關於家常味道與巷弄生存智慧的導覽。`,
        highlights: ['城中市場美食', '北門歷史地標', '老街食物地圖'],
        tripDetails: { duration: '2 小時', location: '台北・中正', transport: '步行', season: '四季皆宜' },
        images: [
            '/images/itineraries/E-North-1.jpg',
            '/images/itineraries/E-North-2.jpg'
        ]
    },
    {
        id: 'E-Central',
        slug: 'taichung-market-food',
        tag: '生活',
        region: '中部',
        title: '台中：第二市場',
        description: `城市的胃，也是城市的靈魂。在 1917 年至今的六角樓建築中，品味那一碗夏日限定、苦後回甘的麻薏湯。`,
        highlights: ['六角樓建築', '山河魯肉飯', '季節限定麻薏湯', '傳統乾麵巡禮'],
        tripDetails: { duration: '1-2 小時', location: '台中・中區', transport: '步行', season: '四季皆宜' },
        images: ['https://loremflickr.com/1200/800/taichung,market/all', 'https://loremflickr.com/1200/800/taichung,food/all']
    },
    {
        id: 'E-South',
        slug: 'yongle-market-food',
        tag: '生活',
        region: '南部',
        title: '台南：永樂市場× 國華街美食',
        description: `台南人的美味清單，就藏在國華街與永樂市場的每一張摺疊桌上。`,
        highlights: ['永樂市場小吃', '國華街老舖', '台南人的早午餐'],
        tripDetails: { duration: '2-3 小時', location: '台南・中西區', transport: '步行', season: '四季皆宜' },
        images: [
            '/images/itineraries/E-South-1.jpg',
            '/images/itineraries/E-South-2.jpg'
        ]
    },
    {
        id: 'E-East',
        slug: 'dongdamen-night-market',
        tag: '生活',
        region: '東部',
        title: '花蓮：東大門夜市文化散策',
        description: `東海岸最大夜市。除了原住民料理與美食，還有藏在周邊的軍事與舊碼頭故事。`,
        highlights: ['原住民風味料理', '軍事歷史地景', '海景散步道'],
        tripDetails: { duration: '2-3 小時', location: '花蓮市', transport: '步行', season: '四季皆宜' },
        images: [
            '/images/itineraries/E-East-1.jpg',
            '/images/itineraries/E-East-2.jpg'
        ]
    },

    // === F. 季節主題 ===
    {
        id: 'F-North',
        slug: 'pingxi-sky-lantern',
        tag: '季節主題',
        region: '北部',
        title: '台北：平溪：天燈文化＋古道小旅行',
        description: `在平溪與菁桐，放飛一個心願。並在舊鐵道與古道之間，尋找礦業遺落的時光。`,
        highlights: ['天燈祈福體驗', '菁桐石底大菁', '平溪線小火車'],
        tripDetails: { duration: '4-5 小時', location: '新北・平溪', transport: '平溪線', season: '四季皆宜' },
        images: [
            '/images/itineraries/F-North-1.jpg',
            '/images/itineraries/F-North-4.jpg'
        ]
    },
    {
        id: 'F-Central',
        slug: 'xinshe-flower-sea',
        tag: '季節主題',
        region: '中部',
        title: '台中：新社花海',
        description: `在大地編織的彩色地毯中散步。這是台中秋季最宏大的自然祭典。`,
        highlights: ['彩色花海景觀', '香菇故鄉導覽', '台中山城景色'],
        tripDetails: { duration: '3-4 小時', location: '台中・新社', transport: '接駁車/開車', season: '秋季限定' },
        images: [
            '/images/itineraries/F-Central-1.jpg',
            '/images/itineraries/F-Central-2.jpg'
        ]
    },
    {
        id: 'F-South',
        slug: 'pier2-light-festival',
        tag: '季節主題',
        region: '南部',
        title: '高雄：駁二跨年燈光季',
        description: `港灣的夜晚被燈光與音樂點亮。在駁二見證藝術如何與科技結合，營造獨特的跨年氛圍。`,
        highlights: ['跨年燈光藝術裝置', '大港橋燈光秀', '夜間展演活動'],
        tripDetails: { duration: '3-5 小時', location: '高雄・駁二', transport: '輕軌/步行', season: '冬季限定' },
        images: [
            '/images/itineraries/F-South-1.jpg',
            '/images/itineraries/F-South-2.jpg'
        ]
    },
    {
        id: 'F-East',
        slug: 'luye-balloon-festival',
        tag: '季節主題',
        region: '東部',
        title: '花蓮：熱氣球嘉年華',
        description: `在縱谷的藍天中，看著巨大的熱氣球緩緩升空。這是一場關於夢想與翱翔的視覺饗宴。`,
        highlights: ['熱氣球升空展演', '縱谷紅烏龍茶香', '鹿野光雕音樂會'],
        tripDetails: { duration: '4-6 小時', location: '台東・鹿野高台', transport: '接駁車/客運', season: '夏季限定' },
        images: [
            '/images/itineraries/F-East-1.jpg',
            '/images/itineraries/F-East-2.jpg',
            '/images/itineraries/F-East-3.jpg',
            '/images/itineraries/F-East-4.jpg'
        ]
    }
];