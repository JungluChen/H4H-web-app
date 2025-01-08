import { Task, Chat, TopList, Achievement, UserProfile } from '../types';

export const dummyTasks: Task[] = [
  {
    id: '1',
    title: 'NCCU Bank Account Setup',
    category: 'Finance',
    price: 450,
    time: 'Mon-Fri 10:00-16:00',
    location: 'NCCU, Taipei',
    description: 'Exchange student from US. Need help opening a student bank account at NCCU branch. Cannot speak Chinese.',
    postedBy: 'Sarah Johnson',
    language: 'English',
    flag: 'us',
    coordinates: { lat: 24.9862, lng: 121.5743 },
    status: 'open'
  },
  {
    id: '2',
    title: 'Credit Card Application Help',
    category: 'Finance',
    price: 500,
    time: 'Weekdays',
    location: 'NTU, Taipei',
    description: 'Need assistance applying for a student credit card. English speaker only.',
    postedBy: 'James Wilson',
    language: 'English',
    flag: 'uk',
    coordinates: { lat: 25.0174, lng: 121.5405 },
    status: 'open'
  },
  {
    id: '3',
    title: 'Scholarship Application',
    category: 'Finance',
    price: 600,
    time: 'Flexible',
    location: 'NTUST, Taipei',
    description: 'Help needed with Taiwan scholarship application process.',
    postedBy: 'Emma Brown',
    language: 'English',
    flag: 'au',
    coordinates: { lat: 25.0128, lng: 121.5413 },
    status: 'open'
  },
  {
    id: '4',
    title: 'Course Registration at NTHU',
    category: 'Education',
    price: 400,
    time: 'Mon-Wed',
    location: 'NTHU, Hsinchu',
    description: 'Need help with course selection and registration system.',
    postedBy: 'Max Weber',
    language: 'German',
    flag: 'de',
    coordinates: { lat: 24.7961, lng: 120.9967 },
    status: 'open'
  },
  {
    id: '5',
    title: 'NYCU Phone Contract Setup',
    category: 'Telecom',
    price: 400,
    time: 'Flexible',
    location: 'NYCU, Hsinchu',
    description: 'French student needs help setting up a phone contract. Prefer someone who speaks French or English.',
    postedBy: 'Sophie Martin',
    language: 'French',
    flag: 'fr',
    coordinates: { lat: 24.7869, lng: 120.9968 },
    status: 'open'
  },
  {
    id: '6',
    title: 'NCU Health Check Translation',
    category: 'Healthcare',
    price: 600,
    time: 'This Week',
    location: 'NCU, Taoyuan',
    description: 'Need someone to accompany me to the health check and help with translation.',
    postedBy: 'Maria Garcia',
    language: 'Spanish',
    flag: 'es',
    coordinates: { lat: 24.9684, lng: 121.1953 },
    status: 'open'
  },
  {
    id: '7',
    title: 'Airport Pickup Service',
    category: 'Transport',
    price: 800,
    time: 'Sunday 14:00',
    location: 'Taoyuan Airport',
    description: 'Looking for someone to pick me up from airport and help with luggage to NCU dorm.',
    postedBy: 'James Wilson',
    language: 'English',
    flag: 'us',
    coordinates: { lat: 25.0797, lng: 121.2342 },
    status: 'open'
  },
  {
    id: '8',
    title: 'NCHU Lab Equipment Guide',
    category: 'Education',
    price: 450,
    time: 'Tue-Thu 13:00-17:00',
    location: 'NCHU, Taichung',
    description: 'Need help understanding lab equipment instructions and safety guidelines.',
    postedBy: 'Yuki Tanaka',
    language: 'Japanese',
    flag: 'jp',
    coordinates: { lat: 24.1238, lng: 120.6747 },
    status: 'open'
  },
  {
    id: '9',
    title: 'NCKU Research Paper Translation',
    category: 'Education',
    price: 750,
    time: 'Flexible',
    location: 'NCKU, Tainan',
    description: 'Need help translating research materials from Chinese to English.',
    postedBy: 'Alex Kim',
    language: 'Korean',
    flag: 'kr',
    coordinates: { lat: 22.9997, lng: 120.2270 },
    status: 'open'
  },
  {
    id: '10',
    title: 'Hospital Registration',
    category: 'Healthcare',
    price: 550,
    time: 'Thursday morning',
    location: 'NTUH, Taipei',
    description: 'Need someone to help me register at National Taiwan University Hospital.',
    postedBy: 'Sophie Martin',
    language: 'French',
    flag: 'fr',
    coordinates: { lat: 25.0419, lng: 121.5164 },
    status: 'open'
  },
  {
    id: '11',
    title: 'Scooter License Application',
    category: 'Transport',
    price: 480,
    time: 'Next Week',
    location: 'Taipei City Motor Vehicle Office',
    description: 'Need assistance with scooter license application process.',
    postedBy: 'Yuki Tanaka',
    language: 'Japanese',
    flag: 'jp',
    coordinates: { lat: 25.0375, lng: 121.5649 },
    status: 'open'
  },
  {
    id: '12',
    title: 'Night Market Food Guide',
    category: 'Food',
    price: 350,
    time: 'Weekend evenings',
    location: 'Shilin Night Market',
    description: 'Looking for someone to show me around and explain local dishes.',
    postedBy: 'Maria Garcia',
    language: 'Spanish',
    flag: 'es',
    coordinates: { lat: 25.0879, lng: 121.5241 },
    status: 'open'
  },
  {
    id: '13',
    title: 'NTNU Course Selection Help',
    category: 'Education',
    price: 500,
    time: 'Mon-Fri',
    location: 'NTNU, Taipei',
    description: 'Need help understanding course selection system and communicating with professors.',
    postedBy: 'Anna Schmidt',
    language: 'German',
    flag: 'de',
    coordinates: { lat: 25.0278, lng: 121.5281 },
    status: 'open'
  },
  {
    id: '14',
    title: 'Computer Parts Shopping',
    category: 'Shopping',
    price: 450,
    time: 'Weekend',
    location: 'Guanghua Digital Plaza',
    description: 'Need someone to help me buy computer parts and negotiate prices.',
    postedBy: 'Viktor Petrov',
    language: 'Russian',
    flag: 'ru',
    coordinates: { lat: 25.0445, lng: 121.5332 },
    status: 'open'
  },
  {
    id: '15',
    title: 'Furniture Shopping Assistant',
    category: 'Shopping',
    price: 600,
    time: 'Saturday',
    location: 'IKEA Taoyuan',
    description: 'Need help with furniture shopping and delivery arrangement.',
    postedBy: 'Lisa Anderson',
    language: 'English',
    flag: 'us',
    coordinates: { lat: 25.0538, lng: 121.2851 },
    status: 'open'
  },
  {
    id: '16',
    title: 'Traditional Breakfast Guide',
    category: 'Food',
    price: 300,
    time: 'Morning',
    location: 'Yonghe Soy Milk',
    description: 'Looking for someone to introduce traditional Taiwanese breakfast.',
    postedBy: 'Tom Wilson',
    language: 'English',
    flag: 'uk',
    coordinates: { lat: 25.0239, lng: 121.5267 },
    status: 'open'
  },
  {
    id: '17',
    title: 'Din Tai Fung Experience',
    category: 'Food',
    price: 400,
    time: 'Lunch time',
    location: 'Din Tai Fung, Taipei 101',
    description: 'Need someone to help order and explain different dishes.',
    postedBy: 'Pierre Dubois',
    language: 'French',
    flag: 'fr',
    coordinates: { lat: 25.0338, lng: 121.5645 },
    status: 'open'
  },
  {
    id: '18',
    title: 'Apartment Viewing Help',
    category: 'Housing',
    price: 700,
    time: 'Weekend',
    location: 'Daan District',
    description: 'Need someone to help view apartments and translate lease terms.',
    postedBy: 'Marco Silva',
    language: 'Portuguese',
    flag: 'pt',
    coordinates: { lat: 25.0278, lng: 121.5429 },
    status: 'open'
  },
  {
    id: '19',
    title: 'Dorm Application NYCU',
    category: 'Housing',
    price: 450,
    time: 'Weekday',
    location: 'NYCU, Hsinchu',
    description: 'Need assistance with international student dorm application.',
    postedBy: 'Kim Min-ji',
    language: 'Korean',
    flag: 'kr',
    coordinates: { lat: 24.7869, lng: 120.9968 },
    status: 'open'
  },
  {
    id: '20',
    title: 'ARC Application Help',
    category: 'Government',
    price: 550,
    time: 'Monday morning',
    location: 'Immigration Office, Taipei',
    description: 'Need help with ARC application process and translation.',
    postedBy: 'Juan Garcia',
    language: 'Spanish',
    flag: 'es',
    coordinates: { lat: 25.0359, lng: 121.5289 },
    status: 'open'
  },
];

export const dummyChats: Chat[] = [];

export const dummyTopLists: TopList[] = [
  {
    title: "Taiwan's Top 10 Snacks",
    date: '2024/09/03',
    items: ['Braised Pork Rice', 'Beef Noodles', 'Salty Crispy Chicken'],
    thumbnail: '🍜'
  },
  {
    title: "Taiwan's Top 10 Tourist Attractions",
    date: '2024/06/29',
    items: ['[Keelung] Wangyou Valley', '[Nantou] Sun Moon Lake', '[Hualien] Qingshui Cliffs'],
    thumbnail: '🏔️'
  }
];

export const dummyAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Promotion Master',
    description: 'Successfully inviting friends to register on the platform',
    progress: 100,
    reward: 50,
    icon: '🏆'
  },
  {
    id: '2',
    title: 'Curious Explorer',
    description: 'Visiting ten new restaurants',
    progress: 50,
    reward: 20,
    icon: '🔍'
  }
];

export const dummyProfile: UserProfile = {
  name: 'User',
  wallet: 6000,
  achievements: dummyAchievements,
  taskHistory: dummyTasks,
  rating: 4.5
};

export const articleCategories = [
  'Food & Drinks',
  'Transportation',
  'Culture',
  'Student Life',
  'Healthcare',
  'Entertainment',
  'Shopping',
  'Travel',
  'Housing',
  'Education'
];

export const recommendedArticles = [
  // Food & Drinks Category
  {
    id: '1',
    category: 'Food & Drinks',
    title: "Taiwan's Top 10 Must-Try Street Snacks",
    date: '2024/03/15',
    thumbnail: '🍜',
    items: [
      'Braised Pork Rice 滷肉飯',
      'Beef Noodles 牛肉麵',
      'Stinky Tofu 臭豆腐'
    ],
    locations: [
      { name: 'Shilin Night Market', coordinates: { lat: 25.0879, lng: 121.5241 } }
    ]
  },
  {
    id: '2',
    category: 'Food & Drinks',
    title: "Best Bubble Tea Shops",
    date: '2024/03/10',
    thumbnail: '🧋',
    items: [
      'Chun Shui Tang 春水堂',
      'Yi Fang 一芳',
      'Tiger Sugar 老虎堂'
    ],
    locations: [
      { name: 'Chun Shui Tang', coordinates: { lat: 25.0421, lng: 121.5468 } }
    ]
  },
  {
    id: '3',
    category: 'Food & Drinks',
    title: "Traditional Breakfast Spots",
    date: '2024/03/05',
    thumbnail: '🥯',
    items: [
      'Fu Hang Dou Jiang 阜杭豆漿',
      'Yong He Dou Jiang 永和豆漿',
      'Good Morning Breakfast'
    ],
    locations: [
      { name: 'Fu Hang Dou Jiang', coordinates: { lat: 25.0444, lng: 121.5297 } }
    ]
  },

  // Transportation Category
  {
    id: '4',
    category: 'Transportation',
    title: "Complete MRT Guide",
    date: '2024/03/01',
    thumbnail: '🚇',
    items: [
      'MRT Line Overview',
      'EasyCard Usage',
      'Transfer Points Guide'
    ],
    locations: [
      { name: 'Taipei Main Station', coordinates: { lat: 25.0478, lng: 121.5170 } }
    ]
  },
  // ... Add more Transportation articles

  // Culture Category
  {
    id: '7',
    category: 'Culture',
    title: "Temple Etiquette Guide",
    date: '2024/02/20',
    thumbnail: '🏮',
    items: [
      'Proper Incense Usage',
      'Prayer Customs',
      'Dress Code'
    ],
    locations: [
      { name: 'Longshan Temple', coordinates: { lat: 25.0374, lng: 121.5002 } }
    ]
  },
  // ... Add more Culture articles

  // Student Life Category
  {
    id: '10',
    category: 'Student Life',
    title: "Campus Life Essentials",
    date: '2024/02/05',
    thumbnail: '📚',
    items: [
      'Student ID Benefits',
      'Library Access',
      'Club Activities'
    ]
  },
  // ... Add more Student Life articles

  // Healthcare Category
  {
    id: '13',
    category: 'Healthcare',
    title: "Medical System Guide",
    date: '2024/01/25',
    thumbnail: '🏥',
    items: [
      'NHI Card Application',
      'Finding English-Speaking Doctors',
      'Emergency Numbers'
    ],
    locations: [
      { name: 'NTU Hospital', coordinates: { lat: 25.0419, lng: 121.5164 } }
    ]
  },
  // ... Continue adding 3 articles for each category
];

export const dummyMessages: Record<string, Chat[]> = {}; 