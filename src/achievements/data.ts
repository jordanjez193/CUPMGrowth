export type AchievementStatus = 'unlocked' | 'in-progress' | 'locked'
export type RewardType = 'discount' | 'free_meal' | 'credit' | 'product_unlock'

export type Reward = {
  emoji: string
  label: string
  value: string
  description: string
  productLine: string
  claimed: boolean
}

export type Achievement = {
  id: string
  emoji: string
  name: string
  description: string
  category: 'orders' | 'exploration' | 'product' | 'social'
  categoryLabel: string
  progress: number
  target: number
  status: AchievementStatus
  reward: Reward
  unlockedDate?: string
  color: string
}

export type LeaderboardEntry = {
  name: string
  avatar: string
  level: number
  points: number
  isYou?: boolean
}

// Jordan's mock stats
export const USER = {
  name: 'Jordan',
  totalOrders: 23,
  level: 4,
  levelName: 'Loyal Eater',
  xp: 230,
  xpForNextLevel: 300,
  streak: 4,
  uniqueMeals: 18,
  proteinsEnjoyed: 6,
  uniqueChefs: 5,
  topChef: 'Marcus Samuelsson',
  favoriteMeal: 'Miso-Glazed Salmon',
  avgRating: 4.7,
}

export const ACHIEVEMENTS: Achievement[] = [
  // --- UNLOCKED ---
  {
    id: 'first-bite',
    emoji: '🍽️',
    name: 'First Bite',
    description: 'Completed your very first CookUnity order.',
    category: 'orders',
    categoryLabel: 'Milestone',
    progress: 1,
    target: 1,
    status: 'unlocked',
    unlockedDate: 'Jan 12, 2025',
    color: '#FFD333',
    reward: {
      emoji: '💰',
      label: '$5 off your next order',
      value: '$5',
      description: 'Applied automatically at checkout on your next delivery.',
      productLine: 'Any meal',
      claimed: true,
    },
  },
  {
    id: 'on-a-roll',
    emoji: '🔥',
    name: 'On a Roll',
    description: 'Ordered 5 times — you\'re building a great habit.',
    category: 'orders',
    categoryLabel: 'Milestone',
    progress: 5,
    target: 5,
    status: 'unlocked',
    unlockedDate: 'Feb 3, 2025',
    color: '#FF6B2B',
    reward: {
      emoji: '🍟',
      label: 'Free side dish on us',
      value: 'Free',
      description: 'Add any side to your next order for free. Great way to try something new.',
      productLine: 'Sides',
      claimed: true,
    },
  },
  {
    id: 'chef-hopper',
    emoji: '👨‍🍳',
    name: 'Chef Hopper',
    description: 'Ordered from 5 different world-class chefs.',
    category: 'exploration',
    categoryLabel: 'Explorer',
    progress: 5,
    target: 5,
    status: 'unlocked',
    unlockedDate: 'Mar 18, 2025',
    color: '#7C3AED',
    reward: {
      emoji: '⭐',
      label: 'Free premium meal upgrade',
      value: 'Free',
      description: 'Upgrade any meal to a premium selection on your next order — on us.',
      productLine: 'Premium',
      claimed: false,
    },
  },
  {
    id: 'repeat-offender',
    emoji: '💫',
    name: 'Repeat Offender',
    description: 'Re-ordered your favorite dish 3 times. We love the dedication.',
    category: 'exploration',
    categoryLabel: 'Explorer',
    progress: 3,
    target: 3,
    status: 'unlocked',
    unlockedDate: 'Apr 1, 2025',
    color: '#0EA5E9',
    reward: {
      emoji: '💳',
      label: '$10 credit',
      value: '$10',
      description: 'Added to your account balance. Use it on any upcoming order.',
      productLine: 'Any meal',
      claimed: false,
    },
  },

  // --- IN PROGRESS ---
  {
    id: 'quarter-century',
    emoji: '🏆',
    name: 'Quarter Century',
    description: 'Reach 25 total orders — you\'re almost there!',
    category: 'orders',
    categoryLabel: 'Milestone',
    progress: 23,
    target: 25,
    status: 'in-progress',
    color: '#F59E0B',
    reward: {
      emoji: '🎁',
      label: 'A free meal, on us',
      value: 'Free',
      description: 'One full meal of your choice, completely free. Our way of saying thank you.',
      productLine: 'Any meal',
      claimed: false,
    },
  },
  {
    id: 'early-riser',
    emoji: '🌅',
    name: 'Early Riser',
    description: 'Try a CookUnity breakfast meal for the first time.',
    category: 'product',
    categoryLabel: 'Product Explorer',
    progress: 0,
    target: 1,
    status: 'in-progress',
    color: '#F97316',
    reward: {
      emoji: '🥐',
      label: 'Free breakfast meal',
      value: 'Free',
      description: 'Add a breakfast meal to any upcoming order completely free.',
      productLine: 'Breakfast',
      claimed: false,
    },
  },
  {
    id: 'plant-curious',
    emoji: '🌿',
    name: 'Plant Curious',
    description: 'Order 3 plant-based or vegetarian meals.',
    category: 'product',
    categoryLabel: 'Product Explorer',
    progress: 2,
    target: 3,
    status: 'in-progress',
    color: '#22C55E',
    reward: {
      emoji: '🥗',
      label: 'Free plant-based meal',
      value: 'Free',
      description: 'A complimentary plant-based meal added to your next delivery.',
      productLine: 'Plant Powered',
      claimed: false,
    },
  },
  {
    id: 'globe-trotter',
    emoji: '🌍',
    name: 'Globe Trotter',
    description: 'Sample dishes from 6 different world cuisines.',
    category: 'exploration',
    categoryLabel: 'Explorer',
    progress: 4,
    target: 6,
    status: 'in-progress',
    color: '#3B82F6',
    reward: {
      emoji: '🌐',
      label: 'Global cuisine bundle',
      value: 'Free',
      description: 'A curated bundle of 3 international meals from our top chefs.',
      productLine: 'Bundles',
      claimed: false,
    },
  },

  // --- LOCKED ---
  {
    id: 'bundle-explorer',
    emoji: '📦',
    name: 'Bundle Explorer',
    description: 'Order your first CookUnity bundle.',
    category: 'product',
    categoryLabel: 'Product Explorer',
    progress: 0,
    target: 1,
    status: 'locked',
    color: '#6B7280',
    reward: {
      emoji: '📦',
      label: '20% off your next bundle',
      value: '20% off',
      description: 'Bundles are the easiest way to discover new flavors — and save.',
      productLine: 'Bundles',
      claimed: false,
    },
  },
  {
    id: 'family-feast',
    emoji: '👨‍👩‍👧',
    name: 'Family Feast',
    description: 'Add a Kids meal to an order for the first time.',
    category: 'product',
    categoryLabel: 'Product Explorer',
    progress: 0,
    target: 1,
    status: 'locked',
    color: '#EC4899',
    reward: {
      emoji: '🧒',
      label: 'Free kids meal',
      value: 'Free',
      description: 'A free kid-friendly meal on your next order. Perfect for the whole family.',
      productLine: 'Kids & Families',
      claimed: false,
    },
  },
  {
    id: 'share-the-love',
    emoji: '🤝',
    name: 'Share the Love',
    description: 'Complete 50 total orders — a true CookUnity devotee.',
    category: 'orders',
    categoryLabel: 'Milestone',
    progress: 23,
    target: 50,
    status: 'locked',
    color: '#6B7280',
    reward: {
      emoji: '🎉',
      label: 'Free meal to share',
      value: 'Free',
      description: 'Send a free CookUnity meal to a friend. Sharing is caring.',
      productLine: 'Gifting',
      claimed: false,
    },
  },
  {
    id: 'legend',
    emoji: '👑',
    name: 'CookUnity Legend',
    description: 'Reach 100 total orders. You are truly one of us.',
    category: 'orders',
    categoryLabel: 'Milestone',
    progress: 23,
    target: 100,
    status: 'locked',
    color: '#6B7280',
    reward: {
      emoji: '💎',
      label: '$50 account credit',
      value: '$50',
      description: 'Our biggest thank-you. $50 added to your account to use however you\'d like.',
      productLine: 'Any meal',
      claimed: false,
    },
  },
]

export const LEADERBOARD: LeaderboardEntry[] = [
  { name: 'Sarah M.', avatar: '👩', level: 6, points: 52 },
  { name: 'Mike T.', avatar: '🧔', level: 5, points: 38 },
  { name: 'Jordan', avatar: '😊', level: 4, points: 27, isYou: true },
  { name: 'Alex R.', avatar: '👤', level: 3, points: 18 },
  { name: 'Chris L.', avatar: '🧑', level: 2, points: 12 },
]
