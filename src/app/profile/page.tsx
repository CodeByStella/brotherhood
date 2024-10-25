

import Bio from "@/Components/Main/Bio";
import PostList from "@/Components/Main/Post/PostList";
import ProfileHeader from "@/Components/Main/ProfileHeader";
import { Tabs } from "antd";


//TODO: Fetch the users Bio
export default function page() {

    // TODO: FAKE DATA

    const Profile_Links = [
        {
            key: "/profile",
            label: "Bio",
            children: <Bio />
        },
        {
            key: "/profile/blogs",
            label: 'Blogs',
            children: <PostList type="default" />,
        },
        {
            key: "/profile/videos",
            label: 'Videos',
            children: <PostList type="video" />,
        },
    ];
    return (
        <div>

            <ProfileHeader />
            <main className='max-md:px-5 md:px-7 xl:px-20 mb-28'>
                <Tabs items={Profile_Links} size="large" />
            </main>
        </div>
    )
}
