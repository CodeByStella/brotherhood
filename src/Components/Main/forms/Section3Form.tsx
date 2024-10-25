"use client"

import { Section3FormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form"
import { USER } from "./Registrationform";
// import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { Button, Checkbox, message, notification } from "antd";
import { Register } from "@/lib/authentification";
import { useRouter, useSearchParams } from "next/navigation";
import { error, success } from "@/Components/ui/notification";

interface Section3FormProps {
    userData: USER | undefined,
    setFilledSection: React.Dispatch<React.SetStateAction<number[]>>,
    setCurrentlySelected: React.Dispatch<React.SetStateAction<number>>
}

export default function Section3Form({ userData, setCurrentlySelected, setFilledSection }: Section3FormProps) {

    const [acceptedTos, setAcceptedTos] = useState<boolean>(false)
    const [isLoading, setLoading] = useState(false)
    const { push, replace } = useRouter()
    const searchParams = useSearchParams()

    const form = useForm<z.infer<typeof Section3FormSchema>>({
        resolver: zodResolver(Section3FormSchema),
        defaultValues: {
            password: userData?.password || "",
            confirmPassword: userData?.confirmPassword || "",
            referralId: userData?.referralId || searchParams.get("referral") || ''
        },
    })

    function handleBack() {
        push("#main")
        setFilledSection((filledSections) => filledSections.filter((index) => index !== 3))
        setCurrentlySelected(2)
    }

    async function onSubmit(values: z.infer<typeof Section3FormSchema>) {
        if (!acceptedTos) {
            message.error("Please accept the terms and conditions")
            return
        }
        // We finally collected all the form data as one
        const finalData = {
            ...userData,
            password: values.password,
            confirmPassword: values.confirmPassword,
            referralId: values.referralId
        }
        setLoading(true)
        const { state, msg } = await Register(finalData)
        console.log({ state, msg })
        if (state === 'success') {
            success(msg)
            replace('/sign-in')
        } else {
            error(msg)
        }

        setLoading(false)
        // TODO: Make an HTTP request to Register the user
    }

    return (
        <section className='registrationFormContainer'>
            <h2 className="text-navy text-xl text-center font-semibold max-sm:pr-6"> Account Information </h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-3 mt-14">
                    <div className="flex flex-col gap-3">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="formContainer">
                                    <FormLabel className="formLabel">
                                        Password
                                        <span className="astrics"> * </span>
                                    </FormLabel>
                                    <FormControl>
                                        <input type="password" placeholder="*************" className="formInput" {...field} />
                                    </FormControl>
                                    <FormMessage className='text-sm text-red-500' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className="formContainer mt-6">
                                    <FormLabel className="formLabel">
                                        Confirm Password
                                        <span className="astrics"> * </span>
                                    </FormLabel>
                                    <FormControl>
                                        <input type="password" placeholder="*************" className="formInput" {...field} />
                                    </FormControl>
                                    <FormMessage className='text-sm text-red-500' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="referralId"
                            render={({ field }) => (
                                <FormItem className="formContainer mt-6">
                                    <FormLabel className="formLabel">
                                        Referal Id
                                    </FormLabel>
                                    <FormControl>
                                        <input type="text" placeholder="Referal Id" className="formInput" {...field} />
                                    </FormControl>
                                    <FormMessage className='text-sm text-red-500' />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-start gap-6 mt-8">
                            <Checkbox onChange={(e) => setAcceptedTos(e.target.checked)} className=" text-navy w-5 h-5 mt-1" />
                            <p className="text-base max-sm:w-[200px] sm:w-[250px] md:w-[300px] xl:w-[360px] pr-3"> I have read and accepted <Link target="_blank" href={"/terms-and-conditions"} className="text-blue-600 mx-1"> the terms and conditions </Link> of this community </p>
                        </div>
                    </div>
                    <div className="mt-10 xl:px-20 flex items-center justify-center max-sm:gap-10 sm:gap-28">
                        <div>
                            <Button size="large" disabled={isLoading} onClick={handleBack} className="formBackButton">
                                Back
                            </Button>
                        </div>
                        <div>
                            <Button loading={isLoading} htmlType="submit" size="large" type='primary' className="formNextButton">
                                Done
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </section>
    )
}
