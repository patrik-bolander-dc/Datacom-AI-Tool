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
    BACK_MIDDLE_BUMBER = 'BACK_MIDDLE_BUMBER',
    BACK_RIGHT_BUMBER = 'BACK_RIGHT_BUMBER',
}

export type carPartType = Record<carPart, string>;

export enum carSide {
    FRONT = 'front',
    LEFT = 'left',
    RIGHT = 'right',
    BACK = 'back'
}

export type carSideType = Record<carSide, string>;

export type CameraType = 'front' | 'back' | 'left' | 'right' | null;
export type FileType = File | null;
export type ImageResultType = string | null;
export type RegoNumberType = string | null;
export type ErrorType = string | null;

type SideMapToJsonResult = {
    [key: string]: string;
};

export const SideMapToJsonResult: SideMapToJsonResult = {
    front: 'car_front',
    back: 'car_back',
    left: 'car_left',
    right: 'car_right',
};

export type CarPartColorMap = {
    [part: string]: string;
};

export type ListOfCarPartsProps = {
    arrayOfParts: {
        Name: string;
        Confidence: number;
    }[];
    title: string;
};