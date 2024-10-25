'use client'

import Pagination from "@/Components/Main/Pagination";
// import Table from "@/Components/Main/Tabel"
import TopPageHeader from "@/Components/Small Pieces/TopPageHeader";
import { sendInvitation } from "@/lib/email";
import { RootState } from "@/redux/store";
import { isValidEmail } from "@/utils";
import { CopyOutlined } from "@ant-design/icons";
import { Button, Input, message, Space, Table } from "antd";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const { Search } = Input

export default function page() {
    const { data } = useSelector((state: RootState) => state.user)    
    const [originalUrl, setOriginalUrl] = useState('')
    const [email, setEmail] = useState('')
    const [errorText, setErrorText] = useState('')

    useEffect(() => {
        if (!!window) {
            setOriginalUrl(window.location.origin)
        }
    }, [])

    const onCopy = (value: string | undefined) => {
        if (!value) return message.error('Faild to copy')
        navigator.clipboard.writeText(value).then(() => {
            message.success('Copied to clipboard!')
        }).catch(err => {
            message.error('Faild to copy')
        });




    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        if (!isValidEmail(e.target.value)) {
            setErrorText('Email is not valid')
        } else {
            setErrorText('')
        }
    }
    const handleSend = async () => {
        if (isValidEmail(email)) {
            await sendInvitation(email, `${originalUrl}/register?referral=${data?.userName}`)
        } else {
            message.error('Email is not valid!')
        }
    }


    useEffect(()=>{

    },[])

    return (
        <main className="max-md:px-5 md:px-7 xl:px-20 mb-28">
            <TopPageHeader pageCode="PG32" pageName="My Referals Page" pageDescription="Those who register under your referal will be recoreded here" />
            <div className="mt-5 flex  flex-col  md:flex-row  gap-2"  >
                <Search className=" basis-1/4 " addonBefore="My id" value={`@${data?.userName}`} placeholder="Referral Id" enterButton={<CopyOutlined />} onSearch={() => onCopy(data?.userName)} />
                <Search className=" basis-1/2 " addonBefore="Invite link" value={`${originalUrl}/register?referral=${data?.userName}`} placeholder="Invitation Link" enterButton={<CopyOutlined />} onSearch={() => onCopy(`${originalUrl}/register?referral=${data?.userName}`)} />
                <span className=" basis-1/4 ">
                    <Search value={email} onChange={handleChange} placeholder="Input gmail address" enterButton={'Invite'} onSearch={handleSend} />
                    <span className="text-red-500 text-sm pl-1"  >{errorText}</span>
                </span>
            </div>
            {/* <Table referals={Referals} /> */}
            {/* <Pagination TotalNumberOfResults={12} pageSize={10} /> */}
            <Table
                bordered
                columns={[
                {
                    title:'S/N' ,
                    dataIndex:'rank',
                    key:'rank',
                    align:'center'
                },
                {
                    title:'Name' ,
                    dataIndex:'name',
                    key:'name',
                    align:'center'
                },
                {
                    title:'Joined Date' ,
                    dataIndex:'date',
                    key:'date',
                    align:'center'
                },
                {
                    title:'Country' ,
                    dataIndex:'country',
                    key:'contry',
                    align:'center'
                }
            ]}  />
        </main>
    )
}
