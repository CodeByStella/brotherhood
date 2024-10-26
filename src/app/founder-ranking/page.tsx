'use client'
import TopPageHeader from "@/Components/Small Pieces/TopPageHeader";
import { DataType, getFounders } from "@/lib/founders-ranking";
import { Table } from "antd";
import { useEffect, useState } from "react";

interface FounderRankingProps {
    searchParams: {
        page: string
    }
}

export default function page({searchParams} : FounderRankingProps) {
    const [dataSource,setDataSource]=useState<DataType[]>([])

    useEffect(()=>{
        getFounders().then(res=>{
            setDataSource(res||[])
        }).catch(err=>console.log(err))
    },[])

    return (
        <main className="max-md:px-5 md:px-7 xl:px-20">
            <TopPageHeader pageCode="PG32" pageName="Founder ranking page" pageDescription="Members who register for the first 3 months or the first 1000 members get." />
            <Table
                bordered
                columns={[
                {
                    title:'S/N' ,
                    key:'rank',
                    align:'center',
                    dataIndex:'rank'
                },
                {
                    title:'Name' ,
                    dataIndex:'founderName',
                    key:'name',
                    align:'center'
                },
                {
                    title:'Joined Date' ,
                    dataIndex:'createdAt',
                    key:'date',
                    align:'center',
                    render:(value)=> {
                        return <>{new Date(value).toDateString()}</>
                    },
                },
                {
                    title:'Country' ,
                    dataIndex:'country',
                    key:'contry',
                    align:'center'
                }
            ]}
            rowKey={(record)=>record.rank} 
            dataSource={dataSource} />
        </main>
    )
}
