import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='flex flex-1 items-center justify-center min-h-screen'>
            <div className='flex flex-col justify-start'>
                <p className='text-2xl text-black font-medium'>Could not find requested resource 😔</p>
                <Link href="/" className='mt-5 text-base text-blue-600 font-semibold'>Return Home</Link>
            </div>
        </div>
    )
}