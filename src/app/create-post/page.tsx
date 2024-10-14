import ArticlesBlog from "@/Components/Main/forms/ArticlesBlog";
import TopPageHeader from "@/Components/Small Pieces/TopPageHeader";


export default function page() {
    return (
        <main className='max-md:px-5 md:px-7 xl:px-20 mb-28'>
            <TopPageHeader pageCode="PG-32" pageName="Create blog post page" pageDescription="Share your thoughts, experiences, and expertise with a blog post" />
            <div className="mt-16">
                <h3 className="text-black text-xl font-semibold"> Create a Post </h3>
                <ArticlesBlog />
            </div>
        </main>
    )
}
