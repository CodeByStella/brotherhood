import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"

interface TableProbs {
    referals: {
        id: number,
        name: string,
        joinedDate: string,
        country: string
    }[]
}

export default function Tabel({referals} : TableProbs) {
    return (
        <section className="mt-10">
            <Table className="border border-gray-300">
                <TableHeader>
                    <TableRow className="text-base font-medium">
                        <TableHead className="w-[100px]"> S/N </TableHead>
                        <TableHead className="text-center max-sm:text-sm"> Name </TableHead>
                        <TableHead className="text-center max-sm:text-sm"> Joined Date </TableHead>
                        <TableHead className="text-center max-sm:text-sm"> Country </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {referals.map((referal) => {
                        return (
                            <TableRow key={referal.id}>
                                <TableCell className="font-medium border border-gray-300"> {referal.id} </TableCell>
                                <TableCell className="border border-gray-300 text-center"> {referal.name} </TableCell>
                                <TableCell className="border border-gray-300 text-center"> {referal.joinedDate} </TableCell>
                                <TableCell className="text-center border border-gray-300"> {referal.country} </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </section>
    )
}
