import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { useCoverImage } from '@/Hooks/useCoverImage';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/Hooks/theme';
import { Button } from '@/components/ui/button';

export const CoverImage = () => {
    const coverImage = useCoverImage();
    const isOpen = useCoverImage(store => store.isOpen);
    const onClose = useCoverImage(store => store.onClose);
    const theme = useTheme();

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className='border-b pb-3'>
                    <h2 className='text-center text-lg font-semibold'>
                        Cover Image
                    </h2>
                </DialogHeader>
                <div className="flex items-center justify-between">
                    <div className='flex flex-col gap-y-1'>
                        <Label>
                            Appearance
                        </Label>
                        <span className='text-[0.8rem] text-muted-foreground'>
                            Customize how La Nocion looks
                        </span>
                        <Button onClick={theme.toggle}>Toggle</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}



