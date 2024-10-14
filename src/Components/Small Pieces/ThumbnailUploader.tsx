'use client'

import Image from "next/image";
import { useCallback, useEffect, useState } from "react"
import { FileWithPath, useDropzone } from 'react-dropzone'
import { CiImageOn } from "react-icons/ci";

interface ThumbnailUploaderProps{
    fieldchange: (FILES: File[]) => void;
    title: string,
    mediaUrl: string,
}

export default function ThumbnailUploader({fieldchange, title, mediaUrl}: ThumbnailUploaderProps) {
    const [file, setFile] = useState<File[]>([])
    const [fileUrl , setFileUrl] = useState(mediaUrl)
    const [isImageSelected, setIsImageSelected] = useState<boolean>(false)

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
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
        <div className="flex flex-col justify-start gap-6 max-sm:mt-14 mt-10">
            <h3 className="text-xl text-black font-semibold mb-3"> {title} </h3>
            {isImageSelected ? (
                <Image {...getRootProps()} src={fileUrl}  alt='tumbnail-image' width={200} height={100} className='cursor-pointer focus:outline-none' />
            ) : 
            <div {...getRootProps()} className="w-[200px] h-[100px] rounded-md hover:cursor-pointer  focus:outline-none focus:border-none flex items-center justify-center">
                    <CiImageOn className="w-20 h-20 text-black" />
                </div>
            }
            <div className="mt-6">
                <button type="button" {...getRootProps()} className="bg-navy px-6 py-2.5 text-white max-sm:text-sm text-base rounded-md"> Upload / Change Featured Image </button>
            </div>
            <input {...getInputProps()} className='cursor-pointer ' />
        </div>
    )
}