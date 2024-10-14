"use client"


import { useRouter } from "next/navigation";
import { FaRegUser } from "react-icons/fa6";

interface AvatarProps {
    width?: string,
    height?: string,
    iconWidth?: string,
    iconHeight?: string,
    closePopUp?: boolean,
    navigateToProfile?: boolean,
    setOpenPopUp?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Avatar({width, height, iconWidth, iconHeight, closePopUp, setOpenPopUp, navigateToProfile=false} :  AvatarProps) {

    const {push} = useRouter()

    function handleProfileNavigation(){
        // Close The pop-up before redirecting to the profile page
        if(closePopUp && setOpenPopUp){
            setOpenPopUp(false)
            push("/profile")
        }

        if(navigateToProfile){
            push("/profile")
        }
    }

    return (
        <div onClick={handleProfileNavigation} className={`${ width && height ? `${width} ${height}` : "w-[40px] h-[40px]"} ${closePopUp &&  "hover:cursor-pointer"} relative rounded-full bg-navy border-none focus-visible:outline-none`}>
            <div className={`absolute flex items-center justify-center ${iconWidth && iconHeight ? "pt-3.5 px-4" : "pt-2.5 px-3"}`}>
                <FaRegUser className={`${iconWidth && iconHeight ? `${iconWidth} ${iconHeight} right-3` : "w-[16px] h-[16px]"} text-white`} />
            </div>
        </div>
    )
}
