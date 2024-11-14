import React from 'react'
import hasScrolled from '@/Hooks/hasScrolled'
import { cn } from '@/lib/utils';

const Navbar = () => {
    const scrolled = hasScrolled();
    return (
        <ul className={cn("z-50 bg-background fixed top-0 flex items-center w-full p-6", scrolled && "border-b shadow-sm")}>
            <li>Navbar</li>

        </ul>
    )
}

export default Navbar
