import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNote } from "@/Hooks/note";
import { useCoverImage } from "@/Hooks/useCoverImage";
import { cn } from "@/lib/utils"
import { useForm } from "@inertiajs/react";
import { X } from "lucide-react";

const Cover = () => {
    const coverImage = useCoverImage();
    const note = useNote().note;
    const setNote = useNote().setNote;

    const { data, setData, post, errors } = useForm({
        image: null,
        _method: 'POST',
    })

    const onRemove = () => {
        note.image = data.image;
        setNote(note);
        post(route('dashboard.update', note));
    }
    console.log(!note.cover_image);
    return (
        <div className={cn("relative w-full group overflow-hidden", !note?.cover_image ? 'h-[12vh]' : ' h-[35vh]')}>
            {!!note?.cover_image && (
                <>
                    <img src={note.cover_image} alt="" />
                    <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
                        <Button onClick={coverImage.onOpen} className="text-muted-foreground text-xs" variant='outline' size='sm'>
                            Change Cover
                        </Button>
                        <Button onClick={onRemove} className="text-muted-foreground text-xs" variant='outline' size='sm'>
                            <X className="h-4 w-4 mr-2" />
                            Remove
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}

Cover.Skeleton = () => {
    return (
        <Skeleton className="w-full h-[12vh]" />
    )
}

export default Cover;
