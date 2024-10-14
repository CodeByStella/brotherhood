import Pagination from "@/Components/Main/Pagination";
import Table from "@/Components/Main/Tabel"
import TopPageHeader from "@/Components/Small Pieces/TopPageHeader";
import { Referals } from "@/constants";

interface Props {
    searchParams: {
        page: string
    }
}

export default async function page({searchParams} : Props) {
    const pageQuery = searchParams.page || 1
    // TODO: Fetch users referals and it should take the page parameter for pagination

    return (
        <main className="max-md:px-5 md:px-7 xl:px-20 mb-28">
            <TopPageHeader pageCode="PG32" pageName="My Referals Page" pageDescription="Those who register under your referal will be recoreded here" />
            <Table referals={Referals} />
            <Pagination TotalNumberOfResults={12} pageSize={10} />
        </main>
    )
}
