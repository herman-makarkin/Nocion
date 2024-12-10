import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import Navbar from '@/Components/Navbar';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Sidebar from '@/Components/Sidebar';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { data } from '@/types';
import { SearchComponent } from '@/Components/SearchComponent';
import { SettingsComponent } from '@/Components/Settings';
import { useTheme } from '@/Hooks/theme';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CoverImage } from '@/Components/CoverImage';

export default function Authenticated({
    sidebar,
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }> & { sidebar: data }) {
    const user = usePage().props.auth.user;
    const theme = useTheme();

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className={cn("min-h-screen bg-background dark:bg-gray-900 flex relative", theme.isDark && 'dark')}>
            <Sidebar />
            <main className='w-full'>
                {children}
                <SearchComponent />
                <SettingsComponent />
                <CoverImage />
            </main>
        </div >
    );
}
