import { Note } from '@/types'
import React, { useState } from 'react'
import Item from './Item'
import { cn } from '@/lib/utils'
import { FileIcon } from 'lucide-react'
import { router } from '@inertiajs/react'
import { useNote } from '@/Hooks/note'

type DocumentList = {
    notes: Note[],
    level?: number,
}
const NoteList = ({ level = 0, notes }: DocumentList) => {

    const currentNote = useNote().note;

    const [expanded, setExpanded] = useState<Record<string, boolean>>(({}))

    const onExpand = (noteId: number) => {
        setExpanded(prevExpanded => ({
            ...prevExpanded,
            [noteId]: !prevExpanded[noteId]
        }))
    }

    const openNote = (e, id: number) => {
        // e.preventDefault();
        // e.stopPropagation();
        router.get(route('dashboard.show', id))
    }

    if (notes === undefined) {
        return (
            <>
                <Item.Skeleton level={level} />

                {level === 0 && (
                    <>
                        <Item.Skeleton level={level} />
                        <Item.Skeleton level={level} />
                    </>
                )}
            </>
        )
    }



    return (
        <>
            <p style={{ paddingLeft: level ? `${(level * 12) + 25}px` : undefined }} className={cn('hidden text-sm font-medium text-muted-foreground/80', expanded && 'last:block', level === 0 && 'hidden')}>
                No pages inside
            </p>
            {notes.map(note => (
                <div key={note.id}>
                    <Item
                        onClick={(e) => { openNote(e, note.id) }}
                        id={note.id}
                        label={note.title}
                        icon={FileIcon}
                        noteIcon={note.icon}
                        active={note.id === currentNote.id}
                        level={level}
                        onExpand={() => onExpand(note.id)}
                        expanded={expanded[note.id]}
                        chevron={!!note.children.length}
                    />
                    {
                        (!!note.children.length && expanded[note.id]) && (
                            <NoteList notes={note.children} level={level + 1} />
                        )
                    }
                </div>
                // {
                //     expanded[note.id] && (
                //         <NoteList
                //             parentNoteId={note.id} level={level + 1} />
                //     )
                // }
            ))}
        </>
    )
}

export default NoteList
