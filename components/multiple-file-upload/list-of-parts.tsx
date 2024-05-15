import { capitalize, cn, roundDp } from "@/lib/utils";
import { CarPartColorMap, ListOfCarPartsProps } from "@/types";

export const carPartColorMap: CarPartColorMap = {
  'scratch': 'bg-gray-500',
  'glass shatter': 'bg-red-500',
  'tire flat': 'bg-green-500',
  'dent': 'bg-blue-500',
  'crack': 'bg-orange-500',
  'lamp broken': 'bg-purple-500',
};

const ListOfCarParts = ({arrayOfParts, title}: ListOfCarPartsProps) => {

  if (!arrayOfParts || arrayOfParts.length === 0 ) {
    return <></>
  }

  return (
    <div className="pl-1 text-black">
      <h1 className="text-lg font-semibold">{title}</h1>
      <ul className="text-xs">
        {arrayOfParts?.map((item: any, index: number) => (
          <li key={index} className='py-2 space-x-2'>
            <span className={cn(`rounded py-0.5 px-4 text-white bg-gray-500`, carPartColorMap[item.Name])}> {roundDp(item.Confidence)}% </span>
            <span>{capitalize(item.Name)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListOfCarParts;






