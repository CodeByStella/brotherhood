'use client'

import { FOLLOW_STATE } from "@/constants"
import { RootState } from "@/redux/store"
import { useState } from "react"
import { useSelector } from "react-redux"
import FollowersProfile from "@/Components/Small Pieces/FollowersProfile"

type FOLLOWER_FOLLOWING = {
    firstName: string,
    lastName: string,
    Avatar: string,
    followers: number,
    following: number,
    numberOfPosts: number
}

interface Props {
    followers?: FOLLOWER_FOLLOWING[]
    following?: FOLLOWER_FOLLOWING[]
}

export default function FollowersAndFollowing({followers, following} : Props) {

    const {data} = useSelector((state: RootState) => state.user)
    const [state, setState] = useState<FOLLOW_STATE>(FOLLOW_STATE.followers)

    return (
        <main className='mt-10 mb-20'>
            {/* TO prevent content shifting */}
            <header className="w-full h-[50px]">
                {data?.followers && <div className="flex items-center max-sm:justify-between max-sm:pr-5 sm:gap-16 md:gap-28">
                    <div>
                        <button onClick={() => setState(FOLLOW_STATE.followers)} className={`max-sm:text-sm sm:text-base md:text-xl ${state === FOLLOW_STATE.followers ? "text-blue-600" : "text-black"} pl-8 font-semibold focus-visible:outline-none`}>
                            {data?.followers} Followers
                        </button>
                        {state === FOLLOW_STATE.followers && <hr className="border-2 border-blue-600 max-sm:ml-10 max-sm:w-[80px] sm:w-[210px] mt-2" />}
                    </div>
                    <div>
                        <button onClick={() => setState(FOLLOW_STATE.following)} className={`max-sm:text-sm sm:text-base md:text-xl ${state === FOLLOW_STATE.following ? "text-blue-600" : "text-black"} pl-8 font-semibold`}>
                            {data?.following} Following
                        </button>
                        {state === FOLLOW_STATE.following && <hr className="border-2 border-blue-600 max-sm:ml-10 max-sm:w-[80px] w-[210px] mt-2" />}
                    </div>
                </div>}
            </header>
            <section className="mt-14">
            {/* TODO: loop over the followers array */}
            { state === FOLLOW_STATE.followers && Array.from({length: 10}, (_, index) => index + 1).map((index) => {
                return (
                    <FollowersProfile key={index} firstName="Marcus" lastName="Ray" numberOfPosts={120} />
                )
            })}
            {/* TODO: loop over the following array */}
            { state === FOLLOW_STATE.following && Array.from({length: 10}, (_, index) => index + 1).map((index) => {
                return (
                    <FollowersProfile key={index} firstName="Marcus" lastName="Ray" numberOfPosts={120} />
                )
            })}
            </section>
        </main>
    )
}
