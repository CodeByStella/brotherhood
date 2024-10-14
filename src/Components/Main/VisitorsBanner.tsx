import { Visitors } from "@/constants";


export default function VisitorsBanner() {
    return (
        <section className='mt-10'>
            <div className="w-full max-sm:h-auto max-sm:pb-10 sm:h-[400px] md:h-[350px] lg:h-[340px] xl:h-[300px] bg-navy max-sm:px-5 sm:px-14 md:px-16 lg:px-20 xl:px-28 pt-16">
                <h2 className="max-md:text-2xl md:text-3xl text-white font-semibold"> Visitor’s Counter </h2>
                <div className="flex flex-wrap items-center">
                    {Visitors.map((item, i) => {
                        return (
                            <span key={i} className="flex items-center relative mt-16 text-white">
                                <h5 className="text-base"> {item.timePeriod} </h5>
                                <div className={`absolute inset-0 bg-navy opacity-50 ${i === Visitors.length - 1 || i === Visitors.length - 2 ? "w-[90px]" : "w-[34px]"}`} />
                                <p className="font-semibold pl-2 text-xl"> {item.Number_of_Viewers} </p>
                                {i === Visitors.length - 1 ? null : (
                                    <span className="text-white mx-5">
                                        |
                                    </span>
                                ) }
                            </span>
                        )
                    })}
                </div>
            </div>
            <div className=" mt-10 sm:px-10 md:px-20 lg:px-24 xl:px-28 flex sm:gap-3 text-navy max-sm:text-xs max-sm:text-center max-sm:px-6 max-sm:leading-4 sm:text-sm"> 
                <span className="font-bold"> Note! </span> 
                <p className="font-semibold"> Visits counts are only accepted from a registered member’s visit and only once per day. </p> 
                </div>
        </section>
    )
}
