import Header from "@/Components/Main/Header";
import Pagination from "@/Components/Main/Pagination";
import PostList from "@/Components/Main/Post/PostList";
import Catagory from "@/Components/Small Pieces/Catagory";
import Search from "@/Components/Small Pieces/Search";
import TopPageHeader from "@/Components/Small Pieces/TopPageHeader";
import { QUERY_PARAMS } from "@/constants";

interface Props {
  searchParams: {
    page: string,
    catagory: string,
  }
}

export default function Home({searchParams} : Props) {
  const pageQuery = searchParams.page || 1
  const catagoryQuery = searchParams.catagory
  // TODO: Make an HTTP request to fecth the blog posts on the home page and query catagories too
  //TODO: Also fetch the Catagory which has the most followers to be listed in the home page
  const catagoryPath = ["World", "Continets", "Africa", "Nigeria", "Nigerian Festivals"]
  return (
    <main className="max-md:mx-5 md:mx-7 xl:mx-20">
        <TopPageHeader pageCode="PG-32" pageName="Home Page" pageDescription="Our Home" />
        <Header />
        <div className="xl:mx-7 max-md:mt-8 md:mt-10 lg:mt-20 mb-28">
          <div className="w-full -ml-2 px-10 max-sm:py-3 sm:py-7 md:py-10 bg-button rounded-xl">
              <div className="border-none bg-navy rounded-md py-7">
                  <span className="flex items-center justify-center text-white max-sm:text-lg sm:text-xl lg:text-3xl font-palanquin"> Blog Posts </span>
              </div>
          </div>
          <div className="mt-10">
            <Search queryParameter={QUERY_PARAMS.catagory} placeholder="Search categories" background="bg-button" />
          </div>
          {/* FAKE DATA */}
          <Catagory name="Nigerian Festivals" followers={200} members={15} posts={156} catagoryPath={catagoryPath} />
          <PostList />
          {/* FAKE VALUE TO SIMULATE TOTAL NUMBER OF POSTS */}
          <div className="md:mr-10">
            <Pagination TotalNumberOfResults={15} pageSize={5}/>
          </div>
          {/* <Ad title="Google Ad Spot" buttonLabel="View" /> */}
        </div>
    </main>
  );
}
