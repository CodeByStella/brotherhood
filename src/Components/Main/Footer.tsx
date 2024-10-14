import Link from "next/link";
import { FaInstagram, FaDiscord, FaXTwitter, FaFacebook } from "react-icons/fa6";
import VisitorsBanner from "./VisitorsBanner";

export default function Footer() {
    return (
        <section>
            <VisitorsBanner />
            <div className="w-full mt-10 flex flex-col items-center justify-center mb-20">
                <form className="flex max-sm:flex-col max-sm:justify-center items-start gap-5">
                    <input type="text" placeholder="Enter your email" className="max-sm:w-[250px] sm:w-[300px] md:w-[360px] lg:w-[439px] h-[48px] px-3 border border-gray-400 rounded-lg focus-visible:outline-none" />
                    <button type="submit" className="bg-navy max-sm:h-[35px] sm:h-[45px] md:h-[48px] px-6 py-2 max-sm:text-sm sm:text-base text-white rounded-md"> Subscribe </button>
                </form>
                <div className="flex items-center gap-5 mt-10">
                    <Link href="https://www.discord.com/">
                        <FaDiscord className="w-[25px] h-[25px]" />
                    </Link>
                    <Link href="https://www.x.com/">
                        <FaXTwitter className="w-[25px] h-[25px]" />
                    </Link>
                    <Link href="https://www.instagram.com/">
                        <FaInstagram className="w-[25px] h-[25px]" />
                    </Link>
                    <Link href="https://www.facebook.com/">
                        <FaFacebook className="w-[25px] h-[25px]" />
                    </Link>
                </div>
                <p className="mt-7 max-sm:text-center max-sm:px-10 max-sm:leading-6 max-sm:text-xs sm:text-base text-black font-semibold"> @2024 All rights reseved. Brotherhood International Community  </p>
            </div>
        </section>
    )
}
