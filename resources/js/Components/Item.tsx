import { Plus, Trash2, ChevronDown, ChevronRight, Icon, LucideIcon } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { Link, router, usePage } from '@inertiajs/react'
import { useForm } from '@inertiajs/react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent } from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'


type Item = {
    label: string,
    onClick?: () => void,
    level?: number,
    isSearch?: boolean,
    icon: LucideIcon,
    noteIcon?: string,
    active?: boolean,
    id?: number,
    expanded?: boolean
    href?: string,
    onExpand?: () => void,
    chevron: boolean,
}

interface FormProps {
    image: File | undefined;
    title: string;
    icon: File | undefined;
    parent_id: number;
}

const Item = ({
    label,
    id = 0,
    onClick = () => { },
    icon: Icon,
    noteIcon,
    isSearch,
    level,
    active,
    expanded,
    href = '',
    chevron = false,
    onExpand = () => { },
}: Item) => {
    const ChevronIcon = expanded ? ChevronDown : ChevronRight
    console.log(expanded);

    const handleExpand = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        onExpand?.();
    }

    const { data, setData, post, errors } = useForm<FormProps>({
        image: undefined,
        title: 'New Note',
        icon: undefined,
        parent_id: id,
    })

    function click(e) {
        e.preventDefault();
        e.stopPropagation();
        onClick();
    }

    const onCreate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!id) return;

        e.preventDefault();
        post(route('dashboard.store'));
    }

    const removeNote = () => {
        if (window.confirm('Are you sure you want to remove this note?')) {
            const message = router.delete(route('dashboard.destroy', id));
        }
        return;
    };

    return (
        <div key={id} onClick={click} style={{ paddingLeft: level ? `${level * 12 + 12}px` : '12px' }} role='button' className={cn("group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium", active && "bg-primary/5 text-primary")}>
            {(!!id && chevron) && (
                <div onClick={handleExpand} className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1" role='button'>
                    <ChevronIcon className='shrink-0 h-[18px] mr-2 text-muted-foreground' />
                </div>
            )}

            {/* <Link href={href} className="flex items-center"> */}

            {noteIcon ? (
                <div className="shrink-0 mr-2 text-[18px]">
                    {noteIcon}
                </div>
            ) : (
                <Icon className='shrink-0 h-[18px] mr-2 text-muted-foreground' />
            )}


            <span className='truncate'>{label}</span>
            {isSearch && (
                <kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
                    <span>
                        CTRL
                    </span> K
                </kbd>
            )}
            {/* </Link> */}
            {!!id && (
                <div className='ml-auto flex items-center gap-x-2'>
                    <DropdownMenu>
                        <DropdownMenuTrigger onClick={e => e.stopPropagation()} asChild>
                            <div className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600" role='button'>
                                <MoreHorizontal />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={removeNote}>
                                <Trash2 className='h-4 w-4' />
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <div>
                                Last edited by {usePage().props.auth.user.name}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div onClick={onCreate} className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
                        <Plus className='h-4 w-4 text-muted-foreground' />
                    </div>
                    {/* <div onClick={removeNote} className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"> */}
                    {/*     <Trash2 className='h-4 w-4 text-muted-foreground' /> */}
                    {/* </div> */}
                </div>
            )}
        </div>
    )
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return (
        <div className="flex gap-x-2 py-[3px]" style={{ paddingLeft: level ? `${(level * 12) + 25}px` : '12px' }}>
            <Skeleton className='h-4 w-4'></Skeleton>
            <Skeleton className='h-4 w-[30%]'></Skeleton>
        </div>
    )
}

export default Item
