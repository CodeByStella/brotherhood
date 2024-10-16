'use client'


import Link from "next/link"
import { IoMdNotifications } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { GiLinkedRings } from "react-icons/gi";
import { FiAnchor } from "react-icons/fi";
import { MdOutlineContentCopy } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import { SlLogout } from "react-icons/sl";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover"
// import Avatar from "../Small Pieces/Avatar";
import store, { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Avatar, Button, Spin } from "antd";
import { set_current_user } from "@/redux/features/UserSlice";
import { logoutUser } from "@/lib/authentification";
import { UserOutlined } from "@ant-design/icons";


export default function NavButtons() {

    const [openPopUp, setOpenPopUp] = useState<boolean>(false)
    const [openCreatePost, setOpenCreatePost] = useState<boolean>(false)
    const { isAuthenticated, data } = useSelector((state: RootState) => state.user)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { push } = useRouter()

    // Logout function
    function handleLogout() {
        if (isLoading) return
        setIsLoading(true)
        store.dispatch(set_current_user(null))
        logoutUser()
        // TODO: Make an http request to hit the logout endpoint
    }

    function handleCreatePostClick(route: string) {
        setOpenCreatePost(false)
        push(route)
    }

    function handleNavigation(route: string) {
        setOpenPopUp(false)
        push(route)
    }

    return (
        <section className={`flex items-center justify-end ${isAuthenticated && data ? "gap-7" : "max-sm:ml-6 gap-10"}  text-sm`}>
            {isAuthenticated ? (
                <Popover>
                    <PopoverTrigger>
                        <div onClick={() => setOpenCreatePost(true)} className="max-lg:hidden w-[135px] h-auto border border-navy px-3 py-2 text-sm text-navy rounded-md focus-visible:outline-none font-semibold flex items-center gap-3">
                            <p> Create Post </p>
                            <div>
                                <MdKeyboardArrowDown className="w-4 h-4 text-navy" />
                            </div>
                        </div>
                    </PopoverTrigger>
                    {openCreatePost && <PopoverContent className="mt-2 w-[180px] h-auto bg-white border-none rounded-md px-4 py-3 flex flex-col items-start gap-1">
                        <button onClick={() => handleCreatePostClick("/create-post")} className="hover:bg-blue-300 hover:bg-opacity-60 px-4 py-2 rounded-md text-sm text-black font-palanquin">
                            Create Blog Post
                        </button>
                        <button onClick={() => handleCreatePostClick("/create-video-blog")} className="hover:bg-blue-300 hover:bg-opacity-60 px-4 py-2 rounded-md text-sm text-black font-palanquin">
                            Create Video Blog
                        </button>
                    </PopoverContent>
                    }
                </Popover>
            ) : (
                <Link href="/register" >
                    <Button className="w-[110px]" size="large" >
                        Get Started
                    </Button>
                </Link>
            )}
            {isAuthenticated && data ? (
                <div className="flex items-center max-sm:gap-2 sm:gap-4">
                    <Link href={"/notifications"} className="relative">
                        <IoMdNotifications className="w-7 h-7 text-navy" />
                        <div className="absolute right-1.5 top-0 rounded-full w-2 h-2 bg-orangeRed" />
                    </Link>
                    <div className="hover:cursor-pointer">
                        <Avatar
                            onClick={() => push('/profile')}
                            className="bg-navy"
                            size={{ xs: 32, sm: 36, md: 40, lg: 44, xl: 48, xxl: 52 }}
                            icon={<UserOutlined />}
                            src={data.avatar}
                        />
                    </div>
                    <div className="flex gap-2">
                        <h3 className="max-sm:hidden sm:block text-base text-black font-semibold"> {data.firstName} </h3>
                        <Popover>
                            <PopoverTrigger className="max-sm:pr-3">
                                <div onClick={() => setOpenPopUp(true)}>
                                    <IoIosArrowDown className="mt-2" />
                                </div>
                            </PopoverTrigger>
                            {openPopUp && <PopoverContent className="max-sm:w-[200px] sm:w-[250px] h-auto max-sm:mr-4 py-5 my-5 focus-visible:outline-none">
                                <div className="flex flex-col justify-start px-6">
                                    {/* <Avatar closePopUp={true} setOpenPopUp={setOpenPopUp} /> */}
                                    <Avatar
                                        onClick={() => push('/profile')}
                                        className="bg-navy"
                                        size={{ xs: 32, sm: 36, md: 40, lg: 44, xl: 48, xxl: 52 }}
                                        icon={<UserOutlined />}
                                        src={data.avatar}
                                    />
                                    <div className="flex items-start gap-10 mt-4">
                                        <h3 className="text-base text-black font-medium"> {data?.firstName} </h3>
                                        <MdKeyboardArrowRight className="w-5 h-5" />
                                    </div>
                                </div>
                                <hr className="border-t border-gray-400 w-full my-4" />
                                {/* LINKS TO OTHER PAGES */}
                                <div className="flex flex-col justify-start ml-4 gap-3 mt-3">
                                    <div className="flex items-center gap-2">
                                        <FiAnchor className="w-4 h-4" />
                                        <button onClick={() => handleNavigation("/functions")} className="text-[15px] text-black font-palanquin hover:text-blue-600"> Functions </button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <GiLinkedRings className="w-4 h-4" />
                                        <button onClick={() => handleNavigation("/referals")} className="text-[15px] text-black font-palanquin hover:text-blue-600"> My Referals </button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MdOutlineContentCopy className="w-4 h-4" />
                                        <button onClick={() => handleNavigation("/my-pages")} className="text-[15px] text-black font-palanquin hover:text-blue-600"> My Pages </button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <IoSettingsOutline className="w-4 h-4" />
                                        <button onClick={() => handleNavigation("/privacy-settings")} className="text-[15px] text-black font-palanquin hover:text-blue-600"> Privacy Setting </button>
                                    </div>
                                </div>
                                <button className="max-sm:w-[100px] sm:w-[150px] flex justify-center items-center py-2.5 mx-6 mt-6 bg-navy text-sm text-white rounded-md">

                                    <div onClick={handleLogout} className="flex items-center gap-3">
                                        <p> Log out </p>
                                        <SlLogout className="" />
                                    </div>
                                </button>
                            </PopoverContent>
                            }
                        </Popover>
                    </div>
                </div>
            ) :
                <Link href='/sign-in'>
                    <Button type="primary" className="w-[110px]" size="large" >
                        Sign In
                    </Button>
                </Link>
            }
        </section>
    )
}
