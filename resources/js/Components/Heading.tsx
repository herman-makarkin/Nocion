import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { Link } from '@inertiajs/react'
import React from 'react'

const Heading = () => {
    return (
        <div className='space-y-4 max-w-3xl'>
            <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
                Welcome to my Incredible clone of Notion
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Nocion is a connected workspace where you can do your job as effectively as humanly possible
            </h3>


            <Link className='

inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2


                ' href={route('register')}>
                Enter Nocion
                <ArrowRight />
            </Link>
        </div>
    )
}

export default Heading
