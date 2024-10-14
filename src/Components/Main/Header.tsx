import React from 'react'
import Carousel from './Carousel'
import { Slides } from '@/constants'

export default function Header() {
    return (
        <header className='flex items-center justify-center max-md:mt-10 mt-8'>
            <div className='max-w-[1175px] max-h-[620px]'>
                <Carousel slides={Slides} />
            </div>
        </header>
    )
}
