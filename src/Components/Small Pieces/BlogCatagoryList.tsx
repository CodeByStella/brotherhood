
interface Props {
    catagories: {
        total: number,
        catagoryName: string
    }[]
}

export default function BlogCatagoryList({catagories} : Props) {
    return (
        <section className="mt-6">
            <h3 className="text-lg text-navy font-palanquin"> Blog Category Members List</h3>
            <div className="flex flex-1 flex-col justify-start gap-2.5 mt-4">
                {catagories.map((element, i) => {
                    return (
                        <p key={i} className="text-black font-medium font-sans"> {i + 1}. {element.catagoryName}  {element.total > 2 && `( Total ${element.total} Catagories here )`} </p>
                    )
                })}
            </div>
        </section>
    )
}
