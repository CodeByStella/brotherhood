import Settings from "@/Components/Main/Settings";
import TopPageHeader from "@/Components/Small Pieces/TopPageHeader";

export default function page() {
    return (
        <main className='max-md:px-5 md:px-7 xl:px-20 mb-28'>
            <TopPageHeader pageCode="PG32" pageName="Privacy Settings Page" pageDescription="Change personal privacy settings" />
            <h3 className="text-2xl text-black font-semibold opacity-90 font-palanquin mt-14"> Privacy Settings </h3>
            <Settings />
        </main>
    )
}
