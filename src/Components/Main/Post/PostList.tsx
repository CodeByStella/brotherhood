import PostCard from "./PostCard";

interface PostListProps {
    isVideoPost?: boolean
}
// TODO: Fetch the posts
export default function PostList({isVideoPost=false}: PostListProps) {

    const Posts = Array.from({length: 6}, (post, i) => {
        return (
            <PostCard key={i} postedBy="Marcus Ray" date="8 Jan 2024" title="Cultivate Mental Wellness" description=" Health goes beyond the physical. Nurturing mental well-being is equally vital. Practice mindfulness, engage in activities...Health goes beyond the physical. Nurturing mental well-being is equally vital. Practice mindfulness, engage in activities..." tags={["Personal Blog", "Health"]} likes={186} dislikes={0} comments={25} totalViews={1200} isVideoPost={isVideoPost}  />
        )
    })
    return (
        <main className="mt-10 xl:pr-10">
            {/*  Simulating an array of Posts fetched from the Database */}
            { Posts }
        </main>
    )
}
