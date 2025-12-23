"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Users,
  Sparkles,
  User,
  Heart,
  Smile,
  Search,
  RefreshCw,
  ArrowRight,
  DollarSign,
  Utensils,
  Calendar,
  Wallet,
  AlertCircle,
  X,
  Cloud,
  Sun,
  Plane,
  Bed,
  ExternalLink,
  GripVertical,
  Move,
  Pencil,
  Trash,
  Plus,
  Upload,
  Save,
  Map,
  ThumbsUp,
  Share2,
  CheckCircle,
} from "lucide-react";
import clsx from "clsx";

// --- 1. Enriched Mock Database (Score-Based Ready) ---
interface PlaceData {
  id: number;
  name: string;
  city: string;
  district: string;
  region: string;
  category: string;
  tags: string[]; // For Weighted Scoring
  type: "spot" | "food";
  price: 1 | 2 | 3;
  bestTime: "day" | "night" | "any";
  image: string;
  description: string;
}

const placesPool: PlaceData[] = [
  // --- 台北 (Taipei) ---
  // Xinyi
  {
    id: 101,
    name: "台北 101 觀景台",
    city: "台北",
    district: "信義區",
    region: "北部",
    category: "購物",
    tags: ["購物", "地標", "攝影"],
    type: "spot",
    price: 2,
    bestTime: "any",
    image: "https://loremflickr.com/800/600/taipei,101",
    description: "台灣地標，俯瞰城市天際線。",
  },
  {
    id: 102,
    name: "象山親山步道",
    city: "台北",
    district: "信義區",
    region: "北部",
    category: "自然",
    tags: ["自然", "攝影", "冒險"],
    type: "spot",
    price: 1,
    bestTime: "day",
    image: "https://loremflickr.com/800/600/taipei,hike",
    description: "眺望 101 最佳視角。",
  },
  {
    id: 103,
    name: "鼎泰豐 101店",
    city: "台北",
    district: "信義區",
    region: "北部",
    category: "美食",
    tags: ["美食", "文化"],
    type: "food",
    price: 2,
    bestTime: "any",
    image: "https://loremflickr.com/800/600/dumpling,food",
    description: "世界知名的米其林小籠包。",
  },
  {
    id: 104,
    name: "信義區百貨商圈",
    city: "台北",
    district: "信義區",
    region: "北部",
    category: "購物",
    tags: ["購物", "時尚"],
    type: "spot",
    price: 2,
    bestTime: "any",
    image: "https://loremflickr.com/800/600/shopping,mall",
    description: "與時尚接軌的購物天堂。",
  },
  {
    id: 105,
    name: "Smith & Hsu",
    city: "台北",
    district: "信義區",
    region: "北部",
    category: "美食",
    tags: ["美食", "下午茶", "放鬆"],
    type: "food",
    price: 2,
    bestTime: "day",
    image: "https://loremflickr.com/800/600/scone,tea",
    description: "著名的司康與下午茶饗宴。",
  },

  // Old Taipei
  {
    id: 120,
    name: "大稻埕碼頭",
    city: "台北",
    district: "大同區",
    region: "北部",
    category: "文化",
    tags: ["文化", "攝影", "放鬆"],
    type: "spot",
    price: 1,
    bestTime: "any",
    image: "https://loremflickr.com/800/600/dadaocheng,river",
    description: "欣賞河岸夕陽與復古街區。",
  },
  {
    id: 121,
    name: "迪化街老街",
    city: "台北",
    district: "大同區",
    region: "北部",
    category: "文化",
    tags: ["文化", "歷史", "購物"],
    type: "spot",
    price: 1,
    bestTime: "day",
    image: "https://loremflickr.com/800/600/oldstreet,taipei",
    description: "保留完整的巴洛克式建築與南北貨。",
  },
  {
    id: 122,
    name: "寧夏夜市",
    city: "台北",
    district: "大同區",
    region: "北部",
    category: "美食",
    tags: ["美食", "夜市"],
    type: "food",
    price: 1,
    bestTime: "night",
    image: "https://loremflickr.com/800/600/ningxia,night",
    description: "台北夜市美食密度最高的地方。",
  },

  // Shilin/Beitou
  {
    id: 130,
    name: "國立故宮博物院",
    city: "台北",
    district: "士林區",
    region: "北部",
    category: "歷史",
    tags: ["歷史", "文化"],
    type: "spot",
    price: 2,
    bestTime: "day",
    image: "https://loremflickr.com/800/600/museum,chinese",
    description: "中華文化瑰寶，必看翠玉白菜。",
  },
  {
    id: 131,
    name: "士林夜市",
    city: "台北",
    district: "士林區",
    region: "北部",
    category: "美食",
    tags: ["美食", "夜市", "購物"],
    type: "food",
    price: 1,
    bestTime: "night",
    image: "https://loremflickr.com/800/600/shilin,food",
    description: "觀光客必訪，超大雞排與生炒花枝。",
  },
  {
    id: 132,
    name: "北投溫泉博物館",
    city: "台北",
    district: "北投區",
    region: "北部",
    category: "放鬆",
    tags: ["放鬆", "歷史", "文化"],
    type: "spot",
    price: 1,
    bestTime: "day",
    image: "https://loremflickr.com/800/600/beitou,hotspring",
    description: "日式溫泉浴場古蹟。",
  },
  {
    id: 134,
    name: "三二行館",
    city: "台北",
    district: "北投區",
    region: "北部",
    category: "放鬆",
    tags: ["放鬆", "奢華", "溫泉"],
    type: "spot",
    price: 3,
    bestTime: "any",
    image: "https://loremflickr.com/800/600/villa,luxury",
    description: "極致隱密的奢華溫泉體驗。",
  },

  // --- 台南 (Tainan) ---
  {
    id: 301,
    name: "赤崁樓",
    city: "台南",
    district: "中西區",
    region: "南部",
    category: "歷史",
    tags: ["歷史", "文化"],
    type: "spot",
    price: 1,
    bestTime: "any",
    image: "https://loremflickr.com/800/600/chikan,tower",
    description: "荷治時期古蹟，台南地標。",
  },
  {
    id: 302,
    name: "林百貨",
    city: "台南",
    district: "中西區",
    region: "南部",
    category: "購物",
    tags: ["購物", "歷史", "文創"],
    type: "spot",
    price: 1,
    bestTime: "any",
    image: "https://loremflickr.com/800/600/department,vintage",
    description: "全台最古老的百貨公司之一。",
  },
  {
    id: 303,
    name: "台南美術館二館",
    city: "台南",
    district: "中西區",
    region: "南部",
    category: "文化",
    tags: ["文化", "攝影", "藝術"],
    type: "spot",
    price: 1,
    bestTime: "day",
    image: "https://loremflickr.com/800/600/tainan,art",
    description: "純白幾何建築，光影絕美。",
  },
  {
    id: 304,
    name: "阿霞飯店",
    city: "台南",
    district: "中西區",
    region: "南部",
    category: "美食",
    tags: ["美食", "聚餐", "經典"],
    type: "food",
    price: 3,
    bestTime: "any",
    image: "https://loremflickr.com/800/600/crab,feast",
    description: "國宴級的經典台菜紅蟳米糕。",
  },
  {
    id: 306,
    name: "國華街小吃",
    city: "台南",
    district: "中西區",
    region: "南部",
    category: "美食",
    tags: ["美食", "小吃"],
    type: "food",
    price: 1,
    bestTime: "day",
    image: "https://loremflickr.com/800/600/streetfood,tainan",
    description: "美食一級戰區，富盛號、金得春捲。",
  },
  {
    id: 310,
    name: "安平古堡",
    city: "台南",
    district: "安平區",
    region: "南部",
    category: "歷史",
    tags: ["歷史", "文化"],
    type: "spot",
    price: 1,
    bestTime: "day",
    image: "https://loremflickr.com/800/600/fort,anping",
    description: "台灣最古老的城堡。",
  },
  {
    id: 311,
    name: "安平樹屋",
    city: "台南",
    district: "安平區",
    region: "南部",
    category: "自然",
    tags: ["自然", "攝影"],
    type: "spot",
    price: 1,
    bestTime: "day",
    image: "https://loremflickr.com/800/600/banyan,ruin",
    description: "樹以牆為幹，屋以葉為瓦。",
  },
  {
    id: 312,
    name: "周氏蝦捲",
    city: "台南",
    district: "安平區",
    region: "南部",
    category: "美食",
    tags: ["美食", "小吃"],
    type: "food",
    price: 1,
    bestTime: "any",
    image: "https://loremflickr.com/800/600/shrimp,roll",
    description: "安平必吃酥脆炸蝦捲。",
  },
  {
    id: 313,
    name: "同記安平豆花",
    city: "台南",
    district: "安平區",
    region: "南部",
    category: "美食",
    tags: ["美食", "甜點"],
    type: "food",
    price: 1,
    bestTime: "any",
    image: "https://loremflickr.com/800/600/tofu,dessert",
    description: "綿密滑順的傳統豆花。",
  },
  {
    id: 320,
    name: "奇美博物館",
    city: "台南",
    district: "仁德區",
    region: "南部",
    category: "文化",
    tags: ["文化", "藝術", "攝影"],
    type: "spot",
    price: 2,
    bestTime: "day",
    image: "https://loremflickr.com/800/600/museum,white",
    description: "歐式宮殿與豐富館藏。",
  },
  {
    id: 322,
    name: "花園夜市",
    city: "台南",
    district: "北區",
    region: "南部",
    category: "美食",
    tags: ["美食", "夜市"],
    type: "food",
    price: 1,
    bestTime: "night",
    image: "https://loremflickr.com/800/600/nightmarket,banner",
    description: "南部最大夜市，美食聚集。",
  },

  // --- 高雄 (Kaohsiung) ---
  {
    id: 420,
    name: "夢時代購物中心",
    city: "高雄",
    district: "前鎮區",
    region: "南部",
    category: "購物",
    tags: ["購物", "美食", "親子"],
    type: "spot",
    price: 2,
    bestTime: "any",
    image: "https://loremflickr.com/800/600/mall,dreammall",
    description: "結合購物、美食與摩天輪的大型廣場。",
  },
  {
    id: 421,
    name: "漢神巨蛋",
    city: "高雄",
    district: "左營區",
    region: "南部",
    category: "購物",
    tags: ["購物", "美食", "時尚"],
    type: "spot",
    price: 2,
    bestTime: "any",
    image: "https://loremflickr.com/800/600/mall,shopping",
    description: "北高雄最熱鬧的時尚地標。",
  },
  {
    id: 422,
    name: "新堀江商圈",
    city: "高雄",
    district: "新興區",
    region: "南部",
    category: "購物",
    tags: ["購物", "美食", "潮流"],
    type: "spot",
    price: 1,
    bestTime: "any",
    image: "https://loremflickr.com/800/600/street,fashion",
    description: "高雄的西門町，年輕潮流聚集地。",
  },
  {
    id: 423,
    name: "SKM Park Outlets",
    city: "高雄",
    district: "前鎮區",
    region: "南部",
    category: "購物",
    tags: ["購物", "冒險", "親子"],
    type: "spot",
    price: 2,
    bestTime: "any",
    image: "https://loremflickr.com/800/600/outlet,park",
    description: "美式樂園風格的 Outlet 購物勝地。",
  },
  {
    id: 424,
    name: "義大世界",
    city: "高雄",
    district: "大樹區",
    region: "南部",
    category: "冒險",
    tags: ["購物", "冒險", "親子"],
    type: "spot",
    price: 2,
    bestTime: "day",
    image: "https://loremflickr.com/800/600/themepark,ferris",
    description: "結合遊樂園與購物廣場的度假勝地。",
  },
  {
    id: 425,
    name: "三多商圈",
    city: "高雄",
    district: "苓雅區",
    region: "南部",
    category: "購物",
    tags: ["購物", "電影", "時尚"],
    type: "spot",
    price: 2,
    bestTime: "any",
    image: "https://loremflickr.com/800/600/department,store",
    description: "百貨公司林立的繁華商圈。",
  },

  // Food
  {
    id: 430,
    name: "興隆居",
    city: "高雄",
    district: "前金區",
    region: "南部",
    category: "美食",
    tags: ["美食", "早餐"],
    type: "food",
    price: 1,
    bestTime: "day",
    image: "https://loremflickr.com/800/600/bao,breakfast",
    description: "排隊必吃的傳統湯包燒餅早餐。",
  },
  {
    id: 431,
    name: "鴨肉珍",
    city: "高雄",
    district: "鹽埕區",
    region: "南部",
    category: "美食",
    tags: ["美食", "小吃"],
    type: "food",
    price: 1,
    bestTime: "any",
    image: "https://loremflickr.com/800/600/duck,rice",
    description: "鹽埕區超過一甲子的老字號鴨肉飯。",
  },
  {
    id: 432,
    name: "碳佐麻里",
    city: "高雄",
    district: "鼓山區",
    region: "南部",
    category: "美食",
    tags: ["美食", "燒肉", "奢華"],
    type: "food",
    price: 3,
    bestTime: "any",
    image: "https://loremflickr.com/800/600/bbq,grill",
    description: "南部燒肉霸主，環境大氣優美。",
  },

  // Yancheng/Gushan Classics
  {
    id: 401,
    name: "駁二藝術特區",
    city: "高雄",
    district: "鹽埕區",
    region: "南部",
    category: "文化",
    tags: ["文化", "攝影", "展覽"],
    type: "spot",
    price: 1,
    bestTime: "day",
    image: "https://loremflickr.com/800/600/pier2,art",
    description: "海港倉庫改建的文創基地。",
  },
  {
    id: 402,
    name: "樺達奶茶",
    city: "高雄",
    district: "鹽埕區",
    region: "南部",
    category: "美食",
    tags: ["美食", "飲料"],
    type: "food",
    price: 1,
    bestTime: "any",
    image: "https://loremflickr.com/800/600/milktea,bubble",
    description: "高雄老字號奶茶創始店。",
  },
  {
    id: 403,
    name: "旗津老街",
    city: "高雄",
    district: "旗津區",
    region: "南部",
    category: "美食",
    tags: ["美食", "海鮮"],
    type: "food",
    price: 1,
    bestTime: "any",
    image: "https://loremflickr.com/800/600/seafood,street",
    description: "新鮮海產與烤魷魚。",
  },
  {
    id: 404,
    name: "旗津彩虹教堂",
    city: "高雄",
    district: "旗津區",
    region: "南部",
    category: "攝影",
    tags: ["攝影", "網美"],
    type: "spot",
    price: 1,
    bestTime: "day",
    image: "https://loremflickr.com/800/600/rainbow,church",
    description: "海邊的色彩繽紛裝置藝術。",
  },
  {
    id: 405,
    name: "西子灣夕陽",
    city: "高雄",
    district: "鼓山區",
    region: "南部",
    category: "自然",
    tags: ["自然", "攝影", "浪漫"],
    type: "spot",
    price: 1,
    bestTime: "any",
    image: "https://loremflickr.com/800/600/sunset,ocean",
    description: "高雄八景之一。",
  },
  {
    id: 410,
    name: "瑞豐夜市",
    city: "高雄",
    district: "左營區",
    region: "南部",
    category: "美食",
    tags: ["美食", "夜市"],
    type: "food",
    price: 1,
    bestTime: "night",
    image: "https://loremflickr.com/800/600/nightmarket,kaohsiung",
    description: "人氣最旺的觀光夜市。",
  },
  {
    id: 411,
    name: "衛武營國家藝術中心",
    city: "高雄",
    district: "鳳山區",
    region: "南部",
    category: "文化",
    tags: ["文化", "建築", "攝影"],
    type: "spot",
    price: 1,
    bestTime: "any",
    image: "https://loremflickr.com/800/600/weiwuying,architecture",
    description: "世界最大單一屋頂劇院。",
  },
  {
    id: 412,
    name: "六合夜市",
    city: "高雄",
    district: "新興區",
    region: "南部",
    category: "美食",
    tags: ["美食", "夜市"],
    type: "food",
    price: 1,
    bestTime: "night",
    image: "https://loremflickr.com/800/600/nightmarket,street",
    description: "知名觀光夜市。",
  },
];

// --- 2. Types & Constants ---
type Companion = "Solo" | "Couple" | "Family" | "Friends";
type Pace = "Slow" | "Balanced" | "Fast";
type Theme =
  | "Culture"
  | "Food"
  | "Nature"
  | "Shopping"
  | "Adventure"
  | "Relaxation"
  | "Photography"
  | "History";
type Budget = 1 | 2 | 3;

interface ExpenseItem {
  id: string;
  label: string;
  amount: number;
}

interface TripItem {
  time: string;
  place: PlaceData;
  reason: string;
  note?: string;
  mapLink?: string;
  expenseItems?: ExpenseItem[];
  cost?: number; // Total calculated
}

interface ItineraryDay {
  day: number;
  items: TripItem[];
}

const THEMES: { id: Theme; label: string }[] = [
  { id: "Culture", label: "文化" },
  { id: "Food", label: "美食" },
  { id: "Nature", label: "自然" },
  { id: "Shopping", label: "購物" },
  { id: "Adventure", label: "冒險" },
  { id: "Relaxation", label: "放鬆" },
  { id: "Photography", label: "攝影" },
  { id: "History", label: "歷史" },
];

const COMPANION_OPTIONS: { id: Companion; icon: any; label: string }[] = [
  { id: "Solo", icon: User, label: "獨旅" },
  { id: "Couple", icon: Heart, label: "情侶" },
  { id: "Family", icon: Users, label: "親子" },
  { id: "Friends", icon: Smile, label: "朋友" },
];

const PACE_OPTIONS: { id: Pace; emoji: string; title: string; desc: string }[] =
  [
    { id: "Slow", emoji: "🐢", title: "慢活", desc: "Chill" },
    { id: "Balanced", emoji: "🚶", title: "舒適", desc: "Balanced" },
    { id: "Fast", emoji: "🐇", title: "充實", desc: "Packed" },
  ];

const BUDGET_OPTIONS: { id: Budget; title: string; desc: string; icon: any }[] =
  [
    { id: 1, title: "經濟實惠", desc: "夜市小吃、免費景點", icon: DollarSign },
    { id: 2, title: "經典標準", desc: "人氣餐廳、在地體驗", icon: Utensils },
    { id: 3, title: "精緻奢華", desc: "精緻料理、舒適享受", icon: Sparkles },
  ];

// --- 3. Component Wrapper for Suspense ---
export default function PlannerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFF9F2] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#D97C5F]"></div>
        </div>
      }
    >
      <PlannerContent />
    </Suspense>
  );
}

function PlannerContent() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<"input" | "result">("input");
  const [isLoading, setIsLoading] = useState(false);

  // Toast State
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Inputs
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState(3);
  const [companion, setCompanion] = useState<Companion>("Couple");
  const [themes, setThemes] = useState<Theme[]>([]);
  const [pace, setPace] = useState<Pace>("Balanced");
  const [budget, setBudget] = useState<Budget>(2);

  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  // Voting Hub State
  const [votingSpots, setVotingSpots] = useState<PlaceData[]>([]);
  const [votes, setVotes] = useState<Record<number, number>>({});
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const [hasVoted, setHasVoted] = useState<Record<number, boolean>>({});

  // Drag and Drop State
  const [draggedItem, setDraggedItem] = useState<{
    dayIdx: number;
    itemIdx: number;
  } | null>(null);
  const [dragOverItem, setDragOverItem] = useState<{
    dayIdx: number;
    itemIdx: number;
  } | null>(null);

  // Editing State
  const [editingItem, setEditingItem] = useState<{
    dayIdx: number;
    itemIdx: number;
    data: TripItem;
  } | null>(null);
  const [editingCost, setEditingCost] = useState<{
    dayIdx: number;
    itemIdx: number;
    data: TripItem;
  } | null>(null);
  const [activeExpenseItemIdx, setActiveExpenseItemIdx] = useState<number>(0);

  const handleDragStart = (dayIdx: number, itemIdx: number) => {
    setDraggedItem({ dayIdx, itemIdx });
  };

  const handleDragOver = (
    e: React.DragEvent,
    dayIdx: number,
    itemIdx: number
  ) => {
    e.preventDefault();
    if (
      draggedItem &&
      (draggedItem.dayIdx !== dayIdx || draggedItem.itemIdx !== itemIdx)
    ) {
      setDragOverItem({ dayIdx, itemIdx });
    }
  };

  const handleDrop = (
    e: React.DragEvent,
    targetDayIdx: number,
    targetItemIdx: number
  ) => {
    e.preventDefault();
    if (!draggedItem) return;

    const newItinerary = [...itinerary];
    const sourceDay = newItinerary[draggedItem.dayIdx];
    const targetDay = newItinerary[targetDayIdx];

    const [movedItem] = sourceDay.items.splice(draggedItem.itemIdx, 1);
    targetDay.items.splice(targetItemIdx, 0, movedItem);

    setItinerary(newItinerary);
    setDraggedItem(null);
    setDragOverItem(null);
    setIsSaved(false);
  };

  const saveEdit = () => {
    if (!editingItem) return;
    const newItinerary = [...itinerary];
    newItinerary[editingItem.dayIdx].items[editingItem.itemIdx] =
      editingItem.data;
    setItinerary(newItinerary);
    setEditingItem(null);
    setIsSaved(false);
  };

  const deleteItem = (dayIdx: number, itemIdx: number) => {
    const newItinerary = [...itinerary];
    newItinerary[dayIdx].items.splice(itemIdx, 1);
    setItinerary(newItinerary);
    setEditingItem(null);
    setIsSaved(false);
  };

  const addItem = (dayIdx: number) => {
    const newItem: TripItem = {
      time: "09:00",
      place: {
        id: Date.now(),
        name: "新行程點",
        city: "台北",
        district: "",
        region: "北部",
        category: "自訂行程",
        tags: [],
        type: "spot",
        price: 1,
        bestTime: "any",
        image:
          "https://images.unsplash.com/photo-1541414779247-679542fb6d01?q=80&w=400&auto=format&fit=crop",
        description: "手動新增的景點描述",
      },
      reason: "手動新增的景點",
      expenseItems: [],
    };
    const newItinerary = [...itinerary];
    newItinerary[dayIdx].items.push(newItem);
    setItinerary(newItinerary);
    setEditingItem({
      dayIdx,
      itemIdx: newItinerary[dayIdx].items.length - 1,
      data: newItem,
    });
    setIsSaved(false);
  };

  const saveCostEdit = () => {
    if (!editingCost) return;
    const newItinerary = [...itinerary];
    newItinerary[editingCost.dayIdx].items[editingCost.itemIdx] =
      editingCost.data;
    setItinerary(newItinerary);
    setEditingCost(null);
    setIsSaved(false);
  };

  // Deep Load Effect (Handling ?planId=...)
  useEffect(() => {
    const planId = searchParams.get("planId");
    if (planId) {
      const savedPlans = JSON.parse(
        localStorage.getItem("my-custom-plans") || "[]"
      );
      const plan = savedPlans.find((p: any) => p.id === planId);

      if (plan) {
        setLocation(plan.location);
        setDuration(plan.duration);
        setItinerary(plan.itinerary);
        setIsSaved(true);

        // Map Companion label back to ID
        const compOpt = COMPANION_OPTIONS.find(
          (o) => o.label === plan.companion
        );
        if (compOpt) setCompanion(compOpt.id);

        // Map Theme labels back to IDs
        const themeIds = plan.themes
          ?.map((label: string) => THEMES.find((t) => t.label === label)?.id)
          .filter(Boolean) as Theme[];
        setThemes(themeIds);

        setStep("result");
      }
    }
  }, [searchParams]);

  // --- Helpers ---
  const toggleTheme = (theme: Theme) => {
    setThemes((prev) => {
      if (prev.includes(theme)) return prev.filter((t) => t !== theme);
      if (prev.length < 3) return [...prev, theme];
      return prev;
    });
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const parseLocationStr = (input: string) => {
    const lower = input.toLowerCase().trim();
    if (lower.match(/taipei|台北/)) return { type: "city", value: "台北" };
    if (lower.match(/tainan|台南/)) return { type: "city", value: "台南" };
    if (lower.match(/kaohsiung|高雄/)) return { type: "city", value: "高雄" };
    return { type: "city", value: "台北" };
  };

  // --- Weighted Scoring Algorithm with Geographic Clustering ---
  const generateItinerary = () => {
    if (!location.trim()) {
      triggerToast("請輸入想去的城市 (例如：台北、台南)");
      return;
    }
    if (themes.length === 0) {
      triggerToast("請至少選擇 1 個旅遊風格");
      return;
    }

    setIsLoading(true);
    setIsSaved(false);

    setTimeout(() => {
      const parsedLoc = parseLocationStr(location);
      const targetCity = parsedLoc.value;

      let cityPool = placesPool.filter(
        (p) => !targetCity || p.city === targetCity
      );
      if (cityPool.length === 0)
        cityPool = placesPool.filter((p) => p.region === "北部");

      // Define proximity groups for each city
      const proximityGroups: Record<string, string[][]> = {
        高雄: [
          ["前鎮區", "苓雅區", "新興區", "前金區"], // Central Kaohsiung
          ["鹽埕區", "鼓山區", "旗津區"], // Harbor Area
          ["左營區", "楠梓區"], // North Kaohsiung
          ["鳳山區", "三民區"], // East Kaohsiung
          ["大樹區", "大寮區"], // Far East (Yida World)
        ],
        台北: [
          ["信義區", "大安區", "松山區"], // East Taipei
          ["中正區", "萬華區", "中山區"], // Central/West Taipei
          ["大同區", "中山區"], // Dadaocheng Area
          ["士林區", "北投區"], // North Taipei
          ["內湖區", "南港區"], // East Tech Area
        ],
        台南: [
          ["中西區", "北區", "南區"], // Central Tainan
          ["安平區", "安南區"], // Anping Area
          ["仁德區", "歸仁區"], // East Tainan (Chimei)
          ["東區", "永康區"], // Yongkang Area
        ],
      };

      const getProximityGroup = (
        city: string,
        district: string
      ): string[] | null => {
        const groups = proximityGroups[city];
        if (!groups) return null;
        return groups.find((g) => g.includes(district)) || null;
      };

      interface ScoredPlace extends PlaceData {
        score: number;
      }

      // Get theme labels for filtering
      const selectedThemeLabels = themes
        .map((t) => THEMES.find((th) => th.id === t)?.label)
        .filter(Boolean) as string[];
      const userWantsShopping = themes.includes("Shopping");
      const userWantsFood = themes.includes("Food");

      // Hard filter: Only include places that match at least one selected theme
      // Exception: If this leaves too few places, fall back to full pool
      let themeFilteredPool = cityPool.filter((place) => {
        // If user selected specific themes, only include matching places
        const hasMatchingTag = selectedThemeLabels.some((label) =>
          place.tags.includes(label)
        );
        // Exclude shopping places if user didn't want shopping
        if (!userWantsShopping && place.tags.includes("購物")) return false;
        return hasMatchingTag;
      });

      // Fallback if filtered pool is too small
      if (themeFilteredPool.length < duration * 3) {
        themeFilteredPool = cityPool.filter((place) => {
          // Still exclude shopping if not selected
          if (!userWantsShopping && place.tags.includes("購物")) return false;
          return true;
        });
      }

      const scoredPool: ScoredPlace[] = themeFilteredPool
        .map((place) => {
          let score = 0;
          const interestMatch = selectedThemeLabels.some((label) =>
            place.tags.includes(label)
          );
          if (interestMatch) score += 10;
          if (userWantsFood && place.tags.includes("美食")) score += 5;
          if (place.price === budget) score += 2;
          score += Math.random() * 2;
          return { ...place, score };
        })
        .sort((a, b) => b.score - a.score);

      // Determine daily activity count based on pace
      const getActivitiesForPace = (): { spots: number; foods: number } => {
        switch (pace) {
          case "Slow":
            return { spots: 2, foods: 1 }; // 2 spots + 1 meal = 3 total
          case "Balanced":
            return { spots: 2, foods: 2 }; // 2 spots + 2 meals = 4 total
          case "Fast":
            return { spots: 3, foods: 2 }; // 3 spots + 2 meals = 5 total
          default:
            return { spots: 2, foods: 2 };
        }
      };
      const paceConfig = getActivitiesForPace();

      const days: ItineraryDay[] = [];
      const usedIds = new Set<number>();
      let currentProximityGroup: string[] | null = null;

      for (let d = 1; d <= duration; d++) {
        const dailyActivities: TripItem[] = [];
        // Reset proximity group at the start of each new day
        currentProximityGroup = null;

        const pickSpot = (
          slotType: "spot" | "food",
          timeSlot: "day" | "night" | "any"
        ) => {
          let candidates = scoredPool.filter((p) => !usedIds.has(p.id));
          if (timeSlot === "night") {
            candidates = candidates.filter(
              (p) => p.bestTime === "night" || p.bestTime === "any"
            );
          } else {
            candidates = candidates.filter((p) => p.bestTime !== "night");
          }
          candidates = candidates.filter((p) => p.type === slotType);
          if (candidates.length === 0) return null;

          let bestMatch: ScoredPlace | undefined;

          // If we have an established proximity group for the day, strongly prefer candidates from it
          if (currentProximityGroup && currentProximityGroup.length > 0) {
            const nearCandidates = candidates.filter((p) =>
              currentProximityGroup!.includes(p.district)
            );
            if (nearCandidates.length > 0) {
              // Pick highest scored from nearby group
              bestMatch = nearCandidates[0];
            }
          }

          // If no nearby match, pick the highest scored overall and set a new group
          if (!bestMatch) {
            bestMatch = candidates[0];
            // Establish or switch to a new proximity group based on this pick
            currentProximityGroup = getProximityGroup(
              bestMatch.city,
              bestMatch.district
            ) || [bestMatch.district];
          }

          if (bestMatch) {
            usedIds.add(bestMatch.id);
            // Update group if this pick's group is more specific
            const newGroup = getProximityGroup(
              bestMatch.city,
              bestMatch.district
            );
            if (newGroup) currentProximityGroup = newGroup;
            return bestMatch;
          }
          return null;
        };

        // Morning activity
        const morning = pickSpot("spot", "day");
        if (morning)
          dailyActivities.push({
            time: "上午",
            place: morning,
            reason: "前往探索",
          });

        // Lunch (only if pace allows 2 meals)
        if (paceConfig.foods >= 1) {
          const lunch = pickSpot("food", "day");
          if (lunch)
            dailyActivities.push({
              time: "午餐",
              place: lunch,
              reason: "享用美食",
            });
        }

        // Afternoon activity (only if pace allows 2+ spots)
        if (paceConfig.spots >= 2) {
          const afternoon = pickSpot("spot", "day");
          if (afternoon)
            dailyActivities.push({
              time: "下午",
              place: afternoon,
              reason: "午後散策",
            });
        }

        // Dinner (only if pace allows 2 meals)
        if (paceConfig.foods >= 2) {
          const dinner = pickSpot("food", "night");
          if (dinner)
            dailyActivities.push({
              time: "晚餐",
              place: dinner,
              reason: "美味晚餐",
            });
        }

        // Evening activity (only for fast pace)
        if (paceConfig.spots >= 3) {
          const evening = pickSpot("spot", "night");
          if (evening)
            dailyActivities.push({
              time: "晚上",
              place: evening,
              reason: "夜間活動",
            });
        }

        if (dailyActivities.length > 0) {
          days.push({ day: d, items: dailyActivities });
        }
      }

      setItinerary(days);
      
      // Select candidate spots for voting (un-used high-scored spots)
      const candidates = scoredPool
        .filter(p => !usedIds.has(p.id))
        .slice(0, 4);
      setVotingSpots(candidates);
      
      // Initial mock votes
      const initialVotes: Record<number, number> = {};
      candidates.forEach(c => {
        initialVotes[c.id] = Math.floor(Math.random() * 3);
      });
      setVotes(initialVotes);
      setHasVoted({});

      setStep("result");
      setIsLoading(false);
    }, 1500);
  };

  const saveToMyList = () => {
    if (isSaved) return;
    const planId = `plan-${Date.now()}`;
    const newPlan = {
      id: planId,
      createdAt: new Date().toISOString(),
      location: location || "探索台灣",
      duration: duration,
      companion: COMPANION_OPTIONS.find((c) => c.id === companion)?.label,
      themes: themes.map((tId) => THEMES.find((t) => t.id === tId)?.label),
      itinerary: itinerary,
    };
    const existingPlans = JSON.parse(
      localStorage.getItem("my-custom-plans") || "[]"
    );
    localStorage.setItem(
      "my-custom-plans",
      JSON.stringify([newPlan, ...existingPlans])
    );
    setIsSaved(true);
    triggerToast("已成功收藏至我的收藏清單！");
  };

  const Toast = () => (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] animate-bounce-in">
      <div className="bg-[#2C1810] text-[#FFF9F2] px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-4 border border-[#D97C5F]/30 backdrop-blur-xl">
        <div className="w-8 h-8 rounded-full bg-[#D97C5F]/20 flex items-center justify-center">
          <Heart size={16} className="text-[#D97C5F] fill-current" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm tracking-wide">
            {toastMessage}
          </span>
          <Link
            href="/my-list"
            className="text-[10px] text-[#D97C5F] font-bold underline underline-offset-2 hover:text-[#D97C5F]/80 transition-colors"
          >
            點此查看收藏
          </Link>
        </div>
        <button
          onClick={() => setShowToast(false)}
          className="ml-2 text-stone-500 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );

  if (step === "input") {
    return (
      <div className="min-h-screen bg-[#FFF9F2] py-8 px-4 animate-fade-in font-sans text-[#2C1810] flex items-center justify-center relative">
        {showToast && <Toast />}
        {isLoading && (
          <div className="fixed inset-0 bg-white/80 backdrop-blur-md z-50 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#D97C5F] mb-6"></div>
            <p className="text-[#D97C5F] font-serif text-2xl font-bold animate-pulse">
              AI 智慧路徑運算中...
            </p>
          </div>
        )}
        <div className="max-w-xl w-full mx-auto space-y-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-stone-100 p-6 md:p-8 transform transition-all hover:shadow-2xl">
          <div className="text-left mb-8">
            <h1 className="text-3xl font-black tracking-tight text-[#2C1810] font-serif mb-1">
              AI 智慧行程規劃
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              告訴我們您的喜好，為您量身打造專屬的台灣之旅。
            </p>
          </div>
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
              想去哪裡玩？
            </label>
            <div className="relative group">
              <input
                type="text"
                placeholder="例如：台北、台南、高雄..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-white rounded-xl h-12 px-4 pl-10 text-sm font-bold outline-none border border-stone-200 shadow-sm focus:ring-2 focus:ring-[#D97C5F]/50 focus:border-[#D97C5F] transition-all placeholder:font-normal placeholder:text-gray-300 hover:border-[#D97C5F]/30"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none group-focus-within:text-[#D97C5F] transition-colors" />
            </div>
          </div>
          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                旅遊天數
              </label>
              <span className="text-xl font-black text-[#D97C5F] font-serif">
                {duration} 天
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-full cursor-pointer accent-[#D97C5F]"
            />
          </div>
          <div className="space-y-3 pt-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
              旅遊步調
            </label>
            <div className="grid grid-cols-3 gap-3">
              {PACE_OPTIONS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPace(p.id)}
                  className={`h-10 rounded-xl text-xs font-bold transition-all border flex items-center justify-center shadow-sm ${
                    pace === p.id
                      ? "bg-[#D97C5F] text-white border-[#D97C5F]"
                      : "bg-white text-gray-500 border-stone-200"
                  }`}
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3 pt-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
              旅伴是誰？
            </label>
            <div className="grid grid-cols-4 gap-3">
              {COMPANION_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setCompanion(opt.id)}
                  className={`flex flex-col items-center justify-center h-20 rounded-xl border transition-all cursor-pointer shadow-sm ${
                    companion === opt.id
                      ? "bg-[#D97C5F]/5 border-[#D97C5F] text-[#D97C5F]"
                      : "bg-white border-stone-200 text-gray-400"
                  }`}
                >
                  <opt.icon size={20} className="mb-1.5" />
                  <span className="text-[10px] font-bold">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3 pt-2">
            <div className="flex justify-between px-1">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                旅遊風格 (最多3項)
              </label>
              <span className="text-xs font-bold text-[#D97C5F]">
                {themes.length}/3
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => toggleTheme(t.id)}
                  className={`h-12 rounded-xl text-xs font-bold border flex items-center justify-center shadow-sm ${
                    themes.includes(t.id)
                      ? "bg-[#D97C5F] text-white border-[#D97C5F]"
                      : "bg-white text-stone-500 border-stone-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3 pt-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
              預算與飲食風格
            </label>
            <div className="grid grid-cols-3 gap-3">
              {BUDGET_OPTIONS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBudget(b.id)}
                  className={`flex flex-col items-center justify-center h-24 rounded-xl border transition-all cursor-pointer shadow-sm px-2 text-center ${
                    budget === b.id
                      ? "bg-[#D97C5F]/5 border-[#D97C5F] text-[#D97C5F] ring-1 ring-[#D97C5F]"
                      : "bg-white border-stone-200 text-gray-400 hover:border-[#D97C5F]/50"
                  }`}
                >
                  <b.icon size={20} className="mb-2" />
                  <span className="text-xs font-bold mb-1">{b.title}</span>
                  <span className="text-[9px] opacity-70 leading-tight">
                    {b.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="pt-4">
            <button
              onClick={generateItinerary}
              className="w-full bg-[#2C1810] text-[#FFF9F2] text-sm font-bold py-4 rounded-xl shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2"
            >
              <span>開始規劃行程</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F2] animate-fade-in text-[#2C1810]">
      {showToast && <Toast />}
      <div className="bg-gradient-to-br from-[#F5E6DA] to-[#F5E6DA] px-6 py-12 md:py-16 border-b border-[#5A3E36]/5 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#5A3E36] mb-3 font-serif">
                您的專屬旅程
              </h2>
              <p className="text-[#5A3E36]/80 text-sm md:text-base max-w-2xl leading-relaxed">
                這是一趟舒適的旅程，專為喜愛{" "}
                {themes.length > 0
                  ? themes
                      .map((tId) => THEMES.find((t) => t.id === tId)?.label)
                      .join("、")
                  : "旅行"}{" "}
                的您設計。
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={saveToMyList}
                disabled={isSaved}
                className={`px-6 py-2.5 rounded-full transition-all flex items-center gap-2 text-sm shadow-md font-bold ${
                  isSaved
                    ? "bg-white text-[#D97C5F] border border-[#D97C5F]/20 cursor-default"
                    : "bg-[#D97C5F] text-white hover:bg-[#b05a40]"
                }`}
              >
                <Heart size={16} className={isSaved ? "fill-current" : ""} />
                {isSaved ? "已收藏到我的清單" : "收藏此行程"}
              </button>
              <button
                onClick={() => {
                  setItinerary([]);
                  setStep("input");
                }}
                className="px-6 py-2.5 bg-[#5A3E36] text-white rounded-full hover:bg-[#4A3728] transition-all flex items-center gap-2 text-sm shadow-md group font-bold"
              >
                <RefreshCw
                  size={16}
                  className="group-hover:rotate-180 transition-transform duration-500"
                />{" "}
                重新規劃
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 bg-white/40 rounded-[2rem] p-8 backdrop-blur-md border border-white/60 shadow-sm">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5A3E36]/50">
                目的地
              </span>
              <div className="flex items-center gap-3 text-lg font-bold text-[#5A3E36]">
                <MapPin size={20} className="text-[#D97C5F] opacity-90" />
                {location || "探索台灣"}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5A3E36]/50">
                旅遊天數
              </span>
              <div className="flex items-center gap-3 text-lg font-bold text-[#5A3E36]">
                <Calendar size={20} className="text-[#D97C5F] opacity-90" />
                {duration} 天
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5A3E36]/50">
                旅伴
              </span>
              <div className="flex items-center gap-3 text-lg font-bold text-[#5A3E36]">
                <Users size={20} className="text-[#D97C5F] opacity-90" />
                {COMPANION_OPTIONS.find((c) => c.id === companion)?.label}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5A3E36]/50">
                預算/風格
              </span>
              <div className="flex items-center gap-3 text-lg font-bold text-[#5A3E36]">
                <Wallet size={20} className="text-[#D97C5F] opacity-90" />
                {budget === 1
                  ? "經濟實惠"
                  : budget === 3
                  ? "精緻奢華"
                  : "經典標準"}
              </div>
            </div>
            <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5A3E36]/50">
                旅遊偏好
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {themes.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 bg-[#D97C5F]/10 border border-[#D97C5F]/20 text-[#D97C5F] text-[10px] font-bold rounded-lg whitespace-nowrap"
                  >
                    {THEMES.find((opt) => opt.id === t)?.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-white/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-64 h-64 bg-[#D97C5F]/5 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-8">
        {/* Weather & Booking Quick Links (New Feature) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Weather Widget */}
          <div className="bg-white/40 backdrop-blur-md rounded-2xl p-5 border border-white/60 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                <Cloud size={24} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#2C1810]">
                  {location || "預定目的地"} 天氣預報
                </h4>
                <p className="text-[10px] text-stone-500 font-medium">
                  預計旅程期間：22°C - 26°C / 晴時多雲
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xl font-black text-blue-600 font-serif">
                24°C
              </span>
              <span className="text-[9px] font-bold text-blue-400 uppercase tracking-tighter">
                Good for Travel
              </span>
            </div>
          </div>

          {/* Booking Quick Links */}
          <div className="bg-white/40 backdrop-blur-md rounded-2xl p-5 border border-white/60 shadow-sm flex items-center gap-3">
            <a
              href="https://www.skyscanner.com.tw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#2C1810] hover:bg-black text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 transition-all group"
            >
              <Plane
                size={16}
                className="group-hover:-translate-y-1 transition-transform"
              />
              <span className="text-xs font-bold">訂機票</span>
            </a>
            <a
              href="https://www.booking.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#D97C5F] hover:bg-[#b05a40] text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 transition-all group"
            >
              <Bed
                size={16}
                className="group-hover:-translate-y-1 transition-transform"
              />
              <span className="text-xs font-bold">訂飯店</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-6">

        {/* Collaborative Voting Hub Entry (NEW) */}
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white shadow-xl mb-8 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D97C5F]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#D97C5F]/20 transition-all"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-terracotta/10 flex items-center justify-center text-terracotta animate-bounce-subtle">
                <Users size={28} />
              </div>
              <div>
                <h4 className="text-lg font-black text-[#2C1810]">旅伴互動投票區 <span className="text-terracotta">CO-VOTE</span></h4>
                <p className="text-[11px] text-stone-500 font-bold mt-0.5">
                  行程不再是一人的壓力！分享候選名單，讓旅伴決定最終驚喜。
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-stone-100 flex items-center justify-center overflow-hidden">
                        <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" width={24} height={24} />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-stone-400">目前有 3 位旅伴正在查看行程...</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button 
                onClick={() => setIsVoteModalOpen(true)}
                className="flex-1 md:flex-none px-6 py-3.5 bg-terracotta text-white rounded-xl font-bold text-sm shadow-lg shadow-terracotta/20 hover:bg-[#b05a40] transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <ThumbsUp size={18} /> 候選景點投票
                {Object.values(votes).some(v => v > 0) && (
                  <span className="bg-white text-terracotta w-5 h-5 rounded-full flex items-center justify-center text-[10px] animate-pulse">
                    {Object.values(votes).reduce((a, b) => a + b, 0)}
                  </span>
                )}
              </button>
              <button 
                onClick={() => {
                  setToastMessage("分享連結已複製！快發送給旅伴吧 🚀");
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 3000);
                }}
                className="p-3.5 bg-white text-stone-400 border border-stone-200 rounded-xl hover:text-terracotta hover:border-terracotta/30 transition-all flex items-center justify-center"
                title="邀請旅伴"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-12">
        {/* Energy & Logistics Traffic Light (New AI Feature) */}
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-stone-100 flex items-center justify-center relative overflow-hidden">
                <div
                  className={clsx(
                    "absolute bottom-0 left-0 w-full transition-all duration-1000",
                    itinerary[0]?.items.length > 4
                      ? "bg-red-400 h-[85%]"
                      : itinerary[0]?.items.length > 3
                      ? "bg-amber-400 h-[60%]"
                      : "bg-emerald-400 h-[40%]"
                  )}
                />
                <span className="relative z-10 font-black text-xl text-[#2C1810]">
                  {itinerary[0]?.items.length > 4
                    ? "Low"
                    : itinerary[0]?.items.length > 3
                    ? "Mid"
                    : "High"}
                </span>
              </div>
              <div className="absolute -top-1 -right-1">
                {itinerary[0]?.items.length > 4 ? (
                  <div className="bg-red-500 w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
                    <AlertCircle size={14} className="text-white" />
                  </div>
                ) : (
                  <div className="bg-emerald-500 w-6 h-6 rounded-full flex items-center justify-center">
                    <Smile size={14} className="text-white" />
                  </div>
                )}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-[#2C1810]">AI 體力預警系統</h4>
              <p className="text-xs text-stone-500 mt-1">
                {itinerary[0]?.items.length > 4
                  ? "⚠️ 行程過於緊湊，預計下午 16:00 體力將見底。"
                  : "✅ 步調舒適，符合您的慢活心理測驗結果。"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <div
              className={clsx(
                "px-4 py-2 rounded-xl text-[10px] font-bold border transition-colors",
                itinerary[0]?.items.length > 4
                  ? "bg-red-50 border-red-100 text-red-600"
                  : "bg-emerald-50 border-emerald-100 text-emerald-600"
              )}
            >
              交通佔比: {itinerary[0]?.items.length > 4 ? "42%" : "18%"}
            </div>
            <div className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold">
              擁擠避讓: 已啟動
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 pb-32">
        {itinerary.map((day) => (
          <div key={day.day} className="relative">
            <div className="sticky top-4 z-30 mb-5 flex items-center gap-3">
              <span className="bg-[#D97C5F] text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-lg shadow-[#D97C5F]/30 font-serif border-2 border-white/20">
                第 {day.day} 天
              </span>
              {day.items.some((i) => i.cost !== undefined) && (
                <div className="bg-white/90 backdrop-blur-sm border border-stone-200 px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 transition-all hover:border-[#D97C5F]">
                  <Wallet size={12} className="text-[#D97C5F]" />
                  <span className="text-[11px] font-black text-stone-600">
                    總預算:{" "}
                    <span className="text-[#D97C5F]">
                      TWD{" "}
                      {day.items
                        .reduce((sum, item) => sum + (item.cost || 0), 0)
                        .toLocaleString()}
                    </span>
                  </span>
                </div>
              )}
            </div>
            <div className="grid gap-5 pl-2 relative border-l-2 border-stone-200 ml-4 pb-8">
              {day.items.map((item, idx) => (
                <div
                  key={idx}
                  draggable
                  onDragStart={() => handleDragStart(day.day - 1, idx)}
                  onDragOver={(e) => handleDragOver(e, day.day - 1, idx)}
                  onDrop={(e) => handleDrop(e, day.day - 1, idx)}
                  className={clsx(
                    "group block pl-6 relative transition-all duration-300",
                    draggedItem?.dayIdx === day.day - 1 &&
                      draggedItem?.itemIdx === idx
                      ? "opacity-30 scale-95"
                      : "opacity-100",
                    dragOverItem?.dayIdx === day.day - 1 &&
                      dragOverItem?.itemIdx === idx
                      ? "border-t-2 border-[#D97C5F] pt-4"
                      : ""
                  )}
                >
                  <div
                    className={`absolute -left-[9px] top-8 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 transition-colors duration-300 ${
                      item.place.type === "food"
                        ? "bg-[#D97C5F] group-hover:bg-[#b05a40]"
                        : "bg-[#2C1810] group-hover:bg-black"
                    }`}
                  ></div>
                  <div className="bg-white rounded-[1.25rem] p-4 shadow-md hover:shadow-xl transition-all duration-500 border border-stone-100 hover:border-[#D97C5F]/30 flex gap-4 relative overflow-hidden items-center group-hover:-translate-y-0.5">
                    {/* Drag Handle */}
                    <div className="cursor-grab active:cursor-grabbing text-stone-200 hover:text-[#D97C5F] pr-1 py-4 transition-colors shrink-0">
                      <GripVertical size={20} />
                    </div>

                    <Link
                      href={`/explore/${item.place.id}`}
                      className="flex flex-1 gap-4 items-center min-w-0"
                    >
                      <div className="relative h-20 w-20 md:h-24 md:w-24 shrink-0 rounded-xl overflow-hidden bg-gray-200 shadow-inner group/img">
                        <Image
                          src={item.place.image}
                          alt={item.place.name}
                          fill
                          className="object-cover group-hover/img:scale-110 transition-transform duration-1000"
                          unoptimized
                        />
                        {(item.place.type === "food" ||
                          item.place.price > 1) && (
                          <div className="absolute top-1.5 right-1.5 bg-black/60 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full backdrop-blur-md border border-white/20">
                            {"$".repeat(item.place.price)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 space-y-2.5">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <h3 className="text-lg font-black font-serif text-[#2C1810] group-hover:text-[#D97C5F] transition-colors leading-tight truncate">
                            {item.place.name}
                          </h3>
                          <a
                            href={
                              item.mapLink ||
                              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                item.place.name + " " + item.place.city
                              )}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="shrink-0 flex items-center gap-1.5 px-2 py-0.5 bg-stone-100 hover:bg-[#D97C5F]/10 text-stone-500 hover:text-[#D97C5F] rounded-md transition-all group/map"
                          >
                            <Map
                              size={10}
                              className="text-stone-400 group-hover/map:text-[#D97C5F]"
                            />
                            <span className="text-[10px] font-bold">
                              導覽地圖
                            </span>
                          </a>
                        </div>
                        {item.place.id === 101 && (
                          <div className="bg-amber-50 text-amber-700 text-[9px] font-black px-2 py-0.5 rounded-full border border-amber-200 animate-pulse whitespace-nowrap ml-2">
                            ⚡ 推薦：象山
                          </div>
                        )}

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-stone-500 font-bold">
                          <span className="text-[#D97C5F] bg-[#D97C5F]/10 px-1.5 py-0.5 rounded-md font-black">
                            {item.time}
                          </span>
                          <span className="truncate">{item.place.category}</span>
                          {item.cost !== undefined && (
                            <div className="flex items-center gap-0.5 text-[#D97C5F]">
                              <DollarSign size={10} strokeWidth={3} />
                              <span>{item.cost.toLocaleString()}</span>
                            </div>
                          )}
                        </div>

                        {/* Tags & Summary (Filling the "Empty" space) */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {item.place.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] font-bold text-stone-400 bg-stone-50 px-1.5 py-0.5 rounded-md border border-stone-100"
                            >
                              #{tag}
                            </span>
                          ))}
                          <p className="text-[9px] text-stone-300 font-medium truncate flex-1 ml-1 opacity-60">
                            {item.place.description}
                          </p>
                        </div>

                        {item.note && (
                          <div className="mt-3 px-2.5 py-2 bg-[#FFF9F2]/50 border-l-2 border-[#D97C5F]/30 rounded-r-lg">
                            <p className="text-[10px] text-stone-500 italic font-bold leading-relaxed">
                              「 {item.note} 」
                            </p>
                          </div>
                        )}

                        <div className="flex items-center gap-1.5 text-[10px] text-stone-400 font-bold pt-2 border-t border-stone-50/50 mt-1">
                          <Sparkles
                            size={10}
                            className="text-[#D97C5F] shrink-0"
                          />
                          <span className="truncate opacity-80">
                            {item.reason}
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Action Buttons */}
                    <div className="ml-auto flex flex-col gap-1 items-center shrink-0">
                      <button
                        onClick={() =>
                          setEditingCost({
                            dayIdx: day.day - 1,
                            itemIdx: idx,
                            data: { ...item },
                          })
                        }
                        className={clsx(
                          "p-2 rounded-lg transition-all group/cost",
                          item.cost
                            ? "text-[#D97C5F] bg-[#D97C5F]/5"
                            : "text-stone-200 hover:text-[#D97C5F] hover:bg-[#D97C5F]/5"
                        )}
                        title="消費明細"
                      >
                        <Wallet
                          size={18}
                          className="group-hover/cost:scale-110 transition-transform"
                        />
                      </button>
                      <button
                        onClick={() =>
                          setEditingItem({
                            dayIdx: day.day - 1,
                            itemIdx: idx,
                            data: { ...item },
                          })
                        }
                        className="p-2 text-stone-200 hover:text-[#D97C5F] hover:bg-[#D97C5F]/5 rounded-lg transition-all group/edit"
                        title="編輯基本資訊"
                      >
                        <Pencil
                          size={18}
                          className="group-hover/edit:scale-110 transition-transform"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Item Button */}
              <button
                onClick={() => addItem(day.day - 1)}
                className="group/add mt-4 ml-6 p-4 border-2 border-dashed border-stone-200 rounded-[1.25rem] flex items-center justify-center gap-2 hover:border-[#D97C5F]/40 hover:bg-[#D97C5F]/5 transition-all w-full md:w-[calc(100%-1.5rem)]"
              >
                <Plus
                  size={20}
                  className="text-stone-300 group-hover/add:text-[#D97C5F] group-hover/add:rotate-90 transition-all duration-500"
                />
                <span className="text-sm font-bold text-stone-400 group-hover/add:text-[#D97C5F]">
                  新增行程項目
                </span>
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-[#FFF9F2]/50">
              <div>
                <h3 className="text-2xl font-black font-serif text-[#2C1810]">
                  編輯行程項目
                </h3>
                <p className="text-xs text-stone-500 font-medium">
                  調整細節以符合您的個人喜好
                </p>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="p-2 hover:bg-stone-100 rounded-full transition-colors"
              >
                <X size={24} className="text-stone-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">
                    時間
                  </label>
                  <input
                    type="text"
                    value={editingItem.data.time}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        data: { ...editingItem.data, time: e.target.value },
                      })
                    }
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-[#D97C5F]/20 outline-none"
                    placeholder="例如: 10:00"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">
                    分類
                  </label>
                  <input
                    type="text"
                    value={editingItem.data.place.category}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        data: {
                          ...editingItem.data,
                          place: {
                            ...editingItem.data.place,
                            category: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-[#D97C5F]/20 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">
                  標題
                </label>
                <input
                  type="text"
                  value={editingItem.data.place.name}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: {
                        ...editingItem.data,
                        place: {
                          ...editingItem.data.place,
                          name: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-[#D97C5F]/20 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">
                  地圖連結
                </label>
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={editingItem.data.mapLink || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          data: {
                            ...editingItem.data,
                            mapLink: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 pl-10 text-xs font-medium focus:ring-2 focus:ring-[#D97C5F]/20 outline-none"
                      placeholder="貼上 Google Maps 連結"
                    />
                    <MapPin
                      size={14}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                    />
                  </div>
                  <div className="flex items-center justify-between px-1">
                    <p className="text-[9px] text-stone-400 font-medium truncate max-w-[70%]">
                      目前連結:{" "}
                      <span className="text-[#D97C5F]">
                        {editingItem.data.mapLink ||
                          `https://www.google.com/...`}
                      </span>
                    </p>
                    <a
                      href={
                        editingItem.data.mapLink ||
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          editingItem.data.place.name +
                            " " +
                            editingItem.data.place.city
                        )}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] font-black text-[#D97C5F] hover:underline flex items-center gap-1"
                    >
                      開啟預覽 <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">
                  備註
                </label>
                <textarea
                  rows={3}
                  value={editingItem.data.note || ""}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, note: e.target.value },
                    })
                  }
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-4 text-xs font-medium focus:ring-2 focus:ring-[#D97C5F]/20 outline-none resize-none"
                  placeholder="紀錄一些秘密情報..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">
                    上傳圖片/檔案
                  </label>
                  <button className="w-full border-2 border-dashed border-stone-200 rounded-2xl h-[46px] flex items-center justify-center gap-2 hover:border-[#D97C5F]/30 hover:bg-[#D97C5F]/5 transition-all group">
                    <Upload
                      size={16}
                      className="text-stone-300 group-hover:text-[#D97C5F]"
                    />
                    <span className="text-[10px] font-bold text-stone-400">
                      點此上傳
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-8 bg-stone-50 border-t border-stone-100 flex gap-3">
              <button
                onClick={() =>
                  deleteItem(editingItem.dayIdx, editingItem.itemIdx)
                }
                className="px-6 py-3 rounded-xl border border-red-100 text-red-500 hover:bg-red-50 transition-all font-bold text-sm flex items-center gap-2"
              >
                <Trash size={16} /> 刪除
              </button>
              <div className="flex-1" />
              <button
                onClick={saveEdit}
                className="px-10 py-3 bg-[#2C1810] text-white rounded-xl shadow-lg hover:bg-black transition-all font-bold text-sm flex items-center gap-2"
              >
                <Save size={16} /> 保存修改
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Expense Detail Modal - Redesigned with List & Numpad Layout */}
      {editingCost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fade-in text-[#2C1810]">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-[#FFF9F2]/80">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#D97C5F]/10 rounded-2xl text-[#D97C5F]">
                  <Wallet size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black font-serif">消費明細表</h3>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                    {editingCost.data.place.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingCost(null)}
                className="p-2 hover:bg-stone-50 rounded-full transition-colors"
              >
                <X size={24} className="text-stone-300" />
              </button>
            </div>

            <div className="flex-1 flex overflow-hidden">
              {/* Left Side: Items List */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6 border-r border-stone-50">
                <div className="space-y-4">
                  <div className="flex justify-between items-end px-1">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                      花費品項
                    </label>
                    <span className="text-[10px] font-black text-[#D97C5F]">
                      點擊金額以修改
                    </span>
                  </div>

                  <div className="space-y-3">
                    {(editingCost.data.expenseItems || []).map((item, idx) => (
                      <div
                        key={item.id}
                        onClick={() => setActiveExpenseItemIdx(idx)}
                        className={clsx(
                          "flex items-center justify-between p-5 rounded-[1.5rem] border-2 transition-all cursor-pointer group/item",
                          activeExpenseItemIdx === idx
                            ? "bg-[#D97C5F]/5 border-[#D97C5F] shadow-sm"
                            : "bg-stone-50 border-stone-200 hover:border-[#D97C5F]/30"
                        )}
                      >
                        <input
                          type="text"
                          value={item.label}
                          autoFocus={activeExpenseItemIdx === idx}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => {
                            const newItems = [
                              ...(editingCost.data.expenseItems || []),
                            ];
                            newItems[idx].label = e.target.value;
                            setEditingCost({
                              ...editingCost,
                              data: {
                                ...editingCost.data,
                                expenseItems: newItems,
                              },
                            });
                          }}
                          className="bg-transparent font-black text-stone-700 w-full focus:outline-none placeholder:text-stone-300"
                          placeholder="輸入品項名稱..."
                        />
                        <div className="flex items-center gap-4 shrink-0">
                          <span
                            className={clsx(
                              "text-xl font-black font-serif",
                              activeExpenseItemIdx === idx
                                ? "text-[#D97C5F]"
                                : "text-stone-400"
                            )}
                          >
                            $ {item.amount.toLocaleString()}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const newItems = (
                                editingCost.data.expenseItems || []
                              ).filter((_, i) => i !== idx);
                              const total = newItems.reduce(
                                (sum, i) => sum + i.amount,
                                0
                              );
                              setEditingCost({
                                ...editingCost,
                                data: {
                                  ...editingCost.data,
                                  expenseItems: newItems,
                                  cost: total > 0 ? total : undefined,
                                },
                              });
                              if (activeExpenseItemIdx >= newItems.length)
                                setActiveExpenseItemIdx(
                                  Math.max(0, newItems.length - 1)
                                );
                            }}
                            className="text-stone-300 hover:text-red-400 p-1"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={() => {
                        const newItems = [
                          ...(editingCost.data.expenseItems || []),
                          { id: Date.now().toString(), label: "", amount: 0 },
                        ];
                        setEditingCost({
                          ...editingCost,
                          data: { ...editingCost.data, expenseItems: newItems },
                        });
                        setActiveExpenseItemIdx(newItems.length - 1);
                      }}
                      className="w-full p-5 border-2 border-dashed border-stone-200 rounded-[1.5rem] text-stone-400 font-bold text-sm hover:border-[#D97C5F]/30 hover:text-[#D97C5F] hover:bg-[#D97C5F]/5 transition-all flex items-center justify-center gap-2"
                    >
                      <Plus size={18} /> 新增品項
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <div className="bg-[#2C1810] rounded-[2rem] p-6 text-white shadow-xl flex justify-between items-center group">
                    <div>
                      <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-1">
                        本次統計總額
                      </p>
                      <p className="text-4xl font-black font-serif tracking-tight">
                        <span className="text-[#D97C5F] mr-2">$</span>
                        {(editingCost.data.expenseItems || [])
                          .reduce((sum, i) => sum + i.amount, 0)
                          .toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-white/10 rounded-[1.25rem] group-hover:bg-[#D97C5F] transition-colors duration-500">
                      <DollarSign
                        size={28}
                        className="text-[#D97C5F] group-hover:text-white transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Numeric Numpad */}
              <div className="w-[300px] bg-stone-50 p-8 flex flex-col justify-center">
                <p className="text-center text-[10px] font-black text-stone-400 uppercase tracking-widest mb-6">
                  快捷數字輸入
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, "←"].map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        const items = [
                          ...(editingCost.data.expenseItems || []),
                        ];
                        if (items.length === 0) return;
                        const targetIdx = activeExpenseItemIdx;
                        if (targetIdx >= items.length) return;

                        if (key === "C") {
                          items[targetIdx].amount = 0;
                        } else if (key === "←") {
                          const s = items[targetIdx].amount.toString();
                          items[targetIdx].amount =
                            s.length > 1 ? Number(s.slice(0, -1)) : 0;
                        } else {
                          const currentStr = items[targetIdx].amount.toString();
                          // Max 7 digits
                          if (currentStr.length >= 7) return;
                          items[targetIdx].amount = Number(
                            currentStr === "0"
                              ? key.toString()
                              : currentStr + key.toString()
                          );
                        }

                        const total = items.reduce(
                          (sum, i) => sum + i.amount,
                          0
                        );
                        setEditingCost({
                          ...editingCost,
                          data: {
                            ...editingCost.data,
                            expenseItems: items,
                            cost: total > 0 ? total : undefined,
                          },
                        });
                      }}
                      className={clsx(
                        "h-16 rounded-2xl text-2xl font-black transition-all flex items-center justify-center shadow-sm",
                        key === "C"
                          ? "bg-red-50 text-red-500 hover:bg-red-100"
                          : key === "←"
                          ? "bg-stone-200 text-stone-600 hover:bg-stone-300"
                          : "bg-white text-[#2C1810] hover:scale-95 active:bg-[#D97C5F] active:text-white"
                      )}
                    >
                      {key}
                    </button>
                  ))}
                </div>

                <div className="mt-8">
                  <button
                    onClick={saveCostEdit}
                    className="w-full py-5 bg-[#D97C5F] text-white rounded-[1.5rem] shadow-lg shadow-[#D97C5F]/20 hover:bg-[#b05a40] hover:-translate-y-1 transition-all font-black text-lg flex items-center justify-center gap-3 active:scale-95"
                  >
                    <Save size={22} /> 完成記錄
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Collaborative Voting Modal */}
      {isVoteModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xl z-[150] flex items-center justify-center p-4 md:p-8 animate-fade-in text-[#2C1810]">
          <div className="bg-[#FFF9F2] w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-white/20">
            <div className="p-8 border-b border-stone-200/50 flex justify-between items-center bg-white/50">
              <div className="flex items-center gap-5">
                <div className="p-4 bg-terracotta/10 rounded-2xl text-terracotta ring-4 ring-terracotta/5">
                  <ThumbsUp size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black font-serif">旅伴互動投票區</h3>
                  <p className="text-[11px] text-stone-400 font-bold uppercase tracking-[0.2em] mt-1">
                    以下為 AI 推薦的備選景點，您可以發送連結請旅伴投票！
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsVoteModalOpen(false)}
                className="p-3 hover:bg-stone-100 rounded-full transition-all hover:rotate-90"
              >
                <X size={28} className="text-stone-300" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              {votingSpots.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-stone-400">
                  <Sparkles size={48} className="mb-4 opacity-20" />
                  <p className="font-bold">目前沒有候選景點，請嘗試重新規劃</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {votingSpots.map((spot) => (
                    <div 
                      key={spot.id}
                      className="group relative bg-white rounded-[2rem] p-5 shadow-sm hover:shadow-xl transition-all duration-500 border border-stone-100 flex flex-col"
                    >
                      <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-5">
                        <Image 
                          src={spot.image} 
                          alt={spot.name} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-[2s]" 
                          unoptimized
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                          <ThumbsUp size={14} className={clsx("transition-colors", votes[spot.id] > 0 ? "text-terracotta fill-terracotta" : "text-stone-300")} />
                          <span className="text-sm font-black text-stone-600">{votes[spot.id] || 0}</span>
                        </div>
                        {votes[spot.id] >= Math.max(...Object.values(votes)) && votes[spot.id] > 0 && (
                          <div className="absolute top-4 left-4 bg-terracotta text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest flex items-center gap-1.5 shadow-lg animate-pulse">
                            <Sparkles size={10} /> 人氣最高
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xl font-black font-serif">{spot.name}</h4>
                          <span className="px-2 py-0.5 bg-stone-100 text-stone-400 text-[10px] font-black rounded-md">{spot.category}</span>
                        </div>
                        <p className="text-xs text-stone-500 font-medium leading-relaxed mb-6 line-clamp-2">
                          {spot.description}
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <button 
                          onClick={() => {
                            if (hasVoted[spot.id]) return;
                            setVotes(prev => ({ ...prev, [spot.id]: (prev[spot.id] || 0) + 1 }));
                            setHasVoted(prev => ({ ...prev, [spot.id]: true }));
                            triggerToast("投票成功！感謝您的參與 👍");
                          }}
                          disabled={hasVoted[spot.id]}
                          className={clsx(
                            "flex-1 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2",
                            hasVoted[spot.id]
                              ? "bg-emerald-50 text-emerald-600 cursor-default"
                              : "bg-[#2C1810] text-white hover:bg-black active:scale-95"
                          )}
                        >
                          {hasVoted[spot.id] ? (
                            <><CheckCircle size={18} /> 已感興趣</>
                          ) : (
                            <><ThumbsUp size={18} /> 我感興趣</>
                          )}
                        </button>
                        <button 
                          onClick={() => {
                            // Add to Itinerary on Day 1 (Demo simplicity)
                            const newItem: TripItem = {
                              time: "待定",
                              place: spot,
                              reason: "旅伴投票共識推薦",
                            };
                            const newItinerary = [...itinerary];
                            newItinerary[0].items.push(newItem);
                            setItinerary(newItinerary);
                            setVotingSpots(prev => prev.filter(s => s.id !== spot.id));
                            setIsVoteModalOpen(false);
                            triggerToast(`已將 ${spot.name} 加入行程！ ✨`);
                          }}
                          className="px-5 py-3.5 bg-terracotta/10 text-terracotta rounded-xl font-bold text-sm hover:bg-terracotta hover:text-white transition-all active:scale-95"
                          title="加入行程"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-8 bg-stone-50 border-t border-stone-200/50 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[4, 5, 6, 7].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-stone-100 overflow-hidden shadow-sm">
                      <Image src={`https://i.pravatar.cc/100?img=${i+20}`} alt="avatar" width={40} height={40} />
                    </div>
                  ))}
                </div>
                <p className="text-xs font-bold text-stone-500">已有 7 位旅伴查看過此清單</p>
              </div>
              <button 
                onClick={() => {
                  setToastMessage("專屬投票連結已複製 🔗");
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 3000);
                }}
                className="w-full md:w-auto px-8 py-4 bg-white border-2 border-terracotta text-terracotta rounded-2xl font-black text-sm hover:bg-terracotta hover:text-white transition-all shadow-lg flex items-center justify-center gap-3 group"
              >
                <Share2 size={20} className="group-hover:rotate-12 transition-transform" />
                分享投票連結給旅伴
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
