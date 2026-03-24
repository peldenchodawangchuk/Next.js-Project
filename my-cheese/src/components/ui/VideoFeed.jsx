'use client';
import VideoCard from "./VideoCard";

//Sample video data
const DUMMY_POSTS = [
    {
        id: 1,
        username: '@user1',
        caption: 'Check out my new video! #trending',
        audio: 'Original Sound - @user1',
        likes: 100,
        comments: 10,
        shares: 5
    },
    {
        id: 2,
        username: '@user2',
        caption: 'Had a great day! #fun',
        audio: 'Original Sound - @user2',
        likes: 150,
        comments: 20,
        shares: 10
    },
    {
        id: 3,
        username: '@user3',
        caption: 'My latest dance moves! #dance',
        audio: 'Original Sound - @user3',
        likes: 200,
        comments: 30,
        shares: 15
    }
];

export default function VideoFeed() {
    return (
        <div className="max-w-[550px] mx-auto">
            {DUMMY_POSTS.map(post => (
                <VideoCard key={post.id} post={post} />
            ))}
        </div>
    );
}