'use client'

import { QUERY_PARAMS } from "@/constants"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { CiSearch } from "react-icons/ci"

interface SearchCatagoryProps {
    queryParameter: string,
    placeholder: string,
    background?: string,
}

export default function Search({queryParameter, placeholder, background="bg-white"} : SearchCatagoryProps) {

    const [controlledValue, setControlledValue] = useState<string>("")
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const queryString = searchParams.get(queryParameter)
    const {replace} = useRouter()

    useEffect(() => {
        if(queryString && !controlledValue){
            replace(`${pathname}`)
        }
    }, [controlledValue])

    function handleSearch(){
        const param = new URLSearchParams(searchParams)
        if(controlledValue){
            param.set(queryParameter, controlledValue)
        }
        else{
            param.delete(QUERY_PARAMS.code)
        }
        // Adding the query to the url
        replace(`${pathname}?${param.toString()}`)
    }

    return (
        <div className={`max-sm:w-[150px] sm:w-[200px] flex items-start ${background} border-none rounded-md px-3 py-2.5 text-sm`}>
            <form onSubmit={(e) => {
                e.preventDefault()
                handleSearch()
            }}>
                <input type="text" onChange={(e) => setControlledValue(e.target.value)} placeholder={placeholder} className={`border-none focus-visible:outline-none ${background} text-sm w-full h-full`} />
            </form>
            <button onClick={handleSearch}>
                <CiSearch className="w-5 h-5 text-navy" />
            </button>
        </div>
    )
}
