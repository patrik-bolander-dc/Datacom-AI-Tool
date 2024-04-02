"use client"
import { useRouter } from "next/navigation";

interface NavigationItemProps {
    title: string;
    path?: string;
}

const NavigationItem = ({ title, path }: NavigationItemProps) => {

    const router = useRouter();

    const onClick = () => {
        router.push(`${path}`);
    }


    return (
        <button onClick={onClick} className="bg-white w-full py-2 font-semibold border-y border-gray-300 focus:bg-gray-500 focus:text-white">
            {title}
        </button>
    );
}

export default NavigationItem;