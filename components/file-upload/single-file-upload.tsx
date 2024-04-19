"use client"
import { useEffect, useState } from "react";
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { LoaderCircle } from 'lucide-react';
import { MOCK_carDamageData, CarPartLocation } from "@/lib/data";
import { formatBytes, haveCommonItems } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { carPartType } from "@/types";

import CarPartTick from "./car-part-tick";
import ListOfCarParts from "./list-of-parts";

const SingleFileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imgResult, setImgResult] = useState('');
  const [uploadError, setUploadError] = useState<string | null | unknown>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [carPartArray, setCarPartArray] = useState<carPartType[]>([]);
  const [regoInput, setRegoInput] = useState('');

  const labelAcceptedFileType = "png, jpeg";
  const regoInputMaxLength = 6;

  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (imgResult) {
      resetImageUpload();
    }

    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {

    if (regoInput === '') {
      setUploadError('Missing Rego number');
      return
    } else {
      setUploadError(null)
    }

    setIsUploading(true)
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      const url = 'https://rekognition-backend.azurewebsites.net/analyze';

      try {
        const result = await fetch(url, {
          method: "POST",
          body: formData
        });

        // DEV ONLY - Temporarily disabling the fetch call for dev work
        // const myBlob = new Blob();
        // const myOptions = { status: 200, statusText: "its all good!" };
        // const result = new Response(myBlob, myOptions);

        if (!result.ok) {
          console.error('Upload failed:', await result.text());
          setUploadError(await result.text());
          setIsUploading(false);
          return
        }

        if (result.ok) {
          const imageBlob = await result.blob();
          const imageObjectURL = URL.createObjectURL(imageBlob);

          setImgResult(imageObjectURL);
          setIsUploading(false);
        }

      } catch (error) {
        console.error(error);
        setUploadError(error);
        setIsUploading(false);
      }
    }
  };

  const resetImageUpload = () => {
    setImgResult('');
    setFile(null);
    setUploadError(null);
  }

  const handleRegoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegoInput(e.target.value);
  }

  const submitRego = async () => {
    const submitRegoUrl = '';
    try {
      const result = await fetch(submitRegoUrl, {
        method: "POST",
        body: JSON.stringify({})
      });

      if (!result.ok) {
        console.error('Rego Upload failed:', await result.text());
        setUploadError(await result.text());
        setIsUploading(false);
        return
      }

      if (result.ok) {
        const imageBlob = await result.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);

        setImgResult(imageObjectURL);
        setIsUploading(false);
      }
    } catch (error) {
      // TODO
    }
  }

  useEffect(() => {
    let carPartArray: carPartType[] = [];

    // collect all affected car parts from MOCK data
    MOCK_carDamageData.damagedParts.map((i) => {
      carPartArray.push(i.Name as any)
    })
    setCarPartArray(carPartArray);
  }, [imgResult])

  const RedirectToCamera = () => {
    router.push(`/damageAnalyser/webCamera`);
    return
  }

  
  return (
    <div className="w-full flex flex-col justify-normal items-center 
                      md:flex-row md:justify-center md:items-start">
      {/* Card */}
      <div className="w-full md:w-1/2 flex flex-col bg-gray-200 p-5 rounded-xl max-w-2xl min-w-20 dark:bg-gray-900 h-full">
        <label className="flex justify-start text-black dark:text-blue-200/90">
          <span>Accepted File Types: {labelAcceptedFileType}</span>
        </label>
        <div className="flex w-full justify-between gap-4 md:block">
          <input type="file"
            onChange={handleFileChange}
            className='bg-blue-50 dark:bg-dcBlue rounded-xl border border-blue-500 text-lg h-full
          dark:file:bg-blue-500 dark:file:text-black file:border-0 file:p-3 file:px-4 file:rounded-l file:h-full file:font-semibold file:text-lg file:mr-5 file:hover:cursor-pointer
          file:bg-white file:text-black w-full'
          />
          {/* Mobile phone Camera button */}
          <button onClick={RedirectToCamera} className="p-2 bg-gray-400 rounded-lg md:hidden">Take a pic</button>
        </div>

        {!imgResult && (
          <div className="mt-3 gap-3 flex items-center">
            <p className="whitespace-nowrap">Rego Number:</p>
            <Input type="text" className="rounded flex-grow text-black bg-white dark:bg-gray-100" onChange={handleRegoInput} maxLength={regoInputMaxLength} />
          </div>
        )}

        {/* File Upload error */}
        {uploadError && (
          <label className="py-2">
            <span className=" text-red-500">{uploadError as string}</span>
          </label>
        )}

        {/* File details before uploading */}
        {file && !imgResult && (
          <section className="w-full pt-5 flex justify-between animate-fade-down animate-once animate-duration-1000 animate-delay-100 animate-ease-in-out">
            <div className="">
              <h3 className="font-semibold">File details</h3>
              <ul>
                <li><span className="font-semibold pr-1">Name:</span> {file.name}</li>
                <li><span className="font-semibold pr-1">Type:</span> {file.type}</li>
                <li><span className="font-semibold pr-1">Size:</span> {formatBytes(file.size)} MB</li>
              </ul>
            </div>
            <div className="rounded-xl">
              <Image
                src={URL.createObjectURL(file)}
                width={150}
                height={150}
                alt="Thumbnail image"
                className="rounded-lg"
              />
            </div>
          </section>
        )}

        {/* File upload button */}
        {file && (
          <button className='bg-white dark:bg-gray-200 text-black font-semibold rounded-lg py-1 mt-5' onClick={imgResult ? resetImageUpload : handleFileUpload}>
            {imgResult && !isUploading && (<p>Upload another file</p>)}
            {!imgResult && !isUploading && (<p>Upload file</p>)}
            {isUploading && <p className="flex justify-center"><LoaderCircle className="animate-spin" /></p>}
          </button>
        )}

        {uploadError !== null && (
          <div className="w-full text-red-500 font-semibold ">
            <p className="">An error has occurred</p>
          </div>
        )}

        {/* Image result */}
        <section className="w-full mt-5 max-w-2xl">
          {imgResult !== '' && (
            <div>
              <h1>Photo Analysis</h1>
              <img src={imgResult} alt="result image" />

              <div className="text-xs">

                <div className="flex w-full justify-center my-3">
                  <div className="grid grid-flow-col grid-rows-3 grid-cols-2 text-sm gap-x-7 gap-y-2">
                    <p>Year: {MOCK_carDamageData.car_info.Year}</p>
                    <p>Make: {MOCK_carDamageData.car_info.Make}</p>
                    <p>Model: {MOCK_carDamageData.car_info.Model}</p>
                    <p>Color: {MOCK_carDamageData.car_info.Colour}</p>
                    <p>Plate: {MOCK_carDamageData.car_info.Plate}</p>
                    <p>Fuel Type: {MOCK_carDamageData.car_info["Fuel Type"]}</p>
                  </div>
                </div>
                {/* Individual damaged parts */}
                <ListOfCarParts />
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Car diagram */}
      {imgResult !== '' && (
        <section className="w-fit h-full flex relative ">
          <img src="/images/carDiagram.jpg" alt="Car Diagram image"
            className="h-[500px] aspect-auto " />

          <div className="absolute w-full h-full grid grid-cols-3 gap-x-6 justify-between">
            {Object.values(CarPartLocation).map((e: any, i: any) => (
              <div key={i}>
                <CarPartTick isTicked={haveCommonItems(e, carPartArray)} />
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default SingleFileUploader;
