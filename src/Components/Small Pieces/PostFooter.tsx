import { AiOutlineLike, AiOutlineDislike, AiOutlineComment } from "react-icons/ai";
import { IoStatsChartOutline } from "react-icons/io5";


interface PostFooter {
    tags: string[],
    likes: number,
    dislikes: number,
    comments: number,
    views: string
}

export default function PostFooter({tags, likes, dislikes, comments, views} : PostFooter) {
    return (
        <section className="mt-16 flex flex-wrap gap-5 items-center justify-between">
            <div className="flex items-center gap-4">
                <h3 className="text-base text-black font-semibold"> Tags: </h3>
                <span className="flex items-center gap-3">
                    {tags.map((tag) => {
                        return (
                            <button className="text-sm hover:text-blue-500"> {tag} </button>
                        )
                    })}
                </span>
            </div>
            <div className="flex items-center max-sm:gap-6 gap-3">
                {/* TODO: Refactor this likes, dislikes, comments */}
                <span className="flex items-center gap-2">
                    <IoStatsChartOutline className="w-5 h-5 text-black font-semibold" />
                    <p> {views} </p>
                </span>
                <span className="flex items-center gap-2">
                    <AiOutlineComment className="w-5 h-5 text-black font-semibold" />
                    <p> {comments} </p>
                </span>
                <span className="flex items-center gap-2">
                    <AiOutlineLike className="w-5 h-5 text-black font-semibold" />
                    <p> {likes} </p>
                </span>
                <span className="flex items-center gap-2">
                    <AiOutlineDislike className="w-5 h-5 text-black font-semibold" />
                    <p> {dislikes} </p>
                </span>
            </div>
        </section>
    )
}
