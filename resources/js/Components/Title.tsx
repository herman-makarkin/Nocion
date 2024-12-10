import { router, useForm, usePage } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FormEventHandler } from "react";
import { useNote } from "@/Hooks/note";

const Title = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const note = useNote().note;
    const setNote = useNote().setNote;

    const [isEditing, setIsEditing] = useState(false);

    const enableInput = () => {
        setData('title', note.title);
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
        }, 0);
    }

    const { data, setData, post, errors } = useForm({
        title: '',
        _method: 'POST',
    });

    const onSubmit: FormEventHandler = (e) => {
        console.log(data, 'CHECK!!!');
        post(route('dashboard.update', note.id));
    };

    // const update = () => {
    //     router.put(route('dashboard.update', note))
    //     console.log(note.title, 'asdlkjf!!!!!!!!!!!')
    // };

    const disableInput = () => {
        setIsEditing(false);
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
            disableInput();
            onSubmit(e);
        }
    }

    return (
        <div className="flex items-center gap-x-1">
            {!!note.icon && <p>{note.icon}</p>}
            {isEditing ? (
                <Input onChange={onChange} onKeyDown={onKeyDown} className="h-7 px-2 focus-visible:ring-transparent" ref={inputRef} onClick={enableInput} onBlur={disableInput} />
            ) : (
                <Button onClick={enableInput} variant="ghost" size='sm' className="font-normal h-auto p-1">
                    <span className='truncate'>
                        {note.title}
                    </span>
                </Button>
            )}
        </div>
    )
}

export default Title;
