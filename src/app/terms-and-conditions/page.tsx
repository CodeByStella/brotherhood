import TopPageHeader from "@/Components/Small Pieces/TopPageHeader";
import { TERMS_AND_CONDITIONS } from "@/constants";
import { CiSquareChevLeft } from "react-icons/ci";


export default async function page() {
    // TODO: FETCH THE TERMS AND CONDITIONS FROM THE DATABASE
    return (
        <main className="mb-20">
            <div className="max-md:px-7 md:px-10 xl:px-20 ">
                <TopPageHeader pageCode="PG32" pageName="Terms and Conditions Page" pageDescription="Our Home" />
            </div>
            <div className="max-sm:mt-8 sm:mt-12 w-full max-lg:h-[100px] lg:h-[150px] flex items-center justify-start bg-navy border-none focus-visible:outline-none max-md:px-7 md:px-10 xl:px-20">
                <CiSquareChevLeft className="w-10 h-10 text-white" />
                <p className="max-sm:text-lg sm:text-xl md:text-2xl xl:text-[26px] w-full text-white text-center font-semibold font-palanquin"> Terms and Conditions Agreement </p>
            </div>
            <div className="max-sm:mt-10 sm:mt-14 max-md:px-7 md:px-10 xl:px-20 ">
                <p className="mt-4 text-base max-sm:text-justify font-palanquin"> 
                    These Terms and Conditions govern your use of our website and any associated services offered through it. By accessing or using our website, you agree to be bounded by these Terms and Conditions. Please read them carefully before proceeding. If you do not agree to these Terms and Conditions, you may not use our website.
                </p>
                {/* STATIC DATA */}
                { TERMS_AND_CONDITIONS.map((term, index) => {
                    return (
                        <div key={term.title} className="flex flex-col justify-start mt-6 text-black font-palanquin">
                            <h4 className="text-lg font-semibold"> {index + 1}. {term.title} </h4>
                            <p className="mt-3 text-base"> {term.description} </p>
                            {term.additional_info && <p className="mt-3"> {term.additional_info} </p>}
                        </div>
                    )
                })}
            </div>
        </main>
    )
}
