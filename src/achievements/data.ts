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
  image?: string
  chefImage?: string
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
  topChef: 'Michelle Bernstein',
  topChefPhoto: 'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Michelle_Bernstein_83fe5b895f.png',
  favoriteMeal: 'Walnut Miso-Crusted Salmon',
  favoriteMealImage: 'https://cu-media.imgix.net/media/catalog/product/cache/x1200/w/a/walnut_miso_crusted_salmon.jpeg?height=400&width=400&fit=crop&format=webp',
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
    image: 'https://cu-media.imgix.net/media/catalog/product/cache/x1200/b/e/beef_bibimbap_with_white_rice_-_choi-3.jpg?height=600&width=800&fit=crop&format=webp',
    chefImage: 'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Esther_Choi_93538d0d78.png',
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
    image: 'https://cu-media.imgix.net/media/catalog/product/cache/x1200/c/u/cuban-pork.jpg?height=600&width=800&fit=crop&format=webp',
    chefImage: 'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Michelle_Bernstein_83fe5b895f.png',
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
    image: 'https://cu-media.imgix.net/media/catalog/product/cache/x1200/m/a/macandcheese-johndl.jpeg?height=600&width=800&fit=crop&format=webp',
    chefImage: 'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/John_De_Lucie_0e67d16f7f.png',
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
    image: 'https://cu-media.imgix.net/media/catalog/product/cache/x1200/w/a/walnut_miso_crusted_salmon.jpeg?height=600&width=800&fit=crop&format=webp',
    chefImage: 'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Esther_Choi_93538d0d78.png',
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
    image: 'https://cu-media.imgix.net/media/catalog/product/cache/x1200/b/r/braised-rib.jpg?height=600&width=800&fit=crop&format=webp',
    chefImage: 'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Michelle_Bernstein_83fe5b895f.png',
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
    image: 'https://cu-media.imgix.net/media/catalog/product/cache/x1200/d/u/dustin-chorizobreakfast.jpg?height=600&width=800&fit=crop&format=webp',
    chefImage: 'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Dustin_Taylor_cead58110f.png',
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
    image: 'https://cu-media.imgix.net/media/catalog/product/cache/x1200/m/e/me_chili.jpeg?height=600&width=800&fit=crop&format=webp',
    chefImage: 'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Einat_Admony_48dc7c25ca.png',
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
    image: 'https://cu-media.imgix.net/meal-service/meals/6795/main_image/6795_Pierre_Thaim_Oxtail_Stew_6608.jpg?height=600&width=800&fit=crop&format=webp',
    chefImage: 'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Pierre_Thiam_dd218212cb.png',
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
    image: 'https://cu-media.imgix.net/meal-service/meals/2682/main_image/2682_Akhtar-Nawab_Southern-Soul-Gumbo_WB_LowRes-35.jpg?height=600&width=800&fit=crop&format=webp',
    chefImage: 'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Akhtar_Nawab_fa5119959c.png',
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
    image: 'https://cu-media.imgix.net/media/catalog/product/cache/x1200/m/i/michelle_bernstein_chicken_parm.jpg?height=600&width=800&fit=crop&format=webp',
    chefImage: 'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Michelle_Bernstein_83fe5b895f.png',
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
    image: 'https://cu-media.imgix.net/media/catalog/product/cache/x1200/s/u/sunday_sauce_rigatoni_with_meatballs_-_3564.jpeg?height=600&width=800&fit=crop&format=webp',
    chefImage: 'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/John_De_Lucie_0e67d16f7f.png',
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
    image: 'https://cu-media.imgix.net/media/catalog/product/cache/x1200/m/a/macandcheese-johndl.jpeg?height=600&width=800&fit=crop&format=webp',
    chefImage: 'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/John_De_Lucie_0e67d16f7f.png',
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
