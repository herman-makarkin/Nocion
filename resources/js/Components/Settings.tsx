import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { useSettings } from '@/Hooks/settings';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/Hooks/theme';
import { Button } from '@/components/ui/button';

export const SettingsComponent = () => {
    const settings = useSettings();
    const isOpen = useSettings(store => store.isOpen);
    const onClose = useSettings(store => store.onClose);
    const theme = useTheme();

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className='border-b pb-3'>
                    <h2 className='text-lg font-medium'>
                        My Settings
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


