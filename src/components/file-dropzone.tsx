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

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
      onDrop,
      accept: acceptedFormats,
    });

    return (
      <div {...getRootProps()} className="w-full h-full">
        <div className="h-full flex flex-col justify-center items-center px-8 py-6 text-center text-md text-gray-600 border rounded-md dark:text-gray-200">
          {acceptedFiles.length == 0 ? (
            <label
              htmlFor="file-upload"
              className="relative font-medium text-center text-primary rounded-md cursor-pointer hover:text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
            >
              <span className="text-base underline">Upload a file</span>
              <input {...getInputProps()} />
              {supportedFormatsLabel ? (
                <p className="mt-2 text-sm text-gray-500">
                  {supportedFormatsLabel}
                </p>
              ) : null}
            </label>
          ) : (
            <div>
              <h4 className="mb-2 font-medium">Uploaded Files:</h4>
              <ul>
                {acceptedFiles.map((file) => (
                  <li
                    key={file.name}
                    className="flex justify-between items-center space-x-2"
                  >
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-6 h-6 text-gray-600 dark:text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span>{file.name}</span>
                    </div>
                    <button
                      onClick={() => {
                        const newFiles = acceptedFiles.filter(
                          (f) => f.name !== file.name
                        );
                        onUpload(newFiles);
                      }}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
);

FileDropzone.displayName = 'FileDropzone';

export default FileDropzone;
