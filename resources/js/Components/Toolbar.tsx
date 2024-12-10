import { useForm, usePage } from "@inertiajs/react";
import IconPicker from "./IconPicker";
import { Button, buttonVariants } from "@/components/ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useNote } from "@/Hooks/note";
import { useCoverImage } from "@/Hooks/useCoverImage";

const Toolbar = () => {
    const note = useNote().note;
    const setNote = useNote().setNote;
    const coverImage = useCoverImage();
    const inputRef = useRef<ElementRef<'textarea'>>(null);

    const [isEditing, setIsEditing] = useState(false);

    const { data, setData, post, errors } = useForm({
        title: note.title,
        icon: note.icon,
        _method: 'POST',
    });

    const onSubmit = () => {
        post(route('dashboard.update', note.id));
    };

    const disableInput = () => {
        setIsEditing(false);
    }

    const enableInput = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
        }, 0);
    }


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        e.preventDefault();
        setData('title', e.target.value);
        note.title = e.target.value;
        setNote(note);
        // console.log(e.target.value, 'value!!!');
        // onSubmit(e);
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            disableInput();
            onSubmit();
        }
    }

    const onSelectIcon = (icon: string) => {
        note.icon = icon;
        setNote(note);
        setData('icon', icon);
    }

    const onRemoveIcon = () => {
        note.icon = '';
        setNote(note);
        setData('icon', note.icon);
    }

    console.log(note, 'note!!!');


    return (
        <div className="pl-[54px] group relative">
            {!!note.icon && (
                <div className="flex items-center gap-x-2 group/icon pt-6">
                    <IconPicker onEmojiClick={onSelectIcon}>
                        <p className="text-6xl hover:opacity-75 transition">
                            {note.icon}
                        </p>
                    </IconPicker>
                    <Button onClick={onRemoveIcon} className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs border-none">
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}

            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
                <IconPicker asChild={true} onEmojiClick={onSelectIcon}>
                    <Button className="text-xs text-muted-foreground" variant='outline' size='sm'>
                        <Smile className='h-4 w-4 mr-2' />
                        Add icon
                    </Button>
                </IconPicker>
                {!note.coverImage && (
                    <Button onClick={coverImage.onOpen} variant='outline' size='sm' className='text-muted-foreground'>
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Add cover
                    </Button>
                )}
            </div>
            {isEditing ? (
                <TextareaAutosize onKeyDown={onKeyDown} ref={inputRef} onBlur={disableInput} value={note.title} onChange={e => onChange(e)} className='text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none border-none' />
            ) : (
                <div onClick={enableInput} className="pb-[11.5px] text-5xl font-bold break-words outline-none">
                    {note.title}
                </div>
            )}
        </div>
    )
}

export default Toolbar;
