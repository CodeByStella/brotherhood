import { VISITOR_COLUMNS } from "@/constants"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from "../ui/table"

interface VisitorsTabelProps {
    stats: {
        monthly: number,
        averageMonthly: number,
        weekley: number,
        averageWeekly: number,
        daily: number,
        averageDaily: number,
        hourly: number,
        averageHourly: number
    }
}   

export default function VisitorsContent({stats} : VisitorsTabelProps) {
    return (
        <section className='mt-6 max-sm:px-3 sm:px-6 max-sm:pb-7'>
            <Table className="border border-gray-300">
                <TableHeader>
                    <TableRow className="text-base font-medium">
                        {VISITOR_COLUMNS.map((column) => {
                            return (
                                <TableHead className="max-sm:text-sm sm:text-base"> {column} </TableHead>
                            )
                        })}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        {Object.values(stats).map((value) => {
                            return (
                                <TableCell key={value} className="text-center border border-gray-300"> {value} </TableCell>
                            )
                        })}
                    </TableRow>
                </TableBody>
            </Table>
        </section>
    )
}
