import Avatar from "./Avatar";

interface Props {
    firstName: string,
    lastName: string,
    numberOfPosts: number,
    isInList?: boolean
}

export default function FollowersProfile({firstName, lastName, numberOfPosts, isInList} : Props) {
    return (
        <div className="flex items-start gap-4 mb-4 p-4 rounded-lg hover:bg-button">
            <Avatar width={`${isInList ? "w-[40px]" : "w-[55px]"}`} height={`${isInList ? "h-[40px]" : "h-[55px]"}`} iconWidth={`${isInList ? "w-[11px]" : "w-[20px]"}`} iconHeight={`${isInList ? "h-[15px]" : "h-[24px]"}`} />
            <span className="flex flex-col justify-center gap-1 hover:cursor-pointer">
                <h2 className={`${isInList ? "text-base" : "max-sm:text-base sm:text-lg"} text-black font-semibold`}> {firstName} {lastName} </h2>
                <p className="text-sm text-stone-600"> {numberOfPosts} posts </p>
            </span>
        </div>
    )
}
