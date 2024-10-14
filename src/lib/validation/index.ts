import { z } from "zod";

export const Section1FormSchema = z.object({
    firstName: z.string().min(2, {message: "First name is required"}).max(10, {message: "First name is too long"}),
    lastName: z.string().max(10, {message: "Last name is too long"}).optional(),
    userName: z.string().min(2, {message: "Username is required"}).max(8, {message: "User name is too long"}),
    nickName: z.string().min(2, {message: "Nickname is required"}).max(10, {message: "Nick name is too long"}),
    sex: z.enum(["male", "female"], { errorMap: () => ({ message: "Sex is required" }) }),
    languagesSpoken: z.string().regex(/^[A-Za-z,]+$/, { message: "Only A-Z, a-z, and commas are allowed" }),
    languagesWishToLearn: z.string().regex(/^[A-Za-z, ]+$/, { message: "Only A-Z, a-z, and commas are allowed" }),
    birthDate: z.string().optional().refine(
        (val) => {
          if (!val) return true; // Optional, so if not provided, it's valid
    
          const date = new Date(val);
          const today = new Date();
    
          if (!(date instanceof Date) || isNaN(date.getTime()) || val.split("-").length !== 3) {
            return false; // Invalid date format
          }
    
          const age = today.getFullYear() - date.getFullYear();
          const isAtLeast15 = age > 15 || (age === 15 && (today.getMonth() > date.getMonth() || (today.getMonth() === date.getMonth() && today.getDate() >= date.getDate())));
    
          return isAtLeast15;
        },
        { message: "You must be at least 15 years old to register" }
      )
    
})
export const Section2FormSchema = z.object({
    email: z.string().email("Invalid email format").nonempty("Email is required"),
    telegramUsername: z.string().optional().refine((val) => {
        if (!val) return true; // Allow empty value
        return /^[a-zA-Z0-9_]*$/.test(val);
    }, "Only A-Z, a-z, and underscores are allowed"),
    phoneNumber: z.string().optional().refine((val) => {
        if (!val) return true; // Allow empty value
        return /^\+?[0-9\s]*$/.test(val);
    }, "Invalid phone number format"),
    facebookId: z.string().optional().refine((val) => {
        if (!val) return true; // Allow empty value
        return /^\d{15,}$/.test(val);
    }, "Facebook ID must be at least 15 digits"),
    instagramUsername: z.string().optional().refine((val) => {
        if (!val) return true; // Allow empty value
        return /^[a-zA-Z0-9._]*$/.test(val);
    }, "Only A-Z, a-z, periods, and underscores are allowed"),
    vkId: z.string().optional().refine((val) => {
        if (!val) return true; // Allow empty value
        return /^[a-zA-Z0-9._]*$/.test(val);
    }, "Only A-Z, a-z, periods, and underscores are allowed"),
    weChatId: z.string().optional().refine((val) => {
        if (!val) return true; // Allow empty value
        return /^[a-zA-Z0-9_]*$/.test(val);
    }, "Only A-Z, a-z, and underscores are allowed"),
    country: z.string().nonempty("Country is required").refine((val) => {
        if (!val) return true; // Allow empty value
        return /^[A-Za-z\s]+$/.test(val);
    }, "Only letters are allowed"),
    state: z.string().nonempty("State is required").refine((val) => {
        if (!val) return true; // Allow empty value
        return /^[A-Za-z\s]+$/.test(val);
    }, "Only letters are allowed"),
    city: z.string().optional().refine((val) => {
        if (!val) return true; // Allow empty value
        return /^[A-Za-z\s]+$/.test(val);
    }, "Only letters are allowed")
});


export const Section3FormSchema = z.object({
    password: z.string().min(6, {message: "password must be greater than 6 characters"}),
    confirmPassword: z.string().min(1, {message: "You need to re-enter your password"}),
    referalId: z.string().optional()
}).refine(
    (values) => {
        return values.password === values.confirmPassword;
    },
    {
        message: "Passwords must match!",
        path: ["confirmPassword"],
    }
)
export const SignFormSchema = z.object({
    username: z.string().min(1, {message: "username is required"}),
    password: z.string().min(1, {message: "password is required"})
})
export const EditProfileSchema = z.object({
    ...Section1FormSchema.shape,
    ...Section2FormSchema.shape,
    file: z.custom<File[]>(),
    newPassword: z.string().min(5, {message: "password must be greater than 5 characters"}),
    confirmPassword: z.string().min(1, {message: "You need to re-enter your password"}),
})
export const BlogPostSchema = z.object({
    postedBy: z.string().optional(),
    content: z.string().min(3, {message: "You need to provide the content"}), 
    title: z.string().min(2, {message: "title for your post is required"}).max(40, {message: "Title is too long"}),
    image: z.custom<File[]>(),
    references: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    created_at: z.date(),
})
export const VideoBlogSchema = z.object({
    postedBy: z.string().optional(),
    created_at: z.date(),
    title: z.string().min(2, {message: "title for your post is required"}).max(40, {message: "Title is too long"}),
    videoLink: z.string().min(2, {message: "Link is required"}),
    thumbnail: z.custom<File[]>(),
    description:  z.string().min(3, {message: "description is required"}),
    references: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
})
export const CreateBlogCatagorySchema = z.object({
    name: z.string().min(1, {message: "Catagory name is required"}).max(25, {message: "Category name is too long"}),
    parentCatagoryCode1: z.string().min(1, {message: "Parent category code is required"}),
    parentCatagoryCode2: z.string().optional(),
    parentCatagoryCode3: z.string().optional(),
    description: z.string().min(2, {message: "Description is required"}),
    catagories:  z.array(z.string()).optional()
})