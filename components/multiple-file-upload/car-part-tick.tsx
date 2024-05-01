import { CircleCheck, Circle } from "lucide-react";

interface CarPartTickProps {
    isTicked: Boolean | undefined
}

const CarPartTick = ({isTicked = false}: CarPartTickProps) => {
    return (
        <p className='flex justify-center items-center text-2xl font-extrabold h-full text-white'>
            { isTicked ? <CircleCheck fill="blue" size={40} /> : <Circle fill="blue" size={40} />}
        </p>
    );
}

export default CarPartTick;