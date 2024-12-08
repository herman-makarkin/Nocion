import { ChevronDown, ChevronRight, Icon, LucideIcon } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { Link } from '@inertiajs/react'


type Item = {
    label: string,
    onClick: () => void,
    level?: number,
    isSearch?: boolean,
    icon: LucideIcon,
    noteIcon?: string,
    active?: boolean,
    id?: number,
    expanded?: boolean
    href?: string,
}

const Item = ({
    label,
    id,
    onClick,
    icon: Icon,
    noteIcon,
    isSearch,
    level,
    active,
    expanded,
    href = '',
}: Item) => {
    const ChevronIcon = expanded ? ChevronDown : ChevronRight

    return (
        <Link href={href} onClick={onClick} style={{ paddingLeft: level ? `${level * 12 + 12}px` : '12px' }} role='button' className={cn("group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium", active && "bg-primary/5 text-primary")}>
            {!!id && (
                <div className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1" role='button' onClick={() => { }}>
                    <Icon className='shrink-0 h-[18px] mr-2 text-muted-foreground' />
                </div>
            )}

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
        </Link>
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
