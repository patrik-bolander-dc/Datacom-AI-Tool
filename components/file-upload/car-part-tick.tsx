import { MOCK_carDamageData, CarPartLocation } from "@/lib/data";
import { CircleCheck, Circle } from "lucide-react";

interface CarPartTickProps {
    isTicked: Boolean
}

const CarPartTick = ({isTicked = false}: CarPartTickProps) => {
    return (
        <p className='w-full flex justify-center items-center text-2xl font-extrabold h-full text-white '>
            { isTicked ? <CircleCheck fill="blue" size={30} /> : <Circle fill="blue" size={30} />}
        </p>
    );
}

export default CarPartTick;