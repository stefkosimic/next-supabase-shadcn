/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import { isEmpty } from "lodash";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

import { shimmer, toBase64 } from "@/lib/image";
import { cn } from "@/lib/utils";

import { Label } from "./ui/label";

export const ImageDropzone = ({
  images,
  setImages,
  dropzoneText,
  preview,
  multipleImages = false,
  maxFiles,
  label,
  infoText,
}: any) => {
  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    maxFiles: maxFiles,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setImages(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs =
    images &&
    images.map((file: any) => (
      <div key={file?.name}>
        <div>
          <img
            src={file?.preview}
            className="h-full w-full bg-cover"
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        </div>
      </div>
    ));

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
      {/* {!isEmpty(images) && thumbs} */}
      {multipleImages ? (
        <div
          {...getRootProps({
            className: cn(
              "relative grid h-[400px] cursor-pointer grid-cols-2 gap-2 duration-200",
              isDragAccept ? "bg-gray-200" : ""
            ),
          })}
        >
          {Array(maxFiles)
            .fill("")
            .map((el, index: number) => (
              <div
                key={index}
                className="relative flex h-full items-center justify-center overflow-hidden rounded-md border border-dashed border-gray-900/25 bg-muted"
              >
                {images[index]?.preview ? (
                  <div className="absolute left-0 top-0 aspect-square size-full">
                    <img
                      src={images[index]?.preview}
                      className="w-full bg-cover"
                      onLoad={() => {
                        URL.revokeObjectURL(images[index]?.preview);
                      }}
                    />
                  </div>
                ) : (
                  <img src="/assets/image-upload-icon.png" alt="upload-ico" />
                )}
              </div>
            ))}
          <input {...getInputProps()} />
        </div>
      ) : (
        <div
          {...getRootProps({
            className: cn(
              "dropzone relative flex h-80 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border border-dashed border-gray-900/25 bg-muted px-6 py-10 duration-200",
              isDragAccept ? "bg-gray-200" : ""
            ),
          })}
        >
          <div className="absolute left-0 top-0 aspect-square size-full">
            {!isEmpty(thumbs) && thumbs}

            {preview && (
              <Image
                alt="preview-img"
                unoptimized
                src={
                  preview.preview
                    ? URL.createObjectURL(preview as any)
                    : preview.publicUrl
                }
                height={500}
                width={500}
                className="w-full object-cover"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(200, 200)
                )}`}
              />
            )}
          </div>
          {(isEmpty(preview) || isEmpty(thumbs)) && (
            <img src="/assets/image-upload-icon.png" alt="upload-ico" />
          )}
          <input {...getInputProps()} />
          <p className="text-sm text-muted-foreground">{dropzoneText}</p>
        </div>
      )}
    </section>
  );
};
