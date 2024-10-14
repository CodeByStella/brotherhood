'use client'

import { useCallback, useEffect, useState } from "react"
import { FileWithPath, useDropzone } from 'react-dropzone'
import Avatar from "./Avatar";

interface AvatarUploaderProps{
    fieldchange: (FILES: File[]) => void;
    mediaUrl: string,
    firstName: string,
    lastName: string,
    country: string,
    username: string,
    city: string
}

export default function AvatarUploader({fieldchange, mediaUrl, firstName, lastName, username, country, city}: AvatarUploaderProps) {
    const [file, setFile] = useState<File[]>([])
    const [fileUrl , setFileUrl] = useState(mediaUrl)
    const [isImageSelected, setIsImageSelected] = useState<boolean>(false)
    // when the user drags and drops, onDrop will be excuted
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        // set the file state to dropped file
        setFile(acceptedFiles)
        fieldchange(acceptedFiles)
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    }, [fieldchange])

    const {getRootProps, getInputProps} = useDropzone({onDrop, accept: {
        'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp']
    }})

    useEffect(() => {
        if(file.length > 0){
            setIsImageSelected(true)
        }
    }, [file])

    return (
        <div className="flex items-start max-sm:gap-6 sm:gap-10">
            {isImageSelected ? (
                <img {...getRootProps()} src={fileUrl}  alt='profile-image' className='w-20 h-20 rounded-full cursor-pointer focus:outline-none' />
            ) : <Avatar width="w-[75px]" height="h-[75px]" iconWidth="w-[45px]" iconHeight="h-[35px]" />}
            <div className="flex flex-col justify-start gap-4">
                <h2 className="text-2xl text-black font-semibold"> {firstName} {lastName}</h2>
                <p className="text-sm text-stone-500"> @{username} </p>
                <p className="text-sm text-stone-500"> {city} , {country} </p>
                <button {...getRootProps()} className="bg-orangeRed mt-3 px-3 py-2 text-white text-sm rounded-md"> Change Avatar </button>
            </div>
            <input {...getInputProps()} className='cursor-pointer ' />
        </div>
    )
}