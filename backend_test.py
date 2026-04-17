#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Moments Instagram-like App
Tests all major endpoints: auth, users, posts, stories, messages
"""

import requests
import json
import base64
from datetime import datetime
import time

# Test configuration
BASE_URL = "https://social-snap-250.preview.emergentagent.com/api"
TEST_IMAGE_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="

# Test users
TEST_USERS = [
    {
        "email": "alice@test.com",
        "username": "alice",
        "password": "test123",
        "full_name": "Alice Johnson"
    },
    {
        "email": "bob@test.com", 
        "username": "bob",
        "password": "test123",
        "full_name": "Bob Smith"
    },
    {
        "email": "charlie@test.com",
        "username": "charlie", 
        "password": "test123",
        "full_name": "Charlie Davis"
    }
]

class MomentsAPITester:
    def __init__(self):
        self.session = requests.Session()
        self.tokens = {}
        self.user_ids = {}
        self.post_ids = []
        self.story_ids = []
        self.message_ids = []
        
    def log(self, message, level="INFO"):
        timestamp = datetime.now().strftime("%H:%M:%S")
        print(f"[{timestamp}] {level}: {message}")
        
    def test_auth_endpoints(self):
        """Test authentication endpoints"""
        self.log("=== Testing Authentication Endpoints ===")
        
        # Test user registration
        for i, user in enumerate(TEST_USERS):
            self.log(f"Testing registration for {user['username']}")
            
            response = self.session.post(f"{BASE_URL}/auth/register", json=user)
            
            if response.status_code == 201 or response.status_code == 200:
                data = response.json()
                self.tokens[user['username']] = data['access_token']
                self.user_ids[user['username']] = data['user']['id']
                self.log(f"✅ Registration successful for {user['username']}")
            elif response.status_code == 400 and "already" in response.text:
                self.log(f"⚠️  User {user['username']} already exists, testing login instead")
                # Try login instead
                login_data = {"identifier": user['email'], "password": user['password']}
                login_response = self.session.post(f"{BASE_URL}/auth/login", json=login_data)
                if login_response.status_code == 200:
                    data = login_response.json()
                    self.tokens[user['username']] = data['access_token']
                    self.user_ids[user['username']] = data['user']['id']
                    self.log(f"✅ Login successful for {user['username']}")
                else:
                    self.log(f"❌ Login failed for {user['username']}: {login_response.status_code} - {login_response.text}")
                    return False
            else:
                self.log(f"❌ Registration failed for {user['username']}: {response.status_code} - {response.text}")
                return False
                
        # Test login with different identifiers
        self.log("Testing login with email")
        login_data = {"identifier": "alice@test.com", "password": "test123"}
        response = self.session.post(f"{BASE_URL}/auth/login", json=login_data)
        if response.status_code == 200:
            self.log("✅ Login with email successful")
        else:
            self.log(f"❌ Login with email failed: {response.status_code} - {response.text}")
            return False
            
        # Test login with username
        self.log("Testing login with username")
        login_data = {"identifier": "alice", "password": "test123"}
        response = self.session.post(f"{BASE_URL}/auth/login", json=login_data)
        if response.status_code == 200:
            self.log("✅ Login with username successful")
        else:
            self.log(f"❌ Login with username failed: {response.status_code} - {response.text}")
            return False
            
        # Test get current user profile
        self.log("Testing get current user profile")
        headers = {"Authorization": f"Bearer {self.tokens['alice']}"}
        response = self.session.get(f"{BASE_URL}/auth/me", headers=headers)
        if response.status_code == 200:
            self.log("✅ Get current user profile successful")
        else:
            self.log(f"❌ Get current user profile failed: {response.status_code} - {response.text}")
            return False
            
        return True
        
    def test_user_endpoints(self):
        """Test user profile and follow/unfollow endpoints"""
        self.log("=== Testing User Endpoints ===")
        
        if not self.tokens:
            self.log("❌ No auth tokens available for user testing")
            return False
            
        alice_token = self.tokens.get('alice')
        bob_token = self.tokens.get('bob')
        
        if not alice_token or not bob_token:
            self.log("❌ Missing required tokens for user testing")
            return False
            
        # Test get user profile
        self.log("Testing get user profile")
        headers = {"Authorization": f"Bearer {alice_token}"}
        response = self.session.get(f"{BASE_URL}/users/bob", headers=headers)
        if response.status_code == 200:
            self.log("✅ Get user profile successful")
        else:
            self.log(f"❌ Get user profile failed: {response.status_code} - {response.text}")
            return False
            
        # Test follow user
        self.log("Testing follow user")
        bob_id = self.user_ids.get('bob')
        if bob_id:
            response = self.session.post(f"{BASE_URL}/users/{bob_id}/follow", headers=headers)
            if response.status_code == 200:
                self.log("✅ Follow user successful")
            else:
                self.log(f"❌ Follow user failed: {response.status_code} - {response.text}")
                return False
        else:
            self.log("❌ Bob's user ID not available for follow test")
            return False
            
        # Test unfollow user
        self.log("Testing unfollow user")
        response = self.session.post(f"{BASE_URL}/users/{bob_id}/unfollow", headers=headers)
        if response.status_code == 200:
            self.log("✅ Unfollow user successful")
        else:
            self.log(f"❌ Unfollow user failed: {response.status_code} - {response.text}")
            return False
            
        # Test search users
        self.log("Testing search users")
        response = self.session.get(f"{BASE_URL}/users/search/bob", headers=headers)
        if response.status_code == 200:
            results = response.json()
            if len(results) > 0:
                self.log("✅ Search users successful")
            else:
                self.log("⚠️  Search users returned no results")
        else:
            self.log(f"❌ Search users failed: {response.status_code} - {response.text}")
            return False
            
        return True
        
    def test_post_endpoints(self):
        """Test post creation, feed, and interaction endpoints"""
        self.log("=== Testing Post Endpoints ===")
        
        if not self.tokens:
            self.log("❌ No auth tokens available for post testing")
            return False
            
        alice_token = self.tokens.get('alice')
        bob_token = self.tokens.get('bob')
        
        if not alice_token:
            self.log("❌ Missing Alice token for post testing")
            return False
            
        headers = {"Authorization": f"Bearer {alice_token}"}
        
        # Test create post
        self.log("Testing create post")
        post_data = {
            "caption": "Test post from Alice",
            "image": TEST_IMAGE_BASE64,
            "location": "Test Location"
        }
        response = self.session.post(f"{BASE_URL}/posts", json=post_data, headers=headers)
        if response.status_code == 200 or response.status_code == 201:
            post = response.json()
            self.post_ids.append(post['id'])
            self.log("✅ Create post successful")
        else:
            self.log(f"❌ Create post failed: {response.status_code} - {response.text}")
            return False
            
        # Create another post with Bob
        if bob_token:
            self.log("Testing create post with Bob")
            bob_headers = {"Authorization": f"Bearer {bob_token}"}
            post_data = {
                "caption": "Test post from Bob",
                "image": TEST_IMAGE_BASE64,
                "location": "Bob's Location"
            }
            response = self.session.post(f"{BASE_URL}/posts", json=post_data, headers=bob_headers)
            if response.status_code == 200 or response.status_code == 201:
                post = response.json()
                self.post_ids.append(post['id'])
                self.log("✅ Create post with Bob successful")
            else:
                self.log(f"❌ Create post with Bob failed: {response.status_code} - {response.text}")
                
        # Test get feed
        self.log("Testing get feed")
        response = self.session.get(f"{BASE_URL}/posts/feed", headers=headers)
        if response.status_code == 200:
            feed = response.json()
            self.log(f"✅ Get feed successful - {len(feed)} posts")
        else:
            self.log(f"❌ Get feed failed: {response.status_code} - {response.text}")
            return False
            
        # Test get explore posts
        self.log("Testing get explore posts")
        response = self.session.get(f"{BASE_URL}/posts/explore", headers=headers)
        if response.status_code == 200:
            explore = response.json()
            self.log(f"✅ Get explore posts successful - {len(explore)} posts")
        else:
            self.log(f"❌ Get explore posts failed: {response.status_code} - {response.text}")
            return False
            
        # Test get user posts
        if self.user_ids.get('alice'):
            self.log("Testing get user posts")
            alice_id = self.user_ids['alice']
            response = self.session.get(f"{BASE_URL}/posts/user/{alice_id}", headers=headers)
            if response.status_code == 200:
                user_posts = response.json()
                self.log(f"✅ Get user posts successful - {len(user_posts)} posts")
            else:
                self.log(f"❌ Get user posts failed: {response.status_code} - {response.text}")
                return False
                
        return True
        
    def test_like_comment_endpoints(self):
        """Test like/unlike and comment endpoints"""
        self.log("=== Testing Like and Comment Endpoints ===")
        
        if not self.tokens or not self.post_ids:
            self.log("❌ No auth tokens or posts available for like/comment testing")
            return False
            
        alice_token = self.tokens.get('alice')
        if not alice_token:
            self.log("❌ Missing Alice token for like/comment testing")
            return False
            
        headers = {"Authorization": f"Bearer {alice_token}"}
        post_id = self.post_ids[0]
        
        # Test like post
        self.log("Testing like post")
        response = self.session.post(f"{BASE_URL}/posts/{post_id}/like", headers=headers)
        if response.status_code == 200:
            self.log("✅ Like post successful")
        else:
            self.log(f"❌ Like post failed: {response.status_code} - {response.text}")
            return False
            
        # Test unlike post
        self.log("Testing unlike post")
        response = self.session.post(f"{BASE_URL}/posts/{post_id}/unlike", headers=headers)
        if response.status_code == 200:
            self.log("✅ Unlike post successful")
        else:
            self.log(f"❌ Unlike post failed: {response.status_code} - {response.text}")
            return False
            
        # Test add comment
        self.log("Testing add comment")
        comment_data = {"text": "Great post!"}
        response = self.session.post(f"{BASE_URL}/posts/{post_id}/comment", json=comment_data, headers=headers)
        if response.status_code == 200:
            self.log("✅ Add comment successful")
        else:
            self.log(f"❌ Add comment failed: {response.status_code} - {response.text}")
            return False
            
        # Test get comments
        self.log("Testing get comments")
        response = self.session.get(f"{BASE_URL}/posts/{post_id}/comments", headers=headers)
        if response.status_code == 200:
            comments = response.json()
            self.log(f"✅ Get comments successful - {len(comments)} comments")
        else:
            self.log(f"❌ Get comments failed: {response.status_code} - {response.text}")
            return False
            
        return True
        
    def test_story_endpoints(self):
        """Test story creation and viewing endpoints"""
        self.log("=== Testing Story Endpoints ===")
        
        if not self.tokens:
            self.log("❌ No auth tokens available for story testing")
            return False
            
        alice_token = self.tokens.get('alice')
        if not alice_token:
            self.log("❌ Missing Alice token for story testing")
            return False
            
        headers = {"Authorization": f"Bearer {alice_token}"}
        
        # Test create story
        self.log("Testing create story")
        story_data = {"image": TEST_IMAGE_BASE64}
        response = self.session.post(f"{BASE_URL}/stories", json=story_data, headers=headers)
        if response.status_code == 200 or response.status_code == 201:
            story = response.json()
            self.story_ids.append(story['id'])
            self.log("✅ Create story successful")
        else:
            self.log(f"❌ Create story failed: {response.status_code} - {response.text}")
            return False
            
        # Test get stories
        self.log("Testing get stories")
        response = self.session.get(f"{BASE_URL}/stories", headers=headers)
        if response.status_code == 200:
            stories = response.json()
            self.log(f"✅ Get stories successful - {len(stories)} stories")
        else:
            self.log(f"❌ Get stories failed: {response.status_code} - {response.text}")
            return False
            
        # Test view story
        if self.story_ids:
            self.log("Testing view story")
            story_id = self.story_ids[0]
            response = self.session.post(f"{BASE_URL}/stories/{story_id}/view", headers=headers)
            if response.status_code == 200:
                self.log("✅ View story successful")
            else:
                self.log(f"❌ View story failed: {response.status_code} - {response.text}")
                return False
                
        return True
        
    def test_message_endpoints(self):
        """Test messaging endpoints"""
        self.log("=== Testing Message Endpoints ===")
        
        if not self.tokens or len(self.user_ids) < 2:
            self.log("❌ Insufficient tokens or users for message testing")
            return False
            
        alice_token = self.tokens.get('alice')
        bob_id = self.user_ids.get('bob')
        
        if not alice_token or not bob_id:
            self.log("❌ Missing required tokens/IDs for message testing")
            return False
            
        headers = {"Authorization": f"Bearer {alice_token}"}
        
        # Test send message
        self.log("Testing send message")
        message_data = {
            "recipient_id": bob_id,
            "text": "Hello Bob, this is a test message!"
        }
        response = self.session.post(f"{BASE_URL}/messages", json=message_data, headers=headers)
        if response.status_code == 200 or response.status_code == 201:
            message = response.json()
            # Handle both 'id' and '_id' fields
            message_id = message.get('id') or message.get('_id')
            if message_id:
                self.message_ids.append(message_id)
            self.log("✅ Send message successful")
        else:
            self.log(f"❌ Send message failed: {response.status_code} - {response.text}")
            return False
            
        # Test get conversations
        self.log("Testing get conversations")
        response = self.session.get(f"{BASE_URL}/messages/conversations", headers=headers)
        if response.status_code == 200:
            conversations = response.json()
            self.log(f"✅ Get conversations successful - {len(conversations)} conversations")
        else:
            self.log(f"❌ Get conversations failed: {response.status_code} - {response.text}")
            return False
            
        # Test get messages with user
        self.log("Testing get messages with user")
        response = self.session.get(f"{BASE_URL}/messages/{bob_id}", headers=headers)
        if response.status_code == 200:
            messages = response.json()
            self.log(f"✅ Get messages with user successful - {len(messages)} messages")
        else:
            self.log(f"❌ Get messages with user failed: {response.status_code} - {response.text}")
            return False
            
        return True
        
    def run_all_tests(self):
        """Run all backend tests"""
        self.log("🚀 Starting Moments Backend API Tests")
        self.log(f"Testing against: {BASE_URL}")
        
        results = {
            "auth": False,
            "users": False,
            "posts": False,
            "likes_comments": False,
            "stories": False,
            "messages": False
        }
        
        try:
            # Test authentication
            results["auth"] = self.test_auth_endpoints()
            
            # Test user endpoints
            results["users"] = self.test_user_endpoints()
            
            # Test post endpoints
            results["posts"] = self.test_post_endpoints()
            
            # Test like/comment endpoints
            results["likes_comments"] = self.test_like_comment_endpoints()
            
            # Test story endpoints
            results["stories"] = self.test_story_endpoints()
            
            # Test message endpoints
            results["messages"] = self.test_message_endpoints()
            
        except Exception as e:
            self.log(f"❌ Unexpected error during testing: {str(e)}", "ERROR")
            
        # Print summary
        self.log("=== TEST SUMMARY ===")
        for test_name, passed in results.items():
            status = "✅ PASSED" if passed else "❌ FAILED"
            self.log(f"{test_name.upper()}: {status}")
            
        total_tests = len(results)
        passed_tests = sum(results.values())
        self.log(f"Overall: {passed_tests}/{total_tests} test suites passed")
        
        return results

if __name__ == "__main__":
    tester = MomentsAPITester()
    results = tester.run_all_tests()