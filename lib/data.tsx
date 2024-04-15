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

export enum carPart {
    FENDER_LEFT = 'FENDER_LEFT',
    FENDER_RIGHT = 'FENDER_RIGHT',
    FRONT_LEFT_LAMP = 'FRONT_LEFT_LAMP',
    FRONT_RIGHT_LAMP = 'FRONT_RIGHT_LAMP',
    FRONT_GRILL = 'FRONT_GRILL',
    HOOD = 'HOOD',
    FRONT_WINDOW = 'FRONT_WINDOW',
    ROOF = 'ROOF',
    FRONT_LEFT_DOOR = 'FRONT_LEFT_DOOR',
    FRONT_RIGHT_DOOR = 'FRONT_RIGHT_DOOR',
    BACK_LEFT_DOOR = 'BACK_LEFT_DOOR',
    BACK_RIGHT_DOOR = 'BACK_RIGHT_DOOR',
    BACK_LEFT_LAMP = 'BACK_LEFT_LAMP',
    BACK_RIGHT_LAMP = 'BACK_RIGHT_LAMP',
    FRONT_LEFT_TIRE = 'FRONT_LEFT_TIRE',
    FRONT_RIGHT_TIRE = 'FRONT_RIGHT_TIRE',
    BACK_LEFT_TIRE = 'BACK_LEFT_TIRE',
    BACK_RIGHT_TIRE = 'BACK_RIGHT_TIRE',
    BACK_LEFT_BUMBER = 'BACK_LEFT_BUMBER',
    BACK_MIDDLE_BUMBER= 'BACK_MIDDLE_BUMBER',
    BACK_RIGHT_BUMBER = 'BACK_RIGHT_BUMBER',
} 

// probably all you need, but it's a type alias
export type carPartType = Record<carPart, string>;

export const carPartColorMap = {
    [carPart.FENDER_LEFT]: 'bg-red-500',
    [carPart.FENDER_RIGHT]: 'bg-blue-500',
    [carPart.FRONT_LEFT_LAMP]: '',
    [carPart.FRONT_RIGHT_LAMP]: 'bg-green-500',
    [carPart.FRONT_GRILL]: 'bg-purple-500',
    [carPart.HOOD]: 'bg-gray-500',
    [carPart.FRONT_WINDOW]: 'bg-gray-500',
    [carPart.ROOF]: 'bg-gray-500',
    [carPart.FRONT_LEFT_DOOR]: 'bg-gray-500',
    [carPart.FRONT_RIGHT_DOOR]: 'bg-gray-500',
    [carPart.BACK_LEFT_DOOR]: 'bg-gray-500',
    [carPart.BACK_RIGHT_DOOR]: 'bg-gray-500',
    [carPart.BACK_LEFT_LAMP]: 'bg-gray-500',
    [carPart.BACK_RIGHT_LAMP]: 'bg-gray-500',
    [carPart.FRONT_LEFT_TIRE]: 'bg-gray-500',
    [carPart.FRONT_RIGHT_TIRE]: 'bg-gray-500',
    [carPart.BACK_LEFT_TIRE]: 'bg-gray-500',
    [carPart.BACK_RIGHT_TIRE]: 'bg-gray-500',
    [carPart.BACK_LEFT_BUMBER]: 'bg-gray-500',
    [carPart.BACK_MIDDLE_BUMBER]: 'bg-gray-500',
    [carPart.BACK_RIGHT_BUMBER]: 'bg-gray-500',
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
            damagedCarPart: 'FRONT_GRILL',
            Percentage: 75
        },
        {
            damagedCarPart: 'FRONT_RIGHT_LAMP',
            Percentage: 75
        },
        {
            damagedCarPart: 'BACK_LEFT_TIRE',
            Percentage: 75
        },
        {
            damagedCarPart: 'ROOF',
            Percentage: 75
        },
    ]
}

export const CarPartLocation = {
    1 : [carPart.FRONT_LEFT_LAMP, carPart.FENDER_LEFT],
    2 : [carPart.FRONT_GRILL, carPart.HOOD],
    3 : [carPart.FRONT_RIGHT_LAMP, carPart.FENDER_RIGHT],
    4 : [carPart.FRONT_LEFT_TIRE],
    5 : [carPart.FRONT_WINDOW],
    6 : [carPart.FRONT_RIGHT_TIRE],
    7 : [carPart.FRONT_LEFT_DOOR],
    8 : [carPart.HOOD],
    9 : [carPart.FRONT_RIGHT_DOOR],
    10 : [carPart.BACK_LEFT_DOOR],
    11 : [carPart.ROOF],
    12: [carPart.BACK_RIGHT_DOOR],
    13 : [carPart.BACK_LEFT_TIRE, carPart.BACK_LEFT_LAMP],
    14 : [carPart.BACK_MIDDLE_BUMBER],
    15 : [carPart.BACK_RIGHT_BUMBER],
} as any
