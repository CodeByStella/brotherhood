import { MdOutlineClear } from "react-icons/md";

interface AdProps {
    title: string,
    buttonLabel: string
}

export default function Ad({title, buttonLabel}: AdProps) {
    return (
        <section className='max-sm:mt-10 sm:mt-14 md:mt-10'>
            <div className="max-sm:w-[450px] max-sm:h-[190px] sm:w-[600px] sm:h-[190px] md:w-[740px] md:h-[210px] lg:w-[1060px] lg:h-[250px] xl:w-[1110px] xl:h-[257px] relative rounded-xl">
                {/* <Image src={ad} alt="ad" width={1130} height={120} className="rounded-xl" /> */}
                <div className="absolute inset-0 bg-black opacity-90 rounded-[20px]"></div>
                <button className="p-2 bg-slate-600 absolute top-6 right-9 rounded-md">
                    <MdOutlineClear className="w-3 h-3 text-white" />
                </button>
                <span className="absolute left-0 top-1/3 w-full">
                    <div className="flex flex-col items-center justify-center ">
                        <h3 className="max-md:text-xl md:text-2xl lg:text-3xl text-white font-semibold"> {title} </h3>
                        <button className="mt-6 bg-navy max-lg:w-[100px] lg:w-[120px] max-lg:h-[38px] lg:h-[47px] focus-visible:outline-none rounded-lg text-white text-base">
                            {buttonLabel}
                        </button>
                    </div>
                </span>
            </div>
        </section>
    )
}
