import Pagination from "@/Components/Main/Pagination";
import PostList from "@/Components/Main/Post/PostList";
import ProfileHeader from "@/Components/Main/ProfileHeader";
import BlogCatagoryList from "@/Components/Small Pieces/BlogCatagoryList";
import { FAKE_BLOG_CATAGORIES } from "@/constants";

interface Props {
    searchParams: {
        page: string
    }
}
export default function page({searchParams} : Props) {
    const pageQuery = searchParams.page || 1
    //TODO: Fetch the current users blog Posts, and it should take the page parameter for pagination
    // TODO: Calculate how many catagories does all blogs have
    return (
        <ProfileHeader>
            <BlogCatagoryList catagories={FAKE_BLOG_CATAGORIES} />
            <PostList />
            <div className="mr-12 mb-14">
                <Pagination TotalNumberOfResults={12} pageSize={5} /> 
            </div>
        </ProfileHeader>
    )
}
