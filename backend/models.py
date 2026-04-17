from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, core_schema, handler):
        return {"type": "string"}

# User Models
class UserCreate(BaseModel):
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    username: str
    password: str
    full_name: str

class UserLogin(BaseModel):
    identifier: str  # email or phone
    password: str

class User(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    email: Optional[str] = None
    phone: Optional[str] = None
    username: str
    full_name: str
    bio: Optional[str] = ""
    profile_picture: Optional[str] = None  # base64
    followers: List[str] = []
    following: List[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

class UserProfile(BaseModel):
    id: str
    username: str
    full_name: str
    bio: Optional[str] = ""
    profile_picture: Optional[str] = None
    followers_count: int
    following_count: int
    posts_count: int
    is_following: bool = False

# Post Models
class PostCreate(BaseModel):
    caption: Optional[str] = None
    image: str  # base64
    location: Optional[str] = None

class Comment(BaseModel):
    id: str
    user_id: str
    username: str
    profile_picture: Optional[str]
    text: str
    created_at: datetime

class Post(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    user_id: str
    username: str
    user_profile_picture: Optional[str]
    caption: Optional[str]
    image: str  # base64
    location: Optional[str]
    likes: List[str] = []  # user_ids
    comments: List[Comment] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

class PostResponse(BaseModel):
    id: str
    user_id: str
    username: str
    user_profile_picture: Optional[str]
    caption: Optional[str]
    image: str
    location: Optional[str]
    likes_count: int
    is_liked: bool
    comments_count: int
    created_at: datetime

class CommentCreate(BaseModel):
    text: str

# Story Models
class StoryCreate(BaseModel):
    image: str  # base64

class Story(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    user_id: str
    username: str
    user_profile_picture: Optional[str]
    image: str  # base64
    views: List[str] = []  # user_ids
    created_at: datetime = Field(default_factory=datetime.utcnow)
    expires_at: datetime

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

class StoryResponse(BaseModel):
    id: str
    user_id: str
    username: str
    user_profile_picture: Optional[str]
    image: str
    views_count: int
    is_viewed: bool
    created_at: datetime
    expires_at: datetime

# Message Models
class MessageCreate(BaseModel):
    recipient_id: str
    text: str

class Message(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    sender_id: str
    recipient_id: str
    text: str
    read: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

class Conversation(BaseModel):
    user_id: str
    username: str
    profile_picture: Optional[str]
    last_message: str
    last_message_time: datetime
    unread_count: int

# Token Response
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserProfile
