'use client'


interface DecideProps {
    postId: string
}
// This is where the creator decide if they want to publish the post or delete it entirely 
export default function Decide({postId}: DecideProps){

    function handleDeletePost(){
        // TODO: Make an Htto request to delete the post
    }

    function handleChangeStatus(){
        //TODO: Make an HTTP request to change the status of the post 
    }

    return (
        <section className="flex items-center justify-center gap-14 mt-16">
            <button className="border border-navy text-navy max-sm:text-sm text-base font-semibold rounded-md focus-visible:outline-none px-7 py-2">
                Cancel
            </button>
            <button className="bg-navy px-10 py-2 max-sm:text-sm text-base text-white focus-visible:outline-none rounded-md">
                Save
            </button>
        </section>
    )
}
