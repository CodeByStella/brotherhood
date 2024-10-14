import Signinform from "@/Components/Main/forms/Signinform";
import TopPageHeader from "@/Components/Small Pieces/TopPageHeader";


export default function page() {
    return (
        <main className="max-md:px-5 md:px-7 xl:px-20 mb-28">
            <TopPageHeader pageCode="PG32" pageName="Sign in page" pageDescription="Log in to your account to continue where you left off." />
            <div className="flex justify-center mt-4">
                <Signinform />
            </div>
        </main>
    )
}
