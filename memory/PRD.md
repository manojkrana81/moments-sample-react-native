# Moments - Instagram-Like Mobile App (PRD)

## Overview
**Moments** is a frontend-only Instagram-like mobile app built with React Native / Expo. It features a clean, modern light theme with full-width posts, stories, messaging, user search, and profile management - all powered by mock data with internet images.

## Architecture
- **Frontend Only** - No backend, no database
- **Mock Data** - All posts, stories, users, messages are from local mock data (`src/data/mockData.ts`)
- **Auth** - In-memory state, no persistence. Login/register works with any valid input
- **Images** - Unsplash URLs for all post and profile images

## Features

### 1. Authentication
- Login with email/phone/username + password
- Registration with email, username, full name, password
- Local-only auth (no backend calls)

### 2. Home Feed
- Stories carousel at top (tappable to view full-screen)
- Full-width posts with Unsplash images
- Like/unlike with heart animation
- Comment count, share, bookmark buttons
- Pull-to-refresh
- Relative timestamps

### 3. Search / Explore
- Explore grid showing all posts
- Search users by username or name
- Follow/unfollow from search results

### 4. Add Post
- Image picker from device gallery (base64)
- Caption input
- Location tag
- Share as Post or Story (24h)

### 5. Messages
- Conversations list with unread badges
- Chat view with message bubbles
- Send new messages
- Mark messages as read

### 6. Profile
- User avatar with initial
- Posts/Followers/Following stats
- Grid of user posts
- Saved posts tab
- Edit Profile / Share Profile buttons
- Logout

## Tech Stack
- React Native 0.81 + Expo 54
- Expo Router (file-based navigation)
- TypeScript
- Ionicons for icons
- date-fns for time formatting
- expo-image-picker for photo selection

## File Structure
```
frontend/
  app/
    _layout.tsx        - Root layout with AuthProvider
    index.tsx          - Entry redirect (auth check)
    (auth)/
      _layout.tsx      - Auth stack layout
      login.tsx        - Login screen
      register.tsx     - Register screen
    (tabs)/
      _layout.tsx      - Tab navigation layout
      home.tsx         - Home feed with posts & stories
      search.tsx       - User search & explore grid
      add-post.tsx     - Create post/story
      messages.tsx     - Conversations & chat
      profile.tsx      - User profile
  src/
    contexts/
      AuthContext.tsx   - Auth state management
    data/
      mockData.ts      - All mock data (users, posts, stories, messages)
```

## Design
- **Theme**: Light, clean, modern
- **Primary Color**: #4A90E2 (Soft Blue)
- **Text**: #2C3E50 (Dark), #7F8C8D (Secondary), #95A5A6 (Muted)
- **Background**: #FFFFFF
- **Posts**: Full device width
- **Navigation**: Bottom tabs (5 tabs)

## Future Enhancements
- Backend integration (FastAPI + MongoDB already scaffolded)
- Real-time messaging with WebSockets
- Push notifications
- Video/Reels support
- AI-powered content recommendations
- Monetization: Premium features, promoted posts
