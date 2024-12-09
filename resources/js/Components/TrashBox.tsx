import { usePage } from '@inertiajs/react'
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Search, Undo } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from '@inertiajs/react';
import { Note } from '@/types';

const TrashBox = () => {
    const notes = usePage().props.notes;

    const [search, setSearch] = useState('');

    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(search.toLowerCase()))

    const onClick = (noteId: string) => {
        router.get(route('dashboard', noteId))
    }

    const removeNote = (id: number) => {
        if (window.confirm('Are you sure you want to remove this note?')) {
            const message = router.delete(route('dashboard.destroy', id));
        }
        return;
    };
    return (
        <div className="text-sm">
            <div className="flex items-center gap-x-1 p-2">
                <Search />
                <Input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className='h-7 px-2 focus-visible:ring-transparent bg-secondary'
                    placeholder='Filter by note title'
                />
            </div>
            <div className="mt-2 px-2 pb-2">
                <p className='hidden last:block text-xs text-center text-muted-foreground pb-2'>
                    No notes found
                </p>
                {filteredNotes.map((note: Note) => (
                    <div key={note.id} role='button' onClick={() => { removeNote(note.id) }}
                        className='mt-1 text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between'>
                        <span className='truncate pl-2'>{note.title}</span>
                        <div className="flex items-center">
                            <div className="rounded-sm hover:bg-neutral-300">
                                <Undo className='h-4 w-4 text-muted-foreground' />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TrashBox;
