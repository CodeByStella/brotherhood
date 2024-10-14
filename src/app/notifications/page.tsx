import Notifications from "@/Components/Main/Notifications";
import TopPageHeader from "@/Components/Small Pieces/TopPageHeader";

export default async function page() {
    // TODO: Fetch the notifications for the current user.
    // FAKE DATA
    const notifications = {
        read: [
            {
                message: "John Doe commented on your post 'Monday Motivation Hacks",
                topic: "New Comment",
                from: "John Doe",
                created_at: "2023-02-20 14:30:45"
            }
        ],
        unread: [
            {
                message: "John Doe commented on your post 'Monday Motivation Hacks",
                topic: "New Comment",
                from: "John Doe",
                created_at: "2023-02-20 14:30:45"
            }
        ],
        sent: [
            {
                message: "Hey how are you",
                created_at: "2023-02-20 14:30:45"
            }
        ]
    }
    return (
        <main className="max-md:px-5 md:px-7 xl:px-20 mb-28">
            <TopPageHeader pageCode="PG32" pageName="Notifications Page" pageDescription="Displays reminders and notifications from managers and system" />
            <Notifications notifications={notifications} />
        </main>
    )
}
