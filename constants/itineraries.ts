// constants/itineraries.ts
export interface TripDetail {
    duration: string;
    location: string;
    transport: string;
    season: string;
}

export interface Itinerary {
    id: string;
    slug: string;
    tag: string;
    title: string;
    description: string;
    highlights: string[];
    tripDetails: TripDetail;
    images: string[];
}

export const ITINERARIES: Itinerary[] = [
    {
        id: '1',
        slug: 'dadaocheng-history-walk',
        tag: '城市文化',
        title: '迪化街 → 霞海城隍廟 → 建築立面導覽 → 台北舊城門',
        description: `有些城市，必須抬頭閱讀。不是因為天空，而是因為建築仍在說話。
      
      這條「城市文化線」帶你重新理解台北如何一步步成形。從商業動脈「迪化街」出發，欣賞巴洛克式與閩南式的街屋立面；駐足「霞海城隍廟」，感受城市最早的公共空間與信仰核心。
      
      最後來到「台北舊城門」，站在曾经的城市邊界，看見歷史沒有被整理成一條直線，而是重疊在同一個街區裡。這裡適合「文化知識派」的旅人，滿足你對城市身世的好奇心。`,
        highlights: [
            '百年街屋建築立面導覽',
            '霞海城隍廟信仰文化',
            '台北舊城門(北門)巡禮'
        ],
        tripDetails: {
            duration: '3-4 小時',
            location: '台北・大稻埕',
            transport: '步行 (Walking)',
            season: '四季皆宜'
        },
        images: [
            '/images/itineraries/A-North-1.jpg',
            '/images/itineraries/A-North-2.jpg'
        ]
    }
];