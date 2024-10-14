import slide1 from "../../public/slides/slide1.jpg"
import slide2 from "../../public/slides/slide2.png"
import slide3 from "../../public/slides/slide3.png"

export const Languages = [
    'English',
    'Spanish',
    'Hindi',
    'Arabic',
    'French',
    'Mandarin',
    'Russian'
]
export enum QUERY_PARAMS {
    search = "search",
    page = "page",
    order="order",
    filterBy="filterBy",
    code = "code",
    catagory= "category"
}
export const VISITOR_COLUMNS = [
    "Monthly",
    "Average Monthly",
    "Weekly",
    "Average Weekly",
    "Daily",
    "Average Daily",
    "Hourly",
    "Average Hourly",
]
export enum NOTIFICATIONS_STATE {
    read = "read",
    unread = "unread",
    sent = "sent"
}
export enum QUERY_STRING_VALUES {
    date = "date",
    visitors = "visitors",
    comments = "comments",
    ascending = "asc",
    descending = "desc"
}
export const SETTING_OPTIONS = [
    "Everyone",
    "Followers",
    "None"
]
export const PROFILE_DATA_SETTINGS = [
    {
        title: "Profile picture",
        options: [
            "Everyone",
            "Followers",
            "Noone"
        ],
        value: "profile_picture"
    },
    {
        title: "Followers list",
        options: [
            "Everyone",
            "Followers",
            "Noone"
        ],
        value: "followers_list"
    },
    {
        title: "Following list",
        options: [
            "Everyone",
            "Followers",
            "Noone"
        ],
        value: "following_list"
    },
    {
        title: "Bio",
        options: [
            "Everyone",
            "Followers",
            "Noone"
        ],
        value: "bio"
    },
    {
        title: "Blog Category member info",
        options: [
            "Everyone",
            "Followers",
            "Noone"
        ],
        value: "blog_catagory_member_info"
    }
]
export const PUBLIC_DATA_SETTINGS = [
    {
        title: "Blog Category follow info",
        options: [
            "Everyone",
            "Followers",
            "Noone"
        ],
        value: "blog_catagory_follow_info"
    },
    {
        title: "Blog Category member info",
        options: [
            "Everyone",
            "Followers",
            "Noone"
        ],
        value: "blog_catagory_member_info"
    },
    {
        title: "Public follow list",
        options: [
            "Everyone",
            "Followers",
            "Noone"
        ],
        value: "public_follow_list"
    },
    {
        title: "Department member info",
        options: [
            "Everyone",
            "Followers",
            "Noone"
        ],
        value: "department_member_info"
    }
]
export const DEPARTMENTS = [
    "Administration Department",
    "Social Media Department",
    "Community Web Page Department",
    "Legal Department",
    "Accounts Department",
    "Public Relations Department",
    "Assesments and Missions Department"
]
export const BLOG_CATAGORY_APPROVAL_LIST = [
    "Nigerian Festivals",
    "Science and it's derived benefits"
]
export const Slides = [
    slide1,
    slide2,
    slide3
]
export const FAKE_BLOG_CATAGORIES = [
    {
        total: 5,
        catagoryName: "Nigerian Festival"
    },
    {
        total: 1,
        catagoryName: "RPG Games"
    },
    {
        total: 1,
        catagoryName: "Lumber Jack"
    },
    {
        total: 1,
        catagoryName: "Tech Trend today"
    },
    {
        total: 1,
        catagoryName: "Mindfull Musings"
    }
]
export const Visitors = [
    {
        timePeriod: "Yearly",
        Number_of_Viewers: 200
    },
    {
        timePeriod: "Monthly",
        Number_of_Viewers: 0
    },
    {
        timePeriod: "Weekly",
        Number_of_Viewers: 0
    },
    {
        timePeriod: "Daily",
        Number_of_Viewers: 0
    },
    {
        timePeriod: "Total",
        Number_of_Viewers: 20
    },
    {
        timePeriod: "Hourly",
        Number_of_Viewers: 5
    },
    {
        timePeriod: "Average Daily",
        Number_of_Viewers: 30
    },
    {
        timePeriod: "Average Hourly",
        Number_of_Viewers: 10
    }
]
export const PAGE_SIZE = 6
export const PAGE_NUMBERS = [
    1,2,3,4,5,6,'...',12
]
export const TERMS_AND_CONDITIONS = [
    {
        title: "Acceptance of Terms",
        description: "By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, as well as any additional terms and conditions and policies referenced herein or available through hyperlinks."
    },
    {
        title: "Use of Website",
        description: "You agree to use our website and any associated services for lawful purposes only. You shall not use our website in any way that violates any applicable laws, regulations, or the rights of others."
    },
    {
        title: "User Content",
        description: `You may contribute content to our website, including but not limited to comments, posts, and messages ("User Content"). By submitting User Content, you grant us a non-exclusive, worldwide, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, distribute, and display such User Content in any media.`,
        additional_info: " You represent and warrant that you own or have the necessary rights, licenses, consents, and permissions to submit the User Content and to grant the rights and licenses described herein. You agree not to submit any User Content that infringes upon the intellectual property rights, privacy rights, or any other rights of any third party"
    },
    {
        title: "Intellectual Property",
        description: "All content and materials available on our website, including but not limited to text, graphics, logos, images, videos, and software, are the property of our website or its licensors and are protected by copyright, trademark, and other intellectual property laws. You may not modify, reproduce, distribute, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the content or materials available on our website without the prior written consent of the respective rights holder."
    },
    {
        title: "Third-Party Links",
        description: "Our website may contain links to third-party websites or resources. These links are provided for your convenience only and do not imply any endorsement or approval by us of the linked websites or resources. We have no control over the contents of those websites or resources and accept no responsibility for them or for any loss or damage that may arise from your use of them."
    },
    {
        title: "Disclaimer of Warranties",
        description: `Our website and any associated services are provided on an "as is" and "as available" basis, without any warranties of any kind, either express or implied. We do not warrant that our website will be uninterrupted, error-free, or free of viruses or other harmful components. You agree that your use of our website is at your own risk.`
    },
    {
        title: "Limitation of Liability",
        description: "In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, loss of data, or loss of goodwill, arising out of or in connection with your use of our website or any associated services, regardless of the cause of action, even if we have been advised of the possibility of such damages."
    },
    {
        title: "Indemnification",
        description: "You agree to indemnify and hold us harmless from any claims, damages, liabilities, costs, or expenses (including reasonable attorneys' fees) arising out of or in connection with your use of our website, your violation of these Terms and Conditions, or your violation of any rights of any third party."
    },
    {
        title: "User Discretion and Accountability",
        description: `By joining this community, you acknowledge that members may be individuals from various locations around the world, and while we strive to ensure that all members are legally abiding citizens, we cannot guarantee the identity or intentions of every individual. Therefore, we urge all users to exercise discretion and caution when interacting with other members until they are confident in their trustworthiness.`,
        additional_info: "The community does not assume responsibility for the actions or behaviors of individual members within the community. Each member is solely responsible for their own conduct and interactions with others. By using this platform, you agree to hold the community harmless from any liabilities, damages, or consequences resulting from your interactions with other members or your activities within the community."
    },
    {
        title: "Governing Law",
        description: "These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions."
    },
    {
        title: "Changes to Terms and Conditions",
        description: "We reserve the right to modify or update these Terms and Conditions at any time without prior notice. Your continued use of our website after any such changes constitutes your acceptance of the new Terms and Conditions."
    },
    {
        title: "Contact Us",
        description: "If you have any questions or concerns about these Terms and Conditions, please contact us at brothersinternationalcommunity@gmail.com. By using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. Thank you for visiting our social media blog!"
    },
]
export type USER = {
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    followers: number,
    following: number,
    referalId: string | null,
    city: string,
    country: string
}
export const Profile_Links = [
    {
        path: "/profile",
        label: "Bio"
    },
    {
        path: "/profile/blogs",
        label: "Blog"
    },
    {
        path: "/profile/videos",
        label: "Videos"
    },
]
export const PROFILE_PAGE_PATH = "/profile"
export const Registration_Sections = [
    1,
    2,
    3
]
export enum ACTION_TYPES {
    set_current_user = "User/Set",
}
export const NON_AUTHENTICATED_SIDEBAR_NAV_LINKS = [
    {
        label: "Home",
        path: "/"
    },
    {
        label: "Register",
        path: "/register"
    },
    {
        label: "Terms of service",
        path: "/terms-and-conditions"
    },
    {
        label: "Founder Ranking",
        path: "/founder-ranking"
    }
]
export const AUTHENTICATED_SIDEBAR_NAV_LINKS = [
    {
        label: "Home",
        path: "/"
    },
    {
        label: "Edit Profile",
        path: "/edit-profile"
    },
    {
        label: "Create Post",
        path: "/create-post"
    },
    {
        label: "Create Video Blog",
        path: "/create-video-blog"
    },
    {
        label: "Follow list",
        path: "/followers-list"
    }
]
export const Referals = [
    {
        id: 1,
        name: "Toshiro",
        joinedDate: "28/3/24",
        country: "India"
    }
]  
export const HTTPS = "https://"

export const HTTP = "http://"
export const PAGES = [
    {
        value: "page1",
        label: "Page 1",
    },
    {
        value: "page2",
        label: "Page 2",
    },
    {
        value: "page3",
        label: "Page 3",
    },
    {
        value: "page4",
        label: "Page 4",
    },
    {
        value: "page5",
        label: "Page 5",
    }
]
export enum FOLLOW_STATE {
    following = "following",
    followers = "followers"
}
export enum MemberPositionType {
    coordinator = "coordinator",
    volunteer = "volunteer"
}
export const PREVIEW_BUTTON_DATA = "preview"

export const BUTTON_ATTRIBUTE_NAME = "data-button-data"