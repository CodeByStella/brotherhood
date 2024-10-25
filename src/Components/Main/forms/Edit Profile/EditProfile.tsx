'use client'


import { EditProfileSchema } from "@/lib/validation"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import AvatarUploader from "@/Components/Small Pieces/AvatarUploader"
import { USER } from "@/Components/Main/forms/Registrationform"
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/Components/ui/select"
import { useState } from "react"
import { areObjectsEqual } from "@/utils"
import { Button, DatePicker, message, notification, Spin } from "antd"
import dayjs from "dayjs"
import { Select as AntSelect, Tag } from 'antd'
import languages from '@/constants/languages.json'
import { EditOutlined, SaveOutlined } from '@ant-design/icons'
import { editUserData } from "@/lib/editProfile"
import { uploadFile } from "@/lib/uploadfile"
import { useAuthListener } from "@/lib/persistentSession"
import store from "@/redux/store"
import { USER as StoreUser } from "@/constants";
import { set_current_user } from "@/redux/features/UserSlice"
import { WriteBioModal } from "../../WriteBioModal"
import { error, success } from "@/Components/ui/notification"


interface EditProfileProps {
    userData: USER & { uid?: string }
}

export default function EditProfile({ userData }: EditProfileProps) {


    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [modalVisible, setModalVisible] = useState(false)


    const form = useForm<z.infer<typeof EditProfileSchema>>({
        resolver: zodResolver(EditProfileSchema),
        defaultValues: {
            file: null,
            firstName: userData?.firstName,
            lastName: userData?.lastName,
            userName: userData?.userName,
            sex: userData?.sex,
            birthDate: userData?.birthDate,
            languagesSpoken: userData?.languagesSpoken,
            languagesWishToLearn: userData?.languagesWishToLearn,
            nickName: userData?.nickName,
            phoneNumber: userData?.phoneNumber,
            email: userData?.email,
            instagramUsername: userData?.instagramUsername,
            facebookId: userData?.facebookId,
            weChatId: userData?.weChatId,
            vkId: userData?.vkId,
            telegramUsername: userData?.telegramUsername,
            city: userData?.city,
            newPassword: "",
            confirmPassword: "",
            country: userData?.country,
            state: userData?.state,
            referralId: userData?.referralId
        },
    })
    async function onSubmit(values: z.infer<typeof EditProfileSchema>) {

        let filepath = userData.avatar
        //TODO: Update the user data by making a request to the right end-point
        setIsLoading(true)
        try {
            // console.log(newUserData)
            console.log('======>', values)
            if (values.newPassword && values.newPassword !== values.confirmPassword) {
                return message.error("Passwords don't match. Please check.")
            }
            if (values.file) {
                filepath = await uploadFile(`avatar/${userData?.uid}`, values.file)
            }
            delete values.file
            delete values.confirmPassword


            const { state, msg, data } = await editUserData({ ...values, avatar: filepath ? filepath : '' })

            if (state === 'success') {
                store.dispatch(set_current_user(data as StoreUser))
                success(msg)
            } else if (state === 'info') {
                notification.info({ message: msg, showProgress: true, pauseOnHover: true })
            } else {
                error(msg)
            }


        }
        catch (error: any) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="m-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, (e) => console.log(e, '======> invalid value'))}>
                    <FormField
                        control={form.control}
                        name="file"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <AvatarUploader
                                        firstName={userData?.firstName!}
                                        lastName={userData?.lastName!}
                                        city={userData?.city!}
                                        country={userData?.country!}
                                        fieldchange={field.onChange}
                                        mediaUrl={userData?.avatar} username={userData?.userName!} />
                                </FormControl>
                                <FormMessage className='text-sm text-red-500' />
                            </FormItem>
                        )}
                    />
                    <div className="ml-0">
                        {/* SECTION 1 */}
                        <section className="mt-16">
                            <h2 className="text-xl text-black mb-4 font-semibold"> Personal Information </h2>
                            <div className="editProfileFormContainer">
                                {/* FIRST NAME */}
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem className="formContainer">
                                            <FormLabel className="formLabel">
                                                First Name<span className="astrics"> * </span>
                                            </FormLabel>
                                            <FormControl>
                                                <input type="text" placeholder="First Name" className="formInput" {...field} />
                                            </FormControl>
                                            <FormMessage className='text-sm text-red-500' />
                                        </FormItem>
                                    )}
                                />
                                {/* LAST NAME */}
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem className="formContainer">
                                            <FormLabel className="formLabel">
                                                Last Name
                                            </FormLabel>
                                            <FormControl>
                                                <input type="text" placeholder="Last Name" className="formInput" {...field} />
                                            </FormControl>
                                            <FormMessage className='text-sm text-red-500' />
                                        </FormItem>
                                    )}
                                />
                                {/* USERNAME */}
                                <FormField
                                    control={form.control}
                                    name="userName"
                                    render={({ field }) => (
                                        <FormItem className="formContainer">
                                            <FormLabel className="formLabel">
                                                Username<span className="astrics"> * </span>
                                            </FormLabel>
                                            <FormControl>
                                                <input type="text" placeholder="Username" className="formInput" {...field} />
                                            </FormControl>
                                            <FormMessage className='text-sm text-red-500' />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="editProfileFormContainer">
                                {/* SEX */}
                                <FormField
                                    control={form.control}
                                    name="sex"
                                    render={({ field }) => (
                                        <FormItem className="formContainer">
                                            <FormLabel className="formLabel">
                                                Sex<span className="astrics"> * </span>
                                            </FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl className="focus:border-none focus-visible:outline-none py-4">
                                                    <SelectTrigger {...field} className="bg-button w-full px-3 py-2.5 focus:border-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0">
                                                        <SelectValue placeholder="Select gender" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent >
                                                    <SelectItem value="male"> Male </SelectItem>
                                                    <SelectItem value="female"> Female </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className='text-sm text-red-500' />
                                        </FormItem>
                                    )}
                                />
                                {/* BIRTH DATE  */}
                                <FormField
                                    control={form.control}
                                    name="birthDate"
                                    render={({ field }) => (
                                        <FormItem className="formContainer">
                                            <FormLabel className="formLabel">
                                                Birth Date
                                            </FormLabel>
                                            <FormControl>
                                                <DatePicker className="formInput"
                                                    defaultValue={dayjs(field.value)}
                                                    onChange={(date) => {
                                                        // Convert moment to string format if necessary

                                                        field.onChange(date ? date.format('YYYY-MM-DD') : null);
                                                    }} />
                                            </FormControl>
                                            <FormMessage className='text-sm text-red-500' />
                                        </FormItem>
                                    )}
                                />
                                {/* LANGUAGES SPOKEN */}
                                <FormField
                                    control={form.control}
                                    name="languagesSpoken"
                                    render={({ field }) => (
                                        <FormItem className="formContainer">
                                            <FormLabel className="formLabel">
                                                Languages Spoken<span className="astrics"> * </span>
                                            </FormLabel>
                                            <FormControl>
                                                <AntSelect
                                                    className="bg-button relative"

                                                    variant='filled'
                                                    size="large"
                                                    mode="multiple"
                                                    placeholder="English , French, German"
                                                    maxTagCount={10}
                                                    {...field}
                                                    style={{ width: '100%' }}
                                                    options={languages.map(({ language }) => ({
                                                        value: language,
                                                        label: language,
                                                    }))}
                                                />
                                            </FormControl>
                                            <FormMessage className='text-sm text-red-500' />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="editProfileFormContainer">
                                {/* Nickname */}
                                <FormField
                                    control={form.control}
                                    name="nickName"
                                    render={({ field }) => (
                                        <FormItem className="formContainer">
                                            <FormLabel className="formLabel">
                                                Nick Name<span className="astrics"> * </span>
                                            </FormLabel>
                                            <FormControl>
                                                <input type="text" placeholder="Nickname" className="formInput" {...field} />
                                            </FormControl>
                                            <FormMessage className='text-sm text-red-500' />
                                        </FormItem>
                                    )}
                                />
                                {/* LANGUAGES WISHING TO LEARN  */}
                                <FormField
                                    control={form.control}
                                    name="languagesWishToLearn"
                                    render={({ field }) => (
                                        <FormItem className="formContainer">
                                            <FormLabel className="formLabel">
                                                Languages wishing to learn<span className="astrics"> * </span>
                                            </FormLabel>
                                            <FormControl>
                                                <AntSelect
                                                    className="bg-button relative"

                                                    variant='filled'
                                                    size="large"
                                                    mode="multiple"
                                                    placeholder="English , French, German"
                                                    maxTagCount={10}
                                                    {...field}
                                                    style={{ width: '100%' }}
                                                    options={languages.map(({ language }) => ({
                                                        value: language,
                                                        label: language,
                                                    }))}
                                                />
                                            </FormControl>
                                            <FormMessage className='text-sm text-red-500' />
                                        </FormItem>
                                    )}
                                />
                                <div className="formContainer" ></div>
                            </div>
                        </section>
                        {/* SECTION 2 */}
                        <section className="mt-20">
                            <h2 className="text-xl text-black mb-4 font-semibold"> Contact Information </h2>
                            <div className="editProfileFormContainer">
                                {/* PHONE NUMBER */}
                                <FormField
                                    control={form.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem className="formContainer">
                                            <FormLabel className="formLabel">
                                                Phone Number
                                            </FormLabel>
                                            <FormControl>
                                                <input type="text" placeholder="Phone number" className="formInput" {...field} />
                                            </FormControl>
                                            <FormMessage className='text-sm text-red-500' />
                                        </FormItem>
                                    )}
                                />
                                {/* EMAIL */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="formContainer">
                                            <FormLabel className="formLabel">
                                                Email Address<span className="astrics"> * </span>
                                            </FormLabel>
                                            <FormControl>
                                                <input type="email" placeholder="Email address" className="formInput" {...field} />
                                            </FormControl>
                                            <FormMessage className='text-sm text-red-500' />
                                        </FormItem>
                                    )}
                                />
                                {/* INSTAGRAM USERNAME */}
                                <FormField
                                    control={form.control}
                                    name="instagramUsername"
                                    render={({ field }) => (
                                        <FormItem className="formContainer">
                                            <FormLabel className="formLabel">
                                                Instagram Username
                                            </FormLabel>
                                            <FormControl>
                                                <input type="text" placeholder="Instagram Username" className="formInput" {...field} />
                                            </FormControl>
                                            <FormMessage className='text-sm text-red-500' />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="editProfileFormContainer">
                                {/* FACEBOOK ID */}
                                <FormField
                                    control={form.control}
                                    name="facebookId"
                                    render={({ field }) => (
                                        <FormItem className="formContainer">
                                            <FormLabel className="formLabel">
                                                Facebook Id
                                            </FormLabel>
                                            <FormControl>
                                                <input type="text" placeholder="Facebook Id" className="formInput" {...field} />
                                            </FormControl>
                                            <FormMessage className='text-sm text-red-500' />
                                        </FormItem>
                                    )}
                                />
                                {/* WECHAT ID */}
                                <FormField
                                    control={form.control}
                                    name="weChatId"
                                    render={({ field }) => (
                                        <FormItem className="formContainer">
                                            <FormLabel className="formLabel">
                                                Wechat Id
                                            </FormLabel>
                                            <FormControl>
                                                <input type="text" placeholder="Wechat Id" className="formInput" {...field} />
                                            </FormControl>
                                            <FormMessage className='text-sm text-red-500' />
                                        </FormItem>
                                    )}
                                />
                                {/* VK ID */}
                                <FormField
                                    control={form.control}
                                    name="vkId"
                                    render={({ field }) => (
                                        <FormItem className="formContainer">
                                            <FormLabel className="formLabel">
                                                Vk Id
                                            </FormLabel>
                                            <FormControl>
                                                <input type="text" placeholder="Vk Id" className="formInput" {...field} />
                                            </FormControl>
                                            <FormMessage className='text-sm text-red-500' />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="editProfileFormContainer">
                                {/* TELEGRAM USERNAME */}
                                <FormField
                                    control={form.control}
                                    name="telegramUsername"
                                    render={({ field }) => (
                                        <FormItem className="formContainer">
                                            <FormLabel className="formLabel">
                                                Telegram Username
                                            </FormLabel>
                                            <FormControl>
                                                <input type="text" placeholder="Telegram username" className="formInput" {...field} />
                                            </FormControl>
                                            <FormMessage className='text-sm text-red-500' />
                                        </FormItem>
                                    )}
                                />
                                {/* COUNTRY */}
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem className="formContainer">
                                            <FormLabel className="formLabel">
                                                Country<span className="astrics"> * </span>
                                            </FormLabel>
                                            <FormControl>
                                                <input type="text" placeholder="Country" className="formInput" {...field} />
                                            </FormControl>
                                            <FormMessage className='text-sm text-red-500' />
                                        </FormItem>
                                    )}
                                />
                                {/* CITY */}
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem className="formContainer">
                                            <FormLabel className="formLabel">
                                                City
                                            </FormLabel>
                                            <FormControl>
                                                <input type="text" placeholder="City" className="formInput" {...field} />
                                            </FormControl>
                                            <FormMessage className='text-sm text-red-500' />
                                        </FormItem>
                                    )}
                                />

                            </div>  <div className="editProfileFormContainer">
                                {/* state */}
                                <FormField
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem className="formContainer">
                                            <FormLabel className="formLabel">
                                                State<span className="astrics"> * </span>
                                            </FormLabel>
                                            <FormControl>
                                                <input type="text" placeholder="City" className="formInput" {...field} />
                                            </FormControl>
                                            <FormMessage className='text-sm text-red-500' />
                                        </FormItem>
                                    )}
                                />
                                <div className="formContainer" ></div>
                                <div className="formContainer" ></div>
                            </div>
                        </section>
                        <section className="mt-14">
                            <h2 className="text-xl text-black mb-4 font-semibold"> Account Information</h2>
                            <div className="editProfileFormContainer">
                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem className="formContainer">
                                            <FormLabel className="formLabel">
                                                New Password
                                            </FormLabel>
                                            <FormControl>
                                                <input type="password" placeholder="**********" className="formInput" {...field} />
                                            </FormControl>
                                            <FormMessage className='text-sm text-red-500' />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem className="formContainer">
                                            <FormLabel className="formLabel">
                                                Confirm Password
                                            </FormLabel>
                                            <FormControl>
                                                <input type="password" placeholder="**********" className="formInput" {...field} />
                                            </FormControl>
                                            <FormMessage className='text-sm text-red-500' />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="referralId"
                                    render={({ field }) => (
                                        <FormItem className="formContainer">
                                            <FormLabel className="formLabel">
                                                Referral Id
                                            </FormLabel>
                                            <FormControl>
                                                <input type="text" placeholder="Referral id" className="formInput" {...field} />
                                            </FormControl>
                                            <FormMessage className='text-sm text-red-500' />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </section>
                    </div>
                    <div className="flex flex-wrap justify-center mt-20 gap-4">
                        <Button size="large" onClick={() => setModalVisible(true)} className="w-full  min-[400px]:w-auto transition " htmlType="button" type="dashed" icon={<EditOutlined />} >
                            Write my bio </Button>
                        <Button size="large" htmlType="submit" type="primary" loading={isLoading} className="w-full  min-[400px]:w-auto" icon={<SaveOutlined />} >
                            Save changes </Button>
                    </div>
                </form>
            </Form>
            <WriteBioModal visible={modalVisible} setVisible={setModalVisible} />
        </section>
    )
}
