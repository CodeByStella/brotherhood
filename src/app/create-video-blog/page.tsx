import VideoBlog from "@/Components/Main/forms/VideoBlog";
import TopPageHeader from "@/Components/Small Pieces/TopPageHeader";

export default function page() {
    return (
        <main className='max-md:px-5 md:px-7 xl:px-20 mb-28'>
            <TopPageHeader pageCode="PG-32" pageName="Create video blog page" pageDescription="Bring your ideas to life with video" />
            <div className="mt-14">
                <h3 className="text-xl text-black font-semibold"> Create Video Blog </h3>
            </div>
            <VideoBlog />
        </main>
    )
}
