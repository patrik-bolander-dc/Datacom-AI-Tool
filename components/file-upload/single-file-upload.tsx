"use client"
import { useState } from "react";
import Image from 'next/image'

interface SingleFileUploaderProps {
  label: string
  labelAlt: string
}


const SingleFileUploader = ({ label, labelAlt }: SingleFileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [imgResult, setImgResult] = useState('');
  const [uploadError, setUploadError] = useState<string | null | unknown>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      console.log("Uploading file...");

      const formData = new FormData();
      formData.append("image", file);

      const url = 'https://rekognition-backend.azurewebsites.net/analyze'

      try {
        const result = await fetch(url, {
          method: "POST",
          body: formData
        });

        if (!result.ok) {
          console.error('Upload failed:', await result.text());
          setUploadError(await result.text());
          return
        }

        if (result.ok) {
          const imageBlob = await result.blob();

          const imageObjectURL = URL.createObjectURL(imageBlob);
          setImgResult(imageObjectURL);
        }

      } catch (error) {
        console.error(error);
        setUploadError(error);
      }
    }
  };

  const resetImageUpload = () => {
    setImgResult('')
    setFile(null)
    setUploadError(null)
  }

  function formatBytes(bytes: number) {
    return (bytes / Math.pow(1024, 2)).toFixed(3)
  }

  return (
    <div className="w-3/4 md:w-full  flex flex-col items-center ">

      <div className=" w-full md:w-1/2 flex flex-col bg-gray-900 p-3 rounded-xl max-w-2xl min-w-20">
        <label className="flex justify-between text-blue-200">
          <span>{label}</span>
          <span>{labelAlt}</span>
        </label>
        <input type="file"
          className='bg-dcBlue rounded-xl border border-blue-500 text-lg
                            file:bg-blue-500 file:border-0 file:p-3 file:px-4 file:rounded-l file:text-black file:font-semibold file:text-lg file:mr-5
                            file:hover:cursor-pointer'
          onChange={handleFileChange}
        />

        <label className="label">
          <span className="label-text-alt text-red-500">{uploadError as string}</span>
        </label>

        {file && (
          <section className="w-full py-5 flex justify-between animate-fade-down animate-once animate-duration-1000 animate-delay-100 ">
            <div className="">
              <h3 className="font-semibold">File details</h3>
              <ul>
                <li><span className="font-semibold pr-1">Name:</span> {file.name}</li>
                <li><span className="font-semibold pr-1">Type:</span> {file.type}</li>
                <li><span className="font-semibold pr-1">Size:</span> {formatBytes(file.size)} MG</li>
              </ul>
            </div>
            <div className="rounded-xl">
              <Image
                src={URL.createObjectURL(file)}
                width={150}
                height={150}
                alt="Picture of the author"
                className="rounded-xl"
              />
            </div>
          </section>
        )}

        
        {file && (
          <button className='bg-gray-200 text-black font-semibold rounded-lg py-1' onClick={imgResult ? resetImageUpload : handleUpload}>
            {imgResult ? <p>Upload another file</p> : <p>Upload file</p>}
          </button>
        )}

        {uploadError !== null && (
          <div className="w-full text-red-500 font-semibold ">
            <p className="">An error has occurred</p>
            <p className="">{uploadError as string}</p>
          </div>
        )}

      </div>

      <section className="w-full mt-5 max-w-2xl">
        {imgResult !== '' && (
          <div>
            <h1>Result:</h1>
            <img src={imgResult} alt="result image" />
          </div>
        )}
      </section>

    </div>
  );
};

export default SingleFileUploader;


