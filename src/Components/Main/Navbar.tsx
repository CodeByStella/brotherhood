'use client'

import Image from "next/image";
import Logo from "../../../public/logo.png"
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { Languages, QUERY_PARAMS } from "@/constants";
import { TfiWorld } from "react-icons/tfi";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import NavButtons from "./NavButtons";
import Link from "next/link";
import { RiMenuLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SidebarNav from "./SidebarNav";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { AUTHENTICATED_SIDEBAR_NAV_LINKS, NON_AUTHENTICATED_SIDEBAR_NAV_LINKS } from "@/constants";


export default function Navbar() {

    const [selectedLanguage, setSelectedLanguage] = useState('')
    const [openSidebarNav, setOpenSidebarNav] = useState<boolean>(false)
    const [iconPopOver, setIconPopOver] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState("")
    const { isAuthenticated, isLoading, data } = useSelector((state: RootState) => state.user)
    const searchParams = useSearchParams()
    const { replace, push } = useRouter()
    const pathname = usePathname()
    const queryString = searchParams.get(QUERY_PARAMS.search)

    // If the user cleared what they searched, we need to remove the search query in the URI to refelct the current state
    useEffect(() => {
        if (queryString && !searchValue) {
            replace(`${pathname}`)
        }
    }, [searchValue])

    // When the user selects a language, this function will update the current state to the selected language
    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedLanguage(e.target.value)
    }

    // When the user types something on the search input field, we first update the current state then we add a search query into the URI
    function handleSearch() {
        const param = new URLSearchParams(searchParams)
        if (searchValue) {
            param.set(QUERY_PARAMS.search, searchValue)
        }
        else {
            param.delete(QUERY_PARAMS.search)
        }
        // Adding the query to the url
        replace(`${pathname}?${param.toString()}`)

        // TODO: Make an APi call to query the posts
    }

    return (
        <nav className='relative inset-x-0 top-0 mt-5 max-md:px-7 md:px-7 xl:px-20'>
            <div className="flex items-center justify-between ">
                <div className="flex items-start">
                    <button onClick={() => setOpenSidebarNav(true)} className="max-sm:mr-2.5">
                        <RiMenuLine className="md:hidden w-8 h-8 text-navy" />
                    </button>
                    <div className="max-md:hidden flex items-center">
                        <Link href="/" className="w-[25px] h-[10px] mb-5">
                            <Image src={Logo} alt="logo" width={30} height={30} />
                        </Link>
                        <Popover >
                            <PopoverTrigger className="ml-4">
                                <div onClick={() => setIconPopOver(true)}>
                                    <RiArrowDropDownLine className="w-4 h-4" />
                                </div>
                            </PopoverTrigger>
                            {iconPopOver && <PopoverContent className="w-48 h-auto mt-4">
                                <p> {(isAuthenticated ? AUTHENTICATED_SIDEBAR_NAV_LINKS : NON_AUTHENTICATED_SIDEBAR_NAV_LINKS).map((route) => {
                                    return (
                                        <div key={route.label}>
                                            <button onClick={() => push(route.path)} className="text-base text-black hover:text-blue-500"> {route.label} </button>
                                        </div>
                                    )
                                })}</p>
                            </PopoverContent>}
                        </Popover>
                    </div>
                    <div className="max-md:hidden px-3 py-2.5 ml-7 bg-button flex items-center gap-1">
                        <TfiWorld className="w-4 h-3" />
                        <select value={selectedLanguage} onChange={handleChange} className="bg-button focus-visible:outline-none text-sm">
                            {Languages.map((language) => {
                                return (
                                    <option key={language} value={language} className="text-sm p-2"> {language} </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSearch()
                }} className={`flex items-center bg-button ${isAuthenticated && data ? "max-sm:w-[160px] sm:w-[300px] md:w-[250px] lg:w-[350px]" : "max-sm:w-[150px] sm:w-[300px] md:w-[350px] lg:-w[450px]"} h-[48px] max-md:px-2 max-sm:py-2 md:px-5 rounded-md`}>
                    <input type="text" placeholder="Type to Search..." onChange={(e) => setSearchValue(e.target.value)} className="bg-button max-sm:w-[120px] sm:w-[260px] md:w-[300px] p-2 max-sm:text-xs sm:text-sm focus-visible:outline-none" />
                    <button type="submit" onClick={handleSearch} className="mr-5">
                        <CiSearch className="w-5 h-5" />
                    </button>
                </form>
                {/* PREVENT LAYOUT SHIFT */}
                <div className="max-sm:w-[125px] sm:w-[350px] md:w-[400px]">
                    {!isLoading && <NavButtons />}
                    {openSidebarNav && <SidebarNav setOpenSidebarNav={setOpenSidebarNav} isAuthenticated={isAuthenticated} />}
                </div>
            </div>
        </nav>
    )
}
