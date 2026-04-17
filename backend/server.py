from fastapi import FastAPI, APIRouter, HTTPException, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List
from datetime import datetime, timedelta
from bson import ObjectId

from models import (
    UserCreate, UserLogin, User, UserProfile, TokenResponse,
    PostCreate, Post, PostResponse, CommentCreate, Comment,
    StoryCreate, Story, StoryResponse,
    MessageCreate, Message, Conversation
)
from auth import hash_password, verify_password, create_access_token, get_current_user

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ===========================
# AUTH ENDPOINTS
# ===========================

@api_router.post("/auth/register", response_model=TokenResponse)
async def register(user_data: UserCreate):
    """Register a new user"""
    # Check if email or phone already exists
    if user_data.email:
        existing = await db.users.find_one({"email": user_data.email})
        if existing:
            raise HTTPException(status_code=400, detail="Email already registered")
    
    if user_data.phone:
        existing = await db.users.find_one({"phone": user_data.phone})
        if existing:
            raise HTTPException(status_code=400, detail="Phone already registered")
    
    # Check if username exists
    existing = await db.users.find_one({"username": user_data.username})
    if existing:
        raise HTTPException(status_code=400, detail="Username already taken")
    
    # Hash password
    hashed_password = hash_password(user_data.password)
    
    # Create user
    user_dict = {
        "email": user_data.email,
        "phone": user_data.phone,
        "username": user_data.username,
        "full_name": user_data.full_name,
        "password": hashed_password,
        "bio": "",
        "profile_picture": None,
        "followers": [],
        "following": [],
        "created_at": datetime.utcnow()
    }
    
    result = await db.users.insert_one(user_dict)
    user_id = str(result.inserted_id)
    
    # Create access token
    token = create_access_token({"user_id": user_id})
    
    # Get user profile
    profile = UserProfile(
        id=user_id,
        username=user_data.username,
        full_name=user_data.full_name,
        bio="",
        profile_picture=None,
        followers_count=0,
        following_count=0,
        posts_count=0,
        is_following=False
    )
    
    return TokenResponse(access_token=token, user=profile)

@api_router.post("/auth/login", response_model=TokenResponse)
async def login(credentials: UserLogin):
    """Login user"""
    # Find user by email, phone, or username
    user = await db.users.find_one({
        "$or": [
            {"email": credentials.identifier},
            {"phone": credentials.identifier},
            {"username": credentials.identifier}
        ]
    })
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Verify password
    if not verify_password(credentials.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    user_id = str(user["_id"])
    
    # Create access token
    token = create_access_token({"user_id": user_id})
    
    # Get posts count
    posts_count = await db.posts.count_documents({"user_id": user_id})
    
    # Get user profile
    profile = UserProfile(
        id=user_id,
        username=user["username"],
        full_name=user["full_name"],
        bio=user.get("bio", ""),
        profile_picture=user.get("profile_picture"),
        followers_count=len(user.get("followers", [])),
        following_count=len(user.get("following", [])),
        posts_count=posts_count,
        is_following=False
    )
    
    return TokenResponse(access_token=token, user=profile)

@api_router.get("/auth/me", response_model=UserProfile)
async def get_current_user_profile(current_user_id: str = Depends(get_current_user)):
    """Get current user profile"""
    user = await db.users.find_one({"_id": ObjectId(current_user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    posts_count = await db.posts.count_documents({"user_id": current_user_id})
    
    return UserProfile(
        id=current_user_id,
        username=user["username"],
        full_name=user["full_name"],
        bio=user.get("bio", ""),
        profile_picture=user.get("profile_picture"),
        followers_count=len(user.get("followers", [])),
        following_count=len(user.get("following", [])),
        posts_count=posts_count,
        is_following=False
    )

# ===========================
# USER ENDPOINTS
# ===========================

@api_router.get("/users/{username}", response_model=UserProfile)
async def get_user_profile(username: str, current_user_id: str = Depends(get_current_user)):
    """Get user profile by username"""
    user = await db.users.find_one({"username": username})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_id = str(user["_id"])
    posts_count = await db.posts.count_documents({"user_id": user_id})
    
    is_following = current_user_id in user.get("followers", [])
    
    return UserProfile(
        id=user_id,
        username=user["username"],
        full_name=user["full_name"],
        bio=user.get("bio", ""),
        profile_picture=user.get("profile_picture"),
        followers_count=len(user.get("followers", [])),
        following_count=len(user.get("following", [])),
        posts_count=posts_count,
        is_following=is_following
    )

@api_router.post("/users/{user_id}/follow")
async def follow_user(user_id: str, current_user_id: str = Depends(get_current_user)):
    """Follow a user"""
    if user_id == current_user_id:
        raise HTTPException(status_code=400, detail="Cannot follow yourself")
    
    # Add current user to target user's followers
    await db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$addToSet": {"followers": current_user_id}}
    )
    
    # Add target user to current user's following
    await db.users.update_one(
        {"_id": ObjectId(current_user_id)},
        {"$addToSet": {"following": user_id}}
    )
    
    return {"message": "User followed successfully"}

@api_router.post("/users/{user_id}/unfollow")
async def unfollow_user(user_id: str, current_user_id: str = Depends(get_current_user)):
    """Unfollow a user"""
    # Remove current user from target user's followers
    await db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$pull": {"followers": current_user_id}}
    )
    
    # Remove target user from current user's following
    await db.users.update_one(
        {"_id": ObjectId(current_user_id)},
        {"$pull": {"following": user_id}}
    )
    
    return {"message": "User unfollowed successfully"}

@api_router.get("/users/search/{query}", response_model=List[UserProfile])
async def search_users(query: str, current_user_id: str = Depends(get_current_user)):
    """Search users by username or full name"""
    users = await db.users.find({
        "$or": [
            {"username": {"$regex": query, "$options": "i"}},
            {"full_name": {"$regex": query, "$options": "i"}}
        ]
    }).limit(20).to_list(20)
    
    result = []
    for user in users:
        user_id = str(user["_id"])
        posts_count = await db.posts.count_documents({"user_id": user_id})
        is_following = current_user_id in user.get("followers", [])
        
        result.append(UserProfile(
            id=user_id,
            username=user["username"],
            full_name=user["full_name"],
            bio=user.get("bio", ""),
            profile_picture=user.get("profile_picture"),
            followers_count=len(user.get("followers", [])),
            following_count=len(user.get("following", [])),
            posts_count=posts_count,
            is_following=is_following
        ))
    
    return result

# ===========================
# POST ENDPOINTS
# ===========================

@api_router.post("/posts", response_model=PostResponse)
async def create_post(post_data: PostCreate, current_user_id: str = Depends(get_current_user)):
    """Create a new post"""
    user = await db.users.find_one({"_id": ObjectId(current_user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    post_dict = {
        "user_id": current_user_id,
        "username": user["username"],
        "user_profile_picture": user.get("profile_picture"),
        "caption": post_data.caption,
        "image": post_data.image,
        "location": post_data.location,
        "likes": [],
        "comments": [],
        "created_at": datetime.utcnow()
    }
    
    result = await db.posts.insert_one(post_dict)
    post_id = str(result.inserted_id)
    
    return PostResponse(
        id=post_id,
        user_id=current_user_id,
        username=user["username"],
        user_profile_picture=user.get("profile_picture"),
        caption=post_data.caption,
        image=post_data.image,
        location=post_data.location,
        likes_count=0,
        is_liked=False,
        comments_count=0,
        created_at=post_dict["created_at"]
    )

@api_router.get("/posts/feed", response_model=List[PostResponse])
async def get_feed(current_user_id: str = Depends(get_current_user)):
    """Get feed posts from followed users"""
    user = await db.users.find_one({"_id": ObjectId(current_user_id)})
    following = user.get("following", [])
    following.append(current_user_id)  # Include own posts
    
    posts = await db.posts.find({"user_id": {"$in": following}}).sort("created_at", -1).limit(50).to_list(50)
    
    result = []
    for post in posts:
        post_id = str(post["_id"])
        is_liked = current_user_id in post.get("likes", [])
        
        result.append(PostResponse(
            id=post_id,
            user_id=post["user_id"],
            username=post["username"],
            user_profile_picture=post.get("user_profile_picture"),
            caption=post.get("caption"),
            image=post["image"],
            location=post.get("location"),
            likes_count=len(post.get("likes", [])),
            is_liked=is_liked,
            comments_count=len(post.get("comments", [])),
            created_at=post["created_at"]
        ))
    
    return result

@api_router.get("/posts/explore", response_model=List[PostResponse])
async def get_explore_posts(current_user_id: str = Depends(get_current_user)):
    """Get explore posts from all users"""
    posts = await db.posts.find({}).sort("created_at", -1).limit(50).to_list(50)
    
    result = []
    for post in posts:
        post_id = str(post["_id"])
        is_liked = current_user_id in post.get("likes", [])
        
        result.append(PostResponse(
            id=post_id,
            user_id=post["user_id"],
            username=post["username"],
            user_profile_picture=post.get("user_profile_picture"),
            caption=post.get("caption"),
            image=post["image"],
            location=post.get("location"),
            likes_count=len(post.get("likes", [])),
            is_liked=is_liked,
            comments_count=len(post.get("comments", [])),
            created_at=post["created_at"]
        ))
    
    return result

@api_router.get("/posts/user/{user_id}", response_model=List[PostResponse])
async def get_user_posts(user_id: str, current_user_id: str = Depends(get_current_user)):
    """Get posts by user"""
    posts = await db.posts.find({"user_id": user_id}).sort("created_at", -1).to_list(100)
    
    result = []
    for post in posts:
        post_id = str(post["_id"])
        is_liked = current_user_id in post.get("likes", [])
        
        result.append(PostResponse(
            id=post_id,
            user_id=post["user_id"],
            username=post["username"],
            user_profile_picture=post.get("user_profile_picture"),
            caption=post.get("caption"),
            image=post["image"],
            location=post.get("location"),
            likes_count=len(post.get("likes", [])),
            is_liked=is_liked,
            comments_count=len(post.get("comments", [])),
            created_at=post["created_at"]
        ))
    
    return result

@api_router.post("/posts/{post_id}/like")
async def like_post(post_id: str, current_user_id: str = Depends(get_current_user)):
    """Like a post"""
    result = await db.posts.update_one(
        {"_id": ObjectId(post_id)},
        {"$addToSet": {"likes": current_user_id}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Post not found or already liked")
    
    return {"message": "Post liked successfully"}

@api_router.post("/posts/{post_id}/unlike")
async def unlike_post(post_id: str, current_user_id: str = Depends(get_current_user)):
    """Unlike a post"""
    result = await db.posts.update_one(
        {"_id": ObjectId(post_id)},
        {"$pull": {"likes": current_user_id}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Post not found or not liked")
    
    return {"message": "Post unliked successfully"}

@api_router.post("/posts/{post_id}/comment")
async def add_comment(post_id: str, comment_data: CommentCreate, current_user_id: str = Depends(get_current_user)):
    """Add a comment to a post"""
    user = await db.users.find_one({"_id": ObjectId(current_user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    comment = Comment(
        id=str(ObjectId()),
        user_id=current_user_id,
        username=user["username"],
        profile_picture=user.get("profile_picture"),
        text=comment_data.text,
        created_at=datetime.utcnow()
    )
    
    await db.posts.update_one(
        {"_id": ObjectId(post_id)},
        {"$push": {"comments": comment.dict()}}
    )
    
    return comment

@api_router.get("/posts/{post_id}/comments", response_model=List[Comment])
async def get_comments(post_id: str, current_user_id: str = Depends(get_current_user)):
    """Get comments for a post"""
    post = await db.posts.find_one({"_id": ObjectId(post_id)})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    return post.get("comments", [])

# ===========================
# STORY ENDPOINTS
# ===========================

@api_router.post("/stories", response_model=StoryResponse)
async def create_story(story_data: StoryCreate, current_user_id: str = Depends(get_current_user)):
    """Create a new story"""
    user = await db.users.find_one({"_id": ObjectId(current_user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    expires_at = datetime.utcnow() + timedelta(hours=24)
    
    story_dict = {
        "user_id": current_user_id,
        "username": user["username"],
        "user_profile_picture": user.get("profile_picture"),
        "image": story_data.image,
        "views": [],
        "created_at": datetime.utcnow(),
        "expires_at": expires_at
    }
    
    result = await db.stories.insert_one(story_dict)
    story_id = str(result.inserted_id)
    
    return StoryResponse(
        id=story_id,
        user_id=current_user_id,
        username=user["username"],
        user_profile_picture=user.get("profile_picture"),
        image=story_data.image,
        views_count=0,
        is_viewed=False,
        created_at=story_dict["created_at"],
        expires_at=expires_at
    )

@api_router.get("/stories", response_model=List[StoryResponse])
async def get_stories(current_user_id: str = Depends(get_current_user)):
    """Get stories from followed users"""
    user = await db.users.find_one({"_id": ObjectId(current_user_id)})
    following = user.get("following", [])
    following.append(current_user_id)  # Include own stories
    
    # Get non-expired stories
    stories = await db.stories.find({
        "user_id": {"$in": following},
        "expires_at": {"$gt": datetime.utcnow()}
    }).sort("created_at", -1).to_list(100)
    
    result = []
    for story in stories:
        story_id = str(story["_id"])
        is_viewed = current_user_id in story.get("views", [])
        
        result.append(StoryResponse(
            id=story_id,
            user_id=story["user_id"],
            username=story["username"],
            user_profile_picture=story.get("user_profile_picture"),
            image=story["image"],
            views_count=len(story.get("views", [])),
            is_viewed=is_viewed,
            created_at=story["created_at"],
            expires_at=story["expires_at"]
        ))
    
    return result

@api_router.post("/stories/{story_id}/view")
async def view_story(story_id: str, current_user_id: str = Depends(get_current_user)):
    """Mark a story as viewed"""
    await db.stories.update_one(
        {"_id": ObjectId(story_id)},
        {"$addToSet": {"views": current_user_id}}
    )
    
    return {"message": "Story viewed"}

# ===========================
# MESSAGE ENDPOINTS
# ===========================

@api_router.post("/messages", response_model=Message)
async def send_message(message_data: MessageCreate, current_user_id: str = Depends(get_current_user)):
    """Send a message"""
    message_dict = {
        "sender_id": current_user_id,
        "recipient_id": message_data.recipient_id,
        "text": message_data.text,
        "read": False,
        "created_at": datetime.utcnow()
    }
    
    result = await db.messages.insert_one(message_dict)
    message_id = str(result.inserted_id)
    
    return Message(
        id=message_id,
        sender_id=current_user_id,
        recipient_id=message_data.recipient_id,
        text=message_data.text,
        read=False,
        created_at=message_dict["created_at"]
    )

@api_router.get("/messages/conversations", response_model=List[Conversation])
async def get_conversations(current_user_id: str = Depends(get_current_user)):
    """Get all conversations"""
    # Get all messages where user is sender or recipient
    messages = await db.messages.find({
        "$or": [
            {"sender_id": current_user_id},
            {"recipient_id": current_user_id}
        ]
    }).sort("created_at", -1).to_list(1000)
    
    # Group by conversation
    conversations_dict = {}
    for msg in messages:
        other_user_id = msg["recipient_id"] if msg["sender_id"] == current_user_id else msg["sender_id"]
        
        if other_user_id not in conversations_dict:
            conversations_dict[other_user_id] = {
                "last_message": msg["text"],
                "last_message_time": msg["created_at"],
                "unread_count": 0
            }
        
        # Count unread messages
        if msg["recipient_id"] == current_user_id and not msg["read"]:
            conversations_dict[other_user_id]["unread_count"] += 1
    
    # Get user details
    result = []
    for user_id, conv_data in conversations_dict.items():
        user = await db.users.find_one({"_id": ObjectId(user_id)})
        if user:
            result.append(Conversation(
                user_id=user_id,
                username=user["username"],
                profile_picture=user.get("profile_picture"),
                last_message=conv_data["last_message"],
                last_message_time=conv_data["last_message_time"],
                unread_count=conv_data["unread_count"]
            ))
    
    return result

@api_router.get("/messages/{user_id}", response_model=List[Message])
async def get_messages(user_id: str, current_user_id: str = Depends(get_current_user)):
    """Get messages with a specific user"""
    messages = await db.messages.find({
        "$or": [
            {"sender_id": current_user_id, "recipient_id": user_id},
            {"sender_id": user_id, "recipient_id": current_user_id}
        ]
    }).sort("created_at", 1).to_list(1000)
    
    # Mark messages as read
    await db.messages.update_many(
        {"sender_id": user_id, "recipient_id": current_user_id, "read": False},
        {"$set": {"read": True}}
    )
    
    result = []
    for msg in messages:
        result.append(Message(
            id=str(msg["_id"]),
            sender_id=msg["sender_id"],
            recipient_id=msg["recipient_id"],
            text=msg["text"],
            read=msg["read"],
            created_at=msg["created_at"]
        ))
    
    return result

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
