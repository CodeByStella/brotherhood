import TopPageHeader from "@/Components/Small Pieces/TopPageHeader";


export default async function page() {
    //TODO: Fecths all the departments and their contents too
    return (
        <main className="max-md:px-5 md:px-7 xl:px-20 mb-28">
            <TopPageHeader pageCode="PG32" pageName="Functions Page" pageDescription="In this page different managers of the website can assess their functions" />
            <div className="mt-20 flex items-center justify-center">
                <p className="max-sm:text-base sm:text-lg md:text-xl text-black font-palanquin"> No Departments have been created yet 😔 </p>
            </div>
        </main>
    )
}
