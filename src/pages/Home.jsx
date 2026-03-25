import { Avatar } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

function Home() {
    return (
        <div className="feed">
            <div className="stories">
                {STORIES.map((story) => (
                    <div key={story.id} className="story">
                        <Avatar src={story.image} alt={story.name} sx={{ width: 60, height: 60, border: "2px solid #e1306c", padding: "2px" }} />
                        <span>{story.name}</span>
                    </div>
                ))}
            </div>

            <div className="posts">
                {FEED_DATA.map((post) => (
                    <div key={post.id} className="post">

                        <div className="post-header">
                            <Avatar src={post.postImage} alt={post.user} sx={{ width: 32, height: 32 }} />
                            <span className="post-header-name">{post.user}</span>
                            <span className="post-header-time">• {post.time}</span>
                        </div>

                        <div className="post-image">
                            <img src={post.postImage} alt="Post" />
                        </div>

                        <div className="post-actions">
                            <div className="post-actions-left">
                                <FavoriteBorderOutlinedIcon />
                                <ChatBubbleOutlineOutlinedIcon />
                                <SendOutlinedIcon />
                            </div>
                            <BookmarkBorderOutlinedIcon />
                        </div>

                        <div className="post-info">
                            <span className="post-likes">{post.likes || post.Likes} likes</span>
                            <span>
                                <span className="post-caption-user">{post.user}</span>
                                {post.caption}
                            </span>
                            <p className="post-comments">View all {post.comments} comments</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const STORIES = [
    {
        id: 1,
        name: "deepika",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 2,
        name: "deepika",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 3,
        name: "deepika",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 4,
        name: "deepika",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 5,
        name: "deepika",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 6,
        name: "deepika",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 7,
        name: "deepika",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 8,
        name: "deepika",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 9,
        name: "deepika",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 10,
        name: "deepika",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
]

const FEED_DATA = [
    {
        id: 1,
        user: "deepika",
        postImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        caption: "This is my first post",
        likes: 100,
        comments: 10,
        shares: 10,
        time: "2 hours ago"
    },
    {
        id: 2,
        user: "adventure_seeker",
        postImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        caption: "Sunlight and Silence",
        Likes: "1.2M",
        comments: "100k",
        shares: "50k",
        time: "2 hours ago"
    }
]



export default Home