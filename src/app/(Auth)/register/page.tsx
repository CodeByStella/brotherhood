import Registrationform from "@/Components/Main/forms/Registrationform";
import TopPageHeader from "@/Components/Small Pieces/TopPageHeader";


export default function page() {
    return (
        <main className="max-md:px-5 md:px-7 xl:px-20">
            <TopPageHeader pageCode="PG32" pageName="Registration page" pageDescription="User Registration Page" />
            <Registrationform />
        </main>
    )
}
