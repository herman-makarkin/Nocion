import React from 'react'
import hasScrolled from '@/Hooks/hasScrolled'
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import ApplicationLogo from './ApplicationLogo';
//import usePage from '@inertiajs/react';

const Navbar = () => {
    const scrolled = hasScrolled();
    //const user = usePage().props.auth.user;
    return (
        <ul className={cn("flex justify-between z-50 bg-background fixed top-0 left-0 flex items-center w-full p-6", scrolled && "border-b shadow-sm")}>

            <div className="flex shrink-0 items-center">
                <Link href="/">
                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                </Link>
            </div>
            <Link href={route('login')}>Login</Link>
        </ul>
    )
}

export default Navbar
