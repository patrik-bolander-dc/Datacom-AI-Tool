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

export const carPartColorMap = {
    FENDER_LEFT: 'bg-red-500',
    FENDER_RIGHT: 'bg-blue-500',
    GRILL: 'bg-purple-500',
    FRONT_LAMP_RIGHT: 'bg-green-500',
  } as any;

export const MOCK_carDamageData = {
        year: '2012',
        make: 'Toyota',
        model: 'Corolla',
        PartsDamaged: [
            {
                damagedCarPart: 'FENDER_LEFT',
                Percentage: 75,
            },
            {
                damagedCarPart: 'FENDER_RIGHT',
                Percentage: 75
            },
            {
                damagedCarPart: 'GRILL',
                Percentage: 75
            },
            {
                damagedCarPart: 'FRONT_LAMP_RIGHT',
                Percentage: 75
            },
        ]
    }
