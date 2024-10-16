'use client'

import FormRow from "@/Components/Small Pieces/FormRow"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/Components/ui/select"
import { USER } from "@/Components/Main/forms/Registrationform"
import { Section1FormSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Button, DatePicker } from "antd"
import languages from '@/constants/languages.json'
import { Select as AntSelect } from 'antd'

export interface GeneralSectionsFormProps {
    userData: USER | undefined
    setUserData: React.Dispatch<React.SetStateAction<USER | undefined>>
    setFilledSection: React.Dispatch<React.SetStateAction<number[]>>,
    setCurrentlySelected: React.Dispatch<React.SetStateAction<number>>
}

export default function Section1Form({ userData, setUserData, setFilledSection, setCurrentlySelected }: GeneralSectionsFormProps) {
    const { push } = useRouter()


    const form = useForm<z.infer<typeof Section1FormSchema>>({
        resolver: zodResolver(Section1FormSchema),
        defaultValues: {
            firstName: userData?.firstName || "",
            lastName: userData?.lastName || "",
            userName: userData?.userName || "",
            nickName: userData?.nickName || "",
            sex: userData?.sex || undefined,
            languagesSpoken: userData?.languagesSpoken,
            languagesWishToLearn: userData?.languagesWishToLearn,
            birthDate: userData?.birthDate || ""
        },
    })

    function onSubmit(values: z.infer<typeof Section1FormSchema>) {




        setUserData({
            ...userData,
            firstName: values.firstName,
            lastName: values.lastName,
            userName: values.userName,
            nickName: values.nickName,
            sex: values.sex,
            languagesSpoken: values.languagesSpoken,
            languagesWishToLearn: values.languagesWishToLearn,
            birthDate: values.birthDate
        })
        setFilledSection((filledSections) => [...filledSections, 2])
        setCurrentlySelected(2)
        push("#main")
    }

    return (
        <section className='registrationFormContainer'>
            <h2 className="text-navy text-xl text-center font-semibold"> Personal Information </h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="registrationForm">
                    <FormRow fieldname1="firstName" fieldname2="lastName" control={form.control} label1="First Name" label2="Last Name" inputType1="text" inputType2="text" placeholder1="Smith" placeholder2="Sand" needTopMargin={false} optional2={true} />
                    <FormRow fieldname1="nickName" fieldname2="userName" control={form.control} label1="Nickname" label2="Username" inputType1="text" inputType2="text" placeholder1="sagu" placeholder2="Sadusmith23" />
                    <div className="formRow mt-6">
                        {/* SEX */}
                        <FormField
                            control={form.control}
                            name="sex"
                            render={({ field }) => (
                                <FormItem className="formContainer xl:mt-6">
                                    <FormLabel className="formLabel">
                                        Sex
                                        <span className="astrics"> * </span>
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl className="focus:border-none focus-visible:outline-none py-4 ">
                                            <SelectTrigger {...field} className="bg-button px-3 py-2.5 border-none focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-button focus:ring-0">
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
                        {/* LANGUAGES SPOKEN */}
                        <FormField
                            control={form.control}
                            name="languagesSpoken"
                            render={({ field }) => (
                                <FormItem className="formContainer xl:mt-6">
                                    <FormLabel className="formLabel">
                                        Languages Spoken
                                        <span className="astrics"> * </span>
                                    </FormLabel>
                                    <FormControl>
                                        <div className="flex flex-col justify-start gap-2">
                                            <AntSelect
                                                // className="mt-8"
                                                variant='filled'
                                                size="large"
                                                mode="multiple"
                                                placeholder="English , French, German"
                                                {...field}
                                                style={{ width: '100%' }}
                                                options={languages.map(({ language }) => ({
                                                    value: language,
                                                    label: language,
                                                }))}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage className='text-sm text-red-500' />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="formRow mt-6">
                        {/* LANGUAGES WISHING TO LEARN  */}
                        <FormField
                            control={form.control}
                            name="languagesWishToLearn"
                            render={({ field }) => (
                                <FormItem className="formContainer  xl:mt-6">
                                    <FormLabel className="formLabel">
                                        Languages wishing to learn
                                        <span className="astrics"> * </span>
                                    </FormLabel>
                                    <FormControl>
                                        <div className="flex flex-col justify-start gap-2">
                                            <AntSelect
                                                className=" relative"
                                                variant='filled'
                                                size="large"
                                                mode="multiple"
                                                placeholder="English , French, German"
                                                {...field}
                                                style={{ width: '100%' }}
                                                options={languages.map(({ language }) => ({
                                                    value: language,
                                                    label: language,
                                                }))}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage className='text-sm text-red-500' />
                                </FormItem>
                            )}
                        />
                        {/* BIRTH DATE  */}
                        <FormField
                            control={form.control}
                            name="birthDate"
                            render={({ field }) => (
                                <FormItem className="formContainer xl:mt-7">
                                    <FormLabel className="formLabel">
                                        Birthdate
                                    </FormLabel>
                                    <FormControl>
                                        {/* <input type="date" className="formInput" {...field} /> */}
                                        <DatePicker className="formInput"
                                            onChange={(date) => {
                                                // Convert moment to string format if necessary
                                                field.onChange(date ? date.format('YYYY-MM-DD') : null);
                                            }} />
                                    </FormControl>
                                    <FormMessage className='text-sm text-red-500' />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mt-14 max-sm:w-[260px] sm:w-[300px] md:w-[350px] lg:w-[380px] xl:w-full flex justify-end">
                        <Button type="primary" size="large" htmlType="submit" className="formNextButton"> Next </Button>
                    </div>
                </form>
            </Form>
        </section>
    )
}
