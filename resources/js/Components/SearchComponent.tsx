import { useState, useEffect } from 'react';
import { File } from "lucide-react";
import { router, usePage } from '@inertiajs/react';

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';

import { useSearch } from '@/Hooks/search';
import { Note } from '@/types';

export const SearchComponent = () => {
    const toggle = useSearch(store => store.toggle);
    const isOpen = useSearch(store => store.isOpen);
    const onClose = useSearch(store => store.onClose);
    const onSelect = (id: string) => {
        router.get(route('dashboard.show', id));
        onClose();
    }

    const notes = usePage().props.notes;

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && e.ctrlKey) {
                e.preventDefault();
                toggle();
            }
        }

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [toggle])

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput placeholder={`Search`} />
            <CommandList>
                <CommandEmpty>No results found</CommandEmpty>
                <CommandGroup heading='Notes'>
                    {notes.map((note: Note) => (
                        <CommandItem key={note.id} value={`${note.id}-${note.title}`} title={note.title} onSelect={onSelect}>
                            {note.icon ? (
                                <p className='mr-w text-[18px]'>
                                    {note.icon}
                                </p>
                            ) : (
                                <File className='mr-2 h-4 w-4' />
                            )}
                            <span>
                                {note.title}
                            </span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}
