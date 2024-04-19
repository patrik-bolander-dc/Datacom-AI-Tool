"use client"
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const WebCamera = () => {
    const router = useRouter()

    const BackToDamageAnalyzer = () => {
        router.push('/damageAnalyser')
        return
    }

    const webcamRef = useRef(null);
    const [img, setImg] = useState(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current ? webcamRef.current.getScreenshot({ width: 1920, height: 1080 }) : null;
        setImg(imageSrc);
    }, [webcamRef]);

    const videoConstraints = {
        width: 390,
        height: 390,
        facingMode: "user",
    };

    const onImageSubmit = () => {

    }

    return (
        <div className="flex flex-col">

            <button onClick={BackToDamageAnalyzer} className="group bg-gray-500 w-fit flex gap-2 rounded-lg pl-1 pr-3 py-2">
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-all" />
                Back
            </button>
            <div className="flex flex-col items-center">
                <Webcam
                    audio={false}
                    height={720}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={1280}
                    videoConstraints={videoConstraints}
                />
                <button onClick={capture} className="bg-green-500 px-5 py-2 rounded-lg">
                    Capture photo
                </button>
            </div>

            {img && (
                <div className="w-full flex flex-col items-center">
                    <img src={img} alt="my image" className="" />
                    <button onClick={onImageSubmit} className="w-fit bg-red-500 text-white px-5 py-2 rounded-lg">
                        submit image
                    </button>
                </div>
            )}

        </div>
    );
}

export default WebCamera;