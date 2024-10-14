import Pagination from "@/Components/Main/Pagination"
import PostList from "@/Components/Main/Post/PostList"
import Catagory from "@/Components/Small Pieces/Catagory"
import CommentForm from "@/Components/Small Pieces/CommentForm"
import CommentList from "@/Components/Small Pieces/CommentList"
import FollowersProfile from "@/Components/Small Pieces/FollowersProfile"
import List from "@/Components/Small Pieces/List"
import TopPageHeader from "@/Components/Small Pieces/TopPageHeader"

interface BlogCatagoryDetailsProps {
    params: {
        name: string
    }
}

export default async function page({params} : BlogCatagoryDetailsProps) {

    const blogCatagoryName = params.name.replace("_", " ")
    //TODO: Make an HTTP request to fetch details of the Blog Catagory including it's comments. the endpoint that does this task should recieve the name of the catagory as a parameter and query the Catagory table.
    // FAKE DATA
    const comments = [
        {
            id: 3,
            content: "Egbon, I'm so glad I stumbled on this blog! I've been searching for the perfect Osun Osogbo festival outfit inspiration and your post on 'Top 10 Ankara Styles to Rock at Osun Osogbo' is a lifesaver! I'm definitely trying out the 5th style with the yellow and blue combo.",
            blogCategoryId: 5,
            userId: '3',
            parentId: null,
            createdAt: '2023-02-20 14:30:45',
            likes: 12,
            dislikes: 1,
            comments: 1,
            user: {
                avatar: "",
                firstName: "Abrsh",
                lastName: "Jhon",
                email: "abrsh4@gmail.com",
                sex: "male",
                city: "addis ababa",
                userName: "abrhs_jhon",
                birthDate: "2/02/2000",
                telegramUsername: "abrsh",
                languageSpoken: ["Amharic", "English"],
                languagesWishToLearn: ["Japaneese", "Haitian"]
            },
        },
        {
            id: 7,
            content: "Aww, thank you so much! I'm glad I could help with your Osun Osogbo festival prep. You're going to rock that Ankara style! Don't forget to share your festival photos with us",
            blogCategoryId: 5,
            userId: '10',
            parentId: 3,
            createdAt: '2023-02-23 14:30:45',
            likes: 2,
            dislikes: 0,
            comments: 0,
            parent: {
                user: {
                    firstName: "Abrsh",
                    lastName: "Jhon",
                    userName: "abrhs_jhon"
                }
            },
            user: {
                avatar: "",
                firstName: "Nadia",
                lastName: "Kumar",
                email: "nadia.kumar23@yahoo.com",
                sex: "female",
                city: "Mumbai",
                userName: "nadia_kumar23",
                birthDate: "12/15/1995",
                telegramUsername: "nadia_kumar",
                languageSpoken: ["Hindi", "English", "Marathi"],
                languagesWishToLearn: ["Spanish", "French", "Mandarin"]
            }
        }
    ]
    const catagoryPath = ["World", "Continets", "Africa", "Nigeria", "Nigerian Festivals"]

    return (
        <main className="max-md:px-5 md:px-7 xl:px-20 mb-28">
            <TopPageHeader pageCode="PG32" pageName={`Blog Category Description Page - ${blogCatagoryName}`} pageDescription="Blog Category Description and discussion for improvement in this page." />
             {/* FAKE DATA */}
            <Catagory name="Nigerian Festivals" followers={200} members={15} posts={156} catagoryPath={catagoryPath} code="Bc21" />
            <div className="bg-button w-full h-auto max-sm:px-5 sm:px-10 py-6 mt-10 border-none rounded-md focus-visible:outline-none">
                {/* RULES FOR THE BLOG CATAGORY ARE LISTED HERE. AND THIS IS JUST A DUMMY DATA */}
                <p className="text-sm text-stone-600 leading-6"> 
                    This blog category is for Nigerian festivals. Members who submit posts in this category should only post with Nigerian festival exclusive content. Rules for posting content here is  1
                </p>
            </div>
            <List title="Members" pagination= {
                <Pagination TotalNumberOfResults={20} pageSize={4} />
            }>
                {/* TODO: loop over the members array of this blog catagory */}
                {Array.from({length: 4}, (_, index) => index + 1).map((index) => {
                    return (
                        <FollowersProfile key={index} firstName="Marcus" lastName="Ray" numberOfPosts={120} isInList={true} />
                    )
                })}
            </List>
            <List title="Contributors" pagination= {
                <Pagination TotalNumberOfResults={20} pageSize={4} />
            }>
                {/* TODO: loop over contributors array of this blog catagory */}
                {Array.from({length: 4}, (_, index) => index + 1).map((index) => {
                    return (
                        <FollowersProfile key={index} firstName="Marcus" lastName="Ray" numberOfPosts={120} isInList={true} />
                    )
                })}
            </List>
            <List title="Followers" pagination= {
                <Pagination TotalNumberOfResults={20} pageSize={4} />
            }>
                {/* TODO: loop over the followers array of this blog catagory */}
                {Array.from({length: 4}, (_, index) => index + 1).map((index) => {
                    return (
                        <FollowersProfile key={index} firstName="Marcus" lastName="Ray" numberOfPosts={120} isInList={true} />
                    )
                })}
            </List>
            <div className="mt-5">
                <PostList />
                <div className="mr-7">
                    <Pagination TotalNumberOfResults={20} pageSize={5} />
                </div>
            </div>
            <div className="mt-5">
                {/* TODO: Fake blog category id */}
                <CommentForm parentId={null} blogCategoryId={2} />
                <CommentList comments={comments} />
            </div>
        </main>
    )
}
