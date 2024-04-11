import React from "react";
import { ImagePreview } from "./components";
import { AsyncStatus } from "./types";

export interface ImageUploaderProps {
  imageBase64: string | null;
  status: AsyncStatus;
  onUploadSuccess: (name: string, fileBase64: string) => void;
  onUploadStart: () => void;
}

export function ImageUploader(props: ImageUploaderProps) {
  const { imageBase64, status, onUploadSuccess, onUploadStart } = props;

  const readFile = (file: File) => {
    onUploadStart();

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const base64String = reader.result as string;
      onUploadSuccess(file.name, base64String);
    };
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      readFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      readFile(file);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === "file" && items[i].type.match("^image/")) {
        const file = items[i].getAsFile();
        if (file) {
          readFile(file);
        }
        break;
      }
    }
  };

  return status === "idle" ? (
    <div
      className="w-full flex flex-row grow-0 basis-full border border-dashed border-gray-400 rounded-lg relative overflow-hidden"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onPaste={handlePaste}
    >
      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
        Drop Image Here or &nbsp;<span className="underline">Browse</span>
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileInputChange}
        />
      </div>
    </div>
  ) : (
    <ImagePreview
      src={imageBase64}
      minimize={true}
      alt="Uploaded"
      status={status}
    />
  );
}
