import { CircleCheck, Circle, X, CircleX, Check } from "lucide-react";

interface CarPartTickProps {
    isTicked: Boolean | undefined
}

const CarPartTick = ({ isTicked = false }: CarPartTickProps) => {
    return (
        <p className='flex justify-center items-center text-2xl font-extrabold h-full '>
            {isTicked ?
                <div className="text-red-500">
                    <CircleX fill="white" size={40} />
                </div>
                :
                <div className="text-green-500">
                    <CircleCheck fill="white" size={40} />
                </div>
            }
        </p>
    );
}

export default CarPartTick;