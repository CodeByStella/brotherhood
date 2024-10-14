import Avatar from "@/Components/Small Pieces/Avatar"
import Image from "next/image"
import PostHeader  from "../../../../public/blogPostHeader.jpg"
import DisplayContent from "@/Components/Main/Post/DisplayContent"
import PostFooter from "@/Components/Small Pieces/PostFooter"
import { formatNumber } from "@/utils"
import Link from "next/link"
import Decide from "@/Components/Small Pieces/Decide"
import CommentForm from "@/Components/Small Pieces/CommentForm"
import TopPageHeader from "@/Components/Small Pieces/TopPageHeader"

interface Props {
    params: {
        id: string
    }
}

//NOTE: Since This is a Preview Page the actions (like, dislike, comment) should not work. it's only for showing how it might look like.

export default async function page({params} : Props) {
    const postId = params.id
    // TODO: Fetch the post by id
    // FAKE DATA
    const references = [
        "https://react-icons.github.io/react-icons/",
        "https://react-icons.github.io/react-icons/",
        "https://react-icons.github.io/react-icons/",
        "https://react-icons.github.io/react-icons/"
    ]

    return (
        <main className="max-md:px-5 md:px-7 xl:px-20 mb-28">
            <TopPageHeader pageCode="PG32" pageName="Preview post page" pageDescription="Here you can preview you post before publishing it" />
            <div className="mt-20 flex items-center gap-6">
                <Avatar width="w-[50px]" height="h-[50px]" iconWidth="w-[20px]" iconHeight="h-[20px]" />
                <div className="flex items-center gap-3">
                    <h3 className="text-lg text-black font-medium"> By Markus Ray </h3>
                    <p className="text-stone-500 text-sm"> 9 Jan 2024 </p>
                </div>
            </div>
            <h2 className="mt-10 pl-3 text-base text-black font-semibold"> Ciltivate Mental Wellness </h2>
            {/* To prevent content shifting */}
            <div className="max-w-[900px] max-h-[150px] pb-56">
                <Image src={PostHeader} alt="blog-post-header" width={700} height={100} className="mt-7 rounded-2xl"/>
            </div>
            <div className="sm:mt-48 md:mt-52 xl:mt-56">
                {/* DUMMY HTML STRING */}
                <DisplayContent content="<p> Lorem ipsum <strong> dolor sit amet</strong>, consectetur adipiscing elit. Nulla convallis, nisi sed consequat cursus, lectus ullamcorper quam, id tincidunt nisl risus vel velit. Sed eu nulla sed leo convallis vestibulum. Quisque non quam euismod, sollicitudin ex id, mattis nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus vel nisi dictum, cursus elit ut, fermentum justo. Integer rutrum tortor vel sapien dapibus ullamcorper. Cras in nisi consequat, varius risus at, molestie enim. Nullam fermentum diam et dui vehicula, sit amet hendrerit justo suscipit. Nunc auctor mauris vitae sapien vehicula, in interdum lacus vestibulum. Curabitur ac nunc in felis feugiat tempor. </p>" />
            </div>
            <PostFooter tags={["tech", "freelance"]} likes={25} dislikes={0} comments={5} views={formatNumber(1200)}  />
            <div className="mt-14">
                <h2 className="text-xl text-black font-semibold"> Refrences </h2>
                <div className="flex flex-col justify-start gap-4 mt-4">
                    {references.map((citation, i) => {
                        return (
                            <span key={citation} className="flex items-center gap-2 max-w-[350px] text-base text-black hover:text-blue-500">
                                <p> {i + 1} </p>
                                <Link  href={citation} target="_blank"> {citation} </Link>
                            </span>
                        )
                    })}
                </div>
            </div>
            {/* TODO: FIX THIS LATER */}
            <CommentForm parentId={3} blogCategoryId={4} />
            <Decide postId={postId} />
        </main>
    )
}
