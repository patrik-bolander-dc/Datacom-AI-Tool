
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Info } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from 'next/image'
import ListOfCarParts from "./list-of-parts"

interface ImageWithDetailedViewProps {
  imageUrl: any;
  side: string;
  arrayOfDamage: any;
}

const ImageWithDetailedView = ({ imageUrl, side, arrayOfDamage }: ImageWithDetailedViewProps) => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
          <Image
            src={imageUrl}
            width={250}
            height={250}
            alt="Thumbnail preview of uploaded image"
            className="rounded-lg h-auto border border-red-500 "
          />
          <div className="flex justify-end -mt-7 mr-2">
            <Info className="text-white z-30" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[calc(100vh-100px)] overflow-auto">
        <ScrollArea className="h-full">
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
              a detailed view of the image analyzed by the AI
            </DialogDescription>
          </DialogHeader>

          <ListOfCarParts arrayOfParts={arrayOfDamage} title={side} />
          <div className="">
            <p>Cost of damage: $1000</p>
            <h3 className="font-semibold mt-2">places to get repaired:</h3>
            <ul className="ml-5">
              <li className="list-disc">Auckland</li>
            </ul>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog >
  );
}

export default ImageWithDetailedView;