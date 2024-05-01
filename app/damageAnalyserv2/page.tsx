"use client"
import SingleFileUploader from '@/components/multiple-file-upload/single-file-upload';
import React, { useEffect, useState } from 'react'
import { carPartType } from '@/types';
import ListOfCarParts from '@/components/multiple-file-upload/list-of-parts';
import { BackFile, 
  BackImageResult, 
  FrontFile, 
  FrontImageResult, 
  IsCameraActive, 
  IsUploading, 
  JsonResult, 
  LeftFile, 
  LeftImageResult, 
  RegoNumber, 
  ResetAllAtoms, 
  RightFile, 
  RightImageResult, 
  UploadError } from '@/components/Atoms/FileAtoms';
import { useAtom } from 'jotai';
import { LoaderCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import CarPartTick from '@/components/multiple-file-upload/car-part-tick';
import { haveCommonItems } from '@/lib/utils';

function MulitpleDamageAnalyser() {

  const labelAcceptedFileType = "png, jpeg";
  const regoInputMaxLength = 6;

  const multipleImageUpload = 'https://rekognition-backend.azurewebsites.net/damage_analysis';

  const [carPartArray, setCarPartArray] = useState<carPartType[]>([]);

  const [frontFile, setFrontFile] = useAtom(FrontFile);
  const [leftFile, setLeftFile] = useAtom(LeftFile);
  const [rightFile, setRightFile] = useAtom(RightFile);
  const [backFile, setBackFile] = useAtom(BackFile);

  const [frontImageResult, setFrontImageResult] = useAtom(FrontImageResult);
  const [leftImageResult, setLeftImageResult] = useAtom(LeftImageResult);
  const [rightImageResult, setRightImageResult] = useAtom(RightImageResult);
  const [backImageResult, setBackImageResult] = useAtom(BackImageResult);
  const [jsonResult, setJsonResult] = useAtom(JsonResult)

  const [regoNumber, setRegoNumber] = useAtom(RegoNumber)

  const [uploadError, setUploadError] = useAtom(UploadError);
  const [isUploading, setIsUploading] = useAtom(IsUploading);

  const [isCameraActive, setIsCameraActive] = useAtom(IsCameraActive);

  const isAnyFilesSelected = frontFile || leftFile || rightFile || backFile;
  const isAllFilesSelected = frontFile && leftFile && rightFile && backFile;
  const hasAnyImageResult = frontImageResult || leftImageResult || rightImageResult || backImageResult;

  const [effectedCarParts, setEffectedCarParts] = useState<string[]>()

  const handleAllFileUploads = async () => {
    if (!isAnyFilesSelected) {
      setUploadError('Please select an image to upload');
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
        // const imageBlob = await result.blob();
        const response = await result.json();
        setJsonResult(response);
        console.log(response);
        // const imageObjectURL = URL.createObjectURL(imageBlob);
        // const frontImageObjectURL = URL.createObjectURL(imageBlob);
        // const leftImageObjectURL = URL.createObjectURL(imageBlob);
        // const rightImageObjectURL = URL.createObjectURL(imageBlob);
        // const backImageObjectURL = URL.createObjectURL(imageBlob);

        // setImgResult(imageObjectURL);
        // setFrontImageResult(frontImageObjectURL);
        // setLeftImageResult(leftImageObjectURL);
        // setRightImageResult(rightImageObjectURL);
        // setBackImageResult(backImageObjectURL);

        setIsUploading(false);
      }

    } catch (error: any) {
      console.error(error);
      setUploadError(error as string);
      setIsUploading(false);
    }
  };

  useEffect(() => {
    let tempEffectedCarParts = [];
    if (jsonResult?.car_front && jsonResult.car_front.length > 0) {
      tempEffectedCarParts.push('front')
    }
    if (jsonResult?.car_left && jsonResult.car_left.length > 0) {
      tempEffectedCarParts.push('left')
    }
    if (jsonResult?.car_right && jsonResult.car_right.length > 0) {
      tempEffectedCarParts.push('right')
    }
    if (jsonResult?.car_back && jsonResult.car_back.length > 0) {
      tempEffectedCarParts.push('back')
    }

    setEffectedCarParts(tempEffectedCarParts);
  }, [jsonResult])
  

  const resetAllAtoms = () => {
    setJsonResult(null)
  }

  const handleRegoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegoNumber(e.target.value);
  }

  useEffect(() => {
    setJsonResult(null)
  }, [])
  
  

  return (
    <div className='w-full mt-5 px-5 flex flex-col gap-5'>
      <div className="flex flex-col lg:flex-row gap-5">
        <SingleFileUploader side='front' />
        <SingleFileUploader side='left' />
        <SingleFileUploader side='right' />
        <SingleFileUploader side='back' />
      </div>
      {/* Rego input */}

      {!hasAnyImageResult && (
        <div className="mt-3 gap-3 flex items-center">
          <p className="whitespace-nowrap">Rego Number:</p>
          <Input type="text" className="rounded flex-grow text-black bg-white dark:bg-gray-100" onChange={handleRegoInput} maxLength={regoInputMaxLength} />
        </div>
      )}

      <div className="bg-white w-full flex flex-col">
        {/* Upload Button */}
        {isAllFilesSelected && (
          <button className='bg-green-500 dark:bg-gray-200 text-black font-semibold rounded-lg p-3' onClick={hasAnyImageResult ? resetAllAtoms : handleAllFileUploads}>
            {!jsonResult && !isUploading && (<p>Upload file</p>)} {/* default */}
            {jsonResult && !isUploading && (<p>Upload another file</p>)} {/* after finishing  */}
            {isUploading && <p className="flex justify-center"><LoaderCircle className="animate-spin" /></p>}
          </button>
        )}

        {uploadError && (
          <label className="py-2">
            <span className="text-red-500">{uploadError as string}</span>
          </label>
        )}

        {jsonResult && !uploadError && (
          <div className="text-xs">
            <ListOfCarParts arrayOfParts={jsonResult['car_front']} title='Front'/>
            <ListOfCarParts arrayOfParts={jsonResult['car_left']} title='Left'/>
            <ListOfCarParts arrayOfParts={jsonResult['car_right']} title='Right'/>
            <ListOfCarParts arrayOfParts={jsonResult['car_back']} title='Back'/>
          </div>
        )}

        {/* Car diagram */}
        {jsonResult && !uploadError && (
          <section className="w-fit h-full flex relative ">
            <img src="/images/carDiagram.jpg" alt="Car Diagram image" className="h-[500px] aspect-auto " />

            <div className="absolute w-full h-full flex flex-col justify-between ">
              <div className='front w-full flex justify-center '>
                <CarPartTick isTicked={effectedCarParts?.includes('front')} />
              </div>
              <div className='w-full flex justify-between '>
                <CarPartTick isTicked={effectedCarParts?.includes('left')} />
                <CarPartTick isTicked={effectedCarParts?.includes('right')} />
              </div>
              <div className='back w-full flex justify-center'>
                <CarPartTick isTicked={effectedCarParts?.includes('back')} />
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  )
}

export default MulitpleDamageAnalyser