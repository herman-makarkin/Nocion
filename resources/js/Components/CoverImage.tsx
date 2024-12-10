import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { useCoverImage } from '@/Hooks/useCoverImage';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/Hooks/theme';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { useNote } from '@/Hooks/note';

export const CoverImage = () => {

    const { data, setData, post, errors } = useForm({
        image: null,
        _method: 'POST',
    })

    const note = useNote().note;
    const setNote = useNote().setNote;

    const onChange = (e) => {
        setData('image', e.target.files[0]);
    }

    const onSubmit = () => {
        note.image = data.image;
        post(route('dashboard.update', note));
    }

    const isOpen = useCoverImage(store => store.isOpen);
    const onClose = useCoverImage(store => store.onClose);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className='border-b pb-3'>
                    <h2 className='text-center text-lg font-semibold'>
                        Cover Image
                    </h2>
                </DialogHeader>
                <div className='flex flex-between'>
                    <input type="file" name='image' onChange={e => {
                        if (e.target.files) {
                            console.log(e.target.files);
                            return setData('image', e.target.files[0])
                        }
                    }} />
                    <Button className='ms-3' onClick={onSubmit} onChange={onChange}>
                        Submit
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}



