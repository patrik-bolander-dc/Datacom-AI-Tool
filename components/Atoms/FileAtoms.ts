import { atom, useAtom } from "jotai";
import { CameraType, ErrorType, FileType, ImageResultType, RegoNumberType } from "@/types";

export const FrontFile = atom<FileType>(null);
export const LeftFile = atom<FileType>(null);
export const RightFile = atom<FileType>(null);
export const BackFile = atom<FileType>(null);

export const FrontImageResult = atom<ImageResultType>(null);
export const LeftImageResult = atom<ImageResultType>(null);
export const RightImageResult = atom<ImageResultType>(null);
export const BackImageResult = atom<ImageResultType>(null);

export const JsonResult = atom<any>(null);

export const RegoNumber = atom<RegoNumberType>(null)

export const UploadError = atom<ErrorType>(null);
export const IsUploading = atom<boolean>(false);

export const IsCameraActive = atom<boolean>(false);
export const WhichCameraIsActive = atom<CameraType>(null);
export const CapturedImage = atom<FileType>(null);
