import { Bot, Hash, Home, Users } from "lucide-react";

export const NaviationItemArray = [
    {
        title: 'Home',
        path: '/home',
        icon: <Home className="mr-2 h-4 w-4"/> ,
    },
    {
        title: 'Tool1',
        path: '/tool1',
        icon: <Bot className="mr-2 h-4 w-4" />,
    },
    {
        title: 'Tool2',
        path: '/tool2',
        icon: <Users className="mr-2 h-4 w-4" />,
    },
]