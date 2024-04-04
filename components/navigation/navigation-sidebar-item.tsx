"use client"
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

interface NavigationItemProps {
    title: string;
    path: string;
    icon: JSX.Element;
    setOpen?: any;
}

const NavigationItem = ({ title, path, icon, setOpen }: NavigationItemProps) => {
    // setOpen - used for closing the <Sheet>

    const router = useRouter();
    const pathname = usePathname();

    const onClick = () => {
        router.push(`${path}`);

        if (setOpen) { // setOpen is null when in desktop mode
            setOpen(false)
        }
    }

    return (
        <button onClick={onClick}
            className={cn(' w-full py-2 my-1 pl-3  text-lg flex items-center gap-3 rounded font-normal text-black hover:text-dcBlue hover:bg-blue-100 dark:text-white dark:hover:text-black',
                pathname === path && 'bg-blue-100 text-dcBlue dark:text-black')}>
            {icon} {title}
        </button>
    );
}

export default NavigationItem;