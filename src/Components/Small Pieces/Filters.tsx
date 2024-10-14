'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Checkbox } from "../ui/checkbox"
import { QUERY_PARAMS, QUERY_STRING_VALUES } from "@/constants"

export default function Filters() {

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const {replace} = useRouter()
    const currentFilter = searchParams.get("filterBy") || "date"
    const currentOrder = searchParams.get("order") || "desc"
    const param = new URLSearchParams(searchParams);

    function handleFilterByDate(){
        param.set(QUERY_PARAMS.filterBy, QUERY_STRING_VALUES.date);
        replace(`${pathname}?${param}`)
    }

    function handleFilterByVisitors(){
        param.set(QUERY_PARAMS.filterBy, QUERY_STRING_VALUES.visitors);
        replace(`${pathname}?${param}`)
    }

    function handleFilterByComments(){
        param.set(QUERY_PARAMS.filterBy, QUERY_STRING_VALUES.comments);
        replace(`${pathname}?${param}`)
    }

    function handleOrderAsc(){
        param.set(QUERY_PARAMS.order, QUERY_STRING_VALUES.ascending);
        replace(`${pathname}?${param}`)
    }

    function handleOrderDesc(){
        param.set(QUERY_PARAMS.order, QUERY_STRING_VALUES.descending);
        replace(`${pathname}?${param}`)
    }

    return (
        <section className="mt-8 flex flex-wrap max-sm:gap-4 items-center justify-between">
            <div className="flex items-center justify-start max-md:gap-6 gap-10">
                <span className="checkboxFlex">
                    <Checkbox checked={currentFilter === QUERY_STRING_VALUES.date} onClick={handleFilterByDate} className="filterCheckbox" />
                    <p className="max-sm:text-sm sm:text-base text-black font-palanquin"> Date </p>
                </span>
                <span className="checkboxFlex">
                    <Checkbox checked={currentFilter === QUERY_STRING_VALUES.visitors} onClick={handleFilterByVisitors} className="filterCheckbox" />
                    <p className="max-sm:text-sm sm:text-base text-black font-palanquin"> Visitors </p>
                </span>
                <span className="checkboxFlex">
                    <Checkbox checked={currentFilter === QUERY_STRING_VALUES.comments} onClick={handleFilterByComments} className="filterCheckbox" />
                    <p className="max-sm:text-sm sm:text-base text-black font-palanquin"> Comments </p>
                </span>
            </div>
            <div className="flex items-center max-md:gap-6 gap-10">
                <span className="checkboxFlex">
                    <Checkbox checked={currentOrder === QUERY_STRING_VALUES.ascending} onClick={handleOrderAsc} className="filterCheckbox" />
                    <p className="max-sm:text-sm sm:text-base text-black font-palanquin"> Ascending </p>
                </span>
                <span className="checkboxFlex">
                    <Checkbox checked={currentOrder === QUERY_STRING_VALUES.descending} onClick={handleOrderDesc} className="filterCheckbox" />
                    <p className="max-sm:text-sm sm:text-base text-black font-palanquin"> Descending </p>
                </span>
            </div>
        </section>
    )
}
