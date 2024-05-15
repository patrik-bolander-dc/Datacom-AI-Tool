
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import ListOfCarParts from "./list-of-parts"
import { capitalize } from "@/lib/utils"

interface ImageWithDetailedViewProps {
  imageUrl: any;
  side: string;
  arrayOfDamage: any;
}

const ImageWithDetailedView = ({ imageUrl, side, arrayOfDamage }: ImageWithDetailedViewProps) => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          src={imageUrl}
          width={250}
          height={250}
          alt="Thumbnail preview of uploaded image"
          className="rounded-lg h-auto border border-red-500 hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl ">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle>
            <Image
              src={imageUrl}
              width={400}
              height={400}
              alt="detailed view of uploaded image"
              className="rounded-lg h-auto border "
            />
          </DialogTitle>
          <DialogDescription>
            Here is a detailed view of the image analyzed by the AI
          </DialogDescription>
        </DialogHeader>

        <ListOfCarParts arrayOfParts={arrayOfDamage} title={capitalize(side)} />
        <div className="">
          <p>Cost of damage: $1000</p>
          <h3 className="font-semibold mt-2">places to get repaired:</h3>
          <ul className="ml-5">
            <li className="list-disc">Auckland</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ImageWithDetailedView;