"use client"
import { useEffect, useState } from "react";
import Image from 'next/image'
import { LoaderCircle } from 'lucide-react';
import { MOCK_carDamageData, carPartColorMap as ImportedCarPartColorMap, CarPartLocation, carPartType } from "@/lib/data";
import { formatBytes, haveCommonItems } from "@/lib/utils";
import CarPartTick from "./car-part-tick";

const SingleFileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imgResult, setImgResult] = useState('');
  const [uploadError, setUploadError] = useState<string | null | unknown>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [carPartArray, setCarPartArray] = useState<carPartType[]>([])

  const labelMaxFileSize = "no limit";
  const labelAcceptedFileType = "png, jpeg";

  const carPartColorMap = ImportedCarPartColorMap;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (imgResult) {
      resetImageUpload();
    }

    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    setIsUploading(true)
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      const url = 'https://rekognition-backend.azurewebsites.net/analyze'

      try {
        const result = await fetch(url, {
          method: "POST",
          body: formData
        });

        // Disabling the fetch call for dev work
        // const myBlob = new Blob();
        // const myOptions = { status: 200, statusText: "its all good!" };
        // const result = new Response(myBlob, myOptions);

        if (!result.ok) {
          console.error('Upload failed:', await result.text());
          setUploadError(await result.text());
          setIsUploading(false)
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

  useEffect(() => {
    carPartColorMap
    console.log(carPartColorMap)
    let carPartArray: carPartType[] = [];
    // collect all affected car parts from MOCK data
    MOCK_carDamageData.PartsDamaged.map((i) => {
      carPartArray.push(i.damagedCarPart as any)
    })
    setCarPartArray(carPartArray);
  }, [imgResult])


  return (
    <div className="w-full flex justify-center bg-purple-200">

      {/* Card */}
      <div className="w-full md:w-1/2 flex flex-col bg-gray-200 p-5 rounded-xl max-w-2xl min-w-20 dark:bg-gray-900 h-full">
        <label className="flex justify-start text-black dark:text-blue-200/90">
          <span>Accepted File Types: {labelAcceptedFileType}</span>
          {/* <span>{labelMaxFileSize}</span> // optional: display max file size*/}
        </label>
        <input type="file"
          onChange={handleFileChange}
          className='bg-zinc-100 dark:bg-dcBlue rounded-xl border border-blue-500 text-lg 
          dark:file:bg-blue-500 dark:file:text-black file:border-0 file:p-3 file:px-4 file:rounded-l  file:font-semibold file:text-lg file:mr-5 file:hover:cursor-pointer
          file:bg-white file:text-black'
        />

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
          <button className='bg-white dark:bg-gray-200 text-black font-semibold rounded-lg py-1 mt-5' onClick={imgResult ? resetImageUpload : handleUpload}>
            {imgResult && !isUploading && (<p>Upload another file</p>)}
            {!imgResult && !isUploading && (<p>Upload file</p>)}
            {isUploading && <p className="flex justify-center"><LoaderCircle className="animate-spin" /></p>}
          </button>
        )}

        {uploadError !== null && (
          <div className="w-full text-red-500 font-semibold ">
            <p className="">An error has occurred</p>
            <p className="">{uploadError as string}</p>
          </div>
        )}

        {/* Image result */}
        <section className="w-full mt-5 max-w-2xl">
          {imgResult !== '' && (
            <div>
              <h1>Photo Analysis</h1>
              <img src={imgResult} alt="result image" />

              <div className="text-xs">
                <div className="flex justify-evenly py-2">
                  <div className="flex justify-center text-center w-1/3">Year: {MOCK_carDamageData.year}</div>
                  <span>|</span>
                  <div className="flex justify-center text-center w-1/3">Make: {MOCK_carDamageData.make}</div>
                  <span>|</span>
                  <div className="flex justify-center text-center w-1/3">Model: {MOCK_carDamageData.model}</div>
                </div>
                {/* Individual damaged parts */}
                <ul className="text-xs">
                  {MOCK_carDamageData.PartsDamaged.map((item, index) => (
                    <li key={index} className='py-2 space-x-2 '>
                      <span className={`rounded py-0.5 px-4 text-white ${carPartColorMap[item.damagedCarPart]}`}> {item.Percentage}% </span>
                      <span>{item.damagedCarPart}</span>
                    </li>
                  ))}
                </ul>
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
