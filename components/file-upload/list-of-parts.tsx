import { MOCK_carDamageData } from "@/lib/data";
import { carPart } from "@/types";
import { roundDp } from "@/lib/utils";

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

const ListOfCarParts = ({ }) => {
  return (
    <div>
      <ul className="text-xs">
        {MOCK_carDamageData.damagedParts.map((item, index) => (
          <li key={index} className='py-2 space-x-2'>
            <span className={`rounded py-0.5 px-4 text-white ${carPartColorMap[item.Name]}`}> {roundDp(item.Confidence)}% </span>
            <span>{item.Name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListOfCarParts;