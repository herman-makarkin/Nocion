import React from 'react'
import ApplicationLogo from './ApplicationLogo'
import { Button } from '@headlessui/react'

const Footer = () => {
    return (
        <div className='flex items-center w-full p-6 bg-background z-50'>
            <ApplicationLogo className="size-16 hidden md:block" />
            <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
                <Button variant="ghost" size="sm">Privacy Policy</Button>
                <Button variant="ghost" size="sm" className="ms-6">Terms & Conditions</Button>
            </div>
        </div>
    )
}

export default Footer
