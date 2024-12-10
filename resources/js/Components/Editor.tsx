
// import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
// import { BlockNoteView, useBlockNote } from '@blocknote/react';
// import '@blocknote/core/style.css';
import { useNote } from "@/Hooks/note";
import { useTheme } from "@/Hooks/theme";
import { PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useForm } from "@inertiajs/react";
import { ChangeEvent, useCallback, useEffect } from "react";

type EditorType = {
    onChange: (arg0: string) => void;
}

const Editor = () => {
    const note = useNote().note;
    const setNote = useNote().setNote;
    const isDark = useTheme().isDark;
    const editor = useCreateBlockNote({
        animations: true,
        initialContent: note.content ? (JSON.parse(note.content) as PartialBlock[]) : undefined
    });

    console.log(note?.content, 'note')

    const { data, setData, post, errors } = useForm({
        content: null,
        _method: 'POST',
    })

    const onSubmit = async () => {
        const markdownFromBlocks = JSON.stringify(editor.document);
        console.log(markdownFromBlocks, 'markdown')
        setData('content', markdownFromBlocks);
        post(route('dashboard.update', note));
    }

    const onChange = async () => {
        const markdownFromBlocks = JSON.stringify(editor.document);
        console.log(markdownFromBlocks, 'markdown')
        setData('content', markdownFromBlocks);
    }

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 's' && e.ctrlKey) {
                e.preventDefault();
                onSubmit();
            }
        }

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [onSubmit])

    return (
        <BlockNoteView editor={editor} onChange={onChange} theme={isDark ? 'dark' : 'light'} />
    )
}

export default Editor;
