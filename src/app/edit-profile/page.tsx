import EditProfile from "@/Components/Main/forms/Edit Profile/EditProfile";
import TopPageHeader from "@/Components/Small Pieces/TopPageHeader";


export default async function page() {
    //TODO: Fetch All the User's Data -> getAllUserData
    const userData = {
        firstName: "Abebe",
        lastName: "Balcha",
        city: "Addis Ababa",
        country: "Ethiopia",
        userName: "abebe1234"
    }
    
    return (
        <main className="max-md:px-5 md:px-7 xl:px-20 mb-28">
            <TopPageHeader pageCode="PG32" pageName="Edit profile page" pageDescription="Update your profile information" />
            <div className="mt-14">
                <EditProfile userData={userData} />
            </div>
        </main>
    )
}
