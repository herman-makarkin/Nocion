import { Note } from '@/types'
import React, { useState } from 'react'
import Item from './Item'
import { cn } from '@/lib/utils'
import { FileIcon } from 'lucide-react'

type DocumentList = {
    notes: Note[],
    level?: number,
}
const NoteList = ({ level = 0, notes }: DocumentList) => {

    const [expanded, setExpanded] = useState<Record<string, boolean>>(({}))

    const onExpand = (noteId: number) => {
        setExpanded(prevExpanded => ({
            ...prevExpanded,
            [noteId]: !prevExpanded[noteId]
        }))
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
                        onClick={() => { }}
                        id={note.id}
                        label={note.title}
                        icon={FileIcon}
                        // active={note.id === note.id}
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
