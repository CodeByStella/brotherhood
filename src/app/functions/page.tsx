import AccountApprovalManagement from "@/Components/Main/AccountApprovalManagement";
import AdministrationManagement from "@/Components/Main/AdministrationManagement";
import BlogCatagoryGeneralManagement from "@/Components/Main/BlogCatagoryGeneralManagement";
import BlogCatagoryManagement from "@/Components/Main/BlogCatagoryManagement";
import DepartmentManagement from "@/Components/Main/DepartmentManagement";
import GeneralFunctions from "@/Components/Main/GeneralFunctions";
import LegislationManagement from "@/Components/Main/LegislationManagement";
import List from "@/Components/Small Pieces/List";
import TopPageHeader from "@/Components/Small Pieces/TopPageHeader";
import { TERMS_AND_CONDITIONS } from "@/constants";

export default function page() {

    //TODO: FETCH BLOG CATAGORIES THAT NEED TO BE APPROVED OR REJECTED
    // FAKE DATA
    const blogCatagories = [
        {
            id: 1,
            catagory: "Fulani Festival",
            catagoryCode: "CTG03 Nigerian Festivals",
            description: "festivals have great importance to fulanis"
        },
        {
            id: 2,
            catagory: "How to make money online",
            catagoryCode: "CTG10 Digital income source",
            description: "learning and teaching people how to make money online"
        }
    ]
    //TODO: FETCH ALL THE ACCOUNTS LIST THAT NEED TO BE APPROVED OR REJECTED
    // FAKE DATA
    const accountsList = [
        {   
            firstName: "Joe",
            lastName: "Shmoe",
            email: "joeshmoe123@gmail.com",
            sex: "male",
            city: "cape town",
            userName: "joe_shmoe",
            birthDate: "2/03/2000",
            telegramUsername: "joe_shmoe",
            languageSpoken: [
                "English",
                "French"
            ],
            languagesWishToLearn:  [
                "Spanish",
                "Korean"
            ]
        }
        , 
        {
            firstName: "Joe",
            lastName: "Shmoe",
            email: "joeshmoe123@gmail.com",
            sex: "male",
            city: "lagos",
            userName: "joe_shmoe",
            birthDate: "2/03/2000",
            telegramUsername: "joe_shmoe",
            languageSpoken: [
                "English",
                "French"
            ],
            languagesWishToLearn:  [
                "Spanish",
                "Korean"
            ]
        }
    ]
    //TODO: FETCH THE LEGAL TERMS UPDATE HISTORY
    // FAKE DATA
    const updateHistory = [
        {
            date: "2/03/24",
            managerName: "Jhon Walter",
            article: "legal term article one",
            reason: "Introduction"
        },
        {
            date: "2/02/24",
            managerName: "Mike jason",
            article: "legal term article three",
            reason: "Project"
        },
        {
            date: "2/01/24",
            managerName: "Sara David",
            article: "legal term article six",
            reason: "Typo"
        }
    ]
    // TODO: FETCH THE TERMS AND CONDITIONS FROM THE DATABASE AND PASS IT TO THE LEGISLATION MANAGEMNT COMPONENT
    // TODO: FETCH MEMBER APPLICATION HISTORY AND MEMBER JOIN HISTORY
    const MemberApplicationHistory = [
        {
            date: "2/23/24",
            username: "eliyas",
            hours: "3",
            description: {
                label: "Link",
                path: "/details/userId"
            },
            position: "coordinator",
        },
        {
            date: "2/10/24",
            username: "nassib",
            hours: "6",
            description: {
                label: "Details",
                path: "/details/userId"
            },
            position: "volunteer",
        }
    ]
    const MemberJoinHistory = [
        {
            date: "2/23/24",
            username: "eliyas",
            hours: "3",
            description: {
                label: "Link",
                path: "/details/userId"
            },
            position: "coordinator",
            removedAt: "2/3/23"
        },
        {
            date: "2/10/24",
            username: "nassib",
            description: {
                label: "Details",
                path: "/details/userId"
            },
            position: "volunteer",
        }
    ]

    return (
        <main className="max-md:px-5 md:px-7 xl:px-20 mb-28">
            <TopPageHeader pageCode="PG32" pageName="Functions Page" pageDescription="In this page different managers of the website can assess their functions" />
            <div className="mt-6">
                {/* ADMINISTARTION MANAGER */}
                <List title="Administration Manager">
                    <AdministrationManagement />
                </List>
                 {/* BLOG CATAGORY GENERAL MANAGER */}
                <List title="Blog Category General Manager">
                    <BlogCatagoryGeneralManagement blogCatagoryLists={blogCatagories} />
                </List>
                {/* BLOG CATAGORY MANAGER */}
                <List title="Blog Category Manager">
                    <BlogCatagoryManagement />
                </List>
                {/* DEPARTMENT MANAGER */}
                <List title="Department Manager">
                    <DepartmentManagement memeberApplication={MemberApplicationHistory} memberJoin={MemberJoinHistory} />
                </List>
                {/* ACCOUNT APPROVED MANAGER */}
                <List title="Account Approval Manager">
                    <AccountApprovalManagement accountsLits={accountsList} />
                </List>
                {/* LEGISLATION MANAGER */}
                <List title="Legislation Manager">
                    <LegislationManagement history={updateHistory} termsAndConditions={TERMS_AND_CONDITIONS} />
                </List>
                {/* GENERAL FUNCTION */}
                <List title="General Function">
                    <GeneralFunctions />
                </List>
            </div>
        </main>
    )
}
