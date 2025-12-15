export type Dimension = "OldStreet" | "Nature" | "Culture" | "Lifestyle";

export interface Option {
  label: string;
  value: Dimension;
}

export interface Question {
  id: number;
  title: string; // e.g., "Question 1 (Arrival)"
  questionText: string;
  options: Option[];
}

export const questions: Question[] = [
  {
    id: 1,
    title: "Question 1 (Arrival)",
    questionText: "抵達陌生城市，走出車站。空氣帶著微涼，你第一眼被什麼吸引？",
    options: [
      {
        label: "車站周邊的老建築立面，斑駁的磚牆，彷彿刻著時間的痕跡",
        value: "OldStreet",
      },
      {
        label: "遠方的山稜線，清晰地映在藍天下，讓人想立刻出發",
        value: "Nature",
      },
      {
        label: "路邊攤的香氣與人聲，市井生活的煙火氣息撲面而來",
        value: "Lifestyle",
      },
      {
        label: "一座現代美術館的指標，你好奇裡面正在展出什麼主題",
        value: "Culture",
      },
    ],
  },
  {
    id: 2,
    title: "Question 2 (Walking)",
    questionText:
      "在城市裡走著，你突然想停下來。是什麼場景讓你不由自主放慢腳步？",
    options: [
      {
        label: "一條安靜的巷弄，老房子、植栽、和鐵窗花，構成一幅生活切片",
        value: "OldStreet",
      },
      {
        label: "公園裡的大樹與光影變化，風吹過樹梢的聲音讓你想坐下來",
        value: "Nature",
      },
      {
        label: "一間獨立書店或小型展覽空間，你想進去逛逛、吸收新知",
        value: "Culture",
      },
      {
        label: "傳統市場的熱鬧景象，你想觀察攤販與顧客之間的互動",
        value: "Lifestyle",
      },
    ],
  },
  {
    id: 3,
    title: "Question 3 (Monologue)",
    questionText: "規劃旅行時，你腦中第一個響起的「內心獨白」是什麼？",
    options: [
      {
        label: "我想迷路在老街區，找到只有在地人才知道的秘密角落",
        value: "OldStreet",
      },
      {
        label: "我想去戶外步道走走，呼吸新鮮空氣，讓身心都放鬆下來",
        value: "Nature",
      },
      {
        label: "我想參觀博物館或文化景點，深入了解這個地方的歷史文化",
        value: "Culture",
      },
      {
        label: "我想去市場、夜市走走，吃當地小吃，感受最真實的生活感",
        value: "Lifestyle",
      },
    ],
  },
  {
    id: 4,
    title: "Question 4 (Half Day)",
    questionText:
      "如果你今天只有「半天」漫遊時間，你會把這段珍貴時光留給哪種場景？",
    options: [
      {
        label: "在老城區漫步，拍下斑駁的牆面與窗景，收集城市的記憶碎片",
        value: "OldStreet",
      },
      {
        label: "去近郊的步道或海邊，靜靜地看風景、曬太陽、發呆",
        value: "Nature",
      },
      {
        label: "選一間有質感的美術館或展覽空間，細細品味策展的巧思",
        value: "Culture",
      },
      {
        label: "泡在傳統市場或巷弄咖啡館，觀察人來人往的日常風景",
        value: "Lifestyle",
      },
    ],
  },
];

export const dimensions: Record<Dimension, string> = {
  OldStreet: "老街",
  Nature: "自然",
  Culture: "文化",
  Lifestyle: "生活",
};

export const resultProfiles: Record<
  Dimension,
  { title: string; description: string; match: string; recommend: string }
> = {
  OldStreet: {
    title: "老街散策者",
    description:
      "你喜歡在時光的縫隙中尋找故事，斑駁的牆面與古老的建築對你有著致命吸引力。",
    match: "北部 老街散策線",
    recommend: "南部 市場生活線",
  },
  Nature: {
    title: "自然系旅人",
    description: "山海是你最好的充電站，遠離塵囂、擁抱自然是你旅行的意義。",
    match: "東部 山海療癒線",
    recommend: "中部 森林秘境線",
  },
  Culture: {
    title: "文化探索家",
    description:
      "你渴望深入了解當地的歷史與靈魂，博物館、美術館與古蹟是你必訪之地。",
    match: "中部 文化巡禮線",
    recommend: "北部 城市藝文線",
  },
  Lifestyle: {
    title: "地方生活派",
    description:
      "The Local Pulse Seeker. 你想融入當地人的日常，市場、小吃與人情味是你觀察生活的窗口。",
    match: "南部 市場生活線",
    recommend: "北部 老街散策線",
  },
};
