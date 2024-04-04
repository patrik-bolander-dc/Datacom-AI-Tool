"use client"
import { useState } from "react";
import { Menu } from "lucide-react";
import NavigationSideBar from "@/components/navigation/navigation-sidebar";

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from '@/components/ui/sheet';
import { Button } from "@/components/ui/button";


const MobileToggle = () => {
    // passing setSheetOpen function for prop drilling
    // to enable Navigation-sidebar-item to close this <Sheet>
    // This is bad practice
    const [sheetOpen, setSheetOpen] = useState(false); 

    return ( 
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
                <Button variant='ghost' size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side='left' className="p-0 flex gap-0">
                <div className="w-full">
                    <NavigationSideBar setOpen={setSheetOpen}/>
                </div>
                
            </SheetContent>
        </Sheet>
     );
}
 
export default MobileToggle;