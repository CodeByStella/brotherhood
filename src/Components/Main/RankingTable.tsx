import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"

interface RankingTableProps {
    rankData: {
        rank: number,
        founderName: string,
        country: string,
        date: string
    }[]
}

export default function RankingTable({rankData} : RankingTableProps) {
    return (
        <section className='max-sm:mt-10 sm:mt-16'>
            <Table className="border border-gray-300">
                <TableHeader className="pb-3">
                    <TableRow className="text-base font-medium">
                        <TableHead className="max-sm:text-sm sm:w-[100px] md:w-[120x]"> Rank </TableHead>
                        <TableHead className="text-center max-sm:text-sm"> Founder Name </TableHead>
                        <TableHead className="text-center max-sm:text-sm"> Country </TableHead>
                        <TableHead className="text-center max-sm:text-sm"> Date </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rankData.map((data) => {
                        return (
                            <TableRow key={data.rank} className="mt-6">
                                <TableCell className="border border-gray-300"> {data.rank} </TableCell>
                                <TableCell className="border border-gray-300 text-center"> {data.founderName} </TableCell>
                                <TableCell className="border border-gray-300 text-center"> {data.country} </TableCell>
                                <TableCell className="border border-gray-300 text-center"> {data.date} </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </section>
    )
}
