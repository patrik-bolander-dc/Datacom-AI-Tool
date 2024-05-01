"use client"
import { SetStateAction, useEffect, useMemo, useState } from "react";
import Image from 'next/image'
import { LoaderCircle, Camera } from 'lucide-react';
import { MOCK_carDamageData, CarPartLocation } from "@/lib/data";
import { dataURLtoFile, formatBytes, haveCommonItems } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { carPartType } from "@/types";

import CarPartTick from "./car-part-tick";
import ListOfCarParts from "./list-of-parts";
import WebCamera from "./web-camera";
import { useAtom } from "jotai";
import {
  BackFile,
  BackImageResult,
  FrontFile,
  FrontImageResult,
  IsCameraActive,
  LeftFile,
  LeftImageResult,
  RightFile,
  RightImageResult,
  UploadError
} from '@/components/Atoms/FileAtoms';


interface SingleFileUploaderProps {
  side: string;
}

const atomsMap: { [key: string]: any } = {
  left: LeftFile,
  right: RightFile,
  front: FrontFile,
  back: BackFile,
};

const SingleFileUploader = ({ side }: SingleFileUploaderProps) => {

  const atomForSide = useMemo(() => atomsMap[side], [side]);
  const [file, setFile] = useAtom(atomForSide);
  const [hasResult, setHasResult] = useAtom(FrontImageResult); // solve this

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    // if (imgResult) {
    //   resetImageUpload();
    // }

    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const RedirectToCamera = () => {
    setIsCameraActive(true);
  }

  useEffect(() => {
    setFile(hasResult)
  }, [hasResult])


  // UseEffect for converting capturedImage(Base64String) to File 
  useEffect(() => {
    if (capturedImage) {
      var myFile = dataURLtoFile(capturedImage, 'capturedImage.jpeg');
      setFile(myFile);
    }
  }, [capturedImage]);

  return (
    <div className="w-full">
      {!isCameraActive ? (
        <div className="w-full flex flex-col bg-gray-200 p-5 rounded-xl max-w-2xl min-w-20 dark:bg-gray-900 h-full">
          <h1 className="w-full text-center font-semibold text-2xl">{side}</h1>

          <div className="flex w-full justify-between gap-4 md:block">
            <input type="file"
              placeholder="Upload File"
              onChange={handleFileChange}
              className='bg-blue-50 dark:bg-dcBlue rounded-xl border border-blue-500 text-lg h-full
          dark:file:bg-blue-500 dark:file:text-black file:border-0 file:p-3 file:px-4 file:rounded-l file:h-full file:font-semibold file:text-lg file:mr-5 file:hover:cursor-pointer
          file:bg-white file:text-black w-full'
            />
            {/* Mobile phone Camera button */}
            {!hasResult && (
              <button onClick={RedirectToCamera} className=" bg-gray-800 dark:bg-gray-300 rounded-lg md:hidden px-4">
                <Camera className="text-white dark:text-gray-700" />
              </button>
            )}
          </div>

          {/* File details before uploading */}
          {file !== null && !hasResult && (
            <section className="w-full pt-5 flex justify-between animate-fade-down animate-once animate-duration-1000 animate-delay-100 animate-ease-in-out">
              <div className="rounded-xl">
                <Image
                  src={URL.createObjectURL(file as File)}
                  width={150}
                  height={150}
                  alt="Thumbnail preview of uploaded image"
                  className="rounded-lg h-auto"
                />
              </div>
            </section>
          )}
        </div>
      ) : (
        <WebCamera setCameraToActive={setIsCameraActive} setCapturedImage={setCapturedImage} />
      )}

      

    </div >
  );
};

export default SingleFileUploader;
