import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/mode-toggle";
import NavigationItem from "./navigation-sidebar-item";

const NavigationSideBar = async () => {

    const NaviationItemArray = [
        {
            title: 'object detection tool',
            path: '/home'
        },
        {
            title: 'Ai tool 1',
            path: '/aitool1'
        },
        {
            title: 'object detection tool',
            path: '/home'
        },
    ]

    return (
        <div className="flex flex-col h-full text-primary w-full bg-zinc-400 ">
            <h1 className="font-bold text-5xl text-center p-3">Datacom </h1>
            <ScrollArea className="flex-1 w-full">
                {NaviationItemArray.map((item, id) => (
                    <div key={id} >
                        <NavigationItem title={item.title} path={item.path}/>
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