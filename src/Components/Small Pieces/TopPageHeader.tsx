'use client'

import Search from "./Search"

interface TopPageHeaderProps {
    pageCode: string,
    pageName: string,
    pageDescription: string
}

export default function TopPageHeader({pageCode, pageName, pageDescription} : TopPageHeaderProps) {

    return (
        <section className="max-sm:mt-3 sm:mt-7 w-full h-auto rounded-lg bg-header px-6 py-4">
            <div className="flex flex-wrap max-sm:gap-3 items-center justify-between">
                <p className="max-sm:text-[15px] sm:text-base text-navy font-semibold"> Page Code: {pageCode} </p>
                <Search queryParameter="code" placeholder="Search by code" />
            </div>
            <h3 className="max-sm:mt-6 sm:mt-4 md:mt-2 max-sm:leading-6 max-sm:text-sm sm:text-xl text-black font-semibold font-palanquin"> {pageName} </h3>
            <p className="mt-4 max-sm:text-sm max-sm:leading-6 text-base text-black"> {pageDescription} </p>
        </section>
    )
}
