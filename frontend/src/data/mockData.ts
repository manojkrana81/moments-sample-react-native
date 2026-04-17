// Complete mock data store for Moments app

export interface MockUser {
  id: string;
  username: string;
  full_name: string;
  bio: string;
  profile_picture: string;
  followers_count: number;
  following_count: number;
  posts_count: number;
  is_following: boolean;
}

export interface MockPost {
  id: string;
  user_id: string;
  username: string;
  user_profile_picture: string;
  caption: string | null;
  image: string;
  location: string | null;
  likes_count: number;
  is_liked: boolean;
  comments_count: number;
  comments: MockComment[];
  created_at: string;
}

export interface MockComment {
  id: string;
  user_id: string;
  username: string;
  profile_picture: string;
  text: string;
  created_at: string;
  likes_count: number;
}

export interface MockStory {
  id: string;
  user_id: string;
  username: string;
  user_profile_picture: string;
  image: string;
  is_viewed: boolean;
  created_at: string;
}

export interface MockReel {
  id: string;
  user_id: string;
  username: string;
  user_profile_picture: string;
  image: string;
  caption: string;
  audio: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  is_liked: boolean;
}

export interface MockConversation {
  user_id: string;
  username: string;
  full_name: string;
  profile_picture: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
  is_online: boolean;
}

export interface MockMessage {
  id: string;
  sender_id: string;
  recipient_id: string;
  text: string;
  read: boolean;
  created_at: string;
}

export interface MockNotification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  user_id: string;
  username: string;
  profile_picture: string;
  text: string;
  post_image?: string;
  created_at: string;
  is_read: boolean;
}

// ========== AVATARS ==========
const A = {
  emma: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
  james: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  sophia: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
  liam: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
  olivia: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
  noah: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
  ava: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
  ethan: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
};

// ========== POST IMAGES ==========
const P = [
  'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1681477578092-979cc57ba5f8?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1743699537582-31bb3620dd66?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1694211490308-25f03a7fede9?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1675894839712-7d06f1fb2f0e?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1743699537171-750edd44bd87?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1633614386903-27d7eb3e8b20?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1734293046563-2e51b2cc10be?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=800&fit=crop',
];

// ========== REEL IMAGES (portrait) ==========
const R = [
  'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&h=1000&fit=crop',
];

const now = new Date();
const h = (hrs: number) => new Date(now.getTime() - hrs * 3600000).toISOString();
const d = (days: number) => new Date(now.getTime() - days * 86400000).toISOString();

// ========== USERS ==========
export const MOCK_USERS: MockUser[] = [
  { id: 'u1', username: 'emma.travels', full_name: 'Emma Wilson', bio: 'Travel photographer\nExploring one city at a time\nwww.emmatravels.com', profile_picture: A.emma, followers_count: 12400, following_count: 845, posts_count: 234, is_following: true },
  { id: 'u2', username: 'james.captures', full_name: 'James Chen', bio: 'Adventure seeker | Mountaineer\nStoryteller | Based in Colorado', profile_picture: A.james, followers_count: 8930, following_count: 512, posts_count: 189, is_following: false },
  { id: 'u3', username: 'sophia.creates', full_name: 'Sophia Martinez', bio: 'Content creator | Coffee lover\nNYC based | DM for collabs', profile_picture: A.sophia, followers_count: 24100, following_count: 1023, posts_count: 567, is_following: true },
  { id: 'u4', username: 'liam.music', full_name: 'Liam Anderson', bio: 'Musician | Singer-songwriter\nNew album out now', profile_picture: A.liam, followers_count: 5670, following_count: 320, posts_count: 98, is_following: false },
  { id: 'u5', username: 'olivia.eats', full_name: 'Olivia Kim', bio: 'Foodie | Recipe developer\nCafe hopper | Seoul & NYC', profile_picture: A.olivia, followers_count: 18200, following_count: 678, posts_count: 412, is_following: true },
  { id: 'u6', username: 'noah.design', full_name: 'Noah Wright', bio: 'UI/UX Designer\nMinimalist | Clean aesthetics', profile_picture: A.noah, followers_count: 3200, following_count: 210, posts_count: 67, is_following: false },
  { id: 'u7', username: 'ava.fitness', full_name: 'Ava Thompson', bio: 'Fitness coach | Yoga\nHealthy living advocate', profile_picture: A.ava, followers_count: 45000, following_count: 890, posts_count: 890, is_following: true },
  { id: 'u8', username: 'ethan.codes', full_name: 'Ethan Park', bio: 'Software Engineer\nBuilding cool stuff', profile_picture: A.ethan, followers_count: 1500, following_count: 430, posts_count: 34, is_following: false },
];

// ========== POSTS ==========
export const MOCK_POSTS: MockPost[] = [
  { id: 'p1', user_id: 'u1', username: 'emma.travels', user_profile_picture: A.emma, caption: 'Wandering through hidden gems. Every corner tells a story.', image: P[0], location: 'Everest Base Camp', likes_count: 1243, is_liked: false, comments_count: 89, comments: [
    { id: 'c1', user_id: 'u3', username: 'sophia.creates', profile_picture: A.sophia, text: 'Absolutely breathtaking! Adding this to my bucket list', created_at: h(2), likes_count: 12 },
    { id: 'c2', user_id: 'u4', username: 'liam.music', profile_picture: A.liam, text: 'Epic shot! How was the trek?', created_at: h(3), likes_count: 5 },
    { id: 'c3', user_id: 'u7', username: 'ava.fitness', profile_picture: A.ava, text: 'This is on my list for next year!', created_at: h(4), likes_count: 8 },
  ], created_at: h(4) },
  { id: 'p2', user_id: 'u5', username: 'olivia.eats', user_profile_picture: A.olivia, caption: 'Morning ritual. Nothing like a perfect cup of coffee.', image: P[1], location: 'Brooklyn, NYC', likes_count: 892, is_liked: true, comments_count: 56, comments: [
    { id: 'c4', user_id: 'u1', username: 'emma.travels', profile_picture: A.emma, text: 'This looks incredible! Which cafe?', created_at: h(1), likes_count: 3 },
    { id: 'c5', user_id: 'u6', username: 'noah.design', profile_picture: A.noah, text: 'The aesthetic is perfect', created_at: h(2), likes_count: 7 },
  ], created_at: h(6) },
  { id: 'p3', user_id: 'u3', username: 'sophia.creates', user_profile_picture: A.sophia, caption: 'Golden hour magic. When the light hits just right...', image: P[2], location: 'Coastal Town', likes_count: 2341, is_liked: false, comments_count: 134, comments: [
    { id: 'c6', user_id: 'u2', username: 'james.captures', profile_picture: A.james, text: 'The composition is perfect!', created_at: h(5), likes_count: 15 },
    { id: 'c7', user_id: 'u5', username: 'olivia.eats', profile_picture: A.olivia, text: 'Stunning colors!', created_at: h(6), likes_count: 4 },
  ], created_at: h(8) },
  { id: 'p4', user_id: 'u2', username: 'james.captures', user_profile_picture: A.james, caption: 'The desert has its own kind of beauty. Silence speaks volumes.', image: P[7], location: 'Sahara Desert', likes_count: 567, is_liked: false, comments_count: 34, comments: [], created_at: h(12) },
  { id: 'p5', user_id: 'u5', username: 'olivia.eats', user_profile_picture: A.olivia, caption: 'Sunday brunch done right. The cheese plate was divine.', image: P[3], location: 'Le Petit Cafe', likes_count: 1567, is_liked: true, comments_count: 78, comments: [
    { id: 'c8', user_id: 'u3', username: 'sophia.creates', profile_picture: A.sophia, text: 'Take me there! Looks divine', created_at: h(10), likes_count: 9 },
  ], created_at: d(1) },
  { id: 'p6', user_id: 'u4', username: 'liam.music', user_profile_picture: A.liam, caption: 'New song in the works. Music is therapy.', image: P[6], location: null, likes_count: 432, is_liked: false, comments_count: 23, comments: [], created_at: d(1) },
  { id: 'p7', user_id: 'u1', username: 'emma.travels', user_profile_picture: A.emma, caption: 'Moody skies and old stone houses. Scotland has my heart.', image: P[5], location: 'Scottish Highlands', likes_count: 1890, is_liked: true, comments_count: 102, comments: [], created_at: d(2) },
  { id: 'p8', user_id: 'u3', username: 'sophia.creates', user_profile_picture: A.sophia, caption: 'Behind the scenes. The art of making great coffee.', image: P[4], location: 'Studio', likes_count: 3210, is_liked: false, comments_count: 198, comments: [], created_at: d(3) },
  { id: 'p9', user_id: 'u7', username: 'ava.fitness', user_profile_picture: A.ava, caption: 'Sunrise yoga session. Start your day right.', image: P[8], location: 'Bali, Indonesia', likes_count: 4500, is_liked: false, comments_count: 230, comments: [], created_at: d(3) },
  { id: 'p10', user_id: 'u6', username: 'noah.design', user_profile_picture: A.noah, caption: 'Clean lines, bold typography. Design is in the details.', image: P[9], location: null, likes_count: 780, is_liked: false, comments_count: 45, comments: [], created_at: d(4) },
  { id: 'p11', user_id: 'u1', username: 'emma.travels', user_profile_picture: A.emma, caption: 'Lost in the Swiss Alps. Nature never disappoints.', image: P[11], location: 'Swiss Alps', likes_count: 2100, is_liked: true, comments_count: 150, comments: [], created_at: d(5) },
  { id: 'p12', user_id: 'u5', username: 'olivia.eats', user_profile_picture: A.olivia, caption: 'Homemade pasta with a view. Cooking is love made visible.', image: P[10], location: 'Tuscany, Italy', likes_count: 3400, is_liked: false, comments_count: 210, comments: [], created_at: d(6) },
];

// ========== STORIES ==========
export const MOCK_STORIES: MockStory[] = [
  { id: 's1', user_id: 'u1', username: 'emma.travels', user_profile_picture: A.emma, image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=1000&fit=crop', is_viewed: false, created_at: h(2) },
  { id: 's2', user_id: 'u3', username: 'sophia.creates', user_profile_picture: A.sophia, image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&h=1000&fit=crop', is_viewed: false, created_at: h(5) },
  { id: 's3', user_id: 'u5', username: 'olivia.eats', user_profile_picture: A.olivia, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=1000&fit=crop', is_viewed: true, created_at: h(8) },
  { id: 's4', user_id: 'u4', username: 'liam.music', user_profile_picture: A.liam, image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=1000&fit=crop', is_viewed: false, created_at: h(10) },
  { id: 's5', user_id: 'u7', username: 'ava.fitness', user_profile_picture: A.ava, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=1000&fit=crop', is_viewed: false, created_at: h(12) },
];

// ========== REELS ==========
export const MOCK_REELS: MockReel[] = [
  { id: 'r1', user_id: 'u1', username: 'emma.travels', user_profile_picture: A.emma, image: R[0], caption: 'Paradise found. This beach is unreal.', audio: 'Ocean Waves - Nature Sounds', likes_count: 45200, comments_count: 1230, shares_count: 890, is_liked: false },
  { id: 'r2', user_id: 'u7', username: 'ava.fitness', user_profile_picture: A.ava, image: R[1], caption: 'Morning meditation in the mountains. Peace of mind.', audio: 'Calm Piano - Relaxing', likes_count: 32100, comments_count: 890, shares_count: 2340, is_liked: true },
  { id: 'r3', user_id: 'u3', username: 'sophia.creates', user_profile_picture: A.sophia, image: R[2], caption: 'Golden light through the trees. Magic hour.', audio: 'Sunset Vibes - Chill Mix', likes_count: 28900, comments_count: 567, shares_count: 1200, is_liked: false },
  { id: 'r4', user_id: 'u2', username: 'james.captures', user_profile_picture: A.james, image: R[3], caption: 'Crystal clear waters. No filter needed.', audio: 'Tropical Beat - DJ Mix', likes_count: 56700, comments_count: 2340, shares_count: 4500, is_liked: false },
  { id: 'r5', user_id: 'u5', username: 'olivia.eats', user_profile_picture: A.olivia, image: R[4], caption: 'Starry night in the mountains. Pure magic.', audio: 'Night Sky - Ambient', likes_count: 19800, comments_count: 430, shares_count: 670, is_liked: true },
  { id: 'r6', user_id: 'u4', username: 'liam.music', user_profile_picture: A.liam, image: R[5], caption: 'The mountains are calling. Adventure awaits.', audio: 'Epic Journey - Cinematic', likes_count: 38400, comments_count: 1100, shares_count: 2100, is_liked: false },
  { id: 'r7', user_id: 'u6', username: 'noah.design', user_profile_picture: A.noah, image: R[6], caption: 'Find your calm in the forest. Breathe.', audio: 'Forest Rain - ASMR', likes_count: 15600, comments_count: 340, shares_count: 560, is_liked: false },
  { id: 'r8', user_id: 'u7', username: 'ava.fitness', user_profile_picture: A.ava, image: R[7], caption: 'Every sunset is a new promise. Keep going.', audio: 'Motivational - Workout', likes_count: 42300, comments_count: 1890, shares_count: 3200, is_liked: true },
];

// ========== CONVERSATIONS ==========
export const MOCK_CONVERSATIONS: MockConversation[] = [
  { user_id: 'u1', username: 'emma.travels', full_name: 'Emma Wilson', profile_picture: A.emma, last_message: 'That sunset was incredible! Where was it?', last_message_time: h(1), unread_count: 2, is_online: true },
  { user_id: 'u3', username: 'sophia.creates', full_name: 'Sophia Martinez', profile_picture: A.sophia, last_message: "Let's collab on that shoot next week!", last_message_time: h(3), unread_count: 0, is_online: true },
  { user_id: 'u5', username: 'olivia.eats', full_name: 'Olivia Kim', profile_picture: A.olivia, last_message: 'Have you tried the new place on 5th ave?', last_message_time: h(8), unread_count: 1, is_online: false },
  { user_id: 'u2', username: 'james.captures', full_name: 'James Chen', profile_picture: A.james, last_message: 'Great seeing you at the summit!', last_message_time: d(1), unread_count: 0, is_online: false },
  { user_id: 'u7', username: 'ava.fitness', full_name: 'Ava Thompson', profile_picture: A.ava, last_message: 'Thanks for the workout tips!', last_message_time: d(2), unread_count: 0, is_online: true },
  { user_id: 'u4', username: 'liam.music', full_name: 'Liam Anderson', profile_picture: A.liam, last_message: 'Check out my new track!', last_message_time: d(3), unread_count: 3, is_online: false },
];

// ========== MESSAGES ==========
export const MOCK_MESSAGES: Record<string, MockMessage[]> = {
  u1: [
    { id: 'm1', sender_id: 'u1', recipient_id: 'me', text: 'Hey! Loved your latest post', read: true, created_at: h(5) },
    { id: 'm2', sender_id: 'me', recipient_id: 'u1', text: 'Thanks so much! Your travel shots are amazing', read: true, created_at: h(4) },
    { id: 'm3', sender_id: 'u1', recipient_id: 'me', text: 'That sunset was incredible! Where was it?', read: false, created_at: h(1) },
    { id: 'm4', sender_id: 'u1', recipient_id: 'me', text: 'Would love to visit someday', read: false, created_at: h(1) },
  ],
  u3: [
    { id: 'm5', sender_id: 'me', recipient_id: 'u3', text: 'Your content is so inspiring!', read: true, created_at: h(6) },
    { id: 'm6', sender_id: 'u3', recipient_id: 'me', text: 'That means a lot, thank you!', read: true, created_at: h(5) },
    { id: 'm7', sender_id: 'me', recipient_id: 'u3', text: 'We should do a collab sometime', read: true, created_at: h(4) },
    { id: 'm8', sender_id: 'u3', recipient_id: 'me', text: "Let's collab on that shoot next week!", read: true, created_at: h(3) },
  ],
  u5: [
    { id: 'm9', sender_id: 'u5', recipient_id: 'me', text: 'Have you tried the new place on 5th ave?', read: false, created_at: h(8) },
  ],
  u2: [
    { id: 'm10', sender_id: 'u2', recipient_id: 'me', text: 'Great seeing you at the summit!', read: true, created_at: d(1) },
  ],
  u7: [
    { id: 'm11', sender_id: 'me', recipient_id: 'u7', text: 'Great workout tips!', read: true, created_at: d(2) },
    { id: 'm12', sender_id: 'u7', recipient_id: 'me', text: 'Thanks for the workout tips!', read: true, created_at: d(2) },
  ],
  u4: [
    { id: 'm13', sender_id: 'u4', recipient_id: 'me', text: 'Check out my new track!', read: false, created_at: d(3) },
    { id: 'm14', sender_id: 'u4', recipient_id: 'me', text: 'Also working on a music video', read: false, created_at: d(3) },
    { id: 'm15', sender_id: 'u4', recipient_id: 'me', text: "Let me know what you think!", read: false, created_at: d(3) },
  ],
};

// ========== NOTIFICATIONS ==========
export const MOCK_NOTIFICATIONS: MockNotification[] = [
  { id: 'n1', type: 'like', user_id: 'u3', username: 'sophia.creates', profile_picture: A.sophia, text: 'liked your photo.', post_image: P[0], created_at: h(1), is_read: false },
  { id: 'n2', type: 'follow', user_id: 'u8', username: 'ethan.codes', profile_picture: A.ethan, text: 'started following you.', created_at: h(2), is_read: false },
  { id: 'n3', type: 'comment', user_id: 'u5', username: 'olivia.eats', profile_picture: A.olivia, text: 'commented: "This is amazing!"', post_image: P[2], created_at: h(4), is_read: false },
  { id: 'n4', type: 'like', user_id: 'u1', username: 'emma.travels', profile_picture: A.emma, text: 'liked your photo.', post_image: P[1], created_at: h(6), is_read: true },
  { id: 'n5', type: 'follow', user_id: 'u6', username: 'noah.design', profile_picture: A.noah, text: 'started following you.', created_at: h(10), is_read: true },
  { id: 'n6', type: 'mention', user_id: 'u7', username: 'ava.fitness', profile_picture: A.ava, text: 'mentioned you in a comment.', post_image: P[8], created_at: h(12), is_read: true },
  { id: 'n7', type: 'like', user_id: 'u4', username: 'liam.music', profile_picture: A.liam, text: 'liked your photo.', post_image: P[5], created_at: d(1), is_read: true },
  { id: 'n8', type: 'comment', user_id: 'u2', username: 'james.captures', profile_picture: A.james, text: 'commented: "Great perspective!"', post_image: P[0], created_at: d(1), is_read: true },
  { id: 'n9', type: 'follow', user_id: 'u4', username: 'liam.music', profile_picture: A.liam, text: 'started following you.', created_at: d(2), is_read: true },
  { id: 'n10', type: 'like', user_id: 'u7', username: 'ava.fitness', profile_picture: A.ava, text: 'and 23 others liked your photo.', post_image: P[8], created_at: d(3), is_read: true },
];

// Helper
export const formatCount = (n: number): string => {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
};
