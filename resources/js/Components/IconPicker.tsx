import EmojiPicker from "emoji-picker-react";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useTheme } from "@/Hooks/theme";
import { useNote } from "@/Hooks/note";

interface IconPickerProps {
    onEmojiClick: (icon: string) => void;
    children: React.ReactNode;
    asChild?: boolean;
}

const IconPicker = ({ onEmojiClick, children, asChild }: IconPickerProps) => {
    const icon = useNote().note.icon;
    return (
        <Popover>
            <PopoverTrigger asChild={asChild}>
                {children}
            </PopoverTrigger>
            <PopoverContent className="border-none shadow-none p-0 w-full">
                <EmojiPicker
                    height={350}
                    onEmojiClick={(data) => onEmojiClick(data.emoji)}
                    theme={useTheme().isDark ? 'dark' : 'light'} />
            </PopoverContent>
        </Popover>
    )
}

export default IconPicker;
