import { usePage } from "@inertiajs/react";
import { MenuIcon } from "lucide-react";
import Title from "./Title";

type NavProps = {
    isCollapsed: boolean;
    isMobile: boolean;
    onResetWidth: () => void;
}
const NavComponent = ({ isCollapsed, isMobile, onResetWidth }: NavProps) => {
    const note = usePage().props.note;
    return (
        <>
            <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4 ps-60">
                {(isCollapsed || isMobile) && (
                    <MenuIcon className='z-[99999] h-6 w-6 text-muted-foreground dark:bg-[#1F1F1F] ' role="button" onClick={onResetWidth} />
                )}
                <div className="flex items-center justify-between w-full">
                    <Title />
                </div>
            </nav>
        </>
    )
}

export default NavComponent;
