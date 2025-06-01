"use client";
import { supabase } from "@/supabaseClient";
import { Action, ActionTypes } from "@/types/types";
import React, { ActionDispatch, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FILE_TYPES = {
  "image/jpeg": [],
  "image/png": [],
  "image/webp": [],
};

interface Props {
  dispatch: ActionDispatch<[action: Action]>;
}

function ImageDropzone({ dispatch }: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<string | null> => {
    const filePath = `${file.name}-${Date.now()}`;

    const { error } = await supabase.storage
      .from("task-images")
      .upload(filePath, file);

    if (error) {
      console.log("There was an error uploading image", error.message);
    }

    const { data } = await supabase.storage
      .from("task-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // Do something with the files
    console.log("File was accepted!", acceptedFiles[0]);
    const pubicURL = await uploadImage(acceptedFiles[0]);
    if (!pubicURL) return;
    setPreview(pubicURL);
    dispatch({ payload: pubicURL, type: ActionTypes.UpdateImage });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: FILE_TYPES,
  });

  return (
    <div
      className="flex border-2 border-dotted h-34 items-center rounded-xl"
      {...getRootProps()}
    >
      <div className=" flex rounded-lg h-full">
        {preview == null ? (
          <>
            <p>Drop Image here</p>
            <input
              {...getInputProps()}
              className="flex items-center justify-center"
            />
          </>
        ) : (
          <img
            src={preview}
            onLoad={() => {
              URL.revokeObjectURL(preview);
            }}
            className="object-cover w-full rounded-xl"
          />
        )}
      </div>
      {/* {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p className="flex justify-center">Upload Image</p>
      )} */}
    </div>
  );
}

export default ImageDropzone;
