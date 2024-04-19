"use client"
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import Webcam from "react-webcam";

const WebCamera = () => {
    const router = useRouter()

    const BackToDamageAnalyzer = () => {
        router.push('/damageAnalyser')
        return
    }

    return ( 
        <div className="flex flex-col w-fit">
            This is my cool camera
            <button onClick={BackToDamageAnalyzer} 
                className="bg-gray-300 flex w-min gap-2 justify-between rounded-lg pl-1 pr-3 py-2">
                <ChevronLeft className="w-6 h-6 hover:-translate-x-1 transition-all"/>
                Back
            </button>
            <Webcam />
        </div>
     );
}
 
export default WebCamera;