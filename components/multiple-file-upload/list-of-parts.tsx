import { carPart } from "@/types";
import { roundDp } from "@/lib/utils";

export const carPartColorMap = {
  "scratch": 'bg-red-500',
  'glass shatter': 'bg-blue-500',
} as any;


const ListOfCarParts = ({arrayOfParts, title}: any) => {

  if (!arrayOfParts || arrayOfParts.length === 0 ) {
    return <></>
  }

  return (
    <div className="pl-1 text-black">
      <h1 className="text-lg font-semibold">{title}</h1>
      <ul className="text-xs">
        {arrayOfParts?.map((item: any, index: number) => (
          <li key={index} className='py-2 space-x-2'>
            <span className={`rounded py-0.5 px-4 text-white bg-gray-500`}> {roundDp(item.Confidence)}% </span>
            <span>{item.Name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListOfCarParts;






