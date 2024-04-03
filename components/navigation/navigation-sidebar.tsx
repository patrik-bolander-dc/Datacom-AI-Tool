import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/mode-toggle";
import NavigationItem from "./navigation-sidebar-item";
import { NaviationItemArray } from "@/lib/data";

const NavigationSideBar = async () => {

    return (
        <div className="flex flex-col h-full text-primary w-full bg-white dark:bg-slate-700  px-3 drop-shadow-xl rounded-r-2xl">
            <h1 className="w-full pb-3 pt-10 pl-3 font-bold text-xl">Tools / Products</h1>
            <ScrollArea className="flex-1 w-full">
                {NaviationItemArray.map((item, id) => (
                    <div key={id}>
                        <NavigationItem title={item.title} path={item.path} icon={item.icon} />
                    </div>
                ))}

            </ScrollArea>
            <div className="mt-auto flex pl-3 pb-3">
                <ModeToggle />
            </div>
        </div>
    );
}

export default NavigationSideBar;