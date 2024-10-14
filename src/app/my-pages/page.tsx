import Pagination from "@/Components/Main/Pagination";
import Filters from "@/Components/Small Pieces/Filters";
import PageCard from "@/Components/Small Pieces/PageCard";
import TopPageHeader from "@/Components/Small Pieces/TopPageHeader";
import { QUERY_STRING_VALUES } from "@/constants";

interface MyPagesProps {
    searchParams: {
        filterBy: string,
        order: string,
        page: string
    }
}
export default async function page({searchParams}: MyPagesProps) {
    const filterQuery = searchParams.filterBy || QUERY_STRING_VALUES.date
    const orderQuery = searchParams.order || QUERY_STRING_VALUES.descending
    const pageQuery = searchParams.page || 1
    //TODO: Fetch all the pages of the current user by paasing the query strings to filter and sort pages

    // FAKE DATA
    const Pages = [
        {
            title: "My new cooking catalog",
            created_at: "20 June 2021",
            content: [
                {
                    id: 1,
                    type: "Blog",
                    name: "Cooking",
                    publishedDate: "28/3/24"
                },
                {
                    id: 2,
                    type: "Video blog",
                    name: "Food",
                    publishedDate: "28/3/24"
                }
            ],
            stats: {
                monthly: 100,
                averageMonthly: 20,
                weekley: 10,
                averageWeekly: 6,
                daily: 5,
                averageDaily: 3,
                hourly: 0,
                averageHourly: 0
            },
            postsNotSubmitted : [
                "Home Gym on a Budget",
                "Top Productivity Apps",
                "Perfect Steak Recipe",
                "Grow Your Instagram"

            ],
            postsPending: [
                "Monday Motivation Hacks",
                "Digital Detox 101",
                "Lemon Water Benefits",
                "Fitness for Busy People",
                "Travel on a Budget"
            ]
        },
        {
            title: "Spring festival of china",
            created_at: "20 June 2021",
            content: [
                {
                    id: 1,
                    type: "Blog",
                    name: "Cooking",
                    publishedDate: "28/3/24"
                },
                {
                    id: 2,
                    type: "Video blog",
                    name: "Food",
                    publishedDate: "28/3/24"
                }
            ],
            stats: {
                monthly: 100,
                averageMonthly: 20,
                weekley: 10,
                averageWeekly: 6,
                daily: 5,
                averageDaily: 3,
                hourly: 0,
                averageHourly: 0
            },
            postsNotSubmitted : [
                "Home Gym on a Budget",
                "Top Productivity Apps",
                "Perfect Steak Recipe",
                "Grow Your Instagram"

            ],
            postsPending: [
                "Monday Motivation Hacks",
                "Digital Detox 101",
                "Lemon Water Benefits",
                "Fitness for Busy People",
                "Travel on a Budget"
            ]
        },
        {
            title: "How to make money online",
            created_at: "20 June 2021",
            content: [
                {
                    id: 1,
                    type: "Blog",
                    name: "Cooking",
                    publishedDate: "28/3/24"
                },
                {
                    id: 2,
                    type: "Video blog",
                    name: "Food",
                    publishedDate: "28/3/24"
                }
            ],
            stats: {
                monthly: 100,
                averageMonthly: 20,
                weekley: 10,
                averageWeekly: 6,
                daily: 5,
                averageDaily: 3,
                hourly: 0,
                averageHourly: 0
            },
            postsNotSubmitted : [
                "Home Gym on a Budget",
                "Top Productivity Apps",
                "Perfect Steak Recipe",
                "Grow Your Instagram"

            ],
            postsPending: [
                "Monday Motivation Hacks",
                "Digital Detox 101",
                "Lemon Water Benefits",
                "Fitness for Busy People",
                "Travel on a Budget"
            ]
        }
    ]
    return (
        <main className='max-md:px-5 md:px-7 xl:px-20 mb-28'>
            <TopPageHeader pageCode="PG32" pageName="My Pages" pageDescription="All the pages you have created and the stats" />
            <div className="mt-14">
                <h2 className="text-2xl text-black font-medium"> My Pages </h2>
                <p className="text-base text-navy font-semibold mt-6"> List Pages in the order of </p>
            </div>
            <Filters />
            <PageCard pages={Pages} />
            <Pagination TotalNumberOfResults={Pages.length} pageSize={5} />
        </main>
    )
}
