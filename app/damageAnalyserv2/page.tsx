"use client"
import SingleFileUploader from '@/components/multiple-file-upload/single-file-upload';
import React, { useEffect, useState } from 'react'
import {carSide } from '@/types';
import ListOfCarParts from '@/components/multiple-file-upload/list-of-parts';
import {
  BackFile,
  BackImageResult,
  FrontFile,
  FrontImageResult,
  IsCameraActive,
  IsUploading,
  JsonResult,
  LeftFile,
  LeftImageResult,
  RegoNumber,
  RightFile,
  RightImageResult,
  UploadError,
  WhichCameraIsActive
} from '@/components/Atoms/FileAtoms';
import { useAtom } from 'jotai';
import { LoaderCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import CarPartTick from '@/components/multiple-file-upload/car-part-tick';
import { MOCK_VehicleData } from '@/lib/data';

function MulitpleDamageAnalyser() {

  const labelAcceptedFileType = "png, jpeg";
  const regoInputMaxLength = 6;

  const multipleImageUpload = 'https://rekognition-backend.azurewebsites.net/damage_analysis';
  const analyzeImageUrl = 'https://rekognition-backend.azurewebsites.net/analyze';

  const [frontFile, setFrontFile] = useAtom(FrontFile);
  const [leftFile, setLeftFile] = useAtom(LeftFile);
  const [rightFile, setRightFile] = useAtom(RightFile);
  const [backFile, setBackFile] = useAtom(BackFile);

  const [frontImageResult, setFrontImageResult] = useAtom(FrontImageResult);
  const [leftImageResult, setLeftImageResult] = useAtom(LeftImageResult);
  const [rightImageResult, setRightImageResult] = useAtom(RightImageResult);
  const [backImageResult, setBackImageResult] = useAtom(BackImageResult);
  const [jsonResult, setJsonResult] = useAtom(JsonResult);

  const [regoNumber, setRegoNumber] = useAtom(RegoNumber);

  const [uploadError, setUploadError] = useAtom(UploadError);
  const [isUploading, setIsUploading] = useAtom(IsUploading);

  const [isCameraActive, setIsCameraActive] = useAtom(IsCameraActive); 
  const [whichCameraIsActive, setWhichCameraIsActive] = useAtom(WhichCameraIsActive);

  const isAnyFilesSelected = frontFile || leftFile || rightFile || backFile;
  const isAllFilesSelected = frontFile && leftFile && rightFile && backFile;

  const [effectedCarParts, setEffectedCarParts] = useState<carSide[]>()

  const FileMap: { [key: string]: any } = {
    left: leftFile,
    right: rightFile,
    front: frontFile,
    back: backFile,
  };

  const handleAllFileUploads = async () => {
    if (!isAnyFilesSelected) {
      setUploadError('Please select 4 images to upload');
      return
    }

    setIsUploading(true)

    const formData = new FormData();
    if (frontFile) formData.append("car_front", frontFile);
    if (leftFile) formData.append("car_left", leftFile);
    if (rightFile) formData.append("car_right", rightFile);
    if (backFile) formData.append("car_back", backFile);
    // if (regoNumber) formData.append("rego", regoNumber);

    try {
      const result = await fetch(multipleImageUpload, {
        method: "POST",
        body: formData
      });

      // DEV ONLY - Temporarily disabling the fetch call for dev work
      // const myBlob = new Blob();
      // const myOptions = { status: 200, statusText: "its all good!" };
      // const result = new Response(myBlob, myOptions);

      if (!result.ok) {
        console.error('Upload failed:', await result.statusText);
        setUploadError(await result.statusText);
        setIsUploading(false);
        return
      }

      if (result.ok) {
        const response = await result.json();
        setJsonResult(response);
        setIsUploading(false);
      }

    } catch (error: any) {
      console.error(error);
      setUploadError(error as string);
      setIsUploading(false);
    }
  };

  useEffect(() => {
    // Create an Array of affected carsides
    let tempEffectedCarParts = [];
    if (jsonResult?.car_front && jsonResult.car_front.length > 0) {
      tempEffectedCarParts.push(carSide.FRONT)
    }
    if (jsonResult?.car_left && jsonResult.car_left.length > 0) {
      tempEffectedCarParts.push(carSide.LEFT)
    }
    if (jsonResult?.car_right && jsonResult.car_right.length > 0) {
      tempEffectedCarParts.push(carSide.RIGHT)
    }
    if (jsonResult?.car_back && jsonResult.car_back.length > 0) {
      tempEffectedCarParts.push(carSide.BACK)
    }

    setEffectedCarParts(tempEffectedCarParts);

    // Calling and retieving analyzed images of damaged sides
    tempEffectedCarParts.forEach((side: carSide) => {
      const file =  FileMap[side]
      analyseVehicleImage(file, side);
    })
  }, [jsonResult])


  const resetAllAtoms = () => {
    setFrontFile(null)
    setLeftFile(null)
    setRightFile(null)
    setBackFile(null)
    setFrontImageResult(null)
    setLeftImageResult(null)
    setRightImageResult(null)
    setBackImageResult(null)
    setRegoNumber(null)
    setUploadError(null)
    setJsonResult(null)
  }

  const handleRegoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegoNumber(e.target.value);
  }

  useEffect(() => {
    resetAllAtoms()
  }, [])

  const analyseVehicleImage = async (file: File, side: carSide) => {

    const formData = new FormData();
    formData.append("image", file);

    try {
      const result = await fetch(analyzeImageUrl, {
        method: "POST",
        body: formData
      });

      // DEV ONLY - Temporarily disabling the fetch call for dev work
      // const myBlob = new Blob();
      // const myOptions = { status: 200, statusText: "its all good!" };
      // const result = new Response(myBlob, myOptions);

      if (!result.ok) {
        console.error('Upload failed:', await result.statusText);
        setUploadError(await result.statusText);
        setIsUploading(false);
        return
      }

      if (result.ok) {
        const imageBlob = await result.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);

        if (side === carSide.FRONT) {
          setFrontImageResult(imageObjectURL)
        }
        if (side === carSide.LEFT) {
          setLeftImageResult(imageObjectURL)
        }
        if (side === carSide.RIGHT) {
          setRightImageResult(imageObjectURL)
        }
        if (side === carSide.BACK) {
          setBackImageResult(imageObjectURL)
        }

        setIsUploading(false);
      }

    } catch (error: any) {
      console.error(error);
      setUploadError(error);
      setIsUploading(false);
    }

  };

  return (
    
    <div className='w-full mt-5 px-5 flex flex-col gap-5'>
      <div className="flex flex-col lg:flex-row gap-5">
        <SingleFileUploader side='front' />
        <SingleFileUploader side='left' />
        <SingleFileUploader side='right' />
        <SingleFileUploader side='back' />
      </div>

      {/* Rego input */}
      {!jsonResult && (
        <div className="mt-3 gap-3 flex items-center">
          <p className="whitespace-nowrap">Plate Number:</p>
          <Input type="text" className="rounded flex-grow text-black bg-white dark:bg-gray-100" onChange={handleRegoInput} maxLength={regoInputMaxLength} />
        </div>
      )}

      <div className=" w-full flex flex-col">
        {/* Upload Button */}
        {isAllFilesSelected && (
          <button className='bg-green-500 text-white dark:bg-green-300 dark:text-gray-900 font-semibold rounded-lg p-3' onClick={jsonResult ? resetAllAtoms : handleAllFileUploads}>
            {!jsonResult && !isUploading && (<p>Upload file</p>)}
            {jsonResult && !isUploading && (<p>Upload another Vehicle</p>)}
            {isUploading && <p className="flex justify-center"><LoaderCircle className="animate-spin" /></p>}
          </button>
        )}

        {uploadError && (
          <label className="py-2">
            <span className="text-red-500">{uploadError as string}</span>
          </label>
        )}
      </div>

      {jsonResult && !uploadError && (
        <div className="w-full flex flex-col md:flex-row justify-center bg-gray-200 dark:bg-gray-300 rounded-lg p-3 gap-10 ">
          <div className="text-xs">
            <ListOfCarParts arrayOfParts={jsonResult['car_front']} title='Front' />
            <ListOfCarParts arrayOfParts={jsonResult['car_left']} title='Left' />
            <ListOfCarParts arrayOfParts={jsonResult['car_right']} title='Right' />
            <ListOfCarParts arrayOfParts={jsonResult['car_back']} title='Back' />
          </div>

          {/* Car diagram */}
          <section className="w-fit h-full flex relative ">
            <img src="/images/carDiagram.jpg" alt="Car Diagram image" className="h-[500px] aspect-auto " />

            <div className="absolute w-full h-full flex flex-col justify-between ">
              <div className='front w-full flex justify-center '>
                <CarPartTick isTicked={effectedCarParts?.includes(carSide.FRONT)} />
              </div>
              <div className='w-full flex justify-between '>
                <CarPartTick isTicked={effectedCarParts?.includes(carSide.LEFT)} />
                <CarPartTick isTicked={effectedCarParts?.includes(carSide.RIGHT)} />
              </div>
              <div className='back w-full flex justify-center'>
                <CarPartTick isTicked={effectedCarParts?.includes(carSide.BACK)} />
              </div>
            </div>
          </section>

          <section>
            <div className="flex flex-col gap-4 text-black">
              <p><span className='font-semibold'>Year:</span> {MOCK_VehicleData.car_info.Year}</p>
              <p><span className='font-semibold'>Make:</span> {MOCK_VehicleData.car_info.Make}</p>
              <p><span className='font-semibold'>Model:</span> {MOCK_VehicleData.car_info.Model}</p>
              <p><span className='font-semibold'>Color:</span> {MOCK_VehicleData.car_info.Colour}</p>
              <p><span className='font-semibold'>Plate:</span> {MOCK_VehicleData.car_info.Plate}</p>
              <p><span className='font-semibold'>Fuel Type:</span> {MOCK_VehicleData.car_info["Fuel Type"]}</p>
            </div>
          </section>

        </div>
      )}
    </div>
  )
}

export default MulitpleDamageAnalyser