'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form"
import { SignFormSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, notification, Spin } from "antd"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import store from "@/redux/store"
import { set_current_user } from "@/redux/features/UserSlice"
import { useRouter } from "next/navigation"
import { Login, resetPassWord } from "@/lib/authentification"
import { error, success } from "@/Components/ui/notification"

export default function Signinform() {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [identifier, setIdentifier] = useState('')
    const { replace } = useRouter()

    const form = useForm<z.infer<typeof SignFormSchema>>({
        resolver: zodResolver(SignFormSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof SignFormSchema>) {
        //TODO: Make an HTTP request to sign in the user
        setIsLoading(true)
        const { msg, state, data = null } = await Login(values.username, values.password)
        console.log({ msg, state, data })

        setIsLoading(false)
        if (state === 'success') {
            success(msg)
            store.dispatch(set_current_user(data))
            replace('/')
        } else {
            if (msg === 'Email not verified. Please verify.') {
                notification.error({ message: msg, showProgress: true, pauseOnHover: true, description: 'Verification email sent. Please check your inbox.' })
            }
            else error(msg)
        }


    }
    const resetpassword = async () => {
        if (identifier === '') return
        const { state, msg } = await resetPassWord(identifier)
        if (state === 'success') success(msg)
        if (state === 'error') error(msg)
    }

    return (
        <section className="mainContainer">
            <h2 className="text-2xl text-black text-center font-semibold mt-10"> Welcome Back! </h2>
            <p className="mt-3 max-sm:ml-4 sm:ml-8 md:ml-14 lg:ml-20 w-[250px] max-sm:text-sm sm:text-base text-center leading-6"> Becoming a Member is Just a Few Steps away. Register Now </p>
            <div className="mt-10 ml-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="formContainer">
                                    <FormLabel className="formLabel">
                                        Username or email
                                    </FormLabel>
                                    <FormControl>
                                        <input type="text" placeholder="SandSmith" onChange={e => {
                                            setIdentifier(e.target.value)
                                            field.onChange(e)
                                        }} value={field.value} disabled={isLoading} className="formInput" />
                                    </FormControl>
                                    <FormMessage className='text-sm text-red-500' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="formContainer mt-7">
                                    <FormLabel className="formLabel">
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <input type="password" disabled={isLoading} placeholder="Enter Password" className="formInput" {...field} />
                                    </FormControl>
                                    <FormMessage className='text-sm text-red-500' />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end mt-6">
                            <Button type="link" onClick={e => resetpassword()} className="text-sm text-navy font-semibold max-sm:pr-2"> Forgot password ? </Button>
                        </div>
                        <Button htmlType="submit" type="primary" size="large" className=" w-full mt-7 " loading={isLoading} >
                            SIGN IN
                        </Button>
                        <div className="flex items-center justify-center gap-2 mt-8">
                            <p className="text-sm font-medium"> Don't have an account ? </p>
                            <Link href="/register" className="text-sm text-navy font-semibold"> Sign up</Link>
                        </div>
                    </form>
                </Form>
            </div>
        </section>
    )
}
