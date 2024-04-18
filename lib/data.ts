import { carPart } from "@/types"

export const MOCK_carDamageData = {
    "car_info": {
        "Colour": "Orange",
        "Fuel Type": "Petrol",
        "Make": "MCLAREN",
        "Model": "570S",
        "Plate": "BULRUN",
        "Year": "2019"
    },
    "damagedParts": [
        {
            "Name": 'FENDER_LEFT',
            "Confidence": 75,
        },
        {
            "Name": 'FENDER_RIGHT',
            "Confidence": 75
        },
        {
            "Name": 'FRONT_GRILL',
            "Confidence": 97.55599975585938
        },
        {
            "Name": 'FRONT_RIGHT_LAMP',
            "Confidence": 75
        },
        {
            "Name": 'BACK_MIDDLE_BUMBER',
            "Confidence": 97.55599975585938
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

