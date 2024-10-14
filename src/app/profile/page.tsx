import Bio from "@/Components/Main/Bio";
import ProfileHeader from "@/Components/Main/ProfileHeader";

//TODO: Fetch the users Bio
export default async function page() {
    // TODO: FAKE DATA
    const htmlStringBio = `<p> The bio of the <strong> user </strong> is rendered in Markdown and will be placed here. This section is dedicated to showcasing the user's <span style="color: red;"> personality </span> , skills, and experiences in a concise and visually appealing way. Whether you're a developer, designer, writer, or entrepreneur, this is your chance to tell your story and make a lasting impression on your audience </p>`
    return (
        <main>
            <ProfileHeader>
                <div className="xl:mr-12">
                    <Bio content={htmlStringBio} />
                </div>
            </ProfileHeader>
        </main>
    )
}
