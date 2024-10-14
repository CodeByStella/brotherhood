'use client'

import { CiSquarePlus } from "react-icons/ci"
import { FaCheckCircle } from "react-icons/fa"
import { MdCancel } from "react-icons/md"
import Pagination from "../Main/Pagination"
import { USERINFO } from "../Main/AccountApprovalManagement"

interface Props {
    list: USERINFO[] | string[],
    handleApprove: (name: string |  null) => void,
    handleReject: (name: string | null) => void,
    setOpenDetails?: React.Dispatch<React.SetStateAction<number | null>>,
    openDetails?: number | null,
    isLoading: boolean,
    details?: boolean
}

export default function ApproveReject({list, handleApprove, handleReject, setOpenDetails, openDetails, isLoading, details=false} : Props) {
    return (
        <div>
            {list.map((user, index) => {
                return (
                    <div key={index} className="mt-10">
                        {typeof user == "string" && <h4 className="tet-lg text-navy font-palanquin"> {index + 1}. {user} </h4>}
                        {typeof user == "object" && <h4 className="tet-lg text-navy font-palanquin"> {index + 1}. {user.firstName} {user.lastName} </h4>}
                        {details && setOpenDetails && <button disabled={isLoading} onClick={() => setOpenDetails((detail) => openDetails === index + 1 ? null : index + 1)} className="flex items-center gap-3 mt-4 mb-6 disabled:cursor-not-allowed ">
                            <CiSquarePlus className="w-5 h-5 rounded-[4px]" />
                            <p className="text-sm text-navy font-palanquin"> Details </p>
                        </button>}
                        {openDetails === index + 1 && typeof user == "object" && <div className="mt-7 mb-10 text-base text-black font-palanquin">
                            <p className="my-3"> Languages Spoken : &nbsp; {user.languageSpoken.length > 0 ? user.languageSpoken.join(", ") : "Not provided"} </p>
                            <p className="my-3"> Languages to learn : &nbsp; {user.languagesWishToLearn.length > 0 ? user.languagesWishToLearn.join(", ") : "Not Provided"} </p>
                            <p className="my-3"> Birthdate :&nbsp; {user.birthDate} </p>
                            <p className="my-3"> Sex: &nbsp; {user.sex} </p>
                            <p className="my-3"> Email: &nbsp; {user.email} </p>
                            <p className="my-3"> City: &nbsp; {user.city} </p>
                            <p className="my-3"> Telegram username : &nbsp; {user.telegramUsername} </p>
                        </div>
                        }
                        <div className="flex flex-wrap max-sm:gap-5 items-center gap-7 mt-4">
                            <button disabled={isLoading} onClick={() => handleApprove(typeof user == "string" ? user : typeof user == "object" ? user.userName : null)} className="bg-green-100 w-[150px] h-auto px-7 py-2.5 rounded-md disabled:cursor-not-allowed focus-visible:outline border-none flex items-center gap-3">
                                <FaCheckCircle className="w-4 h-4 text-green-500" />
                                <p className="text-base text-black font-semibold"> Aprrove </p>
                            </button>
                            <button disabled={isLoading} onClick={() => handleReject(typeof user == "string" ? user : typeof user == "object" ? user.userName : null)} className="bg-red-100  w-[150px] h-auto px-7 py-2.5 rounded-md disabled:cursor-not-allowed focus-visible:outline border-none flex items-center gap-3">
                                <MdCancel className="w-4 h-4 text-red-600" />
                                <p className="text-[15px] text-black font-semibold"> Reject </p>
                            </button>
                        </div>
                    </div>
                )
            })}
            {/* TODO: TOTAL NUMBER OF LISTS SHOULD BE list.length */}
            <Pagination TotalNumberOfResults={10} pageSize={3} />
        </div>
    )
}
