/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import { isEmpty } from "lodash";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

import { shimmer, toBase64 } from "@/lib/image";
import { cn } from "@/lib/utils";

import { Label } from "./ui/label";

export const MultipleImagesDropzone = ({
  images,
  setImages,
  previews,
  disabled,
  label,
  infoText,
}: any) => {
  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    maxFiles: 4,
    disabled: disabled,
    accept: {
      "image/*": [],
    },

    onDrop: (acceptedFiles) => {
      setImages((imgs: File[]) => [
        ...imgs,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
  });

  const thumbs =
    images &&
    images.map((file: any, idx: number) => (
      <div key={idx}>
        <div className="relative aspect-square overflow-hidden rounded-md">
          <img
            src={file?.preview}
            className="size-full object-cover"
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
          <TrashIcon
            onClick={(e: any) => {
              e.stopPropagation();
              removeImage(file);
            }}
            className="absolute right-2 top-2"
            size={16}
          />
        </div>
      </div>
    ));

  const removeImage = (file: any) => {
    const newImages = [...images];
    newImages.splice(newImages.indexOf(file), 1);
    setImages(newImages);
  };

  useEffect(() => {
    if (!images) return;
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      images?.forEach((file: any) => URL.revokeObjectURL(file?.preview));
  }, []);

  return (
    <section className="flex flex-col gap-3 pt-4">
      {label && <Label className="font-bold">{label}</Label>}
      {infoText && <p className="text-sm text-muted-foreground">{infoText}</p>}
      <div
        {...getRootProps({
          className: cn(
            "relative grid cursor-pointer grid-cols-2 gap-2 duration-200",
            isDragAccept ? "bg-gray-200" : ""
          ),
        })}
      >
        {thumbs}
        {Array.from({ length: 4 - images.length }).map((_, index) => (
          <div
            key={`placeholder-${index}`}
            className={`placeholder flex aspect-square items-center justify-center overflow-hidden rounded-md border border-dashed bg-muted ${
              disabled
                ? "cursor-default border-gray-600/25 opacity-50"
                : "border-gray-900/25 "
            }`}
          >
            <img src="/assets/image-upload-icon.png" alt="upload-ico" />
          </div>
        ))}
        <input {...getInputProps()} />
      </div>
    </section>
  );
};
