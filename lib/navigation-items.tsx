import { Bot, Home, User } from "lucide-react";

export const NaviationItemArray = [
    {
        title: 'Home',
        path: '/home',
        icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
        title: 'Damage Analyser',
        path: '/damageAnalyser',
        icon: <Bot className="mr-2 h-4 w-4" />,
    },
    {
        title: 'Tool 2',
        path: '/tool2',
        icon: <User className="mr-2 h-4 w-4" />,
    },
]