// Mock data store for Moments app (frontend-only, no backend)

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
}

export interface MockStory {
  id: string;
  user_id: string;
  username: string;
  user_profile_picture: string;
  image: string;
  views_count: number;
  is_viewed: boolean;
  created_at: string;
  expires_at: string;
}

export interface MockConversation {
  user_id: string;
  username: string;
  profile_picture: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
}

export interface MockMessage {
  id: string;
  sender_id: string;
  recipient_id: string;
  text: string;
  read: boolean;
  created_at: string;
}

// Profile pictures
const AVATARS = {
  emma: 'https://images.unsplash.com/photo-1624031993438-ff5daf2ea2b3?w=200&h=200&fit=crop&crop=face',
  james: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?w=200&h=200&fit=crop&crop=face',
  sophia: 'https://images.unsplash.com/photo-1595272832315-ce58b3df56ce?w=200&h=200&fit=crop&crop=face',
  liam: 'https://images.unsplash.com/photo-1595272833605-0bfb010c2d4c?w=200&h=200&fit=crop&crop=face',
  olivia: 'https://images.unsplash.com/photo-1730871080052-acf39ef53f71?w=200&h=200&fit=crop&crop=face',
};

// Post images
const POST_IMAGES = [
  'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1681477578092-979cc57ba5f8?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1743699537582-31bb3620dd66?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1694211490308-25f03a7fede9?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1675894839712-7d06f1fb2f0e?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1743699537171-750edd44bd87?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1633614386903-27d7eb3e8b20?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1734293046563-2e51b2cc10be?w=800&h=800&fit=crop',
];

// Story images
const STORY_IMAGES = [
  'https://images.unsplash.com/photo-1624031993438-ff5daf2ea2b3?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1730871080052-acf39ef53f71?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1595272832315-ce58b3df56ce?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1675894839712-7d06f1fb2f0e?w=600&h=800&fit=crop',
];

export const MOCK_USERS: MockUser[] = [
  {
    id: 'u1',
    username: 'emma.travels',
    full_name: 'Emma Wilson',
    bio: 'Travel photographer | Exploring one city at a time',
    profile_picture: AVATARS.emma,
    followers_count: 12400,
    following_count: 845,
    posts_count: 234,
    is_following: true,
  },
  {
    id: 'u2',
    username: 'james.captures',
    full_name: 'James Chen',
    bio: 'Adventure seeker | Mountaineer | Storyteller',
    profile_picture: AVATARS.james,
    followers_count: 8930,
    following_count: 512,
    posts_count: 189,
    is_following: false,
  },
  {
    id: 'u3',
    username: 'sophia.creates',
    full_name: 'Sophia Martinez',
    bio: 'Content creator | Coffee lover | NYC based',
    profile_picture: AVATARS.sophia,
    followers_count: 24100,
    following_count: 1023,
    posts_count: 567,
    is_following: true,
  },
  {
    id: 'u4',
    username: 'liam.music',
    full_name: 'Liam Anderson',
    bio: 'Musician | Singer-songwriter | Guitar vibes',
    profile_picture: AVATARS.liam,
    followers_count: 5670,
    following_count: 320,
    posts_count: 98,
    is_following: false,
  },
  {
    id: 'u5',
    username: 'olivia.eats',
    full_name: 'Olivia Kim',
    bio: 'Foodie | Recipe developer | Cafe hopper',
    profile_picture: AVATARS.olivia,
    followers_count: 18200,
    following_count: 678,
    posts_count: 412,
    is_following: true,
  },
];

const now = new Date();
const hoursAgo = (h: number) => new Date(now.getTime() - h * 60 * 60 * 1000).toISOString();
const daysAgo = (d: number) => new Date(now.getTime() - d * 24 * 60 * 60 * 1000).toISOString();

export const MOCK_POSTS: MockPost[] = [
  {
    id: 'p1',
    user_id: 'u1',
    username: 'emma.travels',
    user_profile_picture: AVATARS.emma,
    caption: 'Wandering through hidden gems. Every corner tells a story.',
    image: POST_IMAGES[0],
    location: 'Everest Base Camp',
    likes_count: 1243,
    is_liked: false,
    comments_count: 89,
    comments: [
      { id: 'c1', user_id: 'u3', username: 'sophia.creates', profile_picture: AVATARS.sophia, text: 'Absolutely breathtaking! Adding this to my bucket list', created_at: hoursAgo(2) },
      { id: 'c2', user_id: 'u4', username: 'liam.music', profile_picture: AVATARS.liam, text: 'Epic shot! How was the trek?', created_at: hoursAgo(3) },
    ],
    created_at: hoursAgo(4),
  },
  {
    id: 'p2',
    user_id: 'u5',
    username: 'olivia.eats',
    user_profile_picture: AVATARS.olivia,
    caption: 'Morning ritual. There is nothing like a perfect cup of coffee.',
    image: POST_IMAGES[1],
    location: 'Brooklyn, NYC',
    likes_count: 892,
    is_liked: true,
    comments_count: 56,
    comments: [
      { id: 'c3', user_id: 'u1', username: 'emma.travels', profile_picture: AVATARS.emma, text: 'This looks incredible! Which cafe?', created_at: hoursAgo(1) },
    ],
    created_at: hoursAgo(6),
  },
  {
    id: 'p3',
    user_id: 'u3',
    username: 'sophia.creates',
    user_profile_picture: AVATARS.sophia,
    caption: 'Golden hour magic. When the light hits just right...',
    image: POST_IMAGES[2],
    location: 'Coastal Town',
    likes_count: 2341,
    is_liked: false,
    comments_count: 134,
    comments: [
      { id: 'c4', user_id: 'u2', username: 'james.captures', profile_picture: AVATARS.james, text: 'The composition is perfect!', created_at: hoursAgo(5) },
      { id: 'c5', user_id: 'u5', username: 'olivia.eats', profile_picture: AVATARS.olivia, text: 'Stunning colors!', created_at: hoursAgo(6) },
    ],
    created_at: hoursAgo(8),
  },
  {
    id: 'p4',
    user_id: 'u2',
    username: 'james.captures',
    user_profile_picture: AVATARS.james,
    caption: 'The desert has its own kind of beauty. Silence speaks volumes.',
    image: POST_IMAGES[7],
    location: 'Sahara Desert',
    likes_count: 567,
    is_liked: false,
    comments_count: 34,
    comments: [],
    created_at: hoursAgo(12),
  },
  {
    id: 'p5',
    user_id: 'u5',
    username: 'olivia.eats',
    user_profile_picture: AVATARS.olivia,
    caption: 'Sunday brunch done right. The cheese plate was to die for.',
    image: POST_IMAGES[3],
    location: 'Le Petit Cafe',
    likes_count: 1567,
    is_liked: true,
    comments_count: 78,
    comments: [
      { id: 'c6', user_id: 'u3', username: 'sophia.creates', profile_picture: AVATARS.sophia, text: 'Take me there! Looks divine', created_at: hoursAgo(10) },
    ],
    created_at: daysAgo(1),
  },
  {
    id: 'p6',
    user_id: 'u4',
    username: 'liam.music',
    user_profile_picture: AVATARS.liam,
    caption: 'New song in the works. Music is therapy.',
    image: POST_IMAGES[6],
    location: null,
    likes_count: 432,
    is_liked: false,
    comments_count: 23,
    comments: [],
    created_at: daysAgo(1),
  },
  {
    id: 'p7',
    user_id: 'u1',
    username: 'emma.travels',
    user_profile_picture: AVATARS.emma,
    caption: 'Moody skies and old stone houses. Scotland has my heart.',
    image: POST_IMAGES[5],
    location: 'Scottish Highlands',
    likes_count: 1890,
    is_liked: true,
    comments_count: 102,
    comments: [],
    created_at: daysAgo(2),
  },
  {
    id: 'p8',
    user_id: 'u3',
    username: 'sophia.creates',
    user_profile_picture: AVATARS.sophia,
    caption: 'Behind the scenes. The art of making great coffee.',
    image: POST_IMAGES[4],
    location: 'Studio',
    likes_count: 3210,
    is_liked: false,
    comments_count: 198,
    comments: [],
    created_at: daysAgo(3),
  },
];

export const MOCK_STORIES: MockStory[] = [
  {
    id: 's1',
    user_id: 'u1',
    username: 'emma.travels',
    user_profile_picture: AVATARS.emma,
    image: STORY_IMAGES[0],
    views_count: 234,
    is_viewed: false,
    created_at: hoursAgo(2),
    expires_at: hoursAgo(-22),
  },
  {
    id: 's2',
    user_id: 'u3',
    username: 'sophia.creates',
    user_profile_picture: AVATARS.sophia,
    image: STORY_IMAGES[2],
    views_count: 567,
    is_viewed: false,
    created_at: hoursAgo(5),
    expires_at: hoursAgo(-19),
  },
  {
    id: 's3',
    user_id: 'u5',
    username: 'olivia.eats',
    user_profile_picture: AVATARS.olivia,
    image: STORY_IMAGES[1],
    views_count: 123,
    is_viewed: true,
    created_at: hoursAgo(8),
    expires_at: hoursAgo(-16),
  },
  {
    id: 's4',
    user_id: 'u4',
    username: 'liam.music',
    user_profile_picture: AVATARS.liam,
    image: STORY_IMAGES[3],
    views_count: 89,
    is_viewed: false,
    created_at: hoursAgo(10),
    expires_at: hoursAgo(-14),
  },
];

export const MOCK_CONVERSATIONS: MockConversation[] = [
  {
    user_id: 'u1',
    username: 'emma.travels',
    profile_picture: AVATARS.emma,
    last_message: 'That sunset was incredible! Where was it?',
    last_message_time: hoursAgo(1),
    unread_count: 2,
  },
  {
    user_id: 'u3',
    username: 'sophia.creates',
    profile_picture: AVATARS.sophia,
    last_message: 'Let\'s collab on that shoot next week!',
    last_message_time: hoursAgo(3),
    unread_count: 0,
  },
  {
    user_id: 'u5',
    username: 'olivia.eats',
    profile_picture: AVATARS.olivia,
    last_message: 'Have you tried the new place on 5th ave?',
    last_message_time: hoursAgo(8),
    unread_count: 1,
  },
  {
    user_id: 'u2',
    username: 'james.captures',
    profile_picture: AVATARS.james,
    last_message: 'Great seeing you at the summit!',
    last_message_time: daysAgo(1),
    unread_count: 0,
  },
];

export const MOCK_MESSAGES: Record<string, MockMessage[]> = {
  u1: [
    { id: 'm1', sender_id: 'u1', recipient_id: 'me', text: 'Hey! Loved your latest post', read: true, created_at: hoursAgo(5) },
    { id: 'm2', sender_id: 'me', recipient_id: 'u1', text: 'Thanks so much! Your travel shots are amazing', read: true, created_at: hoursAgo(4) },
    { id: 'm3', sender_id: 'u1', recipient_id: 'me', text: 'That sunset was incredible! Where was it?', read: false, created_at: hoursAgo(1) },
    { id: 'm4', sender_id: 'u1', recipient_id: 'me', text: 'Would love to visit someday', read: false, created_at: hoursAgo(1) },
  ],
  u3: [
    { id: 'm5', sender_id: 'me', recipient_id: 'u3', text: 'Your content is so inspiring!', read: true, created_at: hoursAgo(6) },
    { id: 'm6', sender_id: 'u3', recipient_id: 'me', text: 'That means a lot, thank you!', read: true, created_at: hoursAgo(5) },
    { id: 'm7', sender_id: 'me', recipient_id: 'u3', text: 'We should do a collab sometime', read: true, created_at: hoursAgo(4) },
    { id: 'm8', sender_id: 'u3', recipient_id: 'me', text: "Let's collab on that shoot next week!", read: true, created_at: hoursAgo(3) },
  ],
  u5: [
    { id: 'm9', sender_id: 'u5', recipient_id: 'me', text: 'Have you tried the new place on 5th ave?', read: false, created_at: hoursAgo(8) },
  ],
  u2: [
    { id: 'm10', sender_id: 'u2', recipient_id: 'me', text: 'Great seeing you at the summit!', read: true, created_at: daysAgo(1) },
  ],
};
