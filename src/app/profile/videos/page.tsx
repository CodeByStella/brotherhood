import Pagination from "@/Components/Main/Pagination";
import PostList from "@/Components/Main/Post/PostList";
import ProfileHeader from "@/Components/Main/ProfileHeader";

interface Props {
    searchParams: {
        page: string
    }
}

export default function page({searchParams} : Props) {
    const pageQuery = searchParams.page || 1
    //TODO: Fetch the user's Video blog Posts and it should take the page parameter for pagination

    return (
        <ProfileHeader>
            <PostList isVideoPost={true} />
            <div className="mr-12 mb-14">
                <Pagination TotalNumberOfResults={12} pageSize={5} /> 
            </div>
        </ProfileHeader>
    )
}
