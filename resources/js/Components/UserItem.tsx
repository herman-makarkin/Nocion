import React from 'react'
import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { AvatarImage, Avatar } from '@/components/ui/avatar';
import { ChevronsLeftRight, UserRound } from 'lucide-react';

const UserItem = () => {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center text-sm p-3 w-full hover:bg-primary/5" role='button'>

                    <div className="gap-x-2 flex items-center max-w-[150px]">
                        {user.avatar ? (
                            <Avatar className='h-10 w-10'>

                                <AvatarImage src={user.name}></AvatarImage>
                            </Avatar>
                        ) : (
                            <UserRound className='h-5 w-5' />
                        )}
                        <span>
                            {user?.name}
                        </span>
                    </div>
                    <ChevronsLeftRight className='rotate-90 ml-2'></ChevronsLeftRight>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align='start' alignOffset={10} forceMount>
                <div className="flex flex-col space-y-4 p-2">
                    <p className="text-xs font-medium leading-none text-muted-foreground">
                        {user?.email}
                    </p>
                </div>
                <div className="p-2">
                    <Link
                        href={route('profile.edit')}
                    >
                        Profile
                    </Link></div>
                <div className="p-2">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                    >
                        Log Out
                    </Link></div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserItem
