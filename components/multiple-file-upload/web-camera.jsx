"use client"
import { ChevronLeft } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import Image from 'next/image'

// TODO 3
const WebCamera = ({setCameraToActive, setCapturedImage}) => {
    const webcamRef = useRef(null);
    const [img, setImg] = useState(null);

    const BackToDamageAnalyzer = () => {
        setCameraToActive(false);
        return
    }

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current ? webcamRef.current.getScreenshot({ width: 1920, height: 1080 }) : null;
        setImg(imageSrc);
    }, [webcamRef]);

    const videoConstraints = {
        width: 390,
        height: 390,
        facingMode: "user",
        // facingMode: "environment"
    };

    const onImageSubmit = () => {
        setCapturedImage(img);
        setCameraToActive(false);
    }

    const retakeImage = () => {
        setImg(null);
    }

    return (
        <div className="flex flex-col px-5">
            <button onClick={BackToDamageAnalyzer} className="group bg-gray-500 w-fit flex gap-2 rounded-lg pl-1 pr-2 py-2 shadow-lg">
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1" />
                Back
            </button>
            {!img ? (
                <div className="w-full flex flex-col items-center mt-5">
                    <Webcam
                        audio={false}
                        height={720}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={1280}
                        videoConstraints={videoConstraints}
                        className=""
                    />
                    <button onClick={capture} className="bg-green-500 px-5 py-2 rounded-lg -mt-16 z-20">
                        Capture Photo
                    </button>
                </div>
            ) : (
                <div className="w-full flex flex-col items-center mt-5">
                    <Image src={img} alt="my captured image" width={1000} height={1000} className="w-full h-[500px] object-cover"/>
                    <div className="flex justify-center gap-4 mt-3">
                        <button onClick={retakeImage} className="w-fit bg-green-500 text-white px-5 py-2 rounded-lg hover:-translate-y-0.5 shadow-lg">
                            Try Again 
                        </button>
                        <button onClick={onImageSubmit} className="w-fit bg-red-500 text-white px-5 py-2 rounded-lg hover:-translate-y-0.5 shadow-lg">
                            Submit
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default WebCamera;