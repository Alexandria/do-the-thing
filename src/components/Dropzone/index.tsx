"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function ImageDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log("File was accepted!");
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className="flex border-2 border-dotted h-34 items-center"
      {...getRootProps()}
    >
      <input
        {...getInputProps()}
        className="flex items-center justify-center"
      />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p className="flex justify-center">Upload Image</p>
      )}
    </div>
  );
}

export default ImageDropzone;
