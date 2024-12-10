import { usePage } from "@inertiajs/react";
import { MenuIcon } from "lucide-react";
import Title from "./Title";

type NavProps = {
    isCollapsed: boolean;
    onResetWidth: () => void;
}
const NavComponent = ({ isCollapsed, onResetWidth }: NavProps) => {
    const note = usePage().props.note;
    return (
        <>
            <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
                {isCollapsed && (
                    <MenuIcon className='h-6 w-6 text-muted-foreground' role="button" onClick={onResetWidth} />
                )}
                <div className="flex items-center justify-between w-full">
                    <Title />
                </div>
            </nav>
        </>
    )
}

export default NavComponent;
