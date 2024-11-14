import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
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


            <Button>
                Enter Nocion
                <ArrowRight />
            </Button>
        </div>
    )
}

export default Heading
