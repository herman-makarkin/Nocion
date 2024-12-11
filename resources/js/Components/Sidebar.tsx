import { ChevronsLeft, FileIcon, MenuIcon, PlusCircleIcon, PlusIcon, Search, Settings, Trash2 } from 'lucide-react'
import React, { ElementRef, useRef, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts';
import { cn } from '@/lib/utils';
import UserItem from './UserItem';
import Item from './Item';
import { useForm } from '@inertiajs/react';
import { data, Note } from '@/types';
import NoteList from '@/Components/NoteList'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { usePage } from '@inertiajs/react';
import TrashBox from './TrashBox';
import { useSearch } from '@/Hooks/search';
import { useSettings } from '@/Hooks/settings'
import NavComponent from './NavComponent';

interface FormProps {
    title: string;
}

const Sidebar = () => {
    const search = useSearch();
    const settings = useSettings();
    const notes: Note[] = usePage().props.notes;
    if (notes === null || notes === undefined) return;
    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);


    const isMobile = useMediaQuery("(max-width: 768px)");


    const { data, setData, post, errors } = useForm<FormProps>({
        title: 'Untitled',
    })

    const onSubmit = () => {
        post(route('dashboard.store'));
    }

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();

        isResizingRef.current = true;
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }

    const onMouseMove = (e: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = e.clientX;

        if (newWidth < 250) newWidth = 250;
        if (newWidth > 500) newWidth = 500;

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`)
            navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`)
        }
    }

    const onMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("mouseup", onMouseUp)
    }

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {

            setIsCollapsed(false);
            setIsResetting(true);

            sidebarRef.current.style.width = isMobile ? "100%" : "250px";
            navbarRef.current.style.setProperty('width', isMobile ? "0" : "calc(100% - 250px)")

            navbarRef.current.style.setProperty("left", isMobile ? "100%" : "250px");
            setTimeout(() => setIsResetting(false), 300);
        }

    }

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);

            sidebarRef.current.style.width = "0";
            navbarRef.current.style.setProperty("width", "100%")
            navbarRef.current.style.setProperty("left", "0")
            setTimeout(() => setIsResetting(false), 300)

        }
    }

    return (
        <>
            <aside ref={sidebarRef} className={cn('group/sidebar h-screen bg-secondary overflow-y-auto relative w-60 z-[99999]', isResetting && "transition-all ease-in-out duration-300", isMobile && "w-0")}>
                <div
                    role='button'
                    onClick={collapse}
                    className={cn('h-6 w-6 text-muted-foreground rounded-sm hover:bg:neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition', isMobile && "opacity-100")}>
                    <ChevronsLeft className='h-6 w-6'></ChevronsLeft>
                </div>
                <div className=''>
                    <UserItem></UserItem>
                </div>
                <div className="mt-4">
                    <Item onClick={search.onOpen} icon={Search} label='Search' isSearch />
                    <Item onClick={settings.onOpen} icon={Settings} label='Settings' />
                    <Item onClick={e => onSubmit()} icon={PlusCircleIcon} label='New Note' />
                </div>
                <div className="mt-4">
                    <NoteList notes={notes} />
                    <Item onClick={e => onSubmit()} icon={PlusIcon} label='New Note' />
                    {/* <Popover> */}
                    {/*     <PopoverTrigger className='w-full mt-4'> */}
                    {/*         <div style={{ paddingLeft: '12px' }} role='button' className={cn("group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium", false && "bg-primary/5 text-primary")}> */}
                    {/*             <Trash2 className='shrink-0 h-[18px] mr-2 text-muted-foreground' /> */}
                    {/*             <span className='truncate'>Trash</span> */}
                    {/*         </div> */}
                    {/*     </PopoverTrigger> */}
                    {/*     <PopoverContent className='p-0 w-72' */}
                    {/*         side={isMobile ? 'bottom' : 'right'}> */}
                    {/*         <TrashBox /> */}
                    {/*     </PopoverContent> */}
                    {/* </Popover> */}
                </div>
                <div onMouseDown={onMouseDown} onClick={resetWidth} className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"></div>
            </aside>
            <div
                ref={navbarRef}
                className={cn('absolute top-0 z-100  w-[calc(100%-240px)]', isResetting && 'transition-all ease-in-out duration-300', isMobile && 'w-full left-0')}>

                {!!usePage().props.note ? (
                    <NavComponent isCollapsed={isCollapsed} isMobile={isMobile} onResetWidth={resetWidth} />
                ) : (
                    <nav className='bg-transparent px-3 py-2 w-full'>
                        {isCollapsed && <MenuIcon role='button' onClick={resetWidth} className='h-6 w-6 text-muted-foreground'></MenuIcon>}
                    </nav>
                )}

            </div>
        </>
    )
}

export default Sidebar
