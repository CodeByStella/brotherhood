import parse from "html-react-parser"

interface DsiplayContentProps {
    content: string
}

export default function DisplayContent({content} : DsiplayContentProps) {
    // Creating a DOM representation of the HTML string
    const reactElement = parse(content)

    return (
        <section className=''>
            {reactElement}
        </section>
    )
}
