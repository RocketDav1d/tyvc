import React, { forwardRef, useCallback } from 'react';

import { useDropzone } from 'react-dropzone';


type FileDropzoneProps = {
  onUpload: (files: File[]) => void;
  acceptedFormats: { [id: string]: string[] };
  supportedFormatsLabel: string;
};

const FileDropzone = forwardRef<HTMLDivElement, FileDropzoneProps>(
  ({ onUpload, acceptedFormats, supportedFormatsLabel }, ref) => {
    const onDrop = useCallback(
      (acceptedFiles: File[]) => {
        onUpload(acceptedFiles);
      },
      [onUpload]
    );

    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: acceptedFormats,
    });



    return (
      <div {...getRootProps()} className="w-full h-full">
        <div className="h-full flex justify-center items-center text-center text-md text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative font-medium text-center text-primary bg-white rounded-md cursor-pointer hover:text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
          >
            <span className="text-base underline">Upload a file</span>
            <input {...getInputProps()} />
            {supportedFormatsLabel ? (
              <p className="mt-2 text-sm text-gray-500">
                {supportedFormatsLabel}
              </p>
            ) : null}
          </label>
        </div>

      </div>
    );
  }
);

FileDropzone.displayName = 'FileDropzone';


export default FileDropzone;
