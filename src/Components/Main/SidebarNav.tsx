import { AUTHENTICATED_SIDEBAR_NAV_LINKS, NON_AUTHENTICATED_SIDEBAR_NAV_LINKS } from "@/constants";
import { useRouter } from "next/navigation";
import { IoCloseOutline } from "react-icons/io5";

interface SidebarNav {
    setOpenSidebarNav: React.Dispatch<React.SetStateAction<boolean>>
    isAuthenticated: boolean
}

type NavLink = {
    label: string,
    path: string
}[]

export default function SidebarNav({setOpenSidebarNav, isAuthenticated} : SidebarNav) {

    const navLinks: NavLink = isAuthenticated ? AUTHENTICATED_SIDEBAR_NAV_LINKS : NON_AUTHENTICATED_SIDEBAR_NAV_LINKS
    const {push} = useRouter()

    function handleClick(path: string){
        setOpenSidebarNav(false)
        push(path)
    }

    return (
        <section className='absolute inset-0 left-0 w-[180px] min-h-screen z-30 -mt-5 bg-button flex flex-col justify-start px-5 pt-10'>
            <button onClick={() => setOpenSidebarNav(false)} className="flex justify-end">
                <IoCloseOutline className="w-6 h-6 text-black" />
            </button>
            <div className="flex flex-col justify-start gap-4 mt-10">
                {navLinks.map((route) => {
                    return (
                        <div key={route.label}>
                            <button onClick={() => handleClick(route.path)} className="text-base text-black hover:text-blue-500"> {route.label} </button>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
