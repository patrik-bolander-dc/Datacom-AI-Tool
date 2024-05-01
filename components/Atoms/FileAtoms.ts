import { atom, useAtom } from "jotai";

export const FrontFile = atom<File | null>(null);
export const LeftFile = atom<File | null>(null);
export const RightFile = atom<File | null>(null);
export const BackFile = atom<File | null>(null);

export const FrontImageResult = atom<string | null>(null);
export const LeftImageResult = atom<string | null>(null);
export const RightImageResult = atom<string | null>(null);
export const BackImageResult = atom<string | null>(null);

export const JsonResult = atom<any>(null);

export const RegoNumber = atom<string | null>(null)

export const UploadError = atom<null | string>(null);
export const IsUploading = atom<boolean>(false);

export const IsCameraActive = atom<boolean>(false);
export const CapturedImage = atom<File | null>(null);

export const ResetAllAtoms = () => {
    const [frontFile, setFrontFile] = useAtom(FrontFile);
    const [leftFile, setLeftFile] = useAtom(LeftFile);
    const [rightFile, setRightFile] = useAtom(RightFile);
    const [backFile, setBackFile] = useAtom(BackFile);

    const [frontImageResult, setFrontImageResult] = useAtom(FrontImageResult);
    const [leftImageResult, setLeftImageResult] = useAtom(LeftImageResult);
    const [rightImageResult, setRightImageResult] = useAtom(RightImageResult);
    const [backImageResult, setBackImageResult] = useAtom(BackImageResult);

    const [uploadError, setUploadError] = useAtom(UploadError);
    const [isCameraActive, setIsCameraActive] = useAtom(IsCameraActive);
    
    setFrontFile(null)
    setLeftFile(null)
    setRightFile(null)
    setBackFile(null)
    setFrontImageResult(null)
    setLeftImageResult(null)
    setRightImageResult(null)
    setBackImageResult(null)
    setUploadError(null)
    setIsCameraActive(false)
}