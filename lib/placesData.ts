import { Dimension } from './quizData';

export interface Place {
  id: string;
  title: string;
  category: Dimension;
  location: string;
  image: string;
  description: string;
  tags: string[];
}

export const places: Place[] = [
  // Old Street
  {
    id: 'jiufen',
    title: 'Jiufen Old Street',
    category: 'OldStreet',
    location: 'New Taipei City',
    image: 'https://placehold.co/600x400/FFF9F2/D97C5F?text=Jiufen',
    description: 'Walk through the winding alleyways of this mountain town, famous for its tea houses, lantern-lit streets, and breathtaking views of the ocean. Jiufen offers a nostalgic glimpse into Taiwan’s past, with a touch of magic that inspired spirited away.',
    tags: ['History', 'Tea Houses', 'Mountain View', 'Night Market'],
  },
  {
    id: 'lukang',
    title: 'Lukang Old Street',
    category: 'OldStreet',
    location: 'Changhua',
    image: 'https://placehold.co/600x400/FFF9F2/D97C5F?text=Lukang',
    description: 'Explore the historic temples and preserved red-brick lanes of Lukang. Once an important trading port, it remains a living museum of traditional Taiwanese culture and architecture.',
    tags: ['Temples', 'Heritage', 'Culture', 'Crafts'],
  },
  // Nature
  {
    id: 'taroko',
    title: 'Taroko Gorge',
    category: 'Nature',
    location: 'Hualien',
    image: 'https://placehold.co/600x400/FFF9F2/D97C5F?text=Taroko',
    description: 'Marvel at the marble cliffs and turquoise waters of Taroko Gorge. This world-famous national park offers hiking trails that take you through tunnels, across suspension bridges, and deep into the heart of nature.',
    tags: ['Hiking', 'Mountains', 'Marble', 'Scenery'],
  },
  {
    id: 'sun-moon-lake',
    title: 'Sun Moon Lake',
    category: 'Nature',
    location: 'Nantou',
    image: 'https://placehold.co/600x400/FFF9F2/D97C5F?text=Sun+Moon+Lake',
    description: 'Taiwan’s largest lake, surrounded by misty mountains. Cycle around the tranquil waters, visit the temples, or take a boat ride to experience the serene beauty of the heart of Taiwan.',
    tags: ['Lake', 'Cycling', 'Relaxation', 'Scenery'],
  },
  // Culture
  {
    id: 'chimei-museum',
    title: 'Chimei Museum',
    category: 'Culture',
    location: 'Tainan',
    image: 'https://placehold.co/600x400/FFF9F2/D97C5F?text=Chimei',
    description: 'A comprehensive private museum with a wide collection of Western art, musical instruments, weaponry, and natural history. The European-style architecture and vast gardens make it a unique cultural landmark.',
    tags: ['Art', 'History', 'Museum', 'Architecture'],
  },
  {
    id: 'national-palace-museum',
    title: 'National Palace Museum',
    category: 'Culture',
    location: 'Taipei',
    image: 'https://placehold.co/600x400/FFF9F2/D97C5F?text=Palace+Museum',
    description: 'Home to one of the largest collections of Chinese imperial artifacts in the world. Spanning thousands of years of history, the treasures here tell the story of a civilization.',
    tags: ['History', 'Art', 'Treasures', 'Jade Cabbage'],
  },
  // Lifestyle
  {
    id: 'tainan-market',
    title: 'Tainan Traditional Market',
    category: 'Lifestyle',
    location: 'Tainan',
    image: 'https://placehold.co/600x400/FFF9F2/D97C5F?text=Tainan+Market',
    description: 'Dive into the culinary heart of Taiwan. Tainan’s markets are filled with century-old stalls serving savory treats, fresh produce, and the warm hospitality of the south.',
    tags: ['Food', 'Local Life', 'Market', 'History'],
  },
  {
    id: 'dadaocheng',
    title: 'Dadaocheng',
    category: 'Lifestyle',
    location: 'Taipei',
    image: 'https://placehold.co/600x400/FFF9F2/D97C5F?text=Dadaocheng',
    description: 'Where the old meets the new. Historic shophouses now host trendy cafes and design shops alongside traditional dried goods stores and fabric markets.',
    tags: ['Shopping', 'Cafe', 'History', 'Riverside'],
  },
];
