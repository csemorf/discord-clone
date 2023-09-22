"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import Image from "next/image";

import { X } from "lucide-react";

interface FileUploadProps {
  value: string;
  onChange: (url?: string) => void;
  endpoint: "serverImage" | "messageFile";
}

export const FileUpload = ({ endpoint, onChange, value }: FileUploadProps) => {
  const fileType = value?.split(".").pop();
  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Upload" className="rounded-full"></Image>
        <button
          onClick={() => onChange("")}
          className="absolute top-0 right-0 p-1 bg-rose-500 text-white rounded-full shadow-sm"
          type="button"
        >
          <X className="w-4 h-4"></X>
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint} //regulation 4mb
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};
